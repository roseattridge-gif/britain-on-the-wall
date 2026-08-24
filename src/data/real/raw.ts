/** Values transcribed from the cited official spreadsheet lines; all £bn, 2025-26 outturn. */
export const rawReceipts={
  incomeTax:353.458,socialContributions:206.746,vat:210.826,corporationTax:103.534,
  businessRates:29.982,stampDutyLandTax:16.627,stampTaxesOnShares:4.735,
  fuelDuties:24.559,alcoholDuties:12.432,tobaccoDuties:7.468,councilTax:50.448,
  totalTaxesAndSocialContributions:1100.687,interestAndDividends:42.293,
  grossOperatingSurplus:81.936,otherReceipts:5.383,totalCurrentReceipts:1230.299,
} as const;

export const rawSpending={
  health:257.542,personalSocialServices:56.135,pensions:154.858,totalSocialProtection:407.270,
  education:125.721,defence:65.418,publicOrderAndSafety:55.720,
  housingAndCommunityAmenities:22.470,transport:48.923,
  totalGeneralPublicServices:165.504,publicDebtTransactions:130.305,
  accountingAdjustments:132.474,totalManagedExpenditure:1360.122,
} as const;
