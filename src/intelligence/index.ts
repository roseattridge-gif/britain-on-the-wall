import {detectContradictions} from './contradictions';
import {detectInflections} from './inflections';
import {intelligenceRelationships,intelligenceSeries,seriesById} from './registry';
import type {IntelligenceSignal} from './types';

export * from './types';
export * from './materiality';
export * from './inflections';
export * from './contradictions';
export * from './registry';

const confidenceRank={high:2,medium:1};
const periodRank=(periodId:string)=>Number(periodId.slice(0,4));
const ordered=(signals:IntelligenceSignal[])=>signals.sort((a,b)=>b.materiality-a.materiality||confidenceRank[b.comparability]-confidenceRank[a.comparability]||periodRank(b.periodId)-periodRank(a.periodId)||a.id.localeCompare(b.id));

export const getIntelligenceSignals=({topicId,periodId}:{topicId:string;periodId?:string}):IntelligenceSignal[]=>{
  const series=intelligenceSeries.filter(item=>item.topicId===topicId);
  const inflections=series.flatMap(detectInflections);
  const contradictions=intelligenceRelationships.filter(item=>item.topicId===topicId).flatMap(relationship=>{
    const left=seriesById(topicId,relationship.leftMetricId),right=seriesById(topicId,relationship.rightMetricId);
    return left&&right?detectContradictions(relationship,left,right):[];
  });
  return ordered([...inflections,...contradictions].filter(signal=>!periodId||signal.periodId===periodId));
};

export const getTopIntelligenceSignals=({topicId,limit}:{topicId?:string;limit:number}):IntelligenceSignal[]=>ordered((topicId?[topicId]:[...new Set(intelligenceSeries.map(item=>item.topicId))]).flatMap(id=>getIntelligenceSignals({topicId:id}))).slice(0,Math.max(0,limit));
