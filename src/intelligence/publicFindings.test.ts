import {describe,expect,it} from 'vitest';
import {getTopIntelligenceSignals} from './index';
import {adaptSignalsToPublicFindings,getPublicFindings} from './publicFindings';
import type {InflectionSignal} from './types';

const inflection=(id:string,type:InflectionSignal['type'],metricId='health-rtt-waiting'):InflectionSignal=>({kind:'inflection',id,topicId:'health',metricId,type,periodId:'2023-24',measurementPeriod:'March 2024',previousValue:7,value:7.5,nextValue:7.4,materiality:50,comparability:'high',evidenceIds:['health-rtt-waiting'],explanation:{observed:'Observed movement.',whyFlagged:'Flagged.',cannotSay:'No cause.'}});

describe('public finding adapter',()=>{
  it('derives every finding from registered engine signals',()=>{const raw=getTopIntelligenceSignals({limit:999}),findings=getPublicFindings(),ids=new Set(raw.map(item=>item.id));expect(findings.length).toBeGreaterThan(5);for(const finding of findings)for(const id of finding.rawSignalIds)expect(ids.has(id)).toBe(true)});
  it('combines a compatible peak and reversal but leaves unrelated signals separate',()=>{const peak=inflection('peak','peak'),reversal=inflection('reversal','reversal-down'),other=inflection('other','trough','health-workforce');const findings=adaptSignalsToPublicFindings([peak,reversal,other]);expect(findings).toHaveLength(2);expect(findings.find(item=>item.rawSignalIds.length===2)?.headline).toMatch(/peaked, then began falling/);expect(findings.some(item=>item.rawSignalIds[0]==='other')).toBe(true)});
  it('keeps neutral metrics descriptive and every contradiction non-causal',()=>{const findings=getPublicFindings();for(const finding of findings.filter(item=>item.signalKind==='co-movement'))expect(finding.limitation).toBe('Observed co-movement. Not evidence that one caused the other.');for(const finding of findings.filter(item=>item.headline.startsWith('Health spending')||item.headline.startsWith('NHS workforce')))expect(finding.headline).not.toMatch(/improved|declined/)});
  it('uses stable IDs, evidence and Wall focus for every finding',()=>{for(const finding of getPublicFindings()){expect(finding.id).toMatch(/^finding-/);expect(finding.evidenceIds.length).toBeGreaterThan(0);expect(finding.focusTarget.metricIds.length).toBeGreaterThan(0);expect(finding.focusTarget.periodId).toMatch(/^20\d\d-\d\d$/)}});
});
