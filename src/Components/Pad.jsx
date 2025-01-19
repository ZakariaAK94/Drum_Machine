/* eslint-disable react/prop-types */

export default function Pad({pad, playAudio}) {

   const handlePlayAudio = () => playAudio(pad);
  
  return (
    <>
    <button
    style ={{backgroundColor:pad.color}}
    className={`drum-pad${pad.on? " on":""}${pad.isClicked ? " clicked": ""}`}
    id={`${pad.id}-drum`}
    onClick={handlePlayAudio}
    >
    <audio src={pad.url} id={pad.id} className="clip" />
    {pad.id}
    </button>
     
    </>
    
  )
}
