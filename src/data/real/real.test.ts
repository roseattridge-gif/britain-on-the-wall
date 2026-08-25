import {describe,expect,it} from 'vitest';
import {nationalData} from './adapter';
import {borrowing,fiscalFlows,moneyIn,moneyOut,nationalPool} from './normalized';
import {bridgedResidual,previousResidual,residualBridge} from './residualBridge';

const sum=(values:{value:number}[])=>values.reduce((total,item)=>total+item.value,0);
describe('2025-26 national fiscal backbone',()=>{
  it('reconciles money in and money out to the same pool',()=>{expect(sum(moneyIn)).toBeCloseTo(nationalPool,9);expect(sum(moneyOut)).toBeCloseTo(nationalPool,9)});
  it('transforms both directions to approximately £100',()=>{expect(sum(moneyIn.map(x=>({value:x.value/nationalPool*100})))).toBeCloseTo(100,9);expect(sum(moneyOut.map(x=>({value:x.value/nationalPool*100})))).toBeCloseTo(100,9)});
  it('has unique flow and evidence identifiers',()=>{expect(new Set(fiscalFlows.map(x=>x.id)).size).toBe(fiscalFlows.length);expect(new Set(nationalData.evidence.map(x=>x.id)).size).toBe(nationalData.evidence.length)});
  it('gives every rendered real numeric node evidence',()=>{const evidence=new Map(nationalData.evidence.map(x=>[x.id,x]));[...nationalData.funding,...nationalData.domains].forEach(node=>{expect(evidence.get(node.evidenceId)?.value).toBe(node.values[2025]);expect(evidence.get(node.evidenceId)?.dataStatus).not.toBe('unresolved')})});
  it('keeps borrowing distinct and derived',()=>{const node=nationalData.funding.find(x=>x.id==='borrowing');expect(node?.borrowing).toBe(true);expect(node?.dataStatus).toBe('derived-from-official');expect(node?.values[2025]).toBeCloseTo(borrowing,9)});
  it('does not overstate who bears combined social contributions',()=>{expect(nationalData.funding.find(x=>x.id==='income')?.name).toBe('Income & social contributions')});
  it('does not create a local-government destination that double counts functions',()=>{expect(nationalData.domains.some(x=>x.id==='local')).toBe(false)});
  it('fully explains the former residual using published lines',()=>{expect(bridgedResidual).toBeCloseTo(previousResidual,9);expect(moneyOut.some(x=>x.id==='other')).toBe(false);expect(moneyOut.find(x=>x.id==='technical')?.value).toBeCloseTo(132.308,9)});
  it('assigns every expenditure mapping token once',()=>{const lineIds=moneyOut.filter(x=>x.id!=='local').flatMap(x=>x.officialLineIds);expect(new Set(lineIds).size).toBe(lineIds.length);const extracted=moneyOut.filter(x=>['economy','environment','culture','technical'].includes(x.id)).flatMap(x=>x.officialLineIds).sort();expect(extracted).toEqual(residualBridge.map(x=>x.officialLineId).sort())});
  it('keeps technical reconciliation separate from illustrative leaks',()=>{const technical=moneyOut.find(x=>x.id==='technical');expect(technical?.technical).toBe(true);expect(nationalData.leaks.some(x=>x.id==='technical')).toBe(false)});
});
