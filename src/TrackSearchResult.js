import React from 'react'
import "./TrackSearchResult.css"

export default function TrackSearchResult({track, chooseTrack}) {
    function handlePlay() {
        chooseTrack(track)
    }
  
    return (
    <div
        className='d-flex m-2 align-items-center'
        style={{cursor: "pointer"}}
        onClick={handlePlay}
    >
        <img src={track.albumUrl} style={{ heigh: "64px", width: "64px"}} />
        <div className='ml-3 result'>
            <div>{track.title}</div>
            <div className='text-muted'>{track.artist}</div>
        </div>
    </div>
  )
}
