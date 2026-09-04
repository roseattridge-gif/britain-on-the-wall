import {describe,expect,it} from 'vitest';
import {calculateMateriality,detectContradictions,detectInflections,getIntelligenceSignals,getTopIntelligenceSignals,intelligenceRelationships,intelligenceSeries,MATERIALITY_THRESHOLD} from './index';
import type {IntelligenceMetricSeries,IntelligenceRelationship} from './types';

const series=(values:(number|undefined)[],overrides:Partial<IntelligenceMetricSeries>={}):IntelligenceMetricSeries=>({metricId:'metric',topicId:'test',label:'Test metric',definition:'Fixture',dimension:'outcome',unit:'units',polarity:'higher-is-better',geography:'Test',measurementBasis:'calendar-year',points:values.map((value,index)=>({periodId:`202${index}-2${index+1}`,measurementPeriod:`Calendar 202${index}`,date:`202${index}-12-31`,value,evidenceIds:[`e${index}`],comparability:'high',status:value===undefined?'unavailable':'official'})),...overrides});

describe('materiality',()=>{
  it('combines proportional and within-series scale and downgrades medium confidence',()=>{const high=calculateMateriality(100,130,[100,130,200],'high'),medium=calculateMateriality(100,130,[100,130,200],'medium');expect(high).toBeGreaterThan(MATERIALITY_THRESHOLD);expect(medium).toBeLessThan(high)});
  it('does not treat a tiny wiggle as material',()=>expect(calculateMateriality(100,100.01,[100,100.01,110])).toBeLessThan(MATERIALITY_THRESHOLD));
});

describe('inflections',()=>{
  it('detects a peak and reversal down',()=>expect(detectInflections(series([10,30,12])).map(signal=>signal.type)).toEqual(['peak','reversal-down']));
  it('detects a trough and reversal up',()=>expect(detectInflections(series([30,10,28])).map(signal=>signal.type)).toEqual(['trough','reversal-up']));
  it('detects acceleration and deceleration',()=>{expect(detectInflections(series([10,20,50])).map(signal=>signal.type)).toContain('acceleration');expect(detectInflections(series([10,40,50])).map(signal=>signal.type)).toContain('deceleration')});
  it('skips noise, unavailable points and LOW comparability',()=>{expect(detectInflections(series([100,100.01,110]))).toEqual([]);expect(detectInflections(series([10,undefined,30]))).toEqual([]);const low=series([10,30,12]);low.points[1].comparability='low';expect(detectInflections(low)).toEqual([])});
  it('keeps neutral context descriptive',()=>{const signals=detectInflections(series([10,30,12],{polarity:'neutral-context'}));expect(signals[0].explanation.observed).not.toMatch(/improved|declined|better|worse/i)});
});

describe('registered contradiction detection',()=>{
  const relationship:IntelligenceRelationship={id:'registered',topicId:'test',leftMetricId:'money',rightMetricId:'outcome',allowedSignalTypes:['spend-up-outcome-down','spend-down-outcome-up'],relationship:'money-to-outcome',interpretation:'co-movement-only',periodAlignment:'fixture periods align.'};
  const money=(values:number[])=>series(values,{metricId:'money',dimension:'money',polarity:'neutral-context'});
  it('uses lower-is-better polarity for deterioration and improvement',()=>{const worse=detectContradictions(relationship,money([100,130]),series([10,20],{metricId:'outcome',polarity:'lower-is-better'}));expect(worse[0]).toMatchObject({type:'spend-up-outcome-down',rightInterpretation:'deteriorated'});const better=detectContradictions(relationship,money([130,100]),series([20,10],{metricId:'outcome',polarity:'lower-is-better'}));expect(better[0]).toMatchObject({type:'spend-down-outcome-up',rightInterpretation:'improved'})});
  it('uses higher-is-better polarity correctly',()=>{const signal=detectContradictions(relationship,money([100,130]),series([80,60],{metricId:'outcome',polarity:'higher-is-better'}))[0];expect(signal.rightInterpretation).toBe('deteriorated')});
  it('requires an exact registration and carries evidence from both movements',()=>{expect(detectContradictions({...relationship,leftMetricId:'other'},money([100,130]),series([10,20],{metricId:'outcome',polarity:'lower-is-better'}))).toEqual([]);const signal=detectContradictions(relationship,money([100,130]),series([10,20],{metricId:'outcome',polarity:'lower-is-better'}))[0];expect(signal.evidenceIds).toEqual(expect.arrayContaining(['e0','e1']));expect(signal.explanation.cannotSay).toMatch(/not evidence.*caused/i)});
  it('rejects tiny co-movement and evidence-free candidates',()=>{expect(detectContradictions(relationship,money([100,100.01]),series([10,10.001],{metricId:'outcome',polarity:'lower-is-better'}))).toEqual([]);const outcome=series([10,20],{metricId:'outcome',polarity:'lower-is-better'});outcome.points[1].evidenceIds=[];expect(detectContradictions(relationship,money([100,130]),outcome)).toEqual([])});
  it('supports capacity up with performance down',()=>{const registered:IntelligenceRelationship={...relationship,leftMetricId:'capacity',allowedSignalTypes:['capacity-up-performance-down'],relationship:'capacity-to-outcome'};expect(detectContradictions(registered,series([100,130],{metricId:'capacity',dimension:'capacity',polarity:'neutral-context'}),series([80,60],{metricId:'outcome'}))[0].type).toBe('capacity-up-performance-down')});
});

describe('domain registry regression',()=>{
  // Signal catalogue assertions below intentionally use real registered data.
  it('produces evidence-backed Health co-movements and later outcome reversals',()=>{const signals=getIntelligenceSignals({topicId:'health'});expect(signals.some(signal=>signal.kind==='contradiction'&&signal.type==='spend-up-outcome-down')).toBe(true);expect(signals.some(signal=>signal.kind==='contradiction'&&signal.type==='capacity-up-performance-down')).toBe(true);expect(signals.some(signal=>signal.kind==='inflection'&&signal.metricId==='health-rtt-waiting'&&signal.type==='reversal-down')).toBe(true);expect(signals.every(signal=>signal.evidenceIds.length>0)).toBe(true)});
  it('finds Immigration inflections without treating net migration as performance',()=>{const signals=getIntelligenceSignals({topicId:'immigration'});expect(signals.some(signal=>signal.kind==='inflection'&&signal.metricId==='asylum-awaiting-initial')).toBe(true);expect(signals.filter(signal=>signal.kind==='inflection'&&signal.metricId==='net-migration').every(signal=>!signal.explanation.observed.match(/improved|declined/i))).toBe(true)});
  it('keeps missing Housing supply unavailable and out of current signals',()=>{const supply=intelligenceSeries.find(item=>item.metricId==='housing-net-additions')!;expect(supply.points.at(-1)).toMatchObject({value:undefined,status:'unavailable',measurementPeriod:'2025–26 · annual release pending'});expect(getIntelligenceSignals({topicId:'housing',periodId:'2025-26'}).every(signal=>signal.kind!=='contradiction'||signal.leftMetricId!=='housing-net-additions')).toBe(true)});
  it('registers only the requested cross-metric relationships and provides ranked catalogue APIs',()=>{expect(intelligenceRelationships.some(item=>item.id==='immigration-decisions-backlog')).toBe(true);expect(getTopIntelligenceSignals({limit:3})).toHaveLength(3);expect(getTopIntelligenceSignals({topicId:'health',limit:2}).every(signal=>signal.topicId==='health')).toBe(true)});
});
