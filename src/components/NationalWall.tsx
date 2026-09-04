import {useEffect,useMemo,useRef,useState} from 'react';
import {BadgePoundSterling,Building2,BusFront,Calculator,Castle,Factory,GraduationCap,HandCoins,HeartPulse,Home,Landmark,Leaf,Library,ReceiptText,Scale,Shield,ShoppingBag,Users,WalletCards,type LucideIcon} from 'lucide-react';
import {wallData,totalFunding} from '../data';
import {displayPeriod,realYears,type RealYear} from '../data/real/adapter';
import {HowWeGotHere,type StoryId} from './HowWeGotHere';
import type {Year} from '../types';

type Unit='hundred'|'bn';
export type WallFocus={topicId?:StoryId;periodId?:string;metricIds?:string[];source?:'what-changed'|'manual'};
type Props={year:Year;setYear:(year:Year)=>void;unit:Unit;setUnit:(unit:Unit)=>void;openEvidence:(id:string)=>void;story:StoryId;setStory:(story:StoryId)=>void;focus?:WallFocus};
type FiscalItem={id:string;name:string;value:number;previousValue:number;baseValue:number;evidenceId:string;technical?:boolean;borrowing?:boolean};

const tones=['#197fc4','#2a9ca3','#68a73f','#c2a82c','#7253a0','#8d73b1','#d84d43','#ee762b','#eda11d','#d6b428','#269aa2','#3685b8','#8465a7','#578f43','#2d9aa7','#63768a','#9aa1a5'];
const perHundred=(value:number,total:number)=>{const amount=value/total*100;return Math.abs(amount-Math.round(amount))<.12?String(Math.round(amount)):amount.toFixed(1)};
const money=(value:number,total:number,unit:Unit)=>unit==='hundred'?`£${perHundred(value,total)}`:`£${value.toFixed(1)}bn`;
const sourceOrder=['income','business','consumer','capital','other-income','borrowing'];
const destinationOrder=['health','welfare','pensions','interest','education','defence','transport','justice','housing','economy','environment','culture','admin','technical'];
const fiscalIcons:Record<string,LucideIcon>={income:Users,business:Building2,consumer:ShoppingBag,capital:Home,'other-income':ReceiptText,borrowing:WalletCards,health:HeartPulse,welfare:HandCoins,pensions:Users,interest:BadgePoundSterling,education:GraduationCap,defence:Shield,transport:BusFront,justice:Scale,housing:Home,economy:Factory,environment:Leaf,culture:Library,admin:Landmark,technical:Calculator};

function UnitTokens({share,tone='standard',colour}:{share:number;tone?:'standard'|'borrowing'|'technical';colour?:string}){
  const whole=Math.floor(share),fraction=share-whole;
  return <div className={`unit-tokens ${tone}`} style={{'--token-colour':colour} as React.CSSProperties} aria-label={`${share.toFixed(2)} pounds out of every one hundred`}>
    {Array.from({length:whole},(_,i)=><i key={i}/>) }
    {fraction>.04&&<i className="partial" style={{'--fill':`${fraction*100}%`} as React.CSSProperties}/>} 
  </div>;
}

function FiscalRow({item,total,previousTotal,baseTotal,unit,direction,rank,openEvidence}:{item:FiscalItem;total:number;previousTotal:number;baseTotal:number;unit:Unit;direction:'in'|'out';rank:number;openEvidence:(id:string)=>void}){
  const Icon=fiscalIcons[item.id]??Castle;const share=item.value/total*100;const colour=item.borrowing?'#7253a0':item.technical?'#92999b':tones[direction==='in'?rank:rank+6];
  const cashDelta=item.value-item.previousValue,shareDelta=share-item.previousValue/previousTotal*100,baseCashDelta=item.value-item.baseValue,baseDelta=share-item.baseValue/baseTotal*100;
  const signed=(value:number,suffix:string)=>`${value>=0?'+':'−'}${Math.abs(value).toFixed(1)}${suffix}`;
  const comparison=`Previous: ${signed(cashDelta,'bn')}, ${signed(shareDelta,'pp')}. Since 2021–22: ${signed(baseCashDelta,'bn')}, ${signed(baseDelta,'pp')}.`;
  return <button style={{'--row-colour':colour} as React.CSSProperties} className={`fiscal-row ${direction} ${rank<3?'major':''} ${item.borrowing?'borrowing':''} ${item.technical?'technical':''}`} onClick={()=>openEvidence(item.evidenceId)} aria-label={`${item.name} ${money(item.value,total,unit)}, ${share.toFixed(1)} percent. ${comparison}`} title={`${comparison} Select for source and methodology.`}>
    <span className="row-icon" aria-hidden="true"><Icon/></span>
    <span className="row-copy"><strong>{item.name}</strong>{item.borrowing&&<small>Fills the gap between what we raise and what we spend · not revenue</small>}{item.technical&&<small>NOT A SERVICE</small>}</span>
    <UnitTokens share={share} colour={colour} tone={item.borrowing?'borrowing':item.technical?'technical':'standard'}/>
    <span className="row-number" title={comparison}><b>{money(item.value,total,unit)}</b><em>{share.toFixed(1)}%</em></span>
    <span className="expand" aria-hidden="true">＋</span>
  </button>;
}

export function NationalWall({year,setYear,unit,setUnit,openEvidence,story,setStory,focus}:Props){
  const[showHelp,setShowHelp]=useState(false);const historyRef=useRef<HTMLElement>(null);const total=totalFunding(wallData,year);const yearIndex=realYears.indexOf(year as RealYear);const previousYear=realYears[Math.max(0,yearIndex-1)];const previousTotal=totalFunding(wallData,previousYear),baseTotal=totalFunding(wallData,2021);
  useEffect(()=>{if(focus?.source==='what-changed'){const section=historyRef.current;if(typeof section?.scrollIntoView==='function')section.scrollIntoView({behavior:'smooth',block:'start'});section?.focus({preventScroll:true})}},[focus]);
  const sources=useMemo(()=>wallData.funding.map(x=>({id:x.id,name:x.name,value:x.values[year],previousValue:x.values[previousYear],baseValue:x.values[2021],evidenceId:x.evidenceId,borrowing:x.borrowing})).sort((a,b)=>sourceOrder.indexOf(a.id)-sourceOrder.indexOf(b.id)),[year,previousYear]);
  const destinations=useMemo(()=>wallData.domains.filter(x=>x.values[year]>0).map(x=>({id:x.id,name:x.name,value:x.values[year],previousValue:x.values[previousYear],baseValue:x.values[2021],evidenceId:x.evidenceId,technical:x.id==='technical'})).sort((a,b)=>destinationOrder.indexOf(a.id)-destinationOrder.indexOf(b.id)),[year,previousYear]);
  return <main className="national-wall">
    <header className="editorial-header"><div className="brand-lockup"><span className="chapter-label">01 · UNDERSTAND BRITAIN</span><a className="wordmark" href="/">BRITAIN ON THE WALL</a><p>Where Britain’s money comes from—and where it goes.</p><small>{displayPeriod(year)} · latest complete outturn · <button onClick={()=>openEvidence('e-income')}>Sources and method</button></small></div><div className="header-unit-toggle unit-toggle" role="group" aria-label="Display unit"><button className={unit==='hundred'?'active':''} aria-pressed={unit==='hundred'} onClick={()=>setUnit('hundred')}>EVERY £100</button><button className={unit==='bn'?'active':''} aria-pressed={unit==='bn'} onClick={()=>setUnit('bn')}>£ BILLIONS</button></div><div className="header-summary"><span><b>{total>=1000?`£${(total/1000).toFixed(3)}tn`:`£${total.toFixed(1)}bn`}</b><small>Total public money</small></span><span><b>£100</b><small>Raised or borrowed</small></span><button onClick={()=>setShowHelp(!showHelp)} aria-expanded={showHelp}>How to read</button></div></header>
    {showHelp&&<aside className="read-note">Each physical token is £1 of every £100. Partial tokens show fractions. Width and ordering follow the selected period; borrowing remains separate from receipts.</aside>}
    <section className="money-stage">
      <svg className="editorial-flows" viewBox="0 0 1400 620" preserveAspectRatio="none" aria-hidden="true">{sources.map((item,i)=><path key={item.id} className={item.borrowing?'borrow-flow':''} d={`M 465 ${88+i*81} C 535 ${88+i*81}, 550 ${310+(i-2.5)*18}, 638 310`} stroke={item.borrowing?'#7253a0':tones[i]} strokeWidth={Math.max(7,item.value/total*130)} />)}{destinations.map((item,i)=><path key={item.id} className={item.technical?'technical-flow':''} d={`M 762 310 C 850 ${310+(i-6)*12}, 875 ${48+i*40}, 960 ${48+i*40}`} stroke={item.technical?'#92999b':tones[i+6]} strokeWidth={Math.max(5,item.value/total*95)} />)}</svg>
      <section className="fiscal-column sources"><div className="section-heading"><small>01 · MONEY IN</small><h1>Where Britain’s £100 comes from</h1></div>{sources.map((item,i)=><FiscalRow key={item.id} item={item} total={total} previousTotal={previousTotal} baseTotal={baseTotal} unit={unit} direction="in" rank={i} openEvidence={openEvidence}/>)}</section>
      <section className="pool-column"><div className="pool-label"><span>PUBLIC MONEY</span><strong>£100</strong><em>of every £100</em><small>{total>=1000?`£${(total/1000).toFixed(3)}tn in total`:`£${total.toFixed(1)}bn in total`}</small></div><div className="pool-object"><div className="britain-mark">BRITAIN</div></div><p>Money in equals money out.<br/><small>Borrowing balances the gap.</small></p></section>
      <section className="fiscal-column destinations"><div className="section-heading"><small>02 · MONEY OUT</small><h1>Where Britain’s £100 goes</h1></div>{destinations.map((item,i)=><FiscalRow key={item.id} item={item} total={total} previousTotal={previousTotal} baseTotal={baseTotal} unit={unit} direction="out" rank={i} openEvidence={openEvidence}/>)}</section>
    </section>
    <section className="lower-editorial" id="history" ref={historyRef} tabIndex={-1}><HowWeGotHere year={year} setYear={setYear} openEvidence={openEvidence} story={story} setStory={setStory} focus={focus}/></section><footer className="editorial-footer"><b>TRANSPARENT · EVIDENCE-BASED · INDEPENDENT</b><span>Official sources, visible definitions and explicit limits.</span></footer>
  </main>;
}
