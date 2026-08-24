import type {Evidence,Series,WallData} from '../../types';
import {demoData} from '../demo';
import {moneyIn,moneyOut,nationalPool,type FiscalFlowRecord} from './normalized';
import {sourceById} from './sourceRegistry';

const snapshot=(value:number):Series=>({2005:value,2010:value,2015:value,2020:value,2025:value});
const evidence=(flow:FiscalFlowRecord):Evidence=>{const sources=flow.sourceIds.map(sourceById);return {id:`e-${flow.id}`,metric:flow.label,definition:flow.methodologyNotes??flow.label,value:flow.value,unit:'£bn, nominal current prices',period:flow.period,geography:'United Kingdom public sector',basis:flow.accountingBasis,source:sources.map(x=>x.organisation).join(' + '),dataset:sources.map(x=>x.dataset).join(' + '),url:sources[0].url,published:sources.map(x=>x.publicationDate).filter(Boolean).join(' / '),checked:'2026-08-24',methodology:flow.methodologyNotes??'',revision:sources.map(x=>x.revisionStatus).filter(Boolean).join(' / '),confidence:flow.confidence,limitations:flow.limitations??'Figures may be revised by the publishing organisations.',dataStatus:flow.dataStatus};};
const fundingMeta=Object.fromEntries(demoData.funding.map(x=>[x.id,x])); const domainMeta=Object.fromEntries(demoData.domains.map(x=>[x.id,x]));
export const nationalData:WallData={
  ...demoData,years:[2025],
  funding:moneyIn.map(flow=>({...fundingMeta[flow.id],name:flow.label,values:snapshot(flow.value),confidence:flow.confidence,dataStatus:flow.dataStatus,borrowing:flow.id==='borrowing',evidenceId:`e-${flow.id}`})),
  domains:moneyOut.filter(flow=>flow.id!=='local').map(flow=>({...domainMeta[flow.id],name:flow.label,short:flow.id==='interest'?'Debt':flow.id==='other'?'Other':domainMeta[flow.id].short,values:snapshot(flow.value),confidence:flow.confidence,dataStatus:flow.dataStatus,evidenceId:`e-${flow.id}`})),
  evidence:[...moneyIn,...moneyOut.filter(x=>x.id!=='local')].map(evidence).concat(demoData.evidence.filter(item=>!moneyIn.some(x=>x.evidenceIds.includes(item.id))&&!moneyOut.some(x=>x.evidenceIds.includes(item.id)))),
};
export const NATIONAL_PERIOD='2025–26';
export {nationalPool};
