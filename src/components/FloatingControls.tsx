import {Droplets,Layers,Minus,Plus,Scan} from 'lucide-react';
import type {Year} from '../types';

const years:Year[]=[2005,2010,2015,2020,2025];

export function FloatingControls({year,setYear,unit,setUnit,leaks,setLeaks,receipt,setReceipt,zoomIn,zoomOut,fit}:{year:Year;setYear:(x:Year)=>void;unit:'pound'|'bn';setUnit:(x:'pound'|'bn')=>void;leaks:boolean;setLeaks:(x:boolean)=>void;receipt:boolean;setReceipt:(x:boolean)=>void;zoomIn:()=>void;zoomOut:()=>void;fit:()=>void}){
  return <>
    <div className="canvas-tools" aria-label="Wall layers">
      <label className="timeline-control">
        <span>TIME</span>
        <input aria-label="Demo year timeline" type="range" min="0" max="4" step="1" value={years.indexOf(year)} onChange={e=>setYear(years[Number(e.target.value)])}/>
        <b>{year}</b>
      </label>
      <div className="timeline-ticks" aria-label="Demo years">{years.map(item=><button key={item} aria-label={`Year ${item}`} className={year===item?'active':''} onClick={()=>setYear(item)}>{String(item).slice(2)}</button>)}</div>
      <div className="compact-units"><button className={unit==='pound'?'active':''} onClick={()=>setUnit('pound')}>EVERY £1</button><button className={unit==='bn'?'active':''} onClick={()=>setUnit('bn')}>£bn</button></div>
      <button aria-pressed={leaks} className={leaks?'active warning':''} onClick={()=>setLeaks(!leaks)}><Droplets/>Leaks & drags</button>
      <button aria-pressed={receipt} className={receipt?'active':''} onClick={()=>setReceipt(!receipt)}><Layers/>Contribution</button>
    </div>
    <div className="zoom-tools"><button onClick={zoomIn} aria-label="Zoom in"><Plus/></button><button onClick={zoomOut} aria-label="Zoom out"><Minus/></button><button onClick={fit} aria-label="Fit Britain"><Scan/><span>Fit Britain</span></button></div>
  </>;
}
