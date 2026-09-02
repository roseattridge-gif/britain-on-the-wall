import type {Evidence,Year} from '../../types';
import {historicalSnapshots} from './historical';
import {classifyMetricChange,type MetricPolarity,type StoryEvent,type StoryMetric,type StoryMetricPoint,type YearMetricView,type YearStoryContext} from './story';

export type HealthStoryContext=YearStoryContext&{spend:{value:number;share:number;cashDirection:'up'|'down'|'flat';shareDirection:'up'|'down'|'flat';cashChange:number;shareChange:number;sourceIds:string[]};contradictions:string[]};

const evidence=(id:string,metric:string,url:string,source:string,published:string,definition:string,limitations:string,unit:string):Evidence=>({id,metric,definition,unit,period:'March snapshots, 2022–2026',geography:'England',basis:'NHS England official statistics',source,dataset:metric,url,published,checked:'2026-09-01',methodology:'The five-year story uses the March month-end or March monthly total aligned to each fiscal year end. Direction is calculated from consecutive accepted snapshots.',revision:'Latest published series used; figures may include NHS England estimates for missing submissions where stated.',confidence:'high',limitations,dataStatus:'official'});

export const healthStoryEvidence:Evidence[]=[
  evidence('story-health-rtt','Referral to treatment waiting times','https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/rtt-statistics-user-guidance/','NHS England','2026','Incomplete RTT pathways waiting to start consultant-led treatment at month end; and the percentage waiting no more than 18 weeks.','England only. Pathways are not unique patients. March 2024 has a documented scope change removing about 43,000 community-service pathways. Recent values can include estimates for missing trusts.','pathways / percent'),
  evidence('story-health-activity','Completed RTT pathways','https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/rtt-statistics-user-guidance/','NHS England','2026','Completed admitted plus non-admitted referral-to-treatment pathways during March.','England only. A monthly activity count, not an annual output or quality measure; pathways are not unique patients. Recent values can include estimates for missing trusts.','pathways completed in month'),
  evidence('story-health-workforce','NHS workforce statistics','https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics/march-2026','NHS England','2026-07-30','Full-time equivalent Hospital and Community Health Service staff in NHS trusts and other core organisations.','England only. Excludes primary care. Organisational coverage and later revisions should be checked when comparing releases.','full-time equivalent staff'),
  evidence('story-health-elective-plan-2022','Elective recovery delivery plan','https://www.england.nhs.uk/coronavirus/publication/delivery-plan-for-tackling-the-covid-19-backlog-of-elective-care/','NHS England','2022-02-08','Official delivery plan for recovering elective care and reducing the longest waits.','A documented policy event, not evidence of the size or cause of later performance changes.','policy event'),
  evidence('story-health-workforce-plan','NHS Long Term Workforce Plan','https://www.england.nhs.uk/publication/nhs-long-term-workforce-plan/','NHS England','2023-06-30','Official long-term workforce strategy covering training, retention and reform.','A documented policy event; publication is not the same as implementation or measured effect.','policy event'),
  evidence('story-health-elective-plan-2025','Reforming elective care for patients','https://www.england.nhs.uk/long-read/reforming-%20elective-care-for-patients/','NHS England / DHSC','2025-01-06','Official elective reform plan setting a route back to the 18-week standard.','A documented policy event; chronology alone cannot attribute subsequent movement to the plan.','policy event'),
];

const point=(metricId:string,date:string,periodLabel:string,value:number,unit:string,sourceId:string,comparability:StoryMetricPoint['comparability']='high'):StoryMetricPoint=>({metricId,date,periodLabel,value,unit,sourceIds:[sourceId],status:'official',comparability});
const march=['31 Mar 2022','31 Mar 2023','31 Mar 2024','31 Mar 2025','31 Mar 2026'];
const dates=['2022-03-31','2023-03-31','2024-03-31','2025-03-31','2026-03-31'];
const series=(id:string,label:string,definition:string,polarity:MetricPolarity,values:number[],unit:string,sourceId:string):StoryMetric=>({id,label,definition,polarity,points:values.map((value,index)=>point(id,dates[index],march[index],value,unit,sourceId,index===2?'medium':'high'))});
export const healthSystemMetrics:StoryMetric[]=[
  series('health-workforce','NHS workforce','Hospital and Community Health Service staff in NHS trusts and core organisations, full-time equivalent.','neutral-context',[1226677,1280350,1345047,1378470,1379670],'FTE','story-health-workforce'),
  series('health-rtt-activity','Completed pathways','Admitted plus non-admitted RTT pathways completed during March.','neutral-context',[1439589,1536762,1429572,1535984,1711408],'pathways','story-health-activity'),
  series('health-rtt-waiting','Waiting list','Incomplete RTT pathways waiting to start consultant-led treatment at March month end.','lower-is-better',[6365772,7331186,7538830,7418598,7106091],'pathways','story-health-rtt'),
  series('health-rtt-18-week','Within 18 weeks','Percentage of incomplete RTT pathways waiting no more than 18 weeks.','higher-is-better',[62.2,58.6,57.2,59.8,65.3],'percent','story-health-rtt'),
];

const healthEvents:StoryEvent[]=[
  {id:'health-elective-plan-2022',topicId:'health',date:'2022-02-08',track:'policy',title:'Elective recovery plan',summary:'NHS England publishes its plan to tackle the COVID-19 elective backlog.',governmentId:'johnson',relationship:'documented-policy',confidence:'high',sourceIds:['story-health-elective-plan-2022']},
  {id:'health-workforce-plan-2023',topicId:'health',date:'2023-06-30',track:'policy',title:'Long Term Workforce Plan',summary:'NHS England publishes its first comprehensive long-term workforce plan.',governmentId:'sunak',relationship:'documented-policy',confidence:'high',sourceIds:['story-health-workforce-plan']},
  {id:'health-elective-plan-2025',topicId:'health',date:'2025-01-06',track:'policy',title:'Elective reform plan',summary:'A new plan sets a route back to the 18-week standard.',governmentId:'starmer',relationship:'documented-policy',confidence:'high',sourceIds:['story-health-elective-plan-2025']},
];

const governments:Record<number,{government:string;handover?:string;inherited:string;after:string}>={
  2021:{government:'Conservative · Boris Johnson',inherited:'No government handover in this fiscal period.',after:'Waiting list rose and 18-week performance fell by March 2023.'},
  2022:{government:'Conservative · Johnson → Truss → Sunak',inherited:'Leadership changed within the same governing party.',after:'Workforce rose while waiting-list performance deteriorated by March 2024.'},
  2023:{government:'Conservative · Rishi Sunak',inherited:'No government handover in this fiscal period.',after:'The March 2024 waiting list was higher and 18-week performance lower than a year earlier.'},
  2024:{government:'Conservative → Labour',handover:'5 July 2024',inherited:'At handover the waiting list remained near its high and 18-week performance remained well below the 92% standard.',after:'By March 2025 the waiting list was lower and 18-week performance higher; chronology only.'},
  2025:{government:'Labour · Keir Starmer',inherited:'The incoming government inherited a large waiting list, rising workforce and performance below the 18-week standard.',after:'By March 2026 the waiting list fell further, completed pathways rose and workforce was broadly flat.'},
};

const direction=(from:number,to:number):'up'|'down'|'flat'=>to>from?'up':to<from?'down':'flat';
const view=(metric:StoryMetric,index:number):YearMetricView=>{const current=metric.points[index],previous=index?metric.points[index-1]:undefined;return {label:metric.label,value:current.value,unit:current.unit,period:current.periodLabel,direction:previous&&previous.value!==undefined&&current.value!==undefined?direction(previous.value,current.value):'mixed',polarity:metric.polarity,classification:previous?classifyMetricChange(previous.value,current.value,metric.polarity):'BASELINE',comparability:current.comparability,sourceIds:current.sourceIds}};
export const detectHealthContradictions=(spendDirection:'up'|'down'|'flat',capacityDirection:'up'|'down'|'flat'|'mixed',waitingClassification:string,performanceClassification:string)=>{
  const performanceDown=waitingClassification==='DECLINED'||performanceClassification==='DECLINED';
  const labels:string[]=[];
  if(spendDirection==='up'&&performanceDown)labels.push('SPEND UP · PERFORMANCE DOWN');
  if(capacityDirection==='up'&&performanceDown)labels.push('CAPACITY UP · PERFORMANCE DOWN');
  return labels;
};

export const healthStoryContextForYear=(year:Year):HealthStoryContext=>{
  const accepted=(year>=2021&&year<=2025?year:2025) as 2021|2022|2023|2024|2025,index=accepted-2021;
  const snapshot=historicalSnapshots[index],health=snapshot.flows.find(flow=>flow.id.endsWith('-out-health'))!;
  const previous=index?historicalSnapshots[index-1]:snapshot,previousHealth=previous.flows.find(flow=>flow.id.endsWith('-out-health'))!;
  const metrics=healthSystemMetrics.map(metric=>view(metric,index));
  const spendDirection=direction(previousHealth.value,health.value),capacityDirection=metrics[0].direction;
  return {year:accepted,...governments[accepted],metric:metrics[2],operational:[metrics[0],metrics[1],metrics[3]],events:healthEvents.filter(event=>event.date>=`${accepted}-04-01`&&event.date<`${accepted+1}-04-01`),spend:{value:health.value,share:health.perHundred,cashDirection:spendDirection,shareDirection:direction(previousHealth.perHundred,health.perHundred),cashChange:health.value-previousHealth.value,shareChange:health.perHundred-previousHealth.perHundred,sourceIds:health.sourceIds},contradictions:index?detectHealthContradictions(spendDirection,capacityDirection,metrics[2].classification,metrics[3].classification):[]};
};

export const healthStoryEvidenceById=(id:string)=>healthStoryEvidence.find(item=>item.id===id);
