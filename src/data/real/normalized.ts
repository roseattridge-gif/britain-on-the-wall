import type {Confidence,DataStatus} from '../../types';
import {rawReceipts,rawSpending} from './raw';

export type FiscalFlowRecord={id:string;label:string;direction:'in'|'out';category:string;value:number;unit:'GBP_BN';period:'2025-26';geography:'UK';accountingBasis:string;nominalOrReal:'nominal';sourceIds:string[];evidenceIds:string[];officialLineIds:string[];confidence:Confidence;status:'official'|'mapped'|'provisional'|'unresolved';dataStatus:DataStatus;technical?:boolean;methodologyNotes?:string;limitations?:string};
const common={unit:'GBP_BN' as const,period:'2025-26' as const,geography:'UK' as const,nominalOrReal:'nominal' as const,confidence:'high' as const};
const receiptSource=['ons-receipts-appendix-d-2026-08']; const spendSource=['hmt-pesa-2026-ch5'];
const input=(id:string,label:string,category:string,value:number,status:'official'|'mapped'='mapped',notes?:string):FiscalFlowRecord=>({...common,id,label,direction:'in',category,value,accountingBasis:'ONS public-sector current receipts, accrued',sourceIds:receiptSource,evidenceIds:[`e-${id}`],officialLineIds:[`ons-${id}`],status,dataStatus:status==='official'?'official':'derived-from-official',methodologyNotes:notes});
const output=(id:string,label:string,value:number,notes:string,officialLineIds=[`pesa-${id}`],technical=false):FiscalFlowRecord=>({...common,id,label,direction:'out',category:id,value,accountingBasis:'HM Treasury Total Managed Expenditure / expenditure on services by function',sourceIds:spendSource,evidenceIds:[`e-${id}`],officialLineIds,status:'mapped',dataStatus:'derived-from-official',technical,methodologyNotes:notes});

const namedReceipts=rawReceipts.incomeTax+rawReceipts.socialContributions+rawReceipts.vat+rawReceipts.corporationTax+rawReceipts.businessRates+rawReceipts.stampDutyLandTax+rawReceipts.stampTaxesOnShares+rawReceipts.fuelDuties+rawReceipts.alcoholDuties+rawReceipts.tobaccoDuties+rawReceipts.councilTax;
export const borrowing=rawSpending.totalManagedExpenditure-rawReceipts.totalCurrentReceipts;

export const fiscalFlows:FiscalFlowRecord[]=[
  input('income','Income & social contributions','income-social-contributions',rawReceipts.incomeTax+rawReceipts.socialContributions+rawReceipts.councilTax,'mapped','Income Tax, combined social contributions and Council Tax. ONS does not split the selected social-contributions total into employee and employer incidence; this is a receipt-stream grouping.'),
  input('business','Businesses','receipts-associated-with-businesses',rawReceipts.corporationTax+rawReceipts.businessRates,'mapped','Corporation Tax and business rates; presentational collection-point grouping only.'),
  input('consumer','Consumption','receipts-associated-with-consumption',rawReceipts.vat+rawReceipts.fuelDuties+rawReceipts.alcoholDuties+rawReceipts.tobaccoDuties,'mapped','VAT and major fuel, alcohol and tobacco duties.'),
  input('capital','Property & capital','property-capital-transactions',rawReceipts.stampDutyLandTax+rawReceipts.stampTaxesOnShares,'mapped','Stamp Duty Land Tax and stamp taxes on shares. Capital Gains Tax remains within the published Income Tax total to avoid double counting.'),
  input('other-income','Other receipts','other-receipts',rawReceipts.totalCurrentReceipts-namedReceipts,'mapped','Balancing residual of tax and non-tax current receipts after the named streams.'),
  {...input('borrowing','Borrowing','deficit-funding',borrowing,'mapped','Derived as Total Managed Expenditure less public-sector current receipts so the funding pool reconciles exactly.'),accountingBasis:'Balancing funding requirement: PESA TME less ONS current receipts',sourceIds:[...receiptSource,...spendSource],dataStatus:'derived-from-official',limitations:'This cross-publication balancing figure differs from the latest standalone ONS PSNB estimate because official series are revised on different release cycles.'},
  output('health','Health & social care',rawSpending.health+rawSpending.personalSocialServices,'PESA Health plus the personal social services component of Social Protection.',['pesa-health','pesa-social-protection-personal-services']),
  output('pensions','Pensions',rawSpending.pensions,'Pensions sub-line within old-age Social Protection.',['pesa-social-protection-pensions']),
  output('welfare','Working-age welfare & income support',rawSpending.totalSocialProtection-rawSpending.personalSocialServices-rawSpending.pensions,'Remainder of Social Protection after pensions and personal social services; includes disability, family, unemployment, housing and social-exclusion support.',['pesa-social-protection-remainder']),
  output('education','Education & skills',rawSpending.education,'PESA total Education function.'),
  output('defence','Defence & security',rawSpending.defence,'PESA COFOG Defence; not the NATO definition.'),
  output('justice','Crime & justice',rawSpending.publicOrderAndSafety,'PESA Public order and safety: police, fire, courts, prisons and related services.'),
  output('housing','Housing & communities',rawSpending.housingAndCommunityAmenities,'PESA Housing and community amenities. Social-protection housing support remains in welfare.'),
  output('transport','Transport & infrastructure',rawSpending.transport,'PESA Transport sub-function only.'),
  output('local','Local services',0,'Not separately presented: local-government expenditure is already allocated across PESA functions. A separate total would double count.'),
  output('admin','Central administration',rawSpending.totalGeneralPublicServices-rawSpending.publicDebtTransactions,'General public services excluding public debt transactions.'),
  output('interest','Debt interest & transactions',rawSpending.publicDebtTransactions,'PESA public debt transactions, including Bank of England items; broader than coupon interest alone.'),
  output('economy','Economy, business & industry',rawSpending.totalEconomicAffairs-rawSpending.transport,'PESA Economic affairs excluding the separately mapped Transport sub-function.',['pesa-economic-affairs-ex-transport']),
  output('environment','Environment',rawSpending.environmentProtection,'PESA total Environment protection function.',['pesa-environment-protection']),
  output('culture','Culture & recreation',rawSpending.recreationCultureReligion,'PESA total Recreation, culture and religion function.',['pesa-recreation-culture-religion']),
  output('technical','Accounting & statistical adjustments',rawSpending.accountingAdjustments+rawSpending.euTransactions,'PESA accounting adjustments net of the small negative EU-transactions line. This reconciles expenditure on services to TME and is not a service destination, waste or leakage.',['pesa-accounting-adjustments','pesa-eu-transactions'],true),
];

export const moneyIn=fiscalFlows.filter(x=>x.direction==='in');
export const moneyOut=fiscalFlows.filter(x=>x.direction==='out');
export const nationalPool=rawSpending.totalManagedExpenditure;
