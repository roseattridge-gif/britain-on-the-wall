import {describe,expect,it} from 'vitest';
import {valueLeakageEvidence,valueLeakageMetrics} from './valueLeakage';

describe('launch value and leakage evidence',()=>{
  it('resolves every launch metric to official evidence with limits',()=>{const ids=new Set(valueLeakageEvidence.map(item=>item.id));for(const group of Object.values(valueLeakageMetrics)){expect(ids.has(group.evidenceId)).toBe(true)}for(const item of valueLeakageEvidence){expect(item.source).toMatch(/Statistics|Pensions|Customs/);expect(item.definition).toBeTruthy();expect(item.doesNotMeasure).toBeTruthy();expect(item.cannotProve).toBeTruthy();expect(item.dataStatus).toBe('official')}});
  it('keeps fraud, claimant error and official error distinct',()=>{expect(valueLeakageMetrics.benefits.fraudRate).toBe(2.2);expect(valueLeakageMetrics.benefits.claimantErrorRate).toBe(0.6);expect(valueLeakageMetrics.benefits.officialErrorRate).toBe(0.4);expect(valueLeakageMetrics.benefits.overpaymentRate).toBe(3.2)});
  it('retains provisional and in-development boundaries',()=>{expect(valueLeakageEvidence.find(item=>item.id==='launch-tax-gap')?.statusLabel).toMatch(/PROVISIONAL/);expect(valueLeakageEvidence.find(item=>item.id==='launch-productivity')?.statusLabel).toMatch(/IN DEVELOPMENT/)});
});
