import {displayPeriod,realYears,type RealYear} from '../data/real/adapter';
import {storyContextForYear} from '../data/real/story';
import type {Year} from '../types';

export function HowWeGotHere({year,setYear,openEvidence}:{year:Year;setYear:(year:Year)=>void;openEvidence:(id:string)=>void}){
  const contexts=realYears.map(item=>storyContextForYear(item));
  const selected=storyContextForYear(year);
  return <section className="story-chronology" aria-label="How We Got Here — Immigration">
    <header><div><small>HOW WE GOT HERE</small><h2>Immigration</h2><span>Government at the time, policy ownership and outcome date are separate. Chronology is not causation.</span></div><button className="topic-selector">TOPIC: IMMIGRATION</button></header>
    <div className="story-body"><div className="year-matrix" aria-label="Immigration five-year chronology">
      {contexts.map(context=>{const policy=context.events.filter(event=>event.track==='policy');return <article key={context.year} className={context.year===year?'selected':''}>
        <button className="matrix-year" onClick={()=>setYear(context.year as RealYear)} aria-label={`View ${displayPeriod(context.year)} in chronology`} aria-pressed={context.year===year}>{displayPeriod(context.year)}</button>
        <dl>
          <div><dt>GOVERNMENT</dt><dd>{context.government}{context.handover&&<small>Handover: {context.handover}</small>}</dd></div>
          <div><dt>KEY POLICY</dt><dd>{policy.length?policy.map(event=><button key={event.id} onClick={()=>openEvidence(event.sourceIds[0])}>{event.title}<small>{event.date} · policy owner recorded</small></button>):<span>No selected material event</span>}</dd></div>
          <div className="metric-row"><dt>NET MIGRATION</dt><dd><b>{context.metric.value!==undefined?`${context.metric.value.toLocaleString()}k`:context.metric.classification}</b><small>{context.metric.period} · {context.metric.classification} · context only</small></dd></div>
          {context.operational.map(metric=><div className="metric-row" key={metric.label}><dt>{metric.label.toUpperCase()}</dt><dd><button onClick={()=>openEvidence(metric.sourceIds[0])}><b>{metric.value?.toLocaleString()}</b><small>{metric.period} · {metric.classification} · {metric.comparability.toUpperCase()}</small></button></dd></div>)}
        </dl>
      </article>})}
    </div><aside className="evidence-summary"><b>SYSTEM STATE</b><dl><div><dt>DEMAND / VOLUME</dt><dd>{selected.metric.value!==undefined?`${selected.metric.value.toLocaleString()}k · ${selected.metric.period}`:selected.metric.period} · {selected.metric.classification}</dd></div><div><dt>SYSTEM CAPACITY</dt><dd>{selected.operational[1].value?.toLocaleString()} substantive initial decisions · {selected.operational[1].classification}</dd></div><div><dt>BACKLOG</dt><dd>{selected.operational[0].value?.toLocaleString()} people · {selected.operational[0].classification}</dd></div><div><dt>GOVERNMENT CONTEXT</dt><dd>{selected.government}{selected.handover?` · handover ${selected.handover}`:''}</dd></div><div><dt>AT HANDOVER / INHERITED</dt><dd>{selected.inherited}</dd></div><div><dt>AFTER HANDOVER</dt><dd>{selected.after}</dd></div><div><dt>ATTRIBUTION</dt><dd>Policy dates and movements are linked only where official evidence supports contribution; otherwise chronology only.</dd></div><div><dt>LIMIT</dt><dd>Timing alone cannot assign movement to one policy, party or prime minister.</dd></div></dl><button onClick={()=>openEvidence('story-asylum-awaiting')}>Inspect Home Office system evidence ↗</button></aside></div>
  </section>;
}
