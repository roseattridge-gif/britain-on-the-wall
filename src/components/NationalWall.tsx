import {useEffect,useMemo,useState} from 'react';
import {BookOpen,Building2,Factory,GraduationCap,HandCoins,HeartPulse,Home,Landmark,Leaf,Palette,Percent,Play,Scale,Shield,ShoppingBasket,TrainFront,Users} from 'lucide-react';
import {wallData,totalFunding} from '../data';
import {displayPeriod,realYears,type RealYear} from '../data/real/adapter';
import {majorHistoricalChanges} from '../data/real/timeline';
import type {Year} from '../types';

type Unit='hundred'|'bn';
type Props={year:Year;setYear:(year:Year)=>void;unit:Unit;setUnit:(unit:Unit)=>void;openEvidence:(id:string)=>void};
type FiscalItem={id:string;name:string;value:number;evidenceId:string;technical?:boolean;borrowing?:boolean};

const icons={income:Users,business:Factory,consumer:ShoppingBasket,capital:Home,'other-income':Landmark,borrowing:HandCoins,health:HeartPulse,welfare:HandCoins,pensions:Users,education:GraduationCap,defence:Shield,justice:Scale,housing:Home,transport:TrainFront,admin:Landmark,interest:Percent,economy:Building2,environment:Leaf,culture:Palette,technical:BookOpen} as const;
const outcomes=[['Better health',HeartPulse],['Good education',GraduationCap],['Safe & secure',Shield],['Strong economy',Factory],['Support in hard times',HandCoins]] as const;
const money=(value:number,total:number,unit:Unit)=>unit==='hundred'?`£${(value/total*100).toFixed(2)}`:`£${value.toFixed(1)}bn`;

function UnitTokens({share,tone='standard'}:{share:number;tone?:'standard'|'borrowing'|'technical'}){
  const whole=Math.floor(share),fraction=share-whole;
  return <div className={`unit-tokens ${tone}`} aria-label={`${share.toFixed(2)} pounds out of every one hundred`}>
    {Array.from({length:whole},(_,i)=><i key={i}/>) }
    {fraction>.04&&<i className="partial" style={{'--fill':`${fraction*100}%`} as React.CSSProperties}/>} 
  </div>;
}

function FiscalRow({item,total,unit,direction,rank,openEvidence}:{item:FiscalItem;total:number;unit:Unit;direction:'in'|'out';rank:number;openEvidence:(id:string)=>void}){
  const Icon=icons[item.id as keyof typeof icons]??Landmark;const share=item.value/total*100;
  return <button className={`fiscal-row ${direction} ${rank<3?'major':''} ${item.borrowing?'borrowing':''} ${item.technical?'technical':''}`} onClick={()=>openEvidence(item.evidenceId)} aria-label={`${item.name} ${money(item.value,total,unit)}, ${share.toFixed(1)} percent`}>
    <span className="scene" aria-hidden="true"><Icon/><i/><i/><i/></span>
    <span className="row-copy"><strong>{item.name}</strong>{item.borrowing&&<small>Fills the gap · not revenue</small>}{item.technical&&<small>NOT A SERVICE</small>}<UnitTokens share={share} tone={item.borrowing?'borrowing':item.technical?'technical':'standard'}/></span>
    <span className="row-number"><b>{money(item.value,total,unit)}</b><em>{share.toFixed(1)}%</em><small>{unit==='hundred'?`£${item.value.toFixed(1)}bn`:`£${share.toFixed(2)} / £100`}</small></span>
    <span className="expand" aria-hidden="true">＋</span>
  </button>;
}

export function NationalWall({year,setYear,unit,setUnit,openEvidence}:Props){
  const [playing,setPlaying]=useState(false);const[showHelp,setShowHelp]=useState(false);const total=totalFunding(wallData,year);
  const sources=useMemo(()=>wallData.funding.map(x=>({id:x.id,name:x.name,value:x.values[year],evidenceId:x.evidenceId,borrowing:x.borrowing})).sort((a,b)=>b.value-a.value),[year]);
  const destinations=useMemo(()=>wallData.domains.filter(x=>x.values[year]>0).map(x=>({id:x.id,name:x.name,value:x.values[year],evidenceId:x.evidenceId,technical:x.id==='technical'})).sort((a,b)=>b.value-a.value),[year]);
  const changes=useMemo(()=>majorHistoricalChanges(2021,year as RealYear),[year]);
  useEffect(()=>{if(!playing)return;const index=realYears.indexOf(year as RealYear);if(index===realYears.length-1){setPlaying(false);return}const timer=setTimeout(()=>setYear(realYears[index+1]),1100);return()=>clearTimeout(timer)},[playing,year,setYear]);
  const play=()=>{if(year===2025)setYear(2021);setPlaying(!playing)};
  return <main className="national-wall">
    <header className="editorial-header"><a className="wordmark" href="/">BRITAIN <span>ON THE WALL</span></a><p>The real picture of how Britain raises and spends its money.</p><nav><span><b>{displayPeriod(year)}</b> LATEST COMPLETE OUTTURN</span><button onClick={()=>openEvidence('e-income')}>Sources & methodology</button></nav></header>
    <section className="summary-strip"><span><b>{total>=1000?`£${(total/1000).toFixed(3)}tn`:`£${total.toFixed(1)}bn`}</b> total public money</span><span><b>£100</b> raised or borrowed</span><span><b>{destinations.length}</b> visible destinations</span><span><b>{sources.length}</b> source groups</span><button onClick={()=>setShowHelp(!showHelp)} aria-expanded={showHelp}>? &nbsp; How to read</button></section>
    {showHelp&&<aside className="read-note">Each physical token is £1 of every £100. Partial tokens show fractions. Width and ordering follow the selected period; borrowing remains separate from receipts.</aside>}
    <section className="money-stage">
      <svg className="editorial-flows" viewBox="0 0 1400 660" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="flowIn"><stop stopColor="#8eb6b1" stopOpacity=".5"/><stop offset="1" stopColor="#d9a64d" stopOpacity=".82"/></linearGradient><linearGradient id="flowOut"><stop stopColor="#d9a64d" stopOpacity=".82"/><stop offset="1" stopColor="#93b3a7" stopOpacity=".42"/></linearGradient></defs>{sources.map((item,i)=><path key={item.id} className={item.borrowing?'borrow-flow':''} d={`M 310 ${100+i*86} C 470 ${100+i*86}, 505 ${330+(i-2.5)*20}, 638 330`} stroke="url(#flowIn)" strokeWidth={Math.max(4,item.value/total*52)} />)}{destinations.map((item,i)=><path key={item.id} className={item.technical?'technical-flow':''} d={`M 762 330 C 875 ${330+(i-6)*13}, 920 ${55+i*43}, 1085 ${55+i*43}`} stroke="url(#flowOut)" strokeWidth={Math.max(3,item.value/total*48)} />)}</svg>
      <section className="fiscal-column sources"><div className="section-heading"><small>01 · MONEY IN</small><h1>Where Britain’s<br/><em>£100 comes from</em></h1></div>{sources.map((item,i)=><FiscalRow key={item.id} item={item} total={total} unit={unit} direction="in" rank={i} openEvidence={openEvidence}/>)}</section>
      <section className="pool-column"><div className="pool-object"><span>PUBLIC MONEY</span><strong>£100</strong><em>of every £100</em><small>{total>=1000?`£${(total/1000).toFixed(3)}tn in total`:`£${total.toFixed(1)}bn in total`}</small><div className="crown">✦</div></div><p>For every £100 Britain raises or borrows, this is where it goes.</p><div className="unit-toggle"><button className={unit==='hundred'?'active':''} onClick={()=>setUnit('hundred')}>EVERY £100</button><button className={unit==='bn'?'active':''} onClick={()=>setUnit('bn')}>£ BILLIONS</button></div></section>
      <section className="fiscal-column destinations"><div className="section-heading"><small>02 · MONEY OUT</small><h1>Where Britain’s<br/><em>£100 goes</em></h1></div>{destinations.map((item,i)=><FiscalRow key={item.id} item={item} total={total} unit={unit} direction="out" rank={i} openEvidence={openEvidence}/>)}</section>
    </section>
    <section className="lower-editorial" id="history">
      <div className="history-panel"><header><div><small>OVER TIME</small><h2>Five years of public money</h2></div><button onClick={play} aria-pressed={playing}><Play/>{playing?'PAUSE STORY':'PLAY 5-YEAR STORY'}</button></header><div className="years">{realYears.map(item=><button key={item} className={year===item?'active':''} onClick={()=>setYear(item)}><i/><b>{displayPeriod(item)}</b><span>{item===2025?'LATEST':''}</span></button>)}</div><div className="change-summary"><small>LARGEST REAL CHANGES SINCE 2021–22 · NO CAUSAL CLAIM</small>{year===2021?<p>Select a later year to compare its allocation with 2021–22.</p>:<div>{changes.slice(0,5).map(change=><span key={change.id}><b>{change.label}</b><em>{change.perHundredDelta>=0?'+':'−'}£{Math.abs(change.perHundredDelta).toFixed(2)} / £100</em></span>)}</div>}</div></div>
      <div className="outcomes-panel"><header><small>WHAT BRITAIN GETS</small><span>ILLUSTRATIVE CONTEXT · NOT HISTORICAL EVIDENCE</span></header><div>{outcomes.map(([label,Icon])=><article key={label}><Icon/><b>{label}</b><span>Evidence upgrade pending</span></article>)}</div></div>
    </section>
  </main>;
}
