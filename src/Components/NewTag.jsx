import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
export default function NewTag(props) {
  const [data, setData] = useState([])
  const [selection, setSelection] = useState({ 'sel': { value: 1, label: 'default' } })
  const [maxToken, setMaxToken] = useState(1)
  const [token, setToken] = useState(1)
  const [imgURL, setImgURL] = useState("none")
  const [myName, setMyName] = useState("")
  const [tokex, setTokex] = useState(null)
  useEffect(() => {
    fetch("https://disco.pythonanywhere.com/projects").then(
      res => res.json()
    ).then(
      dat => {
        setData(dat['projects'])
        console.log(dat)
      }
    )
  }, [])

  let handleProjectSelect = (sel) => {
    console.log(sel)
    setSelection({ sel })
    setMaxToken(sel.found)
    console.log(sel)
    console.log(selection)
    let tokenexpression = sel.value * (10 ** 6) + token
    setTokex(tokenexpression)
    let urlguess = 'https://artblocks-mainnet.s3.amazonaws.com/' + tokenexpression + '.png'
    setImgURL(urlguess)

  }
  let handleTokenSelect = (sel) => {

    const value = Math.max(0, Math.min(maxToken, Number(sel.target.value)));
    setToken(value);
    let tokenexpression = selection.sel.value * (10 ** 6) + value
    setTokex(tokenexpression)
    let urlguess = 'https://artblocks-mainnet.s3.amazonaws.com/' + tokenexpression + '.png'
    setImgURL(urlguess)
  }
  let handleNameChange = (it) => {
    console.log(it.target.value)
    setMyName(it.target.value)
  }

  let submitObj = () => {
    let outobj = { 'project': selection.sel.label, 'number': token, 'token': selection.sel.value * (10 ** 6) + token, "name": myName, 'author': props.author, type: '1' }
    console.log(selection.sel)
    console.log(outobj)
    fetch(`https://disco.pythonanywhere.com/newtag`,
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outobj)
      })

    // navigate('/')
  }
  let randomizeSel = () => {
    let randtoken = Math.floor(Math.random() * maxToken)
    let randproj = Math.floor(Math.random() * data.length)
    console.log(data[randproj])
    setSelection(data[randproj])
    handleProjectSelect(data[randproj])

    // handleTokenSelect({target:{value:randtoken},value:randproj})
    // return 0
  }
  return (

  <div className={'general-' + props.theme}>

    

    {(typeof data === 'undefined') ? (
      <p>Loading..</p>
    ) : (
      <div className="newForm">
    <h3>Add Artwork</h3>
      <div className="inputform">
        
        <div className="entry-line">
        <label>Name:</label> <input type="text" values={myName} onChange={handleNameChange}></input>
        </div>
        
        <div className="entry-line">
        <label>Author:</label> {props.author}
        </div>
        
        <div className="selectionbox">
          
          <Select options={data} onChange={handleProjectSelect} placeholder="Select project..." />
        </div>
        
        <div className="entry-line">
          {selection.sel.label}#
          
            <input type="number" placeholder="which token" value={token} onChange={handleTokenSelect} />
          
            <Link to={{ pathname: '/newest', key: new Date().getTime() }}><button onClick={submitObj} disabled={myName.length === 0} className='addbutton'>Submit</button></Link>
          </div>
        </div>
            <div className="art">
            <img alt="subject" width="200" height="auto" src={imgURL} />
            
            <p className="artblockstext"><a href={"https://generator.artblocks.io/" + tokex} target="_blank">watch on artblocks &rarr;</a>  </p>
            </div>

            
          
          
      </div>
    )
    }

</div>

  )
}