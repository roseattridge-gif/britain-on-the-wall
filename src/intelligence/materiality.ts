import type {IntelligenceConfidence,IntelligenceMetricSeries} from './types';

const round=(value:number)=>Math.round(value*100)/100;

export const confidenceFor=(levels:('high'|'medium')[]):IntelligenceConfidence=>levels.every(level=>level==='high')?'high':'medium';

/** A 0–100 ranking score, not a test of statistical significance. */
export const calculateMateriality=(from:number,to:number,seriesValues:number[],comparability:IntelligenceConfidence='high')=>{
  const absolute=Math.abs(to-from);
  const magnitude=Math.max(Math.abs(from),Math.abs(to),Number.EPSILON);
  const range=Math.max(...seriesValues)-Math.min(...seriesValues);
  const scale=Math.max(range,magnitude*0.1);
  const proportional=Math.min(100,absolute/magnitude*100);
  const scaleRelative=Math.min(100,absolute/scale*100);
  const confidenceWeight=comparability==='high'?1:0.75;
  return round((proportional*0.6+scaleRelative*0.4)*confidenceWeight);
};

export const materialityForSeries=(series:IntelligenceMetricSeries,from:number,to:number,confidence:IntelligenceConfidence)=>calculateMateriality(from,to,series.points.flatMap(point=>point.value===undefined?[]:[point.value]),confidence);

export const MATERIALITY_THRESHOLD=3;
