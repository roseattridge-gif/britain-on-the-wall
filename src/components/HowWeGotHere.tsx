import {immigrationStory,sortedStoryEvents,type StoryEvent} from '../data/real/story';

const start=new Date('2021-04-01T00:00:00Z').getTime(),end=new Date('2025-06-30T00:00:00Z').getTime();
const x=(date:string)=>Math.max(0,Math.min(100,(new Date(`${date}T00:00:00Z`).getTime()-start)/(end-start)*100));
const relationLabel:Record<StoryEvent['relationship'],string>={'documented-policy':'POLICY CHANGE','authoritative-contributor':'EVIDENCE SUPPORTS CONTRIBUTION','followed-by':'FOLLOWED BY','context-only':'CONTEXT ONLY',uncertain:'UNCERTAIN'};

export function HowWeGotHere({openEvidence}:{openEvidence:(id:string)=>void}){
  const story=immigrationStory,events=sortedStoryEvents(story),policy=events.filter(event=>event.track==='policy'),measures=events.filter(event=>event.track==='system'||event.track==='outcome');
  return <section className="story-chronology" aria-label="How We Got Here — Immigration">
    <header><div><small>HOW WE GOT HERE</small><h2>Immigration</h2><span>Chronology is not causation. Attribution requires evidence.</span></div><button className="topic-selector">STORY: IMMIGRATION ▾</button></header>
    <div className="story-body"><div className="story-tracks">
      <div className="story-track government-track"><b>GOVERNMENT</b><div className="track-line">{story.governmentPeriods.map(period=><button key={period.id} style={{left:`${x(period.startDate)}%`,width:`${x(period.endDate??'2025-06-30')-x(period.startDate)}%`}} onClick={()=>openEvidence(period.sourceId)}><strong>{period.primeMinister?.split(' ').at(-1)}</strong><small>{period.party}</small></button>)}<i className="handover" style={{left:`${x(story.handover.date)}%`}}><span>HANDOVER</span></i></div></div>
      <div className="story-track policy-track"><b>POLICY / MONEY / CAPACITY</b><div className="track-line">{policy.map((event,index)=><button key={event.id} className={`event-dot ${event.id} row-${index%3}`} style={{left:`${x(event.date)}%`}} onClick={()=>openEvidence(event.sourceIds[0])}><i/><span>{event.title}</span><small>{relationLabel[event.relationship]}</small></button>)}</div></div>
      <div className="story-track system-track"><b>SYSTEM MEASURE</b><div className="track-line trend"><svg viewBox="0 0 100 26" preserveAspectRatio="none" aria-hidden="true"><path d="M48 3 C62 4 70 9 77 12 S91 22 100 24"/><line x1={x(story.handover.date)} x2={x(story.handover.date)} y1="0" y2="26"/></svg>{measures.map(event=><button key={event.id} style={{left:`${x(event.date)}%`}} onClick={()=>openEvidence(event.sourceIds[0])}><i/><strong>{event.value?.toLocaleString()}k</strong><span>{event.title}</span></button>)}</div></div>
      <div className="story-track outcome-track"><b>OUTCOME / EXPERIENCE</b><div className="track-line"><span>Long-term net migration is a population outcome—not a government score.</span><em>RISING → PEAKED → FALLING AT HANDOVER → FELL FURTHER</em></div></div>
      <div className="story-years">{['2021','2022','2023','2024','2025'].map((year,index)=><span key={year} style={{left:`${index*24.4}%`}}>{year}</span>)}</div>
    </div><aside className="evidence-summary"><b>WHAT THE EVIDENCE SUGGESTS</b><dl><div><dt>OBSERVED</dt><dd>{story.summary.observed}</dd></div><div><dt>ATTRIBUTION</dt><dd>{story.summary.attribution}</dd></div><div><dt>CAN’T SAY</dt><dd>{story.summary.cannotSay}</dd></div></dl><p><strong>INHERITED:</strong> falling · <strong>AFTER:</strong> fall continued</p></aside></div>
  </section>;
}
