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
const tones=['#197fc4','#2a9ca3','#68a73f','#c2a82c','#7253a0','#8d73b1','#d84d43','#ee762b','#eda11d','#d6b428','#269aa2','#3685b8','#8465a7','#578f43','#2d9aa7','#63768a','#9aa1a5'];
const sourceScene:Record<string,[number,number]>={income:[0,0],business:[1,0],consumer:[0,1],capital:[1,1],'other-income':[0,2],borrowing:[1,2]};
const destinationScene:Record<string,[number,number]>={health:[0,0],welfare:[1,0],pensions:[2,0],education:[3,0],defence:[0,1],transport:[1,1],justice:[2,1],housing:[3,1],economy:[0,2],environment:[1,2],culture:[2,2],admin:[3,2],interest:[0,3],technical:[1,3]};
const money=(value:number,total:number,unit:Unit)=>unit==='hundred'?`£${(value/total*100).toFixed(2)}`:`£${value.toFixed(1)}bn`;

function UnitTokens({share,tone='standard',colour}:{share:number;tone?:'standard'|'borrowing'|'technical';colour?:string}){
  const whole=Math.floor(share),fraction=share-whole;
  return <div className={`unit-tokens ${tone}`} style={{'--token-colour':colour} as React.CSSProperties} aria-label={`${share.toFixed(2)} pounds out of every one hundred`}>
    {Array.from({length:whole},(_,i)=><i key={i}/>) }
    {fraction>.04&&<i className="partial" style={{'--fill':`${fraction*100}%`} as React.CSSProperties}/>} 
  </div>;
}

function FiscalRow({item,total,unit,direction,rank,openEvidence}:{item:FiscalItem;total:number;unit:Unit;direction:'in'|'out';rank:number;openEvidence:(id:string)=>void}){
  const Icon=icons[item.id as keyof typeof icons]??Landmark;const share=item.value/total*100;const colour=item.borrowing?'#7253a0':item.technical?'#92999b':tones[direction==='in'?rank:rank+6];const slot=(direction==='in'?sourceScene:destinationScene)[item.id]??[0,0];
  return <button style={{'--row-colour':colour,'--scene-x':String(slot[0]),'--scene-y':String(slot[1])} as React.CSSProperties} className={`fiscal-row ${direction} ${rank<3?'major':''} ${item.borrowing?'borrowing':''} ${item.technical?'technical':''}`} onClick={()=>openEvidence(item.evidenceId)} aria-label={`${item.name} ${money(item.value,total,unit)}, ${share.toFixed(1)} percent`}>
    <span className="scene" aria-hidden="true"><Icon/><i/><i/><i/></span>
    <span className="row-copy"><strong>{item.name}</strong>{item.borrowing&&<small>Fills the gap · not revenue</small>}{item.technical&&<small>NOT A SERVICE</small>}<UnitTokens share={share} colour={colour} tone={item.borrowing?'borrowing':item.technical?'technical':'standard'}/></span>
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
    <header className="editorial-header"><div className="brand-lockup"><a className="wordmark" href="/">BRITAIN ON THE WALL</a><p>The real picture of how Britain raises and spends its money.</p><small>All figures for {displayPeriod(year)} &nbsp;•&nbsp; Latest complete outturn &nbsp;•&nbsp; <button onClick={()=>openEvidence('e-income')}>Sources and methodology ↗</button></small></div><div className="header-unit-toggle unit-toggle"><button className={unit==='hundred'?'active':''} onClick={()=>setUnit('hundred')}>EVERY £100</button><button className={unit==='bn'?'active':''} onClick={()=>setUnit('bn')}>£ BILLIONS</button></div><div className="header-summary"><span><b>{total>=1000?`£${(total/1000).toFixed(3)}tn`:`£${total.toFixed(1)}bn`}</b><small>Total public money</small></span><span><b>£100</b><small>Raised or borrowed</small></span><span><b>{destinations.length}</b><small>Destinations</small></span><span><b>{sources.length}</b><small>Sources</small></span><button onClick={()=>setShowHelp(!showHelp)} aria-expanded={showHelp}>? &nbsp; How to read</button></div></header>
    {showHelp&&<aside className="read-note">Each physical token is £1 of every £100. Partial tokens show fractions. Width and ordering follow the selected period; borrowing remains separate from receipts.</aside>}
    <section className="money-stage">
      <svg className="editorial-flows" viewBox="0 0 1400 620" preserveAspectRatio="none" aria-hidden="true">{sources.map((item,i)=><path key={item.id} className={item.borrowing?'borrow-flow':''} d={`M 465 ${88+i*81} C 535 ${88+i*81}, 550 ${310+(i-2.5)*18}, 638 310`} stroke={item.borrowing?'#7253a0':tones[i]} strokeWidth={Math.max(7,item.value/total*130)} />)}{destinations.map((item,i)=><path key={item.id} className={item.technical?'technical-flow':''} d={`M 762 310 C 850 ${310+(i-6)*12}, 875 ${48+i*40}, 960 ${48+i*40}`} stroke={item.technical?'#92999b':tones[i+6]} strokeWidth={Math.max(5,item.value/total*95)} />)}</svg>
      <section className="fiscal-column sources"><div className="section-heading"><small>01 · MONEY IN</small><h1>Where Britain’s<br/><em>£100 comes from</em></h1></div>{sources.map((item,i)=><FiscalRow key={item.id} item={item} total={total} unit={unit} direction="in" rank={i} openEvidence={openEvidence}/>)}</section>
      <section className="pool-column"><div className="pool-label"><span>PUBLIC MONEY</span><strong>£100</strong><em>of every £100</em><small>{total>=1000?`£${(total/1000).toFixed(3)}tn in total`:`£${total.toFixed(1)}bn in total`}</small></div><div className="pool-object"><div className="britain-mark">BRITAIN</div></div><p>Money in equals money out.<br/><small>Borrowing balances the gap.</small></p></section>
      <section className="fiscal-column destinations"><div className="section-heading"><small>02 · MONEY OUT</small><h1>Where Britain’s<br/><em>£100 goes</em></h1></div>{destinations.map((item,i)=><FiscalRow key={item.id} item={item} total={total} unit={unit} direction="out" rank={i} openEvidence={openEvidence}/>)}</section>
    </section>
    <section className="lower-editorial" id="history">
      <div className="history-panel"><header><div><small>OVER TIME</small><h2>Five years of public money</h2></div><button onClick={play} aria-pressed={playing}><Play/>{playing?'PAUSE STORY':'PLAY 5-YEAR STORY'}</button></header><div className="years">{realYears.map(item=><button key={item} className={year===item?'active':''} onClick={()=>setYear(item)}><i/><b>{displayPeriod(item)}</b><span>{item===2025?'LATEST':''}</span></button>)}</div><div className="change-summary"><small>LARGEST REAL CHANGES SINCE 2021–22 · NO CAUSAL CLAIM</small>{year===2021?<p>Select a later year to compare its allocation with 2021–22.</p>:<div>{changes.slice(0,5).map(change=><span key={change.id}><b>{change.label}</b><em>{change.perHundredDelta>=0?'+':'−'}£{Math.abs(change.perHundredDelta).toFixed(2)} / £100</em></span>)}</div>}</div></div>
      <div className="outcomes-panel"><header><small>WHAT BRITAIN GETS</small><span>ILLUSTRATIVE CONTEXT · NOT HISTORICAL EVIDENCE</span></header><div>{outcomes.map(([label,Icon])=><article key={label}><Icon/><b>{label}</b><span>Evidence upgrade pending</span></article>)}</div></div>
    </section><footer className="editorial-footer"><b>◇ &nbsp; TRANSPARENT. EVIDENCE-BASED. INDEPENDENT.</b><span>All data is from official sources. We show what the evidence says — not what we think.</span><nav>Sources &nbsp; • &nbsp; Methodology &nbsp; • &nbsp; Data dictionary ↗</nav></footer>
  </main>;
}
