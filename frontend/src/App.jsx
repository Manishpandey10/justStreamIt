import { useRef, useState } from 'react'
import './App.css'
import VideoPlayer from './videoPlayer'
import videojs from "video.js"


function App() {
const playerRef = useRef(null)
<<<<<<< HEAD
const videoLink = "https://localhost:8000/uploads/playlist/5df9b53f-0925-40af-8392-c146710a8b2b/index.m3u8"
=======
const videoLink = "https://localhost:8000/uploads/playlist/62824389-037f-4a46-b64b-81216dd4e307/index.m3u8"
>>>>>>> e422b62 (some changes)

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
<<<<<<< HEAD
        <h1>Video:HSR intro</h1>
=======
        <p>This page is a proof of concept*</p>
        <h1>Video:1 Testing</h1>
>>>>>>> e422b62 (some changes)
      </div>
      <VideoPlayer
      options= {videoPlayerOption}
      onReady = {handlePlayerReady}
      />

    </>
  )
}

export default App
