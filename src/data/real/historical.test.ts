import {describe,expect,it} from 'vitest';
import {historicalSnapshots} from './historical';
import {historicalPeriods,historicalSpendingRaw as raw} from './historicalRaw';
import {historicalReceiptsRaw as receipts} from './historicalRaw';

const outputs=(period:string)=>historicalSnapshots.find(x=>x.period===period)!.flows.filter(x=>x.direction==='out');
const inputs=(period:string)=>historicalSnapshots.find(x=>x.period===period)!.flows.filter(x=>x.direction==='in');
describe('frozen historical fiscal taxonomy',()=>{
  it.each(historicalPeriods)('%s expenditure reconciles exactly to TME',period=>{const snapshot=historicalSnapshots.find(x=>x.period===period)!;expect(snapshot.reconciliation.total).toBeCloseTo(snapshot.totalManagedExpenditure,9);expect(snapshot.reconciliation.difference).toBeCloseTo(0,9)});
  it.each(historicalPeriods)('%s unrounded output shares sum to £100',period=>expect(outputs(period).reduce((sum,x)=>sum+x.perHundred,0)).toBeCloseTo(100,9));
  it.each(historicalPeriods)('%s has no duplicate expenditure mapping',period=>{const ids=outputs(period).flatMap(x=>x.officialLineIds);expect(new Set(ids).size).toBe(ids.length)});
  it.each(historicalPeriods)('%s reconstructs health without double-counting social care',period=>{const health=outputs(period).find(x=>x.id.endsWith('-health'))!;expect(health.value).toBeCloseTo(raw.health[period]+raw.personalSocialServices[period],9)});
  it.each(historicalPeriods)('%s derives welfare consistently',period=>{const welfare=outputs(period).find(x=>x.id.endsWith('-welfare'))!;expect(welfare.value).toBeCloseTo(raw.socialProtection[period]-raw.pensions[period]-raw.personalSocialServices[period],9)});
  it.each(historicalPeriods)('%s derives economy consistently',period=>{const economy=outputs(period).find(x=>x.id.endsWith('-economy'))!;expect(economy.value).toBeCloseTo(raw.economicAffairs[period]-raw.transport[period],9)});
  it.each(historicalPeriods)('%s has sources and comparability metadata',period=>historicalSnapshots.find(x=>x.period===period)!.flows.forEach(flow=>{expect(flow.sourceIds.length).toBeGreaterThan(0);expect(flow.officialLineIds.length).toBeGreaterThan(0);expect(['high','medium','low','not-comparable']).toContain(flow.comparability)}));
  it.each(historicalPeriods)('%s has no unexplained residual',period=>expect(outputs(period).some(x=>x.id.endsWith('-other'))).toBe(false));
  it.each(historicalPeriods)('%s records only immaterial published-table rounding',period=>{const adjustment=historicalSnapshots.find(x=>x.period===period)!.reconciliation.sourceRoundingAdjustment;expect(Math.abs(adjustment)).toBeLessThanOrEqual(.0010000001)});
  it('has unique snapshot and flow IDs',()=>{expect(new Set(historicalSnapshots.map(x=>x.id)).size).toBe(historicalSnapshots.length);const ids=historicalSnapshots.flatMap(x=>x.flows.map(flow=>flow.id));expect(new Set(ids).size).toBe(ids.length)});
  it.each(historicalPeriods)('%s receipts plus borrowing reconcile to TME',period=>{const snapshot=historicalSnapshots.find(x=>x.period===period)!;expect(inputs(period).reduce((sum,x)=>sum+x.value,0)).toBeCloseTo(snapshot.totalManagedExpenditure,9);expect(inputs(period).find(x=>x.borrowing)?.id).toContain('borrowing')});
  it.each(historicalPeriods)('%s source taxonomy exhausts current receipts',period=>{const nonBorrowing=inputs(period).filter(x=>!x.borrowing);expect(nonBorrowing.reduce((sum,x)=>sum+x.value,0)).toBeCloseTo(receipts.totalCurrentReceipts[period],9)});
});
