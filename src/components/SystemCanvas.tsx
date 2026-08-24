import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowDownRight,Info,LocateFixed,MousePointer2} from 'lucide-react';
import {canvasNodes,focusTargets,STATE_POINT,WORLD,type CanvasNode,type Point} from '../canvas/layout';
import {useCamera} from '../canvas/useCamera';
import {demoData,formatValue,totalFunding} from '../data';
import type {Year} from '../types';
import {Icon} from './Icon';
import {FloatingControls} from './FloatingControls';

type Props={year:Year;setYear:(x:Year)=>void;unit:'pound'|'bn';setUnit:(x:'pound'|'bn')=>void;leaks:boolean;setLeaks:(x:boolean)=>void;receipt:boolean;setReceipt:(x:boolean)=>void;openEvidence:(id:string)=>void};

const curve=(a:Point,b:Point)=>`M ${a.x} ${a.y} C ${a.x+(b.x-a.x)*.42} ${a.y}, ${a.x+(b.x-a.x)*.58} ${b.y}, ${b.x} ${b.y}`;
const maxFunding=(year:Year)=>Math.max(...demoData.funding.map(x=>x.values[year]));
const maxDomain=(year:Year)=>Math.max(...demoData.domains.map(x=>x.values[year]));
const fundingWidth=(value:number,year:Year)=>12+Math.sqrt(value/maxFunding(year))*96;
const domainWidth=(value:number,year:Year)=>10+Math.sqrt(value/maxDomain(year))*86;
const nodeById=(id:string)=>canvasNodes.find(x=>x.id===id)!;

const outcomeLinks:Record<string,string[]>={
  healthy:['health'],prosperity:['pensions','welfare','transport','housing'],safe:['defence','justice'],
  skilled:['education'],effective:['local','admin','interest','other'],
};

export function SystemCanvas(p:Props){
  const viewport=useRef<HTMLDivElement>(null);
  const {camera,setCamera,zoomAt,handlers}=useCamera({x:0,y:0,scale:.46});
  const [selected,setSelected]=useState<string|null>(null);
  const [hint,setHint]=useState(true);
  const total=totalFunding(demoData,p.year);
  const level=camera.scale<.72?0:camera.scale<1.24?1:camera.scale<1.85?2:3;

  const frame=(id:'britain'|'health'|'hospitals')=>{
    const v=viewport.current;if(!v)return;
    const target=focusTargets[id];
    const fit=Math.min((v.clientWidth-104)/WORLD.width,(v.clientHeight-92)/WORLD.height,.56);
    // The national view is intentionally height-led on desktop: the Wall fills the
    // viewport and its outer districts sit just beyond the edge, inviting a pan.
    const nationalScale=v.clientWidth<700?Math.max(.34,fit):Math.min((v.clientHeight-92)/WORLD.height,.56);
    const scale=id==='britain'?nationalScale:target.scale;
    setCamera({x:v.clientWidth/2-target.x*scale,y:v.clientHeight/2-target.y*scale,scale});
    setSelected(id==='britain'?null:id);
  };

  useEffect(()=>{
    frame('britain');
    const reframe=()=>frame('britain');
    window.addEventListener('resize',reframe);
    return()=>window.removeEventListener('resize',reframe);
  },[]);

  useEffect(()=>{
    const stepBack=(event:KeyboardEvent)=>{
      if(event.key!=='Escape'&&event.key!=='Backspace')return;
      const target=event.target as HTMLElement|null;
      if(target?.matches('input, textarea, [contenteditable="true"]'))return;
      if(event.key==='Backspace')event.preventDefault();
      if(level>=2)frame('health');
      else if(level>=1)frame('britain');
      else setSelected(null);
    };
    window.addEventListener('keydown',stepBack);
    return()=>window.removeEventListener('keydown',stepBack);
  },[level]);

  const related=useMemo(()=>{
    if(!selected)return new Set<string>();
    const healthIds=['state','health','healthy',...demoData.healthComponents.map(x=>x.id),...canvasNodes.filter(x=>x.kind==='operation').map(x=>x.id)];
    if(healthIds.includes(selected))return new Set(healthIds);
    if(demoData.funding.some(x=>x.id===selected))return new Set([selected,'state',...demoData.domains.map(x=>x.id)]);
    const outcome=Object.entries(outcomeLinks).find(([id,domains])=>id===selected||domains.includes(selected));
    return new Set(outcome?[selected,'state',outcome[0],...outcome[1]]:[selected,'state']);
  },[selected]);

  const visible=(n:CanvasNode)=>n.kind==='component'?(level>=1||related.has(n.id)):n.kind==='operation'?(level>=2||selected==='hospitals'):true;
  const select=(n:CanvasNode)=>{setHint(false);setSelected(n.id);if(n.id==='health')frame('health');if(n.id==='hospitals')frame('hospitals')};
  const value=(n:CanvasNode)=>{
    const f=demoData.funding.find(x=>x.id===n.id);const d=demoData.domains.find(x=>x.id===n.id);
    return f?formatValue(f.values[p.year],total,p.unit):d?formatValue(d.values[p.year],total,p.unit):'';
  };

  return <main className="wall-shell">
    <WallChrome level={level} frame={frame}/>
    <div ref={viewport} className="wall-camera" {...handlers} onClick={e=>{if(!(e.target as HTMLElement).closest('button'))setSelected(null)}} aria-label="Pannable and zoomable map of Britain's public value system">
      <div className="wall-world" style={{width:WORLD.width,height:WORLD.height,transform:`translate(${camera.x}px,${camera.y}px) scale(${camera.scale})`}}>
        <WorldRegions/>
        <svg className="flow-layer" width={WORLD.width} height={WORLD.height} aria-hidden="true">
          <defs>
            <filter id="moneyGlow"><feGaussianBlur stdDeviation="12"/></filter>
            <linearGradient id="fundingGradient" x1="0" x2="1"><stop stopColor="#4b9aaa"/><stop offset="1" stopColor="#a8e3e8"/></linearGradient>
            <linearGradient id="allocationGradient" x1="0" x2="1"><stop stopColor="#f1ecd9"/><stop offset="1" stopColor="#6b9ba1"/></linearGradient>
          </defs>
          {demoData.funding.map(n=><MoneyFlow key={n.id} id={n.id} d={curve(nodeById(n.id).point,STATE_POINT)} width={fundingWidth(n.values[p.year],p.year)} tone={n.borrowing?'borrow':'funding'} faded={!!selected&&!related.has(n.id)}/>) }
          {demoData.domains.map(n=><MoneyFlow key={n.id} id={n.id} d={curve(STATE_POINT,nodeById(n.id).point)} width={domainWidth(n.values[p.year],p.year)} tone="allocation" faded={!!selected&&!related.has(n.id)}/>) }
          {Object.entries(outcomeLinks).flatMap(([outcome,domains])=>domains.map(id=><path key={`${id}-${outcome}`} className={`return-thread ${selected&&!related.has(id)?'faded':''}`} d={curve(nodeById(id).point,nodeById(outcome).point)}/>))}
          {demoData.healthComponents.map(n=><MoneyFlow key={n.id} id={n.id} d={curve(nodeById('health').point,nodeById(n.id).point)} width={10+n.share*70} tone="health" faded={false} hidden={level<1}/>) }
          {canvasNodes.filter(n=>n.kind==='operation').map(n=><MoneyFlow key={n.id} id={n.id} d={curve(nodeById('hospitals').point,n.point)} width={14} tone="operation" faded={false} hidden={level<2}/>) }
          {p.leaks&&<LeakFlows year={p.year}/>} 
        </svg>
        {canvasNodes.filter(visible).map(n=><WallNode key={n.id} node={n} value={value(n)} year={p.year} level={level} selected={selected===n.id} faded={!!selected&&!related.has(n.id)&&selected!==n.id} onSelect={()=>select(n)} onEvidence={()=>n.evidenceId&&p.openEvidence(n.evidenceId)}/>) }
        {p.leaks&&<LeakLabels year={p.year} unit={p.unit} total={total} open={p.openEvidence}/>} 
        {p.receipt&&<ContributionLayer/>}
        {level>=3&&selected&&<MetricField selected={selected} open={p.openEvidence}/>} 
      </div>
    </div>
    {hint&&<div className="explore-hint"><MousePointer2/><span><strong>THIS IS BRITAIN.</strong> Drag the wall. Zoom into what matters.</span><button onClick={()=>setHint(false)}>Got it</button></div>}
    <FloatingControls {...p} zoomIn={()=>zoomAt(1.25,viewport.current!.clientWidth/2,viewport.current!.clientHeight/2)} zoomOut={()=>zoomAt(.8,viewport.current!.clientWidth/2,viewport.current!.clientHeight/2)} fit={()=>frame('britain')}/>
    <WallMinimap camera={camera}/>
    <div className="level-readout"><LocateFixed/> {level===0?'BRITAIN':level===1?'BRITAIN / HEALTH':level===2?'BRITAIN / HEALTH / HOSPITALS':'EVIDENCE DEPTH'}</div>
    {selected&&<Inspector id={selected} level={level} open={p.openEvidence} clear={()=>setSelected(null)}/>} 
  </main>;
}

function MoneyFlow({id,d,width,tone,faded,hidden=false}:{id:string;d:string;width:number;tone:string;faded:boolean;hidden?:boolean}){const cls=`money-flow ${tone} ${faded?'faded':''} ${hidden?'hidden':''}`;return <g className={cls} data-flow={id}><path className="flow-bed" d={d} strokeWidth={width+18}/><path className="flow-body" d={d} strokeWidth={width}/><path className="flow-current" d={d} strokeWidth={Math.max(3,width*.08)}/></g>}

function WallNode({node,value,year,level,selected,faded,onSelect,onEvidence}:{node:CanvasNode;value:string;year:Year;level:number;selected:boolean;faded:boolean;onSelect:()=>void;onEvidence:()=>void}){
  const outcome=demoData.outcomes.find(x=>x.id===node.id);const status=outcome?.status[year];
  const total=totalFunding(demoData,year);
  const stateValue=total>=1000?`£${(total/1000).toFixed(2)}tn`:`£${total}bn`;
  return <button style={{left:node.point.x,top:node.point.y,'--node-size':`${node.size}px`,'--node-colour':node.colour??'#d7ded8'} as React.CSSProperties} className={`wall-node ${node.id} ${node.kind} ${status??''} ${selected?'selected':''} ${faded?'faded':''} ${node.id==='borrowing'?'borrowing':''}`} onClick={onSelect} onDoubleClick={onEvidence} aria-label={`${node.label}${value?` ${value}`:''}`}>
    <span className="status-field"/>
    <span className="node-orb"><Icon name={node.icon} size={node.kind==='state'?72:node.kind==='domain'?42:34}/></span>
    <span className="wall-label">
      <strong>{node.kind==='state'?'PUBLIC MONEY':node.label}</strong>
      {node.kind==='state'?<><b>{stateValue}</b><em>100p in every £1</em></>:value?<b>{value}</b>:null}
      {outcome&&<><b className="outcome-direction">{status==='improving'?'↗':status==='mixed'?'→':'↘'} {status}</b><em>{outcome.attribution}</em></>}
      {node.id==='borrowing'&&<em>ENTERS DIFFERENTLY</em>}
      {node.kind==='operation'&&level>=3&&<em>METRICS AVAILABLE</em>}
    </span>
    {node.id==='health'&&<span className="focus-callout">FLY INTO HEALTH ↘</span>}
  </button>;
}

function WorldRegions(){return <>
  <div className="region-title funding-title">WHO FUNDS BRITAIN</div>
  <div className="region-title state-title">CONVERGES HERE</div>
  <div className="region-title spending-title">WHERE PUBLIC MONEY GOES</div>
  <div className="region-title outcome-title">WHAT BRITAIN GETS BACK</div>
  <div className="contour contour-a"/><div className="contour contour-b"/><div className="contour contour-c"/>
</>}

function WallChrome({level,frame}:{level:number;frame:(id:'britain'|'health'|'hospitals')=>void}){return <><div className="wall-brand"><span>BRITAIN</span><b>ON THE WALL</b><small>DEMO / ILLUSTRATIVE DATA</small></div><div className="wall-crumbs"><button onClick={()=>frame('britain')}>Britain</button>{level>0&&<><i>/</i><button onClick={()=>frame('health')}>Health</button></>}{level>1&&<><i>/</i><button onClick={()=>frame('hospitals')}>Hospitals</button></>}</div></>}

const leakGeometry=[
  {id:'fraud',from:{x:1530,y:650},to:{x:1490,y:1650}},
  {id:'overruns',from:{x:1810,y:1430},to:{x:2050,y:1690}},
  {id:'backlogs',from:{x:900,y:1030},to:{x:1030,y:1640}},
  {id:'interest-drag',from:{x:740,y:1360},to:{x:560,y:1650}},
];
function LeakFlows({year}:{year:Year}){return <>{leakGeometry.map(g=>{const item=demoData.leaks.find(x=>x.id===g.id)!;return <g className="leak-flow" key={g.id}><path className="leak-bed" d={curve(g.from,g.to)} strokeWidth={12+Math.sqrt(item.value[year])*4}/><path className="leak-current" d={curve(g.from,g.to)} strokeWidth={4}/></g>})}</>}
function LeakLabels({year,unit,total,open}:{year:Year;unit:'pound'|'bn';total:number;open:(id:string)=>void}){return <>{leakGeometry.map(g=>{const x=demoData.leaks.find(l=>l.id===g.id)!;return <button className="leak-label" key={g.id} style={{left:g.to.x,top:g.to.y}} onClick={()=>open(x.evidenceId)}><i>↓</i><span><strong>{x.name}</strong><b>{formatValue(x.value[year],total,unit)}</b></span></button>})}</>}

function ContributionLayer(){return <div className="contribution-layer"><strong>CONTRIBUTION & RECEIPT</strong><div><span>Annual cash flow</span><span>Service use</span><span>Life course</span></div><p>Receipt is not exploitation. Fiscal position is not moral worth.</p></div>}

function MetricField({selected,open}:{selected:string;open:(x:string)=>void}){return <div className="metric-field"><span>ZOOM 3 · METRIC & EVIDENCE</span><div><button onClick={()=>open(selected==='hospitals'?'e-hospitals':'e-health')}><strong>Expenditure</strong><b>Inspect basis</b><Info/></button><button><strong>Activity</strong><b>Illustrative series ↗</b></button><button><strong>Unit cost</strong><b>Definition pending</b></button><button><strong>Waiting list</strong><b className="under-pressure">UNDER PRESSURE ↘</b></button></div></div>}

function Inspector({id,level,open,clear}:{id:string;level:number;open:(id:string)=>void;clear:()=>void}){const n=nodeById(id);return <aside className="wall-inspector"><button className="inspector-close" onClick={clear}>×</button><span>SELECTED · LEVEL {level}</span><h2>{n.label}</h2><p>{n.kind==='funding'?'This stream joins the public-money pool before allocation. Follow its highlighted path into Treasury.':n.id==='health'?'Health stays inside the national territory while delivery systems emerge around it.':n.id==='hospitals'?'Hospitals opens into workforce, estates, procurement, diagnostics and care operations.':'Connected territory remains bright; the rest of Britain stays visible for orientation.'}</p>{n.evidenceId&&<button className="inspect-evidence" onClick={()=>open(n.evidenceId!)}>Inspect evidence <Info/></button>}</aside>}

function WallMinimap({camera}:{camera:{x:number;y:number;scale:number}}){return <div className="wall-minimap"><span>WHOLE WALL</span><div><i className="mini-funding"/><i className="mini-state"/><i className="mini-spending"/><i className="mini-outcomes"/><b style={{left:`${Math.max(0,Math.min(82,-camera.x/camera.scale/WORLD.width*100))}%`,top:`${Math.max(0,Math.min(72,-camera.y/camera.scale/WORLD.height*100))}%`,width:`${Math.min(72,100/camera.scale*.22)}%`}}/></div></div>}
