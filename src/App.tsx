import {useEffect,useState} from 'react';
import type {Evidence,Year} from './types';
import {dataMode,wallData} from './data';
import {evidenceForYear,realYears,type RealYear} from './data/real/adapter';
import {storyEvidenceById} from './data/real/story';
import {healthStoryEvidenceById} from './data/real/healthStory';
import {housingStoryEvidenceById} from './data/real/housingStory';
import {SystemCanvas} from './components/SystemCanvas';
import {NationalWall,type WallFocus} from './components/NationalWall';
import {EvidenceDrawer} from './components/EvidenceDrawer';
import {WhatChangedView} from './components/WhatChangedView';
import type {StoryId} from './components/HowWeGotHere';
import type {PublicFinding,PublicTopicId} from './intelligence/publicFindings';

type View='britain'|'changed';type Filter='all'|PublicTopicId;
const params=()=>new URL(location.href).searchParams;
const initialYear=()=>{const value=Number(params().get('period')?.slice(0,4));return realYears.includes(value as RealYear)?value as RealYear:realYears.at(-1)!};
const initialUnit=()=>params().get('unit')==='bn'?'bn' as const:'hundred' as const;
const initialStory=()=>{const value=params().get('story');return value==='health'||value==='housing'||value==='immigration'?value:'immigration'};
const initialMetrics=()=>params().get('metric')?.split(',').filter(Boolean)??[];

export default function App(){
  const[year,setYear]=useState<Year>(initialYear),[unit,setUnit]=useState<'hundred'|'bn'>(initialUnit),[leaks,setLeaks]=useState(false),[receipt,setReceipt]=useState(false),[evidence,setEvidence]=useState<Evidence>();
  const[view,setView]=useState<View>(params().get('view')==='changed'?'changed':'britain'),[story,setStory]=useState<StoryId>(initialStory),[focus,setFocus]=useState<WallFocus|undefined>(initialMetrics().length?{topicId:initialStory(),periodId:params().get('period')??`${initialYear()}-${String(initialYear()+1).slice(2)}`,metricIds:initialMetrics(),source:'what-changed'}:undefined);
  const[selectedFinding,setSelectedFinding]=useState<string|undefined>(params().get('finding')??undefined),[filter,setFilter]=useState<Filter>('all');
  const openEvidence=(id:string)=>setEvidence(storyEvidenceById(id)??healthStoryEvidenceById(id)??housingStoryEvidenceById(id)??(dataMode==='real'?evidenceForYear(year as RealYear,id):wallData.evidence.find(x=>x.id===id)));
  const legacy=location.pathname.endsWith('/legacy-wall');
  const changeView=(next:View)=>{setView(next);const url=new URL(location.href);if(next==='changed')url.searchParams.set('view','changed');else{url.searchParams.delete('view');url.searchParams.delete('finding')}history.pushState(null,'',url)};
  const selectFinding=(id:string)=>{setSelectedFinding(id);const url=new URL(location.href);url.searchParams.set('view','changed');url.searchParams.set('finding',id);history.replaceState(null,'',url)};
  const showOnWall=(finding:PublicFinding)=>{const {topicId,periodId,metricIds}=finding.focusTarget;setStory(topicId);setYear(Number(periodId.slice(0,4)) as RealYear);setFocus({...finding.focusTarget,source:'what-changed'});setView('britain');const url=new URL(location.href);url.searchParams.delete('view');url.searchParams.delete('finding');url.searchParams.set('story',topicId);url.searchParams.set('period',periodId);url.searchParams.set('metric',metricIds.join(','));history.pushState(null,'',url)};
  useEffect(()=>{const esc=(event:KeyboardEvent)=>event.key==='Escape'&&setEvidence(undefined);addEventListener('keydown',esc);return()=>removeEventListener('keydown',esc)},[]);
  useEffect(()=>{if(dataMode==='real'&&view==='britain'){const url=new URL(location.href);url.searchParams.set('period',`${year}-${String(year+1).slice(2)}`);url.searchParams.set('unit',unit);url.searchParams.set('story',story);if(!focus?.metricIds?.length)url.searchParams.delete('metric');history.replaceState(null,'',url)}},[year,unit,story,view,focus]);
  return <>{!legacy&&<header className="product-nav"><a href="/" onClick={event=>{event.preventDefault();changeView('britain')}} className={view==='britain'?'active':''}>BRITAIN</a><a href="/?view=changed" onClick={event=>{event.preventDefault();changeView('changed')}} className={view==='changed'?'active':''}>WHAT CHANGED</a></header>}{legacy?<SystemCanvas year={year} setYear={setYear} unit={unit} setUnit={setUnit} leaks={leaks} setLeaks={setLeaks} receipt={receipt} setReceipt={setReceipt} openEvidence={openEvidence}/>:view==='changed'?<WhatChangedView filter={filter} setFilter={setFilter} selectedId={selectedFinding} selectFinding={selectFinding} openEvidence={openEvidence} showOnWall={showOnWall}/>:<NationalWall year={year} setYear={setYear} unit={unit} setUnit={setUnit} openEvidence={openEvidence} story={story} setStory={value=>{setStory(value);setFocus(undefined)}} focus={focus}/>}<EvidenceDrawer item={evidence} onClose={()=>setEvidence(undefined)}/></>;
}
