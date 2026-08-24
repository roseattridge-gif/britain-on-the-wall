export type CompositionItem={id:string;label:string;share:number;icon:string};
export const compositionByParent:Record<string,CompositionItem[]>={
  income:[
    {id:'income-tax',label:'Income Tax',share:353.458/610.652,icon:'BadgePoundSterling'},
    {id:'social-contributions',label:'Social contributions',share:206.746/610.652,icon:'Users'},
    {id:'council-tax',label:'Council Tax',share:50.448/610.652,icon:'House'},
  ],
  business:[
    {id:'corporation-tax',label:'Corporation Tax',share:103.534/133.516,icon:'Building2'},
    {id:'business-rates',label:'Business Rates',share:29.982/133.516,icon:'Landmark'},
  ],
  consumer:[
    {id:'vat',label:'VAT',share:210.826/255.285,icon:'ShoppingBasket'},
    {id:'fuel-duty',label:'Fuel duties',share:24.559/255.285,icon:'Gauge'},
    {id:'excise',label:'Alcohol & tobacco duties',share:19.9/255.285,icon:'BadgePoundSterling'},
  ],
  capital:[
    {id:'stamp-land',label:'Stamp Duty Land Tax',share:16.627/21.362,icon:'House'},
    {id:'stamp-shares',label:'Stamp taxes on shares',share:4.735/21.362,icon:'BadgePoundSterling'},
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
