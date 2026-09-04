import {useEffect,useState} from 'react';
import type {Evidence,Year} from './types';
import {dataMode,wallData} from './data';
import {evidenceForYear,realYears,type RealYear} from './data/real/adapter';
import {storyEvidenceById} from './data/real/story';
import {healthStoryEvidenceById} from './data/real/healthStory';
import {housingStoryEvidenceById} from './data/real/housingStory';
import {valueLeakageEvidenceById} from './data/real/valueLeakage';
import {SystemCanvas} from './components/SystemCanvas';
import {NationalWall,type WallFocus} from './components/NationalWall';
import {EvidenceDrawer} from './components/EvidenceDrawer';
import {WhatChangedView} from './components/WhatChangedView';
import type {StoryId} from './components/HowWeGotHere';
import type {PublicFinding,PublicTopicId} from './intelligence/publicFindings';
import {AskBritain,GuidedJourney} from './components/AskBritain';
import type {FocusTarget} from './launch/explore';

type View='britain'|'changed'|'ask';type Filter='all'|PublicTopicId;
const params=()=>new URL(location.href).searchParams;
const initialYear=()=>{const value=Number(params().get('period')?.slice(0,4));return realYears.includes(value as RealYear)?value as RealYear:realYears.at(-1)!};
const initialUnit=()=>params().get('unit')==='bn'?'bn' as const:'hundred' as const;
const initialStory=()=>{const value=params().get('story');return value==='health'||value==='housing'||value==='immigration'?value:'immigration'};
const initialMetrics=()=>params().get('metric')?.split(',').filter(Boolean)??[];
const initialFocus=():WallFocus|undefined=>params().get('focus')==='value-leakage'?{anchor:'value-leakage',valueMetricId:params().get('value')??undefined,source:'manual'}:initialMetrics().length?{topicId:initialStory(),periodId:params().get('period')??`${initialYear()}-${String(initialYear()+1).slice(2)}`,metricIds:initialMetrics(),source:'what-changed'}:undefined;

export default function App(){
  const[year,setYear]=useState<Year>(initialYear),[unit,setUnit]=useState<'hundred'|'bn'>(initialUnit),[leaks,setLeaks]=useState(false),[receipt,setReceipt]=useState(false),[evidence,setEvidence]=useState<Evidence>();
  const[view,setView]=useState<View>(params().get('view')==='changed'?'changed':params().get('view')==='ask'?'ask':'britain'),[story,setStory]=useState<StoryId>(initialStory),[focus,setFocus]=useState<WallFocus|undefined>(initialFocus);
  const[selectedFinding,setSelectedFinding]=useState<string|undefined>(params().get('finding')??undefined),[filter,setFilter]=useState<Filter>('all');
  const openEvidence=(id:string)=>setEvidence(storyEvidenceById(id)??healthStoryEvidenceById(id)??housingStoryEvidenceById(id)??valueLeakageEvidenceById(id)??(dataMode==='real'?evidenceForYear(year as RealYear,id):wallData.evidence.find(x=>x.id===id)));
  const legacy=location.pathname.endsWith('/legacy-wall');
  const changeView=(next:View)=>{setView(next);setFocus(undefined);const url=new URL(location.href);if(next==='britain')url.searchParams.delete('view');else url.searchParams.set('view',next);['finding','q','journey','step','metric','focus','value'].forEach(key=>url.searchParams.delete(key));url.hash='';history.pushState(null,'',url)};
  const selectFinding=(id:string)=>{setSelectedFinding(id);const url=new URL(location.href);url.searchParams.set('view','changed');url.searchParams.set('finding',id);history.replaceState(null,'',url)};
  const showOnWall=(finding:PublicFinding)=>{const {topicId,periodId,metricIds}=finding.focusTarget;setStory(topicId);setYear(Number(periodId.slice(0,4)) as RealYear);setFocus({...finding.focusTarget,source:'what-changed'});setView('britain');const url=new URL(location.href);url.searchParams.delete('view');url.searchParams.delete('finding');url.searchParams.set('story',topicId);url.searchParams.set('period',periodId);url.searchParams.set('metric',metricIds.join(','));history.pushState(null,'',url)};
  const showTarget=(target:FocusTarget)=>{setYear(Number(target.periodId.slice(0,4)) as RealYear);setView('britain');const url=new URL(location.href);['view','q','journey','step','finding','metric','focus','value'].forEach(key=>url.searchParams.delete(key));url.searchParams.set('period',target.periodId);if(target.kind==='story'){setStory(target.topicId);setFocus({...target,source:'manual'});url.searchParams.set('story',target.topicId);url.searchParams.set('metric',target.metricIds.join(','));url.hash='history'}else if(target.kind==='value-leakage'){setFocus({anchor:'value-leakage',valueMetricId:target.metricId,source:'manual'});url.searchParams.set('focus','value-leakage');url.searchParams.set('value',target.metricId);url.hash='value-leakage'}else{setFocus({flowId:target.flowId,source:'manual'});url.hash=''}history.pushState(null,'',url)};
  useEffect(()=>{const esc=(event:KeyboardEvent)=>event.key==='Escape'&&setEvidence(undefined);addEventListener('keydown',esc);return()=>removeEventListener('keydown',esc)},[]);
  useEffect(()=>{if(dataMode==='real'&&view==='britain'){const url=new URL(location.href);url.searchParams.set('period',`${year}-${String(year+1).slice(2)}`);url.searchParams.set('unit',unit);url.searchParams.set('story',story);if(!focus?.metricIds?.length)url.searchParams.delete('metric');history.replaceState(null,'',url)}},[year,unit,story,view,focus]);
  const journey=params().get('journey');
  const privateTest=params().get('test')==='1';
  return <>{privateTest&&<aside className="private-test-banner" aria-label="Private test notice"><b>PRIVATE V1 TEST</b><span>Please explore naturally. Do not read instructions first.</span><span>When finished, complete the test questions.</span></aside>}{!legacy&&<header className="product-nav"><a href="/" onClick={event=>{event.preventDefault();changeView('britain')}} className={view==='britain'?'active':''}>BRITAIN</a><a href="/?view=changed" onClick={event=>{event.preventDefault();changeView('changed')}} className={view==='changed'?'active':''}>WHAT CHANGED</a><a href="/?view=ask" onClick={event=>{event.preventDefault();changeView('ask')}} className={view==='ask'?'active':''}>ASK BRITAIN</a></header>}{legacy?<SystemCanvas year={year} setYear={setYear} unit={unit} setUnit={setUnit} leaks={leaks} setLeaks={setLeaks} receipt={receipt} setReceipt={setReceipt} openEvidence={openEvidence}/>:view==='changed'?<WhatChangedView filter={filter} setFilter={setFilter} selectedId={selectedFinding} selectFinding={selectFinding} openEvidence={openEvidence} showOnWall={showOnWall}/>:view==='ask'?(journey==='health'||journey==='immigration'?<GuidedJourney id={journey} openEvidence={openEvidence} showOnWall={showTarget}/>:<AskBritain openEvidence={openEvidence} showOnWall={showTarget}/>):<NationalWall year={year} setYear={setYear} unit={unit} setUnit={setUnit} openEvidence={openEvidence} story={story} setStory={value=>{setStory(value);setFocus(undefined)}} focus={focus}/>}<EvidenceDrawer item={evidence} onClose={()=>setEvidence(undefined)}/></>;
}
