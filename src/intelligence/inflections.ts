import {MATERIALITY_THRESHOLD,confidenceFor,materialityForSeries} from './materiality';
import type {InflectionSignal,InflectionType,IntelligenceMetricPoint,IntelligenceMetricSeries} from './types';

const CAUTION='The signal describes the shape of this series. It does not explain why the values changed or attribute the change to a policy or government.';
const eligible=(point:IntelligenceMetricPoint):point is IntelligenceMetricPoint&{value:number;comparability:'high'|'medium'}=>point.value!==undefined&&point.status!=='unavailable'&&point.comparability!=='low'&&point.evidenceIds.length>0;
const pct=(from:number,to:number)=>from===0?undefined:(to-from)/Math.abs(from)*100;

const make=(series:IntelligenceMetricSeries,type:InflectionType,index:number,materiality:number):InflectionSignal=>{
  const previous=series.points[index-1],current=series.points[index],next=series.points[index+1];
  const evidenceIds=[...new Set([previous,current,next].flatMap(point=>point?.evidenceIds??[]))];
  return {kind:'inflection',id:`${series.topicId}:${series.metricId}:${current.periodId}:${type}`,topicId:series.topicId,metricId:series.metricId,type,periodId:current.periodId,measurementPeriod:current.measurementPeriod,previousValue:previous?.value,value:current.value!,nextValue:next?.value,absoluteChange:previous?.value===undefined?undefined:current.value!-previous.value,percentageChange:previous?.value===undefined?undefined:pct(previous.value,current.value!),materiality,comparability:confidenceFor([previous,current,next].filter(Boolean).map(point=>point.comparability as 'high'|'medium')),evidenceIds,explanation:{observed:`${series.label} forms a ${type.replace('-', ' ')} at ${current.measurementPeriod}.`,whyFlagged:`Consecutive comparable values met the deterministic ${type.replace('-', ' ')} rule and materiality threshold.`,cannotSay:CAUTION}};
};

export const detectInflections=(series:IntelligenceMetricSeries):InflectionSignal[]=>{
  const signals:InflectionSignal[]=[];
  for(let index=1;index<series.points.length-1;index++){
    const previous=series.points[index-1],current=series.points[index],next=series.points[index+1];
    if(!eligible(previous)||!eligible(current)||!eligible(next))continue;
    const confidence=confidenceFor([previous.comparability,current.comparability,next.comparability]);
    const before=current.value-previous.value,after=next.value-current.value;
    const beforeScore=materialityForSeries(series,previous.value,current.value,confidence),afterScore=materialityForSeries(series,current.value,next.value,confidence);
    if(beforeScore<MATERIALITY_THRESHOLD||afterScore<MATERIALITY_THRESHOLD)continue;
    const shapeScore=Math.min(beforeScore,afterScore);
    if(before>0&&after<0){signals.push(make(series,'peak',index,shapeScore),make(series,'reversal-down',index,shapeScore));continue}
    if(before<0&&after>0){signals.push(make(series,'trough',index,shapeScore),make(series,'reversal-up',index,shapeScore));continue}
    if(Math.sign(before)!==Math.sign(after)||before===0||after===0)continue;
    const rateScore=materialityForSeries(series,Math.abs(before),Math.abs(after),confidence);
    if(rateScore<MATERIALITY_THRESHOLD)continue;
    signals.push(make(series,Math.abs(after)>Math.abs(before)?'acceleration':'deceleration',index,Math.min(Math.max(beforeScore,afterScore),rateScore)));
  }
  return signals;
};
