import {getTopIntelligenceSignals} from './index';
import {seriesById} from './registry';
import type {ContradictionSignal,InflectionSignal,IntelligenceConfidence,IntelligenceSignal} from './types';
import {formatPublicMetricValue,semanticsFor} from '../metricSemantics';

export type PublicTopicId='health'|'immigration'|'housing';
export type PublicComparison={metricId:string;metricLabel:string;beforeValue:string;beforePeriod:string;afterValue:string;afterPeriod:string;deltaLabel:string;geography:string};
export type PublicFinding={
  id:string;topicId:PublicTopicId;headline:string;summary:string;signalKind:'turning-point'|'co-movement';signalType:string;
  primaryValue?:string;previousValue?:string;numberLine:string;periodLabel:string;confidence:IntelligenceConfidence;
  evidenceIds:string[];limitation:string;whatHappened:string;whyFlagged:string;rawSignalIds:string[];materiality:number;
  focusTarget:{topicId:PublicTopicId;periodId:string;metricIds:string[]};
  comparisons:PublicComparison[];
};

const publicLabels:Record<string,string>={
  'health-spend':'Health spending','health-workforce':'NHS workforce','health-rtt-activity':'NHS treatments completed','health-rtt-waiting':'NHS waiting list','health-rtt-18-week':'18-week NHS performance',
  'net-migration':'Net migration','asylum-awaiting-initial':'Asylum backlog','asylum-substantive-decisions':'Asylum decisions',
  'housing-spend':'Housing spending','housing-net-additions':'Home supply','housing-affordability':'Housing affordability','housing-temporary-accommodation':'Temporary accommodation',
};
const label=(id:string)=>publicLabels[id]??seriesById('',id)?.label??id;
const lower=(id:string)=>label(id).startsWith('NHS ')?`the ${label(id)}`:label(id).replace(/^./,char=>char.toLowerCase());
const format=(metricId:string,value:number|undefined,unit:string)=>formatPublicMetricValue(metricId,value,unit);
const unique=<T,>(items:T[])=>[...new Set(items)];
const pointFor=(topicId:string,metricId:string,periodId:string)=>seriesById(topicId,metricId)?.points.find(point=>point.periodId===periodId);
const previousPoint=(topicId:string,metricId:string,periodId:string)=>{const points=seriesById(topicId,metricId)?.points??[];const index=points.findIndex(point=>point.periodId===periodId);return index>0?points[index-1]:undefined};
const latestPoint=(topicId:string,metricId:string)=>[...(seriesById(topicId,metricId)?.points??[])].reverse().find(point=>point.value!==undefined);
const deltaLabel=(metricId:string,before:number|undefined,after:number|undefined,unit:string)=>{if(before===undefined||after===undefined||before===0)return 'No comparable percentage change';const change=after-before,arrow=change>0?'↑':change<0?'↓':'—';return unit==='percent'?`${arrow} ${Math.abs(change).toFixed(1)} percentage points`:`${arrow} ${Math.abs(change/before*100).toFixed(1)}%`};
const comparison=(metricId:string,beforeValue:number|undefined,beforePeriod:string,afterValue:number|undefined,afterPeriod:string,unit:string):PublicComparison=>({metricId,metricLabel:semanticsFor(metricId)?.publicLabel??label(metricId),beforeValue:format(metricId,beforeValue,unit),beforePeriod,afterValue:format(metricId,afterValue,unit),afterPeriod,deltaLabel:deltaLabel(metricId,beforeValue,afterValue,unit),geography:semanticsFor(metricId)?.geographyLabel??'United Kingdom'});

const inflectionHeadline=(signal:InflectionSignal,combined?:InflectionSignal)=>{
  const name=label(signal.metricId);
  if(combined)return signal.type==='peak'||combined.type==='peak'?`${name} peaked, then began falling`:`${name} bottomed out, then ${signal.metricId==='health-rtt-18-week'?'improved':'began rising'}`;
  const copy:Record<string,string>={peak:`${name} reached a peak`,trough:`${name} reached a low`,'reversal-up':`${name} changed direction and began rising`,'reversal-down':`${name} changed direction and began falling`,acceleration:`${name} changed faster`,deceleration:`${name} changed more slowly`};
  return copy[signal.type];
};

const contradictionHeadline=(signal:ContradictionSignal)=>{
  const left=label(signal.leftMetricId),right=lower(signal.rightMetricId);
  switch(signal.type){
    case 'spend-up-outcome-down':return `${left} rose while ${right} worsened`;
    case 'spend-down-outcome-up':return `${left} fell while ${right} improved`;
    case 'capacity-up-performance-down':return `${left} increased while ${right} worsened`;
    case 'capacity-down-performance-up':return `${left} fell while ${right} improved`;
    case 'output-up-backlog-up':return `${left} increased while ${right} also grew`;
    case 'output-up-outcome-down':return `${left} increased while ${right} worsened`;
    case 'supply-up-affordability-down':return `${left} rose while ${right} worsened`;
    case 'spend-up-output-down':return `${left} rose while ${right} fell`;
  }
};

const fromInflection=(signal:InflectionSignal,combined?:InflectionSignal):PublicFinding=>{
  const series=seriesById(signal.topicId,signal.metricId)!;const latest=latestPoint(signal.topicId,signal.metricId);const grouped=combined?[signal,combined]:[signal];
  const peakOrTrough=grouped.find(item=>item.type==='peak'||item.type==='trough')??signal;
  const headline=inflectionHeadline(signal,combined);const end=combined&&latest?.value!==undefined?latest.value:signal.nextValue??signal.value;
  return{id:`finding-${grouped.map(item=>item.id).sort().join('--')}`,topicId:signal.topicId as PublicTopicId,headline,
    summary:`${headline}. The comparable series moved from ${format(signal.metricId,peakOrTrough.value,series.unit)} to ${format(signal.metricId,end,series.unit)}.`,signalKind:'turning-point',signalType:grouped.map(item=>item.type).sort().join('+'),
    primaryValue:format(signal.metricId,end,series.unit),previousValue:format(signal.metricId,peakOrTrough.value,series.unit),numberLine:`${format(signal.metricId,peakOrTrough.value,series.unit)} → ${format(signal.metricId,end,series.unit)}`,
    periodLabel:`Turning point: ${peakOrTrough.measurementPeriod}${combined&&latest?.measurementPeriod?` · Latest: ${latest.measurementPeriod}`:''}`,confidence:grouped.some(item=>item.comparability==='medium')?'medium':'high',
    evidenceIds:unique(grouped.flatMap(item=>item.evidenceIds).concat(latest?.evidenceIds??[])),limitation:'This identifies a change in the shape of the series. It does not explain why the change happened.',
    whatHappened:headline+'.',whyFlagged:`The comparable series changed direction around ${peakOrTrough.measurementPeriod}.`,rawSignalIds:grouped.map(item=>item.id),materiality:Math.max(...grouped.map(item=>item.materiality)),
    focusTarget:{topicId:signal.topicId as PublicTopicId,periodId:signal.periodId,metricIds:[signal.metricId]},comparisons:[comparison(signal.metricId,peakOrTrough.value,peakOrTrough.measurementPeriod,end,combined&&latest?.measurementPeriod?latest.measurementPeriod:signal.measurementPeriod,series.unit)]};
};

const fromContradiction=(signal:ContradictionSignal):PublicFinding=>{
  const left=pointFor(signal.topicId,signal.leftMetricId,signal.periodId),right=pointFor(signal.topicId,signal.rightMetricId,signal.periodId),leftPrev=previousPoint(signal.topicId,signal.leftMetricId,signal.periodId),rightPrev=previousPoint(signal.topicId,signal.rightMetricId,signal.periodId);
  const leftSeries=seriesById(signal.topicId,signal.leftMetricId)!,rightSeries=seriesById(signal.topicId,signal.rightMetricId)!;const headline=contradictionHeadline(signal);
  const numberLine=`${semanticsFor(signal.leftMetricId)?.publicLabel??label(signal.leftMetricId)}: ${format(signal.leftMetricId,leftPrev?.value,leftSeries.unit)} → ${format(signal.leftMetricId,left?.value,leftSeries.unit)} · ${semanticsFor(signal.rightMetricId)?.publicLabel??label(signal.rightMetricId)}: ${format(signal.rightMetricId,rightPrev?.value,rightSeries.unit)} → ${format(signal.rightMetricId,right?.value,rightSeries.unit)}`;
  return{id:`finding-${signal.id}`,topicId:signal.topicId as PublicTopicId,headline,summary:`${signal.explanation.observed} Observed co-movement; not proof of cause.`,signalKind:'co-movement',signalType:signal.type,numberLine,periodLabel:`${signal.leftMeasurementPeriod} · ${signal.rightMeasurementPeriod}`,confidence:signal.comparability,evidenceIds:signal.evidenceIds,
    limitation:'Observed co-movement. Not evidence that one caused the other.',whatHappened:`${headline}.`,whyFlagged:`Both comparable measures moved in a noteworthy pattern in ${signal.periodId}.`,rawSignalIds:[signal.id],materiality:signal.materiality,
    focusTarget:{topicId:signal.topicId as PublicTopicId,periodId:signal.periodId,metricIds:[signal.leftMetricId,signal.rightMetricId]},comparisons:[comparison(signal.leftMetricId,leftPrev?.value,leftPrev?.measurementPeriod??'Previous comparable period',left?.value,left?.measurementPeriod??signal.leftMeasurementPeriod,leftSeries.unit),comparison(signal.rightMetricId,rightPrev?.value,rightPrev?.measurementPeriod??'Previous comparable period',right?.value,right?.measurementPeriod??signal.rightMeasurementPeriod,rightSeries.unit)]};
};

export const adaptSignalsToPublicFindings=(signals:IntelligenceSignal[]):PublicFinding[]=>{
  const consumed=new Set<string>();const findings:PublicFinding[]=[];
  signals.forEach(signal=>{if(consumed.has(signal.id))return;
    if(signal.kind==='inflection'&&(signal.type==='acceleration'||signal.type==='deceleration')){consumed.add(signal.id);return}
    if(signal.kind==='inflection'&&(signal.type==='peak'||signal.type==='trough')){
      const compatible=signal.type==='peak'?'reversal-down':'reversal-up';
      const partner=signals.find(item=>item.kind==='inflection'&&item.topicId===signal.topicId&&item.metricId===signal.metricId&&item.periodId===signal.periodId&&item.type===compatible) as InflectionSignal|undefined;
      consumed.add(signal.id);if(partner)consumed.add(partner.id);findings.push(fromInflection(signal,partner));return;
    }
    if(signal.kind==='inflection'&&((signal.type==='reversal-down'&&signals.some(item=>item.kind==='inflection'&&item.topicId===signal.topicId&&item.metricId===signal.metricId&&item.periodId===signal.periodId&&item.type==='peak'))||(signal.type==='reversal-up'&&signals.some(item=>item.kind==='inflection'&&item.topicId===signal.topicId&&item.metricId===signal.metricId&&item.periodId===signal.periodId&&item.type==='trough')))){consumed.add(signal.id);return}
    consumed.add(signal.id);findings.push(signal.kind==='inflection'?fromInflection(signal):fromContradiction(signal));
  });
  return findings.sort((a,b)=>b.materiality-a.materiality||Number(b.confidence==='high')-Number(a.confidence==='high')||b.focusTarget.periodId.localeCompare(a.focusTarget.periodId)||a.id.localeCompare(b.id));
};

export const getPublicFindings=()=>adaptSignalsToPublicFindings(getTopIntelligenceSignals({limit:999}));
