import {rawSpending} from './raw';

export type ResidualBridgeRow={officialLine:string;value:number;currentMapping:'Other / residual';reasonCurrentlyResidual:string;proposedMapping:string;officialLineId:string};
export const previousResidual=211.554;
export const residualBridge:ResidualBridgeRow[]=[
  {officialLine:'Total economic affairs less Transport',value:rawSpending.totalEconomicAffairs-rawSpending.transport,currentMapping:'Other / residual',reasonCurrentlyResidual:'Only the Transport sub-function had a Wall destination.',proposedMapping:'Economy, business & industry',officialLineId:'pesa-economic-affairs-ex-transport'},
  {officialLine:'Total environment protection',value:rawSpending.environmentProtection,currentMapping:'Other / residual',reasonCurrentlyResidual:'No top-level environmental destination existed.',proposedMapping:'Environment',officialLineId:'pesa-environment-protection'},
  {officialLine:'Total recreation, culture and religion',value:rawSpending.recreationCultureReligion,currentMapping:'Other / residual',reasonCurrentlyResidual:'No top-level culture/recreation destination existed.',proposedMapping:'Culture & recreation',officialLineId:'pesa-recreation-culture-religion'},
  {officialLine:'EU transactions',value:rawSpending.euTransactions,currentMapping:'Other / residual',reasonCurrentlyResidual:'Negative transaction is not a service destination and cannot be rendered as a proportional node.',proposedMapping:'Accounting & statistical adjustments',officialLineId:'pesa-eu-transactions'},
  {officialLine:'Accounting adjustments',value:rawSpending.accountingAdjustments,currentMapping:'Other / residual',reasonCurrentlyResidual:'Technical reconciliation between expenditure-on-services and TME.',proposedMapping:'Accounting & statistical adjustments',officialLineId:'pesa-accounting-adjustments'},
];
export const bridgedResidual=residualBridge.reduce((sum,row)=>sum+row.value,0);
