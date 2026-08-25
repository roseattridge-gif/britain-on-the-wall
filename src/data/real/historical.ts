import {historicalPeriods,historicalReceiptsRaw as r,historicalSpendingRaw as s,type HistoricalPeriod} from './historicalRaw';

export type Comparability='high'|'medium'|'low'|'not-comparable';
export type HistoricalFlow={id:string;label:string;direction:'in'|'out';value:number;perHundred:number;sourceIds:string[];officialLineIds:string[];comparability:Comparability;comparabilityNote?:string;technical?:boolean;borrowing?:boolean};
export type HistoricalFiscalSnapshot={id:string;period:HistoricalPeriod;totalManagedExpenditure:number;flows:HistoricalFlow[];reconciliation:{total:number;difference:number;sourceRoundingAdjustment:number};comparabilityNotes:string[]};
const spendSource=['hmt-pesa-2026-ch5']; const receiptSource=['ons-receipts-appendix-d-2026-08'];
const out=(period:HistoricalPeriod,id:string,label:string,value:number,lines:string[],comparability:Comparability='high',note?:string,technical=false):HistoricalFlow=>({id:`${period}-out-${id}`,label,direction:'out',value,perHundred:value/s.totalManagedExpenditure[period]*100,sourceIds:spendSource,officialLineIds:lines,comparability,comparabilityNote:note,technical});
const input=(period:HistoricalPeriod,id:string,label:string,value:number,lines:string[],comparability:Comparability='high',note?:string,borrowing=false):HistoricalFlow=>({id:`${period}-in-${id}`,label,direction:'in',value,perHundred:value/s.totalManagedExpenditure[period]*100,sourceIds:borrowing?[...receiptSource,...spendSource]:receiptSource,officialLineIds:lines,comparability,comparabilityNote:note,borrowing});

export const historicalSnapshots:HistoricalFiscalSnapshot[]=historicalPeriods.map(period=>{
  const tme=s.totalManagedExpenditure[period];
  const serviceOutputs=[
    out(period,'health','Health & social care',s.health[period]+s.personalSocialServices[period],['pesa-health','pesa-social-protection-personal-services']),
    out(period,'pensions','Pensions',s.pensions[period],['pesa-social-protection-pensions']),
    out(period,'welfare','Working-age welfare & income support',s.socialProtection[period]-s.pensions[period]-s.personalSocialServices[period],['pesa-social-protection-remainder'],'high',period==='2022-23'||period==='2023-24'?'Includes exceptional cost-of-living support within published Social protection. Definition is unchanged.':undefined),
    out(period,'education','Education & skills',s.education[period],['pesa-education'],'medium','Academy spending is recorded within Secondary education across all five columns; parent total remains consistent.'),
    out(period,'defence','Defence & security',s.defence[period],['pesa-defence']),out(period,'justice','Crime & justice',s.justice[period],['pesa-public-order-safety']),
    out(period,'housing','Housing & communities',s.housing[period],['pesa-housing-community']),out(period,'transport','Transport & infrastructure',s.transport[period],['pesa-transport']),
    out(period,'admin','Central administration',s.generalPublicServices[period]-s.debtTransactions[period],['pesa-general-public-services-ex-debt']),
    out(period,'interest','Debt interest & transactions',s.debtTransactions[period],['pesa-public-debt-transactions'],'medium','Authoritative parent includes Bank of England and public-sector pension transactions; not ordinary coupon interest.'),
    out(period,'economy','Economy, business & industry',s.economicAffairs[period]-s.transport[period],['pesa-economic-affairs-ex-transport'],period==='2022-23'?'medium':'high',period==='2022-23'?'Energy support makes the year economically unusual without changing the classification.':undefined),
    out(period,'environment','Environment',s.environment[period],['pesa-environment-protection']),out(period,'culture','Culture & recreation',s.culture[period],['pesa-recreation-culture-religion']),
  ];
  const publishedTechnical=s.accountingAdjustments[period]+s.euTransactions[period];
  const sourceRoundingAdjustment=tme-serviceOutputs.reduce((sum,flow)=>sum+flow.value,0)-publishedTechnical;
  const outputs=[...serviceOutputs,out(period,'technical','Accounting & statistical adjustments',publishedTechnical+sourceRoundingAdjustment,['pesa-accounting-adjustments','pesa-eu-transactions','derived-source-rounding-adjustment'],'medium',`Technical reconciliation, not a service destination or policy performance measure. Includes a £${sourceRoundingAdjustment.toFixed(3)}bn source-table rounding adjustment.`,true)];
  const incomeValue=r.incomeTax[period]+r.socialContributions[period]+r.councilTax[period];
  const businessValue=r.corporationTax[period]+r.businessRates[period];
  const consumptionValue=r.vat[period]+r.fuel[period]+r.alcohol[period]+r.tobacco[period];
  const capitalValue=r.stampLand[period]+r.stampShares[period];
  const named=incomeValue+businessValue+consumptionValue+capitalValue;
  const inputs=[input(period,'income','Income & social contributions',incomeValue,['ons-income-tax','ons-social-contributions','ons-council-tax'],'medium','Combined social contributions are not split between employees and employers.'),input(period,'business','Businesses',businessValue,['ons-corporation-tax','ons-business-rates']),input(period,'consumer','Consumption',consumptionValue,['ons-vat','ons-fuel-duty','ons-alcohol-duty','ons-tobacco-duty']),input(period,'capital','Property & capital',capitalValue,['ons-stamp-duty-land','ons-stamp-shares']),input(period,'other-income','Other receipts',r.totalCurrentReceipts[period]-named,['ons-current-receipts-residual'],'medium','Derived residual of current receipts after named streams.'),input(period,'borrowing','Borrowing',tme-r.totalCurrentReceipts[period],['ons-current-receipts','pesa-tme'],'medium','Balancing requirement, not a receipt or standalone PSNB series.',true)];
  const total=outputs.reduce((sum,flow)=>sum+flow.value,0);
  return {id:`uk-fiscal-${period}`,period,totalManagedExpenditure:tme,flows:[...inputs,...outputs],reconciliation:{total,difference:total-tme,sourceRoundingAdjustment},comparabilityNotes:[period==='2022-23'?'Energy and cost-of-living interventions create real compositional anomalies.':'No taxonomy break identified.', 'All values use the PESA 2026 latest comparable basis.']};
});

export const historicalSnapshotByPeriod=(period:HistoricalPeriod)=>historicalSnapshots.find(snapshot=>snapshot.period===period)!;
export const formatHistoricalPerHundred=(value:number)=>{const rounded=value>=10?Math.round(value):Math.round(value*10)/10;return `£${rounded}`};
