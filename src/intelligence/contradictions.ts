import {MATERIALITY_THRESHOLD,confidenceFor,materialityForSeries} from './materiality';
import type {ContradictionPattern,ContradictionSignal,IntelligenceDirection,IntelligenceMetricPoint,IntelligenceMetricSeries,IntelligenceRelationship} from './types';

const CAUTION='Observed co-movement. Not evidence that one caused the other.';
const direction=(from:number,to:number):IntelligenceDirection=>to>from?'up':to<from?'down':'flat';
const performance=(series:IntelligenceMetricSeries,direction:IntelligenceDirection)=>series.polarity==='neutral-context'||direction==='flat'?undefined:series.polarity==='higher-is-better'?(direction==='up'?'improved':'deteriorated'):(direction==='down'?'improved':'deteriorated');
const eligible=(point:IntelligenceMetricPoint|undefined):point is IntelligenceMetricPoint&{value:number;comparability:'high'|'medium'}=>!!point&&point.value!==undefined&&point.status!=='unavailable'&&point.comparability!=='low'&&point.evidenceIds.length>0;
const matches=(type:ContradictionPattern,left:IntelligenceDirection,right:IntelligenceDirection,rightPerformance?:'improved'|'deteriorated')=>({
  'spend-up-outcome-down':left==='up'&&rightPerformance==='deteriorated',
  'spend-down-outcome-up':left==='down'&&rightPerformance==='improved',
  'capacity-up-performance-down':left==='up'&&rightPerformance==='deteriorated',
  'capacity-down-performance-up':left==='down'&&rightPerformance==='improved',
  'output-up-backlog-up':left==='up'&&right==='up'&&rightPerformance==='deteriorated',
  'output-up-outcome-down':left==='up'&&rightPerformance==='deteriorated',
  'supply-up-affordability-down':left==='up'&&rightPerformance==='deteriorated',
  'spend-up-output-down':left==='up'&&right==='down',
}[type]);

export const detectContradictions=(relationship:IntelligenceRelationship,left:IntelligenceMetricSeries,right:IntelligenceMetricSeries):ContradictionSignal[]=>{
  if(left.topicId!==relationship.topicId||right.topicId!==relationship.topicId||left.metricId!==relationship.leftMetricId||right.metricId!==relationship.rightMetricId)return [];
  const signals:ContradictionSignal[]=[];
  for(let index=1;index<left.points.length;index++){
    const leftPrevious=left.points[index-1],leftCurrent=left.points[index];
    const rightCurrent=right.points.find(point=>point.periodId===leftCurrent.periodId);
    const rightPrevious=right.points.find(point=>point.periodId===leftPrevious.periodId);
    if(!eligible(leftPrevious)||!eligible(leftCurrent)||!eligible(rightPrevious)||!eligible(rightCurrent))continue;
    const confidence=confidenceFor([leftPrevious.comparability,leftCurrent.comparability,rightPrevious.comparability,rightCurrent.comparability]);
    const leftDirection=direction(leftPrevious.value,leftCurrent.value),rightDirection=direction(rightPrevious.value,rightCurrent.value),rightInterpretation=performance(right,rightDirection);
    const leftScore=materialityForSeries(left,leftPrevious.value,leftCurrent.value,confidence),rightScore=materialityForSeries(right,rightPrevious.value,rightCurrent.value,confidence);
    if(leftScore<MATERIALITY_THRESHOLD||rightScore<MATERIALITY_THRESHOLD)continue;
    for(const type of relationship.allowedSignalTypes){
      if(!matches(type,leftDirection,rightDirection,rightInterpretation))continue;
      signals.push({kind:'contradiction',id:`${relationship.id}:${leftCurrent.periodId}:${type}`,topicId:relationship.topicId,relationshipId:relationship.id,type,periodId:leftCurrent.periodId,leftMetricId:left.metricId,rightMetricId:right.metricId,leftDirection,rightDirection,rightInterpretation,leftMeasurementPeriod:leftCurrent.measurementPeriod,rightMeasurementPeriod:rightCurrent.measurementPeriod,materiality:Math.min(leftScore,rightScore),comparability:confidence,evidenceIds:[...new Set([...leftPrevious.evidenceIds,...leftCurrent.evidenceIds,...rightPrevious.evidenceIds,...rightCurrent.evidenceIds])],explanation:{observed:`${left.label} moved ${leftDirection} (${leftCurrent.measurementPeriod}) while ${right.label} moved ${rightDirection} (${rightCurrent.measurementPeriod}).`,whyFlagged:`Registered ${relationship.relationship} rule ${type} matched; ${relationship.periodAlignment}`,cannotSay:CAUTION}});
    }
  }
  return signals;
};
