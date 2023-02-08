import React from "react";
import grail from '/img/diamond-fine.png'
import ham from '/img/ham-happy.png'
import tomato from '/img/tomato-shiny.png'
import grailclicked from '/img/diamond-hands.png'
import hamclicked from '/img/ham-glow.png'
import tomatoclicked from '/img/tomato-splot.png'

//what do we pass to a vote button? style. tagid
export default function VoteButton(props) {
  let myImg = { 'grail': grail, 'ham': ham, 'tomato': tomato }

  let clickedImg = { 'grail': grailclicked, 'ham': hamclicked, 'tomato': tomatoclicked }
  let imgSource = myImg[props.bstyle]
  if (props.already) {

    imgSource = clickedImg[props.bstyle]
  }
  let toggleMe = () => {
    let postobj = { 'style': props.bstyle, 'tagid': props.tagid, 'author': props.author, 'toggle': "on" }
    if (props.already) {
      postobj['toggle'] = "flip"
    }

    console.log('sending this to newvote/:')
    console.log(postobj)
    fetch(`https://disco.pythonanywhere.com/newvote`,
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postobj)
      }
    ).then(response => response.json()).then(data => props.callback(data))


    // fetch(`http://localhost:3000/vote/${props.bstyle}/${props.tagid}/${props.author}`,{method:'POST'})

  }

  return (
    <span className="buttonGroup">
      <button className="voteButton">
        <img className="buttonImage" alt="none" width="auto" src={imgSource} onClick={toggleMe}
        />

      </button>
    </span>


  )

}