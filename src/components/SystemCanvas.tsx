import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowDownRight,Info,LocateFixed} from 'lucide-react';
import {canvasNodes,focusTargets,STATE_POINT,WORLD,type CanvasNode,type Point} from '../canvas/layout';
import {useCamera} from '../canvas/useCamera';
import {dataMode,wallData,formatValue,totalFunding} from '../data';
import {attentionByYear,previousYear} from '../data/story';
import {compositionByParent} from '../data/composition';
import type {Year} from '../types';
import {Icon} from './Icon';
import {FloatingControls} from './FloatingControls';
import {displayPeriod,realFundingComponentValues,realYears,type RealYear} from '../data/real/adapter';
import {historicalChanges,isRealYear,majorHistoricalChanges,periodLabel} from '../data/real/timeline';
import {healthComponentShare,healthComponentValue,healthMetrics,metricStatus} from '../data/real/health';

type Props={year:Year;setYear:(x:Year)=>void;unit:'hundred'|'bn';setUnit:(x:'hundred'|'bn')=>void;leaks:boolean;setLeaks:(x:boolean)=>void;receipt:boolean;setReceipt:(x:boolean)=>void;openEvidence:(id:string)=>void};

const curve=(a:Point,b:Point)=>`M ${a.x} ${a.y} C ${a.x+(b.x-a.x)*.42} ${a.y}, ${a.x+(b.x-a.x)*.58} ${b.y}, ${b.x} ${b.y}`;
const maxFunding=(year:Year)=>Math.max(...wallData.funding.map(x=>x.values[year]));
const maxDomain=(year:Year)=>Math.max(...wallData.domains.map(x=>x.values[year]));
const fundingWidth=(value:number,year:Year)=>12+Math.sqrt(value/maxFunding(year))*96;
const domainWidth=(value:number,year:Year)=>10+Math.sqrt(value/maxDomain(year))*86;
// Diameter is derived from square-root value so visible circle area carries
// magnitude. Capped ranges preserve authored national separation.
const fundingDiameter=(value:number,year:Year)=>80+Math.sqrt(value/maxFunding(year))*260;
const domainDiameter=(value:number,year:Year)=>75+Math.sqrt(value/maxDomain(year))*245;
const nodeById=(id:string)=>canvasNodes.find(x=>x.id===id)!;
const territoryIds=['income','business','consumer','health','pensions','welfare','education'];
const rankFor=(node:CanvasNode,year:Year)=>{
  const collection=node.kind==='funding'?wallData.funding:node.kind==='domain'?wallData.domains:null;
  if(!collection)return undefined;
  return [...collection].sort((a,b)=>b.values[year]-a.values[year]).findIndex(x=>x.id===node.id)+1;
};

const outcomeLinks:Record<string,string[]>={
  healthy:['health'],prosperity:['pensions','welfare','transport','housing'],safe:['defence','justice'],
  skilled:['education'],effective:['admin','interest','economy','environment','culture','technical'],
};

const guideSteps=[
  {title:'Start here: who funds Britain',body:'Receipts raised now flow in from households, businesses, spending and capital.',point:{x:650,y:260}},
  {title:'Borrowing enters differently',body:'The violet dashed stream is money pulled forward, creating debt rather than a receipt raised now.',point:{x:2200,y:155}},
  {title:'Money converges here',body:'Treasury is the 2025–26 public spending pool: receipts plus the borrowing required to reconcile to expenditure.',point:STATE_POINT},
  {title:'Follow where every £100 goes',body:'Ribbon width and district size reveal the biggest spending priorities.',point:{x:1570,y:1120}},
  {title:'What did Britain get back?',body:'The outcome horizon shows direction; red branches below show losses and committed drags.',point:{x:2860,y:890}},
];

export function SystemCanvas(p:Props){
  const viewport=useRef<HTMLDivElement>(null);
  const {camera,setCamera,zoomAt,handlers}=useCamera({x:0,y:0,scale:.46});
  const [selected,setSelected]=useState<string|null>(null);
  const [guideStep,setGuideStep]=useState<number|null>(0);
  const [changeFrom,setChangeFrom]=useState<Year|null>(null);
  const [playing,setPlaying]=useState(false);
  const [showFiveYear,setShowFiveYear]=useState(false);
  const total=totalFunding(wallData,p.year);
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

  useEffect(()=>{if(!playing||dataMode!=='real')return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const index=realYears.indexOf(p.year as RealYear);if(index===realYears.length-1){setPlaying(false);return}const timer=window.setTimeout(()=>changeYear(realYears[index+1]),reduced?150:1100);return()=>clearTimeout(timer)},[playing,p.year]);

  const related=useMemo(()=>{
    if(!selected)return new Set<string>();
    const healthIds=['state','health','healthy',...wallData.healthComponents.map(x=>x.id),...canvasNodes.filter(x=>x.kind==='operation').map(x=>x.id)];
    if(healthIds.includes(selected))return new Set(healthIds);
    if(wallData.funding.some(x=>x.id===selected))return new Set([selected,'state',...wallData.domains.map(x=>x.id)]);
    const outcome=Object.entries(outcomeLinks).find(([id,domains])=>id===selected||domains.includes(selected));
    return new Set(outcome?[selected,'state',outcome[0],...outcome[1]]:[selected,'state']);
  },[selected]);

  const visible=(n:CanvasNode)=>n.kind==='component'?(selected?related.has(n.id):level>=1):n.kind==='operation'?(selected?selected==='hospitals'||(selected==='health'&&level>=2):level>=2):true;
  const focusNode=(n:CanvasNode,scale=.78)=>{const v=viewport.current;if(!v)return;setCamera({x:v.clientWidth/2-n.point.x*scale,y:v.clientHeight/2-n.point.y*scale,scale})};
  const select=(n:CanvasNode)=>{setGuideStep(null);setSelected(n.id);if(n.id==='health')frame('health');else if(n.id==='hospitals')frame('hospitals');else if(compositionByParent[n.id])focusNode(n)};
  const value=(n:CanvasNode)=>{
    const f=wallData.funding.find(x=>x.id===n.id);const d=wallData.domains.find(x=>x.id===n.id);
    const component=dataMode==='real'?healthComponentValue(n.id,p.year):undefined;
    return f?formatValue(f.values[p.year],total,p.unit):d?formatValue(d.values[p.year],total,p.unit):component!==undefined?formatValue(component,total,p.unit):'';
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
          {wallData.funding.map(n=><MoneyFlow key={n.id} id={n.id} d={curve(nodeById(n.id).point,STATE_POINT)} width={fundingWidth(n.values[p.year],p.year)} tone={n.borrowing?'borrow':'funding'} faded={!!selected&&!related.has(n.id)}/>) }
          {wallData.domains.map(n=><MoneyFlow key={n.id} id={n.id} d={curve(STATE_POINT,nodeById(n.id).point)} width={domainWidth(n.values[p.year],p.year)} tone="allocation" faded={!!selected&&!related.has(n.id)}/>) }
          {Object.entries(outcomeLinks).flatMap(([outcome,domains])=>(level===0?domains.slice(0,1):domains).filter(id=>canvasNodes.some(node=>node.id===id)).map(id=><path key={`${id}-${outcome}`} className={`return-thread ${selected&&!related.has(id)?'faded':''}`} d={curve(nodeById(id).point,nodeById(outcome).point)}/>))}
          {wallData.healthComponents.map(n=>{const parent=wallData.domains.find(x=>x.id==='health')!.values[p.year];const share=dataMode==='real'?healthComponentShare(n.id,p.year,parent):n.share;return <MoneyFlow key={n.id} id={n.id} d={curve(nodeById('health').point,nodeById(n.id).point)} width={10+share*70} tone="health" faded={false} hidden={level<1}/>}) }
          {canvasNodes.filter(n=>n.kind==='operation').map(n=><MoneyFlow key={n.id} id={n.id} d={curve(nodeById('hospitals').point,n.point)} width={14} tone="operation" faded={false} hidden={level<2}/>) }
          {p.leaks&&<LeakFlows year={p.year}/>} 
        </svg>
        {territoryIds.map(id=>{const n=nodeById(id);const size=n.kind==='funding'?fundingDiameter(wallData.funding.find(x=>x.id===id)!.values[p.year],p.year):domainDiameter(wallData.domains.find(x=>x.id===id)!.values[p.year],p.year);return <TerritoryField key={id} node={n} size={size} level={level} selected={selected===id} faded={!!selected&&selected!==id&&!related.has(id)}/>})}
        {canvasNodes.filter(visible).map(n=>{const fiscal=wallData.funding.find(x=>x.id===n.id)??wallData.domains.find(x=>x.id===n.id);return <WallNode key={n.id} node={n} size={n.id==='technical'&&level===0?205:n.kind==='funding'?fundingDiameter(wallData.funding.find(x=>x.id===n.id)!.values[p.year],p.year):n.kind==='domain'?domainDiameter(wallData.domains.find(x=>x.id===n.id)!.values[p.year],p.year):n.size} rank={rankFor(n,p.year)} value={value(n)} share={fiscal?fiscal.values[p.year]/total*100:undefined} unit={p.unit} year={p.year} level={level} selected={selected===n.id} faded={!!selected&&!related.has(n.id)&&selected!==n.id} onSelect={()=>select(n)} onEvidence={()=>n.evidenceId&&p.openEvidence(n.evidenceId)}/>}) }
        {selected&&compositionByParent[selected]&&camera.scale>=.62&&<CompositionOrbit parentId={selected} year={p.year} unit={p.unit} total={total}/>}
        {p.leaks&&<LeakLabels year={p.year} unit={p.unit} total={total} open={p.openEvidence}/>} 
        <AttentionLayer year={p.year} level={level}/>
        {(changeFrom||showFiveYear)&&level===0&&<ChangeAnnotations from={showFiveYear&&dataMode==='real'?2021:changeFrom!} to={p.year}/>
        }{selected==='health'&&level>=1&&<HealthStoryChain year={p.year} total={total}/>}
        {p.receipt&&<ContributionLayer/>}
        {level>=3&&selected&&<MetricField selected={selected} open={p.openEvidence}/>} 
      </div>
    </div>
    {guideStep!==null&&<FirstLookGuide step={guideStep} next={()=>guideStep===guideSteps.length-1?setGuideStep(null):setGuideStep(guideStep+1)} skip={()=>setGuideStep(null)}/>}
    <FloatingControls {...p} setYear={changeYear} playing={playing} setPlaying={next=>{if(next&&p.year===2025)changeYear(2021);setPlaying(next)}} showFiveYear={showFiveYear} setShowFiveYear={setShowFiveYear} zoomIn={()=>zoomAt(1.25,viewport.current!.clientWidth/2,viewport.current!.clientHeight/2)} zoomOut={()=>zoomAt(.8,viewport.current!.clientWidth/2,viewport.current!.clientHeight/2)} fit={()=>frame('britain')}/>
    {dataMode==='real'&&<div className="period-status"><b>{displayPeriod(p.year)}</b><span>{p.year===2025?'LATEST COMPLETE OUTTURN':'COMPLETE OUTTURN'}</span>{p.unit==='bn'&&<em>CURRENT PRICES · NOT INFLATION ADJUSTED</em>}</div>}
    <WallMinimap camera={camera}/>
    <div className="level-readout"><LocateFixed/> {level===0?'BRITAIN':level===1?'BRITAIN / HEALTH':level===2?'BRITAIN / HEALTH / HOSPITALS':'EVIDENCE DEPTH'}</div>
    {selected&&<Inspector id={selected} level={level} year={p.year} total={total} open={p.openEvidence} clear={()=>setSelected(null)}/>}
  </main>;
}

function MoneyFlow({id,d,width,tone,faded,hidden=false}:{id:string;d:string;width:number;tone:string;faded:boolean;hidden?:boolean}){const cls=`money-flow ${tone} ${faded?'faded':''} ${hidden?'hidden':''}`;return <g className={cls} data-flow={id}><path className="flow-bed" d={d} strokeWidth={width+18}/><path className="flow-body" d={d} strokeWidth={width}/><path className="flow-current" d={d} strokeWidth={Math.max(3,width*.08)}/></g>}

function WallNode({node,size,rank,value,share,unit,year,level,selected,faded,onSelect,onEvidence}:{node:CanvasNode;size:number;rank?:number;value:string;share?:number;unit:'hundred'|'bn';year:Year;level:number;selected:boolean;faded:boolean;onSelect:()=>void;onEvidence:()=>void}){
  const outcome=wallData.outcomes.find(x=>x.id===node.id);const illustrativeYear:Year=dataMode==='real'?2025:year;const status=outcome?.status[illustrativeYear];
  const prior=dataMode==='demo'?previousYear(year):undefined;
  const linkedSpend=outcome?outcomeLinks[outcome.id].reduce((sum,id)=>sum+(wallData.domains.find(d=>d.id===id)?.values[year]??0),0):0;
  const priorSpend=dataMode==='demo'&&outcome&&prior?outcomeLinks[outcome.id].reduce((sum,id)=>sum+(wallData.domains.find(d=>d.id===id)?.values[prior]??0),0):0;
  const spendDirection=priorSpend?Math.round((linkedSpend-priorSpend)/priorSpend*100):0;
  const total=totalFunding(wallData,year);
  const stateValue=total>=1000?`£${(total/1000).toFixed(2)}tn`:`£${total}bn`;
  return <button style={{left:node.point.x,top:node.point.y,'--node-size':`${size}px`,'--node-colour':node.colour??'#d7ded8'} as React.CSSProperties} className={`wall-node ${node.id} ${node.kind} ${territoryIds.includes(node.id)?'major-territory':'minor-territory'} ${status??''} ${selected?'selected':''} ${faded?'faded':''} ${node.id==='borrowing'?'borrowing':''}`} onClick={onSelect} onDoubleClick={onEvidence} aria-label={`${node.label}${value?` ${value}`:''}`}>
    <span className="status-field"/>
    {node.kind==='state'&&<span className="allocation-ring"><b>£100</b><small>ONE NATIONAL POOL</small></span>}
    <span className="node-orb"><Icon name={node.icon} size={node.kind==='state'?72:node.kind==='domain'?42:34}/></span>
    {rank===1&&<span className="rank-badge">LARGEST {node.kind==='funding'?'SOURCE':'DESTINATION'}</span>}
    <span className="wall-label">
      <strong>{node.kind==='state'?'PUBLIC MONEY':node.label}</strong>
      {node.kind==='state'?<><b>{stateValue}</b><em>100% · £100 TOTAL</em></>:value?<><b>{unit==='hundred'&&share!==undefined?`${value} / £100`:value}</b>{share!==undefined&&<em className="national-share">{share.toFixed(1)}% OF TOTAL {node.kind==='funding'?'FUNDING':'SPEND'}</em>}</>:null}
      {outcome&&<><b className="outcome-direction">{status==='improving'?'↗':status==='mixed'?'→':'↘'} {status}</b><em>{dataMode==='real'?'ILLUSTRATIVE · STATIC · ':''}{outcome.attribution}</em></>}
      {outcome&&dataMode==='demo'&&prior&&<span className="spend-outcome-pair"><i>RELATED SPEND</i><b>{spendDirection>=0?'↑':'↓'} {Math.abs(spendDirection)}%</b><small>OUTCOME {status==='improving'?'↑':status==='mixed'?'→':'↓'}</small></span>}
      {node.id==='borrowing'&&<em>ENTERS DIFFERENTLY</em>}
      {node.id==='technical'&&<em>RECONCILIATION · NOT A SERVICE</em>}
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
  <div className="region-title outcome-title"><i>04</i> THIS IS WHAT BRITAIN GOT BACK <small>{dataMode==='real'?'ILLUSTRATIVE CONTEXT · NOT HISTORICAL':'SPEND TREND ≠ PROOF OF CAUSE'}</small></div>
  <div className="contour contour-a"/><div className="contour contour-b"/><div className="contour contour-c"/>
</>}

function WallChrome({level,frame}:{level:number;frame:(id:'britain'|'health'|'hospitals')=>void}){return <><div className="wall-brand"><span>BRITAIN</span><b>ON THE WALL</b><small>{dataMode==='real'?'OFFICIAL NATIONAL FISCAL DATA':'DEMO / ILLUSTRATIVE DATA'}</small></div><div className="wall-crumbs"><button onClick={()=>frame('britain')}>Britain</button>{level>0&&<><i>/</i><button onClick={()=>frame('health')}>Health</button></>}{level>1&&<><i>/</i><button onClick={()=>frame('hospitals')}>Hospitals</button></>}</div></>}

const leakGeometry=[
  {id:'fraud',kind:'LOSS',from:{x:1440,y:1450},to:{x:1490,y:1650}},
  {id:'overruns',kind:'LOSS',from:{x:1810,y:1430},to:{x:2050,y:1690}},
  {id:'backlogs',kind:'LEAK',from:{x:900,y:1030},to:{x:1030,y:1640}},
  {id:'interest-drag',kind:'DRAG',from:{x:740,y:1360},to:{x:560,y:1650}},
];
function LeakFlows({year}:{year:Year}){const illustrativeYear=dataMode==='real'?2025:year;return <>{leakGeometry.map(g=>{const item=wallData.leaks.find(x=>x.id===g.id)!;return <g className="leak-flow" key={g.id}><path className="leak-bed" d={curve(g.from,g.to)} strokeWidth={12+Math.sqrt(item.value[illustrativeYear])*4}/><path className="leak-current" d={curve(g.from,g.to)} strokeWidth={4}/></g>})}</>}
function LeakLabels({year,unit,total,open}:{year:Year;unit:'hundred'|'bn';total:number;open:(id:string)=>void}){const illustrativeYear=dataMode==='real'?2025:year;const illustrativeTotal=dataMode==='real'?totalFunding(wallData,2025):total;return <>{leakGeometry.map(g=>{const x=wallData.leaks.find(l=>l.id===g.id)!;return <button className={`leak-label ${g.kind.toLowerCase()}`} key={g.id} style={{left:g.to.x,top:g.to.y}} onClick={()=>open(x.evidenceId)}><i>↓</i><span><em>ILLUSTRATIVE {g.kind} · STATIC PROTOTYPE</em><strong>{x.name}</strong><b>{formatValue(x.value[illustrativeYear],illustrativeTotal,unit)}</b></span></button>})}</>}

const territoryOffsets=[{x:-.3,y:-.28},{x:.3,y:-.24},{x:.02,y:.34}];
function TerritoryField({node,size,level,selected,faded}:{node:CanvasNode;size:number;level:number;selected:boolean;faded:boolean}){
  const healthParent=wallData.domains.find(x=>x.id==='health')?.values[2025]??1;
  const items=node.id==='health'?wallData.healthComponents.map(x=>({id:x.id,label:x.name,share:dataMode==='real'?healthComponentShare(x.id,2025,healthParent):x.share,icon:x.icon})):compositionByParent[node.id];
  const hints=[...items].sort((a,b)=>b.share-a.share).slice(0,level===0?2:3);
  const centre={x:node.point.x-125,y:node.point.y};
  const envelopeWidth=size+(level===0?80:190),envelopeHeight=size+(level===0?60:145);
  return <div className={`territory-field ${node.id} ${selected?'selected':''} ${faded?'faded':''}`} style={{left:centre.x,top:centre.y,'--territory-width':`${envelopeWidth}px`,'--territory-height':`${envelopeHeight}px`,'--territory-colour':node.colour??'#78c8d3'} as React.CSSProperties} aria-label={`${node.label} territory`}>
    {level<=1&&!selected&&hints.map((item,index)=>{const o=territoryOffsets[index];const child=36+Math.sqrt(item.share)*54;return <span className="territory-hint" key={item.id} aria-label={item.label} style={{left:`${50+o.x*70}%`,top:`${50+o.y*70}%`,'--hint-size':`${child}px`} as React.CSSProperties}><Icon name={item.icon} size={22}/><small>{item.label}</small></span>})}
  </div>;
}

const orbitOffsets=[{x:-260,y:-220},{x:290,y:-175},{x:-280,y:230},{x:285,y:225}];
function CompositionOrbit({parentId,year,unit,total}:{parentId:string;year:Year;unit:'hundred'|'bn';total:number}){
  const parent=nodeById(parentId),items=compositionByParent[parentId];
  const isFunding=wallData.funding.some(x=>x.id===parentId);
  const centre={x:parent.point.x-125,y:parent.point.y};
  const parentValue=wallData.funding.find(x=>x.id===parentId)?.values[year]??wallData.domains.find(x=>x.id===parentId)!.values[year];
  const realComponents=dataMode==='real'&&isRealYear(year)?realFundingComponentValues(year,parentId):undefined;
  return <div className="composition-orbit" aria-label={`${parent.label} ${isFunding&&dataMode==='real'?'official':'illustrative'} composition`}>
    <div className="composition-territory" style={{left:centre.x,top:centre.y}}><span>{isFunding&&dataMode==='real'?'OFFICIAL RECEIPTS · ASSOCIATED WITH':isFunding?'ILLUSTRATIVE COMPOSITION · RECEIPTS ASSOCIATED WITH':'ILLUSTRATIVE COMPOSITION · THIS ALLOCATION CONTAINS'}</span></div>
    {items.map((item,index)=>{const value=realComponents?.[item.id]??parentValue*item.share;const share=value/parentValue;const diameter=80+Math.sqrt(share)*125;const offset=orbitOffsets[index]??orbitOffsets[0];return <div className="composition-node" key={item.id} style={{left:centre.x+offset.x,top:centre.y+offset.y,'--composition-size':`${diameter}px`,'--composition-colour':parent.colour??'#8fd3da'} as React.CSSProperties}><span><Icon name={item.icon} size={28}/></span><strong>{item.label}</strong><b>{formatValue(value,total,unit)}</b><small>{Math.round(share*100)}% of this category</small></div>})}
  </div>;
}

function ContributionLayer(){return <div className="contribution-layer"><strong>CONTRIBUTION & RECEIPT</strong><div><span>Annual cash flow</span><span>Service use</span><span>Life course</span></div><p>Receipt is not exploitation. Fiscal position is not moral worth.</p></div>}

function MetricField({selected,open}:{selected:string;open:(x:string)=>void}){const metric=healthMetrics.find(x=>x.id===selected);const year=2025 as RealYear;const status=metric?metricStatus(metric,year):'unavailable';return <div className="metric-field"><span>ENGLAND OPERATIONAL LENS · NOT UK RECONCILIATION</span><div>{metric?<><button onClick={()=>open(metric.evidenceId)}><strong>{metric.kind.toUpperCase()}</strong><b>{metric.values[year]} {metric.unit}</b><Info/></button><button><strong>PERIOD</strong><b>{metric.periods[year]}</b></button><button><strong>RETURN TYPE</strong><b>{metric.returnType}</b></button><button><strong>TREND STATUS</strong><b className={status==='deteriorating'?'under-pressure':''}>{status.toUpperCase()}</b></button></>:<button onClick={()=>open('e-health-medical')}><strong>Medical services</strong><b>Inspect UK allocation basis</b><Info/></button>}</div></div>}

function AttentionLayer({year,level}:{year:Year;level:number}){if(level>0||dataMode==='real')return null;return <div className="attention-layer" aria-label="Illustrative attention markers">{(attentionByYear[year]??[]).map(marker=>{const n=nodeById(marker.targetId);return <div key={marker.id} className={`attention-pin ${marker.tone}`} style={{left:n.point.x,top:n.point.y}}><i>!</i><span><small>DEMO ATTENTION</small>{marker.label}</span></div>})}</div>}

function HealthStoryChain({year,total}:{year:Year;total:number}){const health=wallData.domains.find(d=>d.id==='health')!;const metric=healthMetrics.find(x=>x.id==='rtt-18-weeks')!;const status=isRealYear(year)?metricStatus(metric,year):'unavailable';return <div className="health-story-chain" style={{top:1290}}><span>TRACE THE REAL SYSTEM</span><strong>UK ALLOCATION <b>{formatValue(health.values[year],total,'hundred')} of every £100</b></strong><i>→</i><strong>DELIVERY <b>PESA functional spend</b></strong><i>→</i><strong>OUTPUT <b>{isRealYear(year)&&healthMetrics[0].values[year]!==undefined?`${healthMetrics[0].values[year]}m GP appointments`:'period unavailable'}</b></strong><i>→</i><strong>OUTCOME <b>18-week access · {status}</b></strong><small>UK fiscal allocation · England operational lens · shown together, not claimed as causal</small></div>}

function ChangeAnnotations({from,to}:{from:Year;to:Year}){
  if(dataMode==='real'&&isRealYear(from)&&isRealYear(to)){const notes=majorHistoricalChanges(from,to);return <div className="change-layer" aria-label={`Largest fiscal changes from ${periodLabel(from)} to ${periodLabel(to)}`}>{notes.map((change,i)=>{const point=nodeById(change.id).point;const prefix=change.technical?'TECHNICAL RECONCILIATION CHANGE':change.label.toUpperCase();return <div className="change-note" key={change.id} style={{left:point.x,top:point.y,animationDelay:`${i*.16}s`}}><small>{periodLabel(from)} → {periodLabel(to)} · {prefix}</small><strong>{change.perHundredDelta>=0?'+':'−'}£{Math.abs(change.perHundredDelta).toFixed(2)} per £100</strong></div>})}</div>}
  const fromTotal=totalFunding(wallData,from),toTotal=totalFunding(wallData,to);
  const share=(id:string,y:Year,total:number)=>Math.round((wallData.domains.find(d=>d.id===id)!.values[y]/total)*100);
  const health=share('health',to,toTotal)-share('health',from,fromTotal);
  const interest=share('interest',to,toTotal)-share('interest',from,fromTotal);
  const oldStatus=wallData.outcomes.find(o=>o.id==='healthy')!.status[from],newStatus=wallData.outcomes.find(o=>o.id==='healthy')!.status[to];
  const notes=[
    {point:nodeById('health').point,text:`Health ${health>=0?'gained':'lost'} £${Math.abs(health)} of every £100`},
    {point:nodeById('interest').point,text:`Debt-interest drag ${interest>=0?'rose':'fell'} £${Math.abs(interest)} of every £100`},
    {point:nodeById('healthy').point,text:`Healthy lives: ${oldStatus} → ${newStatus}`},
  ];
  return <div className="change-layer" aria-label={`Changes from ${from} to ${to}`}>{notes.map((n,i)=><div className="change-note" key={n.text} style={{left:n.point.x,top:n.point.y,animationDelay:`${i*.16}s`}}><small>{from} → {to}</small><strong>{n.text}</strong></div>)}</div>;
}

function FirstLookGuide({step,next,skip}:{step:number;next:()=>void;skip:()=>void}){const item=guideSteps[step];return <aside className="first-look" aria-label="First look guide"><span>{step+1} / {guideSteps.length}</span><strong>{item.title}</strong><p>{item.body}</p><div><button onClick={skip}>Skip</button><button onClick={next}>{step===guideSteps.length-1?'Explore':'Next'}</button></div></aside>}

function Inspector({id,level,year,total,open,clear}:{id:string;level:number;year:Year;total:number;open:(id:string)=>void;clear:()=>void}){
  const n=nodeById(id);const domain=wallData.domains.find(d=>d.id===id);const outcome=wallData.outcomes.find(o=>o.id===id);const healthOutcome=wallData.outcomes.find(o=>o.id==='healthy')!;
  const healthMetric=healthMetrics.find(x=>x.id===id);const metricValue=isRealYear(year)?healthMetric?.values[year]:undefined;
  const selectedPeriod=dataMode==='real'?displayPeriod(year):String(year);
  const explanation=n.kind==='funding'?(n.id==='borrowing'?`Borrowing is the balancing requirement between ${selectedPeriod} receipts and expenditure. It is debt created, not a receipt raised now.`:`This is a ${selectedPeriod} official-receipts grouping by collection point, not a statement about who ultimately bears the tax.`):
    n.id==='state'?`The ${selectedPeriod} pool is Total Managed Expenditure: accrued current receipts plus the borrowing required to reconcile to spending.`:
    n.id==='health'?`Britain allocated ${formatValue(domain!.values[year],total,'hundred')} of every £100 here in ${selectedPeriod}. The UK total reconciles to medical services, personal social services, central and other health services, and medical research. England operational measures are a separate supporting lens.`:
    n.id==='hospitals'?'Medical services is the largest UK functional allocation. Zoom closer for an explicitly England-only operational lens; it does not reconcile to this UK total.':
    healthMetric?`${healthMetric.kind==='output'?'Activity/output':'Outcome/context'}: ${metricValue===undefined?'No observation stored for this selected fiscal point':`${metricValue} ${healthMetric.unit}, ${healthMetric.periods[year as RealYear]}`}. Geography: ${healthMetric.geography}. ${healthMetric.returnType}; shown with spend without a causal claim.`:
    outcome?`This indicator is ${outcome.status[year]}. It shows direction in the selected illustrative measure and does not prove what caused the change.`:
    'Connected territory remains bright; the rest of Britain stays visible for orientation.';
  const changes=dataMode==='real'&&isRealYear(year)&&(domain||n.kind==='funding')?historicalChanges(2021,year,n.kind==='funding'?'in':'out').find(x=>x.id===id):undefined;
  const series=dataMode==='real'&&(domain||n.kind==='funding')?realYears.map(item=>({year:item,value:(domain??wallData.funding.find(x=>x.id===id))!.values[item],share:(domain??wallData.funding.find(x=>x.id===id))!.values[item]/totalFunding(wallData,item)*100})):[];
  const comparison=dataMode==='real'&&isRealYear(year)?historicalChanges(2021,year,n.kind==='funding'?'in':'out').find(x=>x.id===id):undefined;
  return <aside className="wall-inspector"><button className="inspector-close" onClick={clear}>×</button><span>EXPLAIN THIS · LEVEL {level}</span><h2>{n.label}</h2><p>{explanation}</p>{comparison?.comparability==='medium'&&<div className="comparability">COMPARABILITY: MEDIUM</div>}{changes&&year!==2021&&<p className="direction-summary"><b>Since 2021–22</b><span>Share of total: {changes.perHundredDelta>=0?'up':'down'} {Math.abs(changes.perHundredDelta).toFixed(2)} per £100</span><span>Nominal amount: {changes.amountDelta>=0?'up':'down'} £{Math.abs(changes.amountDelta).toFixed(3)}bn</span></p>}{series.length>0&&<div className="mini-series" aria-label={`${n.label} five-year history`}><b>FIVE-YEAR CONTEXT</b>{series.map(item=><span key={item.year} className={item.year===year?'selected':''}><i>{displayPeriod(item.year)}</i><em>£{item.share.toFixed(1)} / £100</em><small>£{item.value.toFixed(1)}bn</small></span>)}</div>}{n.evidenceId&&<button className="inspect-evidence" onClick={()=>open(n.evidenceId!)}>Inspect evidence <Info/></button>}</aside>;
}

function WallMinimap({camera}:{camera:{x:number;y:number;scale:number}}){return <div className="wall-minimap"><span>WHOLE WALL</span><div><i className="mini-funding"/><i className="mini-state"/><i className="mini-spending"/><i className="mini-outcomes"/><b style={{left:`${Math.max(0,Math.min(82,-camera.x/camera.scale/WORLD.width*100))}%`,top:`${Math.max(0,Math.min(72,-camera.y/camera.scale/WORLD.height*100))}%`,width:`${Math.min(72,100/camera.scale*.22)}%`}}/></div></div>}
