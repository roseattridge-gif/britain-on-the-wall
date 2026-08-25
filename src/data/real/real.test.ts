import {describe,expect,it} from 'vitest';
import {nationalData} from './adapter';
import {borrowing,fiscalFlows,moneyIn,moneyOut,nationalPool} from './normalized';
import {bridgedResidual,previousResidual,residualBridge} from './residualBridge';
import {healthAllocation,healthComponents,healthMetrics,metricStatus} from './health';

const sum=(values:{value:number}[])=>values.reduce((total,item)=>total+item.value,0);
describe('2025-26 national fiscal backbone',()=>{
  it('reconciles money in and money out to the same pool',()=>{expect(sum(moneyIn)).toBeCloseTo(nationalPool,9);expect(sum(moneyOut)).toBeCloseTo(nationalPool,9)});
  it('transforms both directions to approximately £100',()=>{expect(sum(moneyIn.map(x=>({value:x.value/nationalPool*100})))).toBeCloseTo(100,9);expect(sum(moneyOut.map(x=>({value:x.value/nationalPool*100})))).toBeCloseTo(100,9)});
  it('has unique flow and evidence identifiers',()=>{expect(new Set(fiscalFlows.map(x=>x.id)).size).toBe(fiscalFlows.length);expect(new Set(nationalData.evidence.map(x=>x.id)).size).toBe(nationalData.evidence.length)});
  it('gives every rendered real numeric node evidence',()=>{const evidence=new Map(nationalData.evidence.map(x=>[x.id,x]));[...nationalData.funding,...nationalData.domains].forEach(node=>{expect(evidence.get(node.evidenceId)?.value).toBeCloseTo(node.values[2025],9);expect(evidence.get(node.evidenceId)?.dataStatus).not.toBe('unresolved')})});
  it('keeps borrowing distinct and derived',()=>{const node=nationalData.funding.find(x=>x.id==='borrowing');expect(node?.borrowing).toBe(true);expect(node?.dataStatus).toBe('derived-from-official');expect(node?.values[2025]).toBeCloseTo(borrowing,9)});
  it('does not overstate who bears combined social contributions',()=>{expect(nationalData.funding.find(x=>x.id==='income')?.name).toBe('Income & social contributions')});
  it('does not create a local-government destination that double counts functions',()=>{expect(nationalData.domains.some(x=>x.id==='local')).toBe(false)});
  it('fully explains the former residual using published lines',()=>{expect(bridgedResidual).toBeCloseTo(previousResidual,9);expect(moneyOut.some(x=>x.id==='other')).toBe(false);expect(moneyOut.find(x=>x.id==='technical')?.value).toBeCloseTo(132.308,9)});
  it('assigns every expenditure mapping token once',()=>{const lineIds=moneyOut.filter(x=>x.id!=='local').flatMap(x=>x.officialLineIds);expect(new Set(lineIds).size).toBe(lineIds.length);const extracted=moneyOut.filter(x=>['economy','environment','culture','technical'].includes(x.id)).flatMap(x=>x.officialLineIds).sort();expect(extracted).toEqual(residualBridge.map(x=>x.officialLineId).sort())});
  it('keeps technical reconciliation separate from illustrative leaks',()=>{const technical=moneyOut.find(x=>x.id==='technical');expect(technical?.technical).toBe(true);expect(nationalData.leaks.some(x=>x.id==='technical')).toBe(false)});
});
describe('real Health domain',()=>{
  it('reconciles displayed PESA lines to the parent within published rounding',()=>{for(const year of [2021,2022,2023,2024,2025] as const){const components=Object.values(healthAllocation).reduce((total,series)=>total+series[year],0);const parent=nationalData.domains.find(x=>x.id==='health')!.values[year];expect(Math.abs(components-parent)).toBeLessThanOrEqual(.0011)}});
  it('does not double count any Health allocation component',()=>{expect(new Set(healthComponents.map(x=>x.id)).size).toBe(healthComponents.length)});
  it('gives every real Health object evidence',()=>{const ids=new Set(nationalData.evidence.map(x=>x.id));[...healthComponents,...healthMetrics].forEach(x=>expect(ids.has(x.evidenceId)).toBe(true))});
  it('defines geography and polarity explicitly',()=>{healthMetrics.forEach(x=>{expect(x.geography).toBe('England');expect(['higher-is-better','lower-is-better','neutral']).toContain(x.polarity)})});
  it('derives status using metric polarity',()=>{expect(metricStatus(healthMetrics.find(x=>x.id==='rtt-18-weeks')!,2025)).toBe('improving');expect(metricStatus(healthMetrics.find(x=>x.id==='ae-twelve-hours')!,2025)).toBe('deteriorating');expect(metricStatus(healthMetrics.find(x=>x.id==='gp-appointments')!,2025)).toBe('unavailable')});
  it('keeps actual periods and output/outcome roles',()=>{expect(healthMetrics.find(x=>x.id==='gp-experience')?.periods[2025]).toBe('2025 survey');expect(healthMetrics.some(x=>x.kind==='output')).toBe(true);expect(healthMetrics.some(x=>x.kind==='outcome')).toBe(true)});
  it('never presents real Health metrics as illustrative',()=>{healthMetrics.forEach(x=>expect(x.dataStatus).not.toBe('illustrative'))});
  it('contains no causal claim',()=>{const copy=healthMetrics.map(x=>`${x.definition} ${x.limitations}`).join(' ').toLowerCase();expect(copy).not.toMatch(/caused by|led to|resulted in/)});
});
