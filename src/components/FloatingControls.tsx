import {useState} from 'react';
import {Droplets,Layers,Minus,Plus,Scan,SlidersHorizontal} from 'lucide-react';
import type {Year} from '../types';
import {dataMode} from '../data';
import {displayPeriod,realYears,type RealYear} from '../data/real/adapter';

const years:Year[]=[2005,2010,2015,2020,2025];

export function FloatingControls({year,setYear,unit,setUnit,leaks,setLeaks,receipt,setReceipt,zoomIn,zoomOut,fit,playing,setPlaying,showFiveYear,setShowFiveYear}:{year:Year;setYear:(x:Year)=>void;unit:'hundred'|'bn';setUnit:(x:'hundred'|'bn')=>void;leaks:boolean;setLeaks:(x:boolean)=>void;receipt:boolean;setReceipt:(x:boolean)=>void;zoomIn:()=>void;zoomOut:()=>void;fit:()=>void;playing:boolean;setPlaying:(x:boolean)=>void;showFiveYear:boolean;setShowFiveYear:(x:boolean)=>void}){
  const[details,setDetails]=useState(false);
  return <>
    <div className={`canvas-tools ${details?'details-open':''}`} aria-label="Wall controls">
      {dataMode==='demo'?<><label className="timeline-control">
        <span>TIME</span>
        <input aria-label="Demo year timeline" type="range" min="0" max="4" step="1" value={years.indexOf(year)} onChange={e=>setYear(years[Number(e.target.value)])}/>
        <b>{year}</b>
      </label><div className="timeline-ticks secondary-control" aria-label="Demo years">{years.map(item=><button key={item} aria-label={`Year ${item}`} className={year===item?'active':''} onClick={()=>setYear(item)}>{String(item).slice(2)}</button>)}</div></>:<><label className="timeline-control real-timeline"><span>OUTTURN</span><input aria-label="Fiscal period timeline" type="range" min="0" max="4" step="1" value={realYears.indexOf(year as RealYear)} onChange={e=>setYear(realYears[Number(e.target.value)])}/><b>{displayPeriod(year)}</b></label><div className="timeline-ticks real-ticks secondary-control" aria-label="Available fiscal periods">{realYears.map(item=><button key={item} aria-label={`Select fiscal period ${displayPeriod(item)}`} aria-pressed={year===item} className={year===item?'active':''} onClick={()=>setYear(item)}>{displayPeriod(item).slice(2)}</button>)}</div><button className={`secondary-control ${playing?'active':''}`} aria-pressed={playing} onClick={()=>setPlaying(!playing)}>{playing?'PAUSE':'PLAY 5 YEARS'}</button><button className={`secondary-control ${showFiveYear?'active':''}`} aria-pressed={showFiveYear} onClick={()=>setShowFiveYear(!showFiveYear)}>5-YEAR CHANGE</button></>}
      <div className="compact-units"><button className={unit==='hundred'?'active':''} onClick={()=>setUnit('hundred')}>EVERY £100</button><button className={unit==='bn'?'active':''} onClick={()=>setUnit('bn')}>£ BILLIONS</button></div>
      <button className="details-toggle" aria-expanded={details} onClick={()=>setDetails(!details)}><SlidersHorizontal/>Details</button>
      <button aria-pressed={leaks} className={`secondary-control ${leaks?'active warning':''}`} onClick={()=>setLeaks(!leaks)}><Droplets/>Leaks & drags</button>
      <button aria-pressed={receipt} className={`secondary-control ${receipt?'active':''}`} onClick={()=>setReceipt(!receipt)}><Layers/>Contribution</button>
    </div>
    <div className="zoom-tools"><button onClick={zoomIn} aria-label="Zoom in"><Plus/></button><button onClick={zoomOut} aria-label="Zoom out"><Minus/></button><button onClick={fit} aria-label="Fit Britain"><Scan/><span>Fit Britain</span></button></div>
  </>;
}
