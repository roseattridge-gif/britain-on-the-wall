import type {Evidence,Series,WallData,Year} from '../../types';
import {demoData} from '../demo';
import {moneyIn,moneyOut,nationalPool,type FiscalFlowRecord} from './normalized';
import {sourceById} from './sourceRegistry';
import {historicalSnapshots,historicalSnapshotByPeriod,type HistoricalFiscalSnapshot,type HistoricalFlow} from './historical';
import type {HistoricalPeriod} from './historicalRaw';
import {historicalReceiptsRaw as receipts} from './historicalRaw';
import {healthComponents,healthComponentEvidence,healthMetricEvidence} from './health';

export const realYears=[2021,2022,2023,2024,2025] as const;
export type RealYear=typeof realYears[number];
export const periodByRealYear:Record<RealYear,HistoricalPeriod>={2021:'2021-22',2022:'2022-23',2023:'2023-24',2024:'2024-25',2025:'2025-26'};
export const displayPeriod=(year:Year)=>year>=2021?periodByRealYear[year as RealYear].replace('-', '–'):String(year);
const historicalSeries=(id:string,direction:'in'|'out'):Series=>Object.fromEntries(historicalSnapshots.map(item=>[Number(item.period.slice(0,4)),item.flows.find(flow=>flow.direction===direction&&flow.id.endsWith(`-${id}`))!.value]));
const evidence=(flow:FiscalFlowRecord):Evidence=>{const sources=flow.sourceIds.map(sourceById);return {id:`e-${flow.id}`,metric:flow.label,definition:flow.methodologyNotes??flow.label,value:flow.value,unit:'£bn, nominal current prices',period:flow.period,geography:'United Kingdom public sector',basis:flow.accountingBasis,source:sources.map(x=>x.organisation).join(' + '),dataset:sources.map(x=>x.dataset).join(' + '),url:sources[0].url,published:sources.map(x=>x.publicationDate).filter(Boolean).join(' / '),checked:'2026-08-24',methodology:flow.methodologyNotes??'',revision:sources.map(x=>x.revisionStatus).filter(Boolean).join(' / '),confidence:flow.confidence,limitations:flow.limitations??'Figures may be revised by the publishing organisations.',dataStatus:flow.dataStatus};};
const fundingMeta=Object.fromEntries(demoData.funding.map(x=>[x.id,x])); const domainMeta=Object.fromEntries(demoData.domains.map(x=>[x.id,x]));
const realDomainMeta:Record<string,{short:string;icon:string}>={economy:{short:'Economy',icon:'Factory'},environment:{short:'Environment',icon:'Leaf'},culture:{short:'Culture',icon:'Palette'},technical:{short:'Accounting',icon:'Calculator'}};
export const nationalData:WallData={
  ...demoData,years:[...realYears],
  funding:moneyIn.map(flow=>({...fundingMeta[flow.id],name:flow.label,values:historicalSeries(flow.id,'in'),confidence:flow.confidence,dataStatus:flow.dataStatus,borrowing:flow.id==='borrowing',evidenceId:`e-${flow.id}`})),
  domains:moneyOut.filter(flow=>flow.id!=='local').map(flow=>{const meta=domainMeta[flow.id]??realDomainMeta[flow.id];return {...meta,id:flow.id,name:flow.label,short:flow.id==='health'?'Health & social care':flow.id==='interest'?'Debt':meta.short,values:historicalSeries(flow.id,'out'),confidence:flow.confidence,dataStatus:flow.dataStatus,evidenceId:`e-${flow.id}`}}),
  healthComponents,
  evidence:[...moneyIn,...moneyOut.filter(x=>x.id!=='local')].map(evidence).concat(healthComponentEvidence,healthMetricEvidence,demoData.evidence.filter(item=>!moneyIn.some(x=>x.evidenceIds.includes(item.id))&&!moneyOut.some(x=>x.evidenceIds.includes(item.id))&&!item.id.startsWith('e-health-')&&!['e-hospitals','e-primary','e-community','e-medicines','e-admin-health'].includes(item.id))),
};
export const NATIONAL_PERIOD='2025–26';
export const getHistoricalSnapshot=(year:RealYear):HistoricalFiscalSnapshot=>historicalSnapshotByPeriod(periodByRealYear[year]);
export const historicalFlowFor=(year:RealYear,id:string)=>getHistoricalSnapshot(year).flows.find(flow=>flow.id.endsWith(`-${id}`));
export const evidenceForHistoricalFlow=(flow:HistoricalFlow):Evidence=>({id:`e-${flow.id.split('-').slice(3).join('-')}`,metric:flow.label,definition:flow.comparabilityNote??flow.label,value:flow.value,unit:'£bn, nominal current prices',period:flow.id.slice(0,7).replace('-', '–'),geography:'United Kingdom public sector',basis:'PESA 2026 latest comparable basis / ONS accrued current receipts',source:flow.direction==='out'?'HM Treasury':'Office for National Statistics',dataset:flow.direction==='out'?'PESA 2026 Table 5.2':'Public sector current receipts Appendix D',url:flow.direction==='out'?'https://www.gov.uk/government/statistics/public-expenditure-statistical-analyses-2026':'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/datasets/appendixdpublicsectorcurrentreceipts/current',published:'2026',checked:'2026-08-25',methodology:flow.comparabilityNote??'Frozen historical Wall mapping.',revision:'Latest comparable historical basis',confidence:flow.comparability==='high'?'high':'medium',limitations:`Comparability: ${flow.comparability}. Nominal current prices; figures may be revised.`,dataStatus:flow.borrowing||flow.id.includes('other-income')?'derived-from-official':'official'});
export const evidenceForYear=(year:RealYear,id:string)=>{const flow=historicalFlowFor(year,id.replace(/^e-/,''));return flow?evidenceForHistoricalFlow(flow):nationalData.evidence.find(item=>item.id===id)};
export const realFundingComponentValues=(year:RealYear,parentId:string):Record<string,number>|undefined=>{const p=periodByRealYear[year];return parentId==='income'?{'income-tax':receipts.incomeTax[p],'social-contributions':receipts.socialContributions[p],'council-tax':receipts.councilTax[p]}:parentId==='business'?{'corporation-tax':receipts.corporationTax[p],'business-rates':receipts.businessRates[p]}:parentId==='consumer'?{vat:receipts.vat[p],'fuel-duty':receipts.fuel[p],excise:receipts.alcohol[p]+receipts.tobacco[p]}:parentId==='capital'?{'stamp-land':receipts.stampLand[p],'stamp-shares':receipts.stampShares[p]}:undefined};
export {nationalPool};
