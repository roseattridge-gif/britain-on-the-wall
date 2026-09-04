import {useMemo} from 'react';
import {displayPeriod} from '../data/real/adapter';
import {getPublicFindings,type PublicFinding,type PublicTopicId} from '../intelligence/publicFindings';

type Filter='all'|PublicTopicId;
type Props={filter:Filter;setFilter:(filter:Filter)=>void;selectedId?:string;selectFinding:(id:string)=>void;openEvidence:(id:string)=>void;showOnWall:(finding:PublicFinding)=>void};
const topicLabel=(topic:PublicTopicId)=>topic[0].toUpperCase()+topic.slice(1);
const ComparisonBlock=({finding}:{finding:PublicFinding})=><div className="finding-comparisons">{finding.comparisons.map(item=><section className="finding-comparison" key={item.metricId}><h3>{item.metricLabel}</h3><div className="comparison-values"><div><strong>{item.beforeValue}</strong><small>{item.beforePeriod}</small></div><span aria-hidden="true">↓</span><div><strong>{item.afterValue}</strong><small>{item.afterPeriod}</small></div></div><b>{item.deltaLabel}</b><small>{item.geography}</small></section>)}</div>;

export function WhatChangedView({filter,setFilter,selectedId,selectFinding,openEvidence,showOnWall}:Props){
  const all=useMemo(()=>getPublicFindings(),[]);const findings=all.filter(item=>filter==='all'||item.topicId===filter).slice(0,6);const selected=all.find(item=>item.id===selectedId);
  return <main className="national-wall changed-view">
    <section className="changed-hero"><span className="chapter-label">02 · BOTW INTELLIGENCE</span><h1>WHAT CHANGED IN BRITAIN?</h1><p>The biggest evidence-backed shifts in the systems we currently track.</p><small>LATEST COMPARABLE WALL PERIOD · {displayPeriod(2025)}</small></section>
    <nav className="topic-selector changed-filters" aria-label="What Changed topic filter">{(['all','health','immigration','housing'] as Filter[]).map(item=><button key={item} className={filter===item?'active':''} aria-pressed={filter===item} onClick={()=>setFilter(item)}>{item.toUpperCase()}</button>)}</nav>
    <section className="finding-grid" aria-label="Evidence-backed findings">{findings.map((finding,index)=><article key={finding.id} className={`finding-card ${index===0&&filter==='all'?'lead':''} ${selectedId===finding.id?'selected':''}`}>
      <button className="finding-select" onClick={()=>selectFinding(finding.id)} aria-expanded={selectedId===finding.id}>
        <span className="finding-topic">{index===0&&filter==='all'?'MOST MATERIAL CHANGE · ':''}{topicLabel(finding.topicId)}</span><h2>{finding.headline}</h2><ComparisonBlock finding={finding}/><p>{finding.summary}</p><small>{finding.periodLabel}</small><em>{finding.confidence==='medium'?'COMPARABILITY NOTE AVAILABLE':'EVIDENCE-LINKED'}</em>
      </button><div className="finding-actions"><button onClick={()=>openEvidence(finding.evidenceIds[0])}>VIEW EVIDENCE →</button><button className="primary-action" onClick={()=>showOnWall(finding)}>SHOW ME ON THE WALL</button></div>
    </article>)}</section>
    {selected&&<section className="finding-detail" aria-label={`Detail: ${selected.headline}`} tabIndex={-1}>
      <header><span>{topicLabel(selected.topicId)}</span><h2>{selected.headline}</h2><ComparisonBlock finding={selected}/></header>
      <div className="detail-grid"><section><h3>WHAT HAPPENED</h3><p>{selected.whatHappened}</p></section><section><h3>WHY BOTW FLAGGED IT</h3><p>{selected.whyFlagged}</p></section><section><h3>THE NUMBERS</h3><p>{selected.numberLine}</p><small>{selected.periodLabel}</small></section><section><h3>EVIDENCE</h3><p>{selected.evidenceIds.length} linked evidence {selected.evidenceIds.length===1?'record':'records'}.</p><button onClick={()=>openEvidence(selected.evidenceIds[0])}>VIEW EVIDENCE →</button></section><section className="detail-limit"><h3>WHAT THIS DOES NOT PROVE</h3><p>{selected.limitation}</p></section></div>
      <button className="wall-cta" onClick={()=>showOnWall(selected)}>SHOW ME ON THE WALL</button>
    </section>}
    <footer className="editorial-footer"><b>DETERMINISTIC · EVIDENCE-LINKED · NON-CAUSAL</b><span>Findings are generated from BOTW’s structured intelligence catalogue, not AI.</span></footer>
  </main>;
}
