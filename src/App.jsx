import { useCallback, useEffect, useRef, useState } from 'react'
import {padsData} from './pads'

import Pad from './Components/Pad';

function App() {
  
  const [pads,setPads] = useState(padsData);
  const[isOn,setIsOn ] = useState(true);
  const[currentElement,setCurrentElement] = useState('');
  
  const [volume, setVolume] = useState(0.5);  

  const keyboardRef = useRef(null);


  // Toggle on/off state and update all pads
  const toggle = useCallback(()=>
  {
    setPads( prev => prev.map(pad =>({...pad, on:!pad.on})));
    setIsOn(prev => !prev)
  },[]);

  const playAudio = useCallback((event)=>
  {
    let key ;
    if(event.key!== undefined)
    {
      // if event is from keyboard
      key = event.key.toUpperCase();
      if(!["Q","W","E","A","S","D","Z","X","C","O"].includes(key))
        return;    
  
      if(key === "O")
      {
        toggle();
        return;
      }        
    }else
    {
      //if the event is from a button click
      key = event.id;
    }
          
    const pad = pads.find( p => p.id === key)
    if(!pad) return;

    setCurrentElement(pad.name);
       
    const audioElement = document.getElementById(`${pad.id}`);            
    if (audioElement && pad.on) {
        audioElement.volume = volume; 
        audioElement.play().catch(console.error);
    } 

    // Trigger visual feedback
      setPads((prev) =>
        prev.map(p => p.id === key
            ? { ...p, isClicked: true }
            : { ...p, isClicked: false }
        )
      );

      setTimeout(() => {
        setPads((prev) =>
          prev.map((p) => ({ ...p, isClicked: false }))
        );
      }, 500);

  },[pads, volume, toggle]);

  useEffect(() => {
    if (keyboardRef.current)
    {
      keyboardRef.current.focus();
    }
  }, []);

  return (
    
      <div id="drum-machine" tabIndex="0" ref={keyboardRef} onKeyDown={playAudio}> 
      <div className="controls">
            <button className="btn-control" onClick={toggle} style={{opacity: isOn ? "1":"0.3"}}>{isOn ? "On" : "Off"}</button>
            <input className="volume-control" type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
          </div>
          <div id="display"> {currentElement} </div>
          <div className="drum-pads" style={{opacity: isOn ? "1":"0.6"}}  >
            {pads.map(pad => (
               <Pad 
               key={pad.id} 
               pad={pad} 
               playAudio={playAudio}
              />
            ))}
          </div>  
         <div>

         </div>
      </div>
    
  )
}

export default App
