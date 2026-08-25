import {describe,expect,it} from 'vitest';
import {historicalChanges,majorHistoricalChanges} from './timeline';
import {realYears,getHistoricalSnapshot} from './adapter';

describe('real historical timeline adapter',()=>{
  it('exposes exactly the accepted snapshots',()=>expect(realYears).toEqual([2021,2022,2023,2024,2025]));
  it.each(realYears)('%s selects the matching reconciled snapshot',year=>{const snapshot=getHistoricalSnapshot(year);expect(snapshot.reconciliation.difference).toBeCloseTo(0,9);expect(snapshot.flows.filter(x=>x.direction==='out').reduce((sum,x)=>sum+x.perHundred,0)).toBeCloseTo(100,9)});
  it('calculates rather than hard-codes the largest five-year changes',()=>{const changes=majorHistoricalChanges(2021,2025);expect(changes[0].id).toBe('interest');expect(changes[0].perHundredDelta).toBeCloseTo(2.6,1);expect(changes.some(x=>x.id==='technical'&&x.technical)).toBe(true)});
  it('calculates amount, share and rank deltas',()=>{const health=historicalChanges(2021,2025).find(x=>x.id==='health')!;expect(health.amountDelta).toBeGreaterThan(0);expect(health.perHundredDelta).toBeLessThan(0);expect(Number.isInteger(health.rankDelta)).toBe(true)});
  it('keeps borrowing distinct on the source side',()=>{const borrowing=historicalChanges(2021,2025,'in').find(x=>x.id==='borrowing')!;expect(borrowing.borrowing).toBe(true);expect(borrowing.direction).toBe('in')});
});
