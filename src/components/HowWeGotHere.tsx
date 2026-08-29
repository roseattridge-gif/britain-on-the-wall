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
          <div><dt>SYSTEM</dt><dd><b>{context.metric.value!==undefined?`${context.metric.value.toLocaleString()}k`:context.metric.classification}</b><small>{context.metric.label} · {context.metric.period}</small></dd></div>
          <div><dt>OUTCOME</dt><dd><b>{context.metric.classification}</b><small>CONTEXT ONLY · neutral polarity</small></dd></div>
        </dl>
      </article>})}
    </div><aside className="evidence-summary"><b>WHAT THE EVIDENCE SUGGESTS</b><dl><div><dt>SELECTED YEAR</dt><dd>{displayPeriod(selected.year)} · {selected.government}</dd></div><div><dt>INHERITED TREND</dt><dd>{selected.inherited}</dd></div><div><dt>AFTER HANDOVER</dt><dd>{selected.after}</dd></div><div><dt>WHAT CANNOT BE CLAIMED</dt><dd>Timing alone cannot assign the movement to one policy, party or prime minister.</dd></div></dl><button onClick={()=>openEvidence('story-ons-net-migration')}>Inspect official net-migration evidence ↗</button></aside></div>
  </section>;
}
