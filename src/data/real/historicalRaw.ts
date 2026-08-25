export const historicalPeriods=['2021-22','2022-23','2023-24','2024-25','2025-26'] as const;
export type HistoricalPeriod=typeof historicalPeriods[number];
export type HistoricalSeries=Record<HistoricalPeriod,number>;
const series=(a:number,b:number,c:number,d:number,e:number):HistoricalSeries=>({'2021-22':a,'2022-23':b,'2023-24':c,'2024-25':d,'2025-26':e});

/** PESA 2026 Table 5.2, £bn, current prices, outturn. */
export const historicalSpendingRaw={
  health:series(216.237,212.676,221.973,242.429,257.542),personalSocialServices:series(40.127,44.205,50.141,54.019,56.135),
  pensions:series(115.829,123.816,140.539,146.444,154.858),socialProtection:series(300.292,322.235,365.211,386.267,407.270),
  education:series(100.148,107.346,114.208,122.968,125.721),defence:series(48.681,55.550,56.780,63.701,65.418),
  justice:series(39.756,44.213,48.716,51.750,55.720),housing:series(15.273,17.404,20.908,21.700,22.470),
  transport:series(44.628,45.185,48.277,47.373,48.923),economicAffairs:series(97.734,124.545,94.408,87.956,93.959),
  environment:series(13.785,14.355,15.952,17.253,19.157),culture:series(12.762,14.529,12.960,13.610,15.053),
  generalPublicServices:series(109.222,166.204,163.818,160.230,165.504),debtTransactions:series(72.703,130.374,127.255,126.492,130.305),
  euTransactions:series(-1.946,-2.055,.042,-1.412,-.166),accountingAdjustments:series(88.943,83.690,115.830,123.560,132.474),
  totalManagedExpenditure:series(1040.888,1160.692,1230.807,1290.012,1360.122),
  centralDebtInterest:series(70.892,108.063,83.213,85.386,96.946),localDebtInterest:series(.802,.870,1.105,1.098,1.132),
  publicCorporationDebtInterest:series(.455,.463,.471,.479,.502),bankOfEnglandDebtTransactions:series(-15.518,4.049,24.368,20.820,12.344),
  publicSectorPensionDebtTransactions:series(16.072,16.929,18.098,18.709,19.381),
} as const;

/** ONS Appendix D August 2026 workbook; sums of monthly accrued receipts, £bn. */
export const historicalReceiptsRaw={
  incomeTax:series(240.046,268.915,291.490,319.591,353.458),socialContributions:series(162.033,180.908,180.760,173.823,206.746),councilTax:series(39.966,41.968,44.489,47.417,50.448),
  corporationTax:series(72.061,84.916,95.465,97.616,103.534),businessRates:series(21.898,25.768,26.241,28.874,29.982),
  vat:series(166.637,185.322,196.388,202.575,210.826),fuel:series(25.972,25.105,24.922,24.359,24.559),alcohol:series(13.179,12.384,12.515,12.545,12.432),tobacco:series(10.191,9.375,8.969,7.909,7.468),
  stampLand:series(15.417,16.695,12.799,15.227,16.627),stampShares:series(4.371,3.782,3.197,4.322,4.735),
  totalCurrentReceipts:series(920.668,1033.319,1095.788,1138.337,1230.299),
} as const;
