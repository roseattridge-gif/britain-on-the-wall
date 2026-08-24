export type CompositionItem={id:string;label:string;share:number;icon:string};
export const compositionByParent:Record<string,CompositionItem[]>={
  income:[
    {id:'income-tax',label:'Income Tax',share:.55,icon:'BadgePoundSterling'},
    {id:'employee-ni',label:'Employee NI',share:.25,icon:'Users'},
    {id:'council-tax',label:'Council Tax',share:.12,icon:'House'},
    {id:'household-other',label:'Other household receipts',share:.08,icon:'Ellipsis'},
  ],
  business:[
    {id:'corporation-tax',label:'Corporation Tax',share:.42,icon:'Building2'},
    {id:'employer-ni',label:'Employer NI',share:.31,icon:'Users'},
    {id:'business-rates',label:'Business Rates',share:.18,icon:'Landmark'},
    {id:'business-other',label:'Other business receipts',share:.09,icon:'Ellipsis'},
  ],
  consumer:[
    {id:'vat',label:'VAT',share:.68,icon:'ShoppingBasket'},
    {id:'fuel-duty',label:'Fuel duties',share:.14,icon:'Gauge'},
    {id:'excise',label:'Alcohol & tobacco duties',share:.11,icon:'BadgePoundSterling'},
    {id:'consumption-other',label:'Other consumption receipts',share:.07,icon:'Ellipsis'},
  ],
  pensions:[
    {id:'state-pension',label:'State pension',share:.82,icon:'PersonStanding'},
    {id:'pension-support',label:'Pension-related support',share:.18,icon:'HandCoins'},
  ],
  welfare:[
    {id:'universal-credit',label:'Universal Credit',share:.43,icon:'HandCoins'},
    {id:'disability-support',label:'Disability & health support',share:.26,icon:'HeartPulse'},
    {id:'housing-support',label:'Housing support',share:.17,icon:'Home'},
    {id:'welfare-other',label:'Other transfers',share:.14,icon:'Ellipsis'},
  ],
  education:[
    {id:'schools',label:'Schools',share:.63,icon:'GraduationCap'},
    {id:'higher-further',label:'Higher & further education',share:.18,icon:'Landmark'},
    {id:'send',label:'SEND',share:.12,icon:'Users'},
    {id:'skills-admin',label:'Skills & administration',share:.07,icon:'Activity'},
  ],
  defence:[
    {id:'defence-people',label:'People',share:.34,icon:'Users'},
    {id:'defence-equipment',label:'Equipment',share:.42,icon:'Shield'},
    {id:'defence-estate',label:'Estate & support',share:.24,icon:'Building2'},
  ],
};
