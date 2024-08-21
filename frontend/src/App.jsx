import { useRef, useState } from 'react'
import './App.css'
import VideoPlayer from './videoPlayer'
import videojs from "video.js"


function App() {
const playerRef = useRef(null)
const videoLink = "https://localhost:8000/uploads/playlist/5df9b53f-0925-40af-8392-c146710a8b2b/index.m3u8"

const videoPlayerOption = {
  controls: true,
  responsive:true,
  fluid:true,
  sources:[
    {
      src: videoLink,
      type:"application/x-mpegURL"
      // type:"video/mp4"
    }
  ]
}
const handlePlayerReady = (player) => {
  playerRef.current = player;

  player.on("waiting",()=>{
    videojs.log("Player is waiting")
  })

  player.on("dispose", () => {
    videojs.log("player will dispose");
  });
};

  return (
    <>
      <div>
        <h1>Video:HSR intro</h1>
      </div>
      <VideoPlayer
      options= {videoPlayerOption}
      onReady = {handlePlayerReady}
      />

    </>
  )
}

export default App
