import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowDownRight,Info,LocateFixed} from 'lucide-react';
import {canvasNodes,focusTargets,STATE_POINT,WORLD,type CanvasNode,type Point} from '../canvas/layout';
import {useCamera} from '../canvas/useCamera';
import {demoData,formatValue,totalFunding} from '../data';
import {attentionByYear,previousYear} from '../data/story';
import {compositionByParent} from '../data/composition';
import type {Year} from '../types';
import {Icon} from './Icon';
import {FloatingControls} from './FloatingControls';

type Props={year:Year;setYear:(x:Year)=>void;unit:'hundred'|'bn';setUnit:(x:'hundred'|'bn')=>void;leaks:boolean;setLeaks:(x:boolean)=>void;receipt:boolean;setReceipt:(x:boolean)=>void;openEvidence:(id:string)=>void};

const curve=(a:Point,b:Point)=>`M ${a.x} ${a.y} C ${a.x+(b.x-a.x)*.42} ${a.y}, ${a.x+(b.x-a.x)*.58} ${b.y}, ${b.x} ${b.y}`;
const maxFunding=(year:Year)=>Math.max(...demoData.funding.map(x=>x.values[year]));
const maxDomain=(year:Year)=>Math.max(...demoData.domains.map(x=>x.values[year]));
const fundingWidth=(value:number,year:Year)=>12+Math.sqrt(value/maxFunding(year))*96;
const domainWidth=(value:number,year:Year)=>10+Math.sqrt(value/maxDomain(year))*86;
const fundingDiameter=(value:number,year:Year)=>90+Math.sqrt(value/maxFunding(year))*300;
const domainDiameter=(value:number,year:Year)=>80+Math.sqrt(value/maxDomain(year))*290;
const nodeById=(id:string)=>canvasNodes.find(x=>x.id===id)!;
const rankFor=(node:CanvasNode,year:Year)=>{
  const collection=node.kind==='funding'?demoData.funding:node.kind==='domain'?demoData.domains:null;
  if(!collection)return undefined;
  return [...collection].sort((a,b)=>b.values[year]-a.values[year]).findIndex(x=>x.id===node.id)+1;
};

const outcomeLinks:Record<string,string[]>={
  healthy:['health'],prosperity:['pensions','welfare','transport','housing'],safe:['defence','justice'],
  skilled:['education'],effective:['local','admin','interest','other'],
};

const guideSteps=[
  {title:'Start here: who funds Britain',body:'Receipts raised now flow in from households, businesses, spending and capital.',point:{x:650,y:260}},
  {title:'Borrowing enters differently',body:'The violet dashed stream is money pulled forward, creating debt rather than a receipt raised now.',point:{x:2200,y:155}},
  {title:'Money converges here',body:'Treasury is shown as one illustrative pool before every £100 is divided.',point:STATE_POINT},
  {title:'Follow where every £100 goes',body:'Ribbon width and district size reveal the biggest spending priorities.',point:{x:1570,y:1120}},
  {title:'What did Britain get back?',body:'The outcome horizon shows direction; red branches below show losses and committed drags.',point:{x:2860,y:890}},
];

export function SystemCanvas(p:Props){
  const viewport=useRef<HTMLDivElement>(null);
  const {camera,setCamera,zoomAt,handlers}=useCamera({x:0,y:0,scale:.46});
  const [selected,setSelected]=useState<string|null>(null);
  const [guideStep,setGuideStep]=useState<number|null>(0);
  const [changeFrom,setChangeFrom]=useState<Year|null>(null);
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

  const visible=(n:CanvasNode)=>n.kind==='component'?(selected?related.has(n.id):level>=1):n.kind==='operation'?(selected?selected==='hospitals':level>=2):true;
  const focusNode=(n:CanvasNode,scale=.78)=>{const v=viewport.current;if(!v)return;setCamera({x:v.clientWidth/2-n.point.x*scale,y:v.clientHeight/2-n.point.y*scale,scale})};
  const select=(n:CanvasNode)=>{setGuideStep(null);setSelected(n.id);if(n.id==='health')frame('health');else if(n.id==='hospitals')frame('hospitals');else if(compositionByParent[n.id])focusNode(n)};
  const value=(n:CanvasNode)=>{
    const f=demoData.funding.find(x=>x.id===n.id);const d=demoData.domains.find(x=>x.id===n.id);
    return f?formatValue(f.values[p.year],total,p.unit):d?formatValue(d.values[p.year],total,p.unit):'';
  };
  const changeYear=(next:Year)=>{if(next!==p.year){setChangeFrom(p.year);p.setYear(next)}};

  return <main className="wall-shell">
    <WallChrome level={level} frame={frame}/>
    <div ref={viewport} className="wall-camera" {...handlers} onClick={e=>{if(!(e.target as HTMLElement).closest('button'))setSelected(null)}} aria-label="Pannable and zoomable map of Britain's public value system">
      <div className={`wall-world level-${level} ${changeFrom?'time-changing':''}`} style={{width:WORLD.width,height:WORLD.height,transform:`translate(${camera.x}px,${camera.y}px) scale(${camera.scale})`}}>
        <WorldRegions/>
        {guideStep!==null&&<div className="story-spotlight" style={{left:guideSteps[guideStep].point.x,top:guideSteps[guideStep].point.y}}/>}
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
        {canvasNodes.filter(visible).map(n=><WallNode key={n.id} node={n} size={n.kind==='funding'?fundingDiameter(demoData.funding.find(x=>x.id===n.id)!.values[p.year],p.year):n.kind==='domain'?domainDiameter(demoData.domains.find(x=>x.id===n.id)!.values[p.year],p.year):n.size} rank={rankFor(n,p.year)} value={value(n)} year={p.year} level={level} selected={selected===n.id} faded={!!selected&&!related.has(n.id)&&selected!==n.id} onSelect={()=>select(n)} onEvidence={()=>n.evidenceId&&p.openEvidence(n.evidenceId)}/>) }
        {selected&&compositionByParent[selected]&&camera.scale>=.62&&<CompositionOrbit parentId={selected} year={p.year} unit={p.unit} total={total}/>}
        {p.leaks&&<LeakLabels year={p.year} unit={p.unit} total={total} open={p.openEvidence}/>} 
        <AttentionLayer year={p.year} level={level}/>
        {changeFrom&&<ChangeAnnotations from={changeFrom} to={p.year}/>
        }{selected==='health'&&level>=1&&<HealthStoryChain year={p.year} total={total}/>}
        {p.receipt&&<ContributionLayer/>}
        {level>=3&&selected&&<MetricField selected={selected} open={p.openEvidence}/>} 
      </div>
    </div>
    {guideStep!==null&&<FirstLookGuide step={guideStep} next={()=>guideStep===guideSteps.length-1?setGuideStep(null):setGuideStep(guideStep+1)} skip={()=>setGuideStep(null)}/>}
    <FloatingControls {...p} setYear={changeYear} zoomIn={()=>zoomAt(1.25,viewport.current!.clientWidth/2,viewport.current!.clientHeight/2)} zoomOut={()=>zoomAt(.8,viewport.current!.clientWidth/2,viewport.current!.clientHeight/2)} fit={()=>frame('britain')}/>
    <WallMinimap camera={camera}/>
    <div className="level-readout"><LocateFixed/> {level===0?'BRITAIN':level===1?'BRITAIN / HEALTH':level===2?'BRITAIN / HEALTH / HOSPITALS':'EVIDENCE DEPTH'}</div>
    {selected&&<Inspector id={selected} level={level} year={p.year} total={total} open={p.openEvidence} clear={()=>setSelected(null)}/>}
  </main>;
}

function MoneyFlow({id,d,width,tone,faded,hidden=false}:{id:string;d:string;width:number;tone:string;faded:boolean;hidden?:boolean}){const cls=`money-flow ${tone} ${faded?'faded':''} ${hidden?'hidden':''}`;return <g className={cls} data-flow={id}><path className="flow-bed" d={d} strokeWidth={width+18}/><path className="flow-body" d={d} strokeWidth={width}/><path className="flow-current" d={d} strokeWidth={Math.max(3,width*.08)}/></g>}

function WallNode({node,size,rank,value,year,level,selected,faded,onSelect,onEvidence}:{node:CanvasNode;size:number;rank?:number;value:string;year:Year;level:number;selected:boolean;faded:boolean;onSelect:()=>void;onEvidence:()=>void}){
  const outcome=demoData.outcomes.find(x=>x.id===node.id);const status=outcome?.status[year];
  const prior=previousYear(year);
  const linkedSpend=outcome?outcomeLinks[outcome.id].reduce((sum,id)=>sum+(demoData.domains.find(d=>d.id===id)?.values[year]??0),0):0;
  const priorSpend=outcome&&prior?outcomeLinks[outcome.id].reduce((sum,id)=>sum+(demoData.domains.find(d=>d.id===id)?.values[prior]??0),0):0;
  const spendDirection=priorSpend?Math.round((linkedSpend-priorSpend)/priorSpend*100):0;
  const total=totalFunding(demoData,year);
  const stateValue=total>=1000?`£${(total/1000).toFixed(2)}tn`:`£${total}bn`;
  return <button style={{left:node.point.x,top:node.point.y,'--node-size':`${size}px`,'--node-colour':node.colour??'#d7ded8'} as React.CSSProperties} className={`wall-node ${node.id} ${node.kind} ${status??''} ${selected?'selected':''} ${faded?'faded':''} ${node.id==='borrowing'?'borrowing':''}`} onClick={onSelect} onDoubleClick={onEvidence} aria-label={`${node.label}${value?` ${value}`:''}`}>
    <span className="status-field"/>
    {node.kind==='state'&&<span className="allocation-ring"><b>£100</b><small>ONE NATIONAL POOL</small></span>}
    <span className="node-orb"><Icon name={node.icon} size={node.kind==='state'?72:node.kind==='domain'?42:34}/></span>
    {rank&&rank<=3&&<span className="rank-badge">#{rank} {node.kind==='funding'?'SOURCE CATEGORY':'DESTINATION'}</span>}
    <span className="wall-label">
      <strong>{node.kind==='state'?'PUBLIC MONEY':node.label}</strong>
      {node.kind==='state'?<><b>{stateValue}</b><em>EVERY £100 RAISED OR BORROWED</em></>:value?<><b>{value}</b>{node.kind==='domain'&&<em>OF EVERY £100</em>}</>:null}
      {outcome&&<><b className="outcome-direction">{status==='improving'?'↗':status==='mixed'?'→':'↘'} {status}</b><em>{outcome.attribution}</em></>}
      {outcome&&prior&&<span className="spend-outcome-pair"><i>RELATED SPEND</i><b>{spendDirection>=0?'↑':'↓'} {Math.abs(spendDirection)}%</b><small>OUTCOME {status==='improving'?'↑':status==='mixed'?'→':'↓'}</small></span>}
      {node.id==='borrowing'&&<em>ENTERS DIFFERENTLY</em>}
      {node.kind==='operation'&&level>=3&&<em>METRICS AVAILABLE</em>}
    </span>
    {node.id==='health'&&<span className="focus-callout">FLY INTO HEALTH ↘</span>}
  </button>;
}

function WorldRegions(){return <>
  <div className="outcome-horizon"/>
  <div className="region-title funding-title"><i>01</i> WHO FUNDS BRITAIN <small>RECEIPTS RAISED NOW</small></div>
  <div className="region-title state-title"><i>02</i> CONVERGES HERE</div>
  <div className="treasury-sentence">FOR EVERY £100 BRITAIN RAISES OR BORROWS, THIS IS WHERE IT GOES.</div>
  <div className="region-title spending-title"><i>03</i> WHERE EVERY £100 GOES</div>
  <div className="region-title outcome-title"><i>04</i> THIS IS WHAT BRITAIN GOT BACK <small>SPEND TREND ≠ PROOF OF CAUSE</small></div>
  <div className="contour contour-a"/><div className="contour contour-b"/><div className="contour contour-c"/>
</>}

function WallChrome({level,frame}:{level:number;frame:(id:'britain'|'health'|'hospitals')=>void}){return <><div className="wall-brand"><span>BRITAIN</span><b>ON THE WALL</b><small>DEMO / ILLUSTRATIVE DATA</small></div><div className="wall-crumbs"><button onClick={()=>frame('britain')}>Britain</button>{level>0&&<><i>/</i><button onClick={()=>frame('health')}>Health</button></>}{level>1&&<><i>/</i><button onClick={()=>frame('hospitals')}>Hospitals</button></>}</div></>}

const leakGeometry=[
  {id:'fraud',kind:'LOSS',from:{x:1440,y:1450},to:{x:1490,y:1650}},
  {id:'overruns',kind:'LOSS',from:{x:1810,y:1430},to:{x:2050,y:1690}},
  {id:'backlogs',kind:'LEAK',from:{x:900,y:1030},to:{x:1030,y:1640}},
  {id:'interest-drag',kind:'DRAG',from:{x:740,y:1360},to:{x:560,y:1650}},
];
function LeakFlows({year}:{year:Year}){return <>{leakGeometry.map(g=>{const item=demoData.leaks.find(x=>x.id===g.id)!;return <g className="leak-flow" key={g.id}><path className="leak-bed" d={curve(g.from,g.to)} strokeWidth={12+Math.sqrt(item.value[year])*4}/><path className="leak-current" d={curve(g.from,g.to)} strokeWidth={4}/></g>})}</>}
function LeakLabels({year,unit,total,open}:{year:Year;unit:'hundred'|'bn';total:number;open:(id:string)=>void}){return <>{leakGeometry.map(g=>{const x=demoData.leaks.find(l=>l.id===g.id)!;return <button className={`leak-label ${g.kind.toLowerCase()}`} key={g.id} style={{left:g.to.x,top:g.to.y}} onClick={()=>open(x.evidenceId)}><i>↓</i><span><em>{g.kind} · OCCURS HERE</em><strong>{x.name}</strong><b>{formatValue(x.value[year],total,unit)}</b></span></button>})}</>}

const orbitOffsets=[{x:-260,y:-220},{x:290,y:-175},{x:-280,y:230},{x:285,y:225}];
function CompositionOrbit({parentId,year,unit,total}:{parentId:string;year:Year;unit:'hundred'|'bn';total:number}){
  const parent=nodeById(parentId),items=compositionByParent[parentId];
  const isFunding=demoData.funding.some(x=>x.id===parentId);
  const centre={x:parent.point.x-125,y:parent.point.y};
  const parentValue=demoData.funding.find(x=>x.id===parentId)?.values[year]??demoData.domains.find(x=>x.id===parentId)!.values[year];
  return <div className="composition-orbit" aria-label={`${parent.label} illustrative composition`}>
    <div className="composition-territory" style={{left:centre.x,top:centre.y}}><span>{isFunding?'ILLUSTRATIVE COMPOSITION · RECEIPTS ASSOCIATED WITH':'ILLUSTRATIVE COMPOSITION · THIS ALLOCATION CONTAINS'}</span></div>
    {items.map((item,index)=>{const value=parentValue*item.share;const diameter=80+Math.sqrt(item.share)*125;const offset=orbitOffsets[index]??orbitOffsets[0];return <div className="composition-node" key={item.id} style={{left:centre.x+offset.x,top:centre.y+offset.y,'--composition-size':`${diameter}px`,'--composition-colour':parent.colour??'#8fd3da'} as React.CSSProperties}><span><Icon name={item.icon} size={28}/></span><strong>{item.label}</strong><b>{formatValue(value,total,unit)}</b><small>{Math.round(item.share*100)}% of this category</small></div>})}
  </div>;
}

function ContributionLayer(){return <div className="contribution-layer"><strong>CONTRIBUTION & RECEIPT</strong><div><span>Annual cash flow</span><span>Service use</span><span>Life course</span></div><p>Receipt is not exploitation. Fiscal position is not moral worth.</p></div>}

function MetricField({selected,open}:{selected:string;open:(x:string)=>void}){return <div className="metric-field"><span>ZOOM 3 · METRIC & EVIDENCE</span><div><button onClick={()=>open(selected==='hospitals'?'e-hospitals':'e-health')}><strong>Expenditure</strong><b>Inspect basis</b><Info/></button><button><strong>Activity</strong><b>Illustrative series ↗</b></button><button><strong>Unit cost</strong><b>Definition pending</b></button><button><strong>Waiting list</strong><b className="under-pressure">UNDER PRESSURE ↘</b></button></div></div>}

function AttentionLayer({year,level}:{year:Year;level:number}){if(level>0)return null;return <div className="attention-layer" aria-label="Illustrative attention markers">{attentionByYear[year].map(marker=>{const n=nodeById(marker.targetId);return <div key={marker.id} className={`attention-pin ${marker.tone}`} style={{left:n.point.x,top:n.point.y}}><i>!</i><span><small>DEMO ATTENTION</small>{marker.label}</span></div>})}</div>}

function HealthStoryChain({year,total}:{year:Year;total:number}){const health=demoData.domains.find(d=>d.id==='health')!;const status=demoData.outcomes.find(o=>o.id==='healthy')!.status[year];return <div className="health-story-chain" style={{top:1290}}><span>TRACE THE SYSTEM</span><strong>ALLOCATION <b>{formatValue(health.values[year],total,'hundred')} of every £100</b></strong><i>→</i><strong>DELIVERY <b>care systems</b></strong><i>→</i><strong>PEOPLE <b>patients & communities</b></strong><i>→</i><strong>OUTCOME <b>{status} {status==='improving'?'↗':status==='mixed'?'→':'↘'}</b></strong><small>Related context · not proof of causation</small></div>}

function ChangeAnnotations({from,to}:{from:Year;to:Year}){
  const fromTotal=totalFunding(demoData,from),toTotal=totalFunding(demoData,to);
  const share=(id:string,y:Year,total:number)=>Math.round((demoData.domains.find(d=>d.id===id)!.values[y]/total)*100);
  const health=share('health',to,toTotal)-share('health',from,fromTotal);
  const interest=share('interest',to,toTotal)-share('interest',from,fromTotal);
  const oldStatus=demoData.outcomes.find(o=>o.id==='healthy')!.status[from],newStatus=demoData.outcomes.find(o=>o.id==='healthy')!.status[to];
  const notes=[
    {point:nodeById('health').point,text:`Health ${health>=0?'gained':'lost'} £${Math.abs(health)} of every £100`},
    {point:nodeById('interest').point,text:`Debt-interest drag ${interest>=0?'rose':'fell'} £${Math.abs(interest)} of every £100`},
    {point:nodeById('healthy').point,text:`Healthy lives: ${oldStatus} → ${newStatus}`},
  ];
  return <div className="change-layer" aria-label={`Changes from ${from} to ${to}`}>{notes.map((n,i)=><div className="change-note" key={n.text} style={{left:n.point.x,top:n.point.y,animationDelay:`${i*.16}s`}}><small>{from} → {to}</small><strong>{n.text}</strong></div>)}</div>;
}

function FirstLookGuide({step,next,skip}:{step:number;next:()=>void;skip:()=>void}){const item=guideSteps[step];return <aside className="first-look" aria-label="First look guide"><span>{step+1} / {guideSteps.length}</span><strong>{item.title}</strong><p>{item.body}</p><div><button onClick={skip}>Skip</button><button onClick={next}>{step===guideSteps.length-1?'Explore':'Next'}</button></div></aside>}

function Inspector({id,level,year,total,open,clear}:{id:string;level:number;year:Year;total:number;open:(id:string)=>void;clear:()=>void}){
  const n=nodeById(id);const domain=demoData.domains.find(d=>d.id===id);const outcome=demoData.outcomes.find(o=>o.id===id);const healthOutcome=demoData.outcomes.find(o=>o.id==='healthy')!;
  const explanation=n.kind==='funding'?(n.id==='borrowing'?'Borrowing is money pulled forward and debt created, not a receipt raised now.':'This receipt is raised now and joins the illustrative public-money pool before allocation.'):
    n.id==='state'?'All receipts and borrowing are shown here as one illustrative funding pool before allocation.':
    n.id==='health'?`Britain allocates ${formatValue(domain!.values[year],total,'hundred')} of every £100 here. Spending rises over the demo period while the selected healthy-lives outcome is ${healthOutcome.status[year]}; this pairing does not prove causation.`:
    n.id==='hospitals'?'Hospitals converts part of the Health allocation into elective and emergency care for patients. Zoom closer to trace its operating system.':
    outcome?`This indicator is ${outcome.status[year]}. It shows direction in the selected illustrative measure and does not prove what caused the change.`:
    'Connected territory remains bright; the rest of Britain stays visible for orientation.';
  return <aside className="wall-inspector"><button className="inspector-close" onClick={clear}>×</button><span>EXPLAIN THIS · LEVEL {level}</span><h2>{n.label}</h2><p>{explanation}</p>{n.evidenceId&&<button className="inspect-evidence" onClick={()=>open(n.evidenceId!)}>Inspect evidence <Info/></button>}</aside>;
}

function WallMinimap({camera}:{camera:{x:number;y:number;scale:number}}){return <div className="wall-minimap"><span>WHOLE WALL</span><div><i className="mini-funding"/><i className="mini-state"/><i className="mini-spending"/><i className="mini-outcomes"/><b style={{left:`${Math.max(0,Math.min(82,-camera.x/camera.scale/WORLD.width*100))}%`,top:`${Math.max(0,Math.min(72,-camera.y/camera.scale/WORLD.height*100))}%`,width:`${Math.min(72,100/camera.scale*.22)}%`}}/></div></div>}
