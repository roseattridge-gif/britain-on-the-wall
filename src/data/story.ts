import type {Year} from '../types';

export type AttentionMarker={id:string;targetId:string;label:string;tone:'pressure'|'watch'|'improving'|'drag'};

// Explicit editorial demo markers: these are authored storytelling fixtures,
// not an algorithmic ranking or a claim about the real country.
export const attentionByYear:Record<Year,AttentionMarker[]>={
  2005:[
    {id:'health-improving',targetId:'health',label:'IMPROVING',tone:'improving'},
    {id:'debt-drag',targetId:'interest',label:'LARGEST COMMITTED DRAG',tone:'drag'},
    {id:'skills-improving',targetId:'education',label:'OUTCOME IMPROVING',tone:'improving'},
  ],
  2010:[
    {id:'borrowing-watch',targetId:'borrowing',label:'BORROWING SURGE',tone:'watch'},
    {id:'prosperity-pressure',targetId:'prosperity',label:'UNDER PRESSURE',tone:'pressure'},
    {id:'health-improving',targetId:'health',label:'OUTCOME IMPROVING',tone:'improving'},
  ],
  2015:[
    {id:'health-watch',targetId:'health',label:'SPEND UP · OUTCOME MIXED',tone:'watch'},
    {id:'debt-drag',targetId:'interest',label:'COMMITTED FISCAL DRAG',tone:'drag'},
    {id:'skills-improving',targetId:'education',label:'OUTCOME IMPROVING',tone:'improving'},
  ],
  2020:[
    {id:'borrowing-watch',targetId:'borrowing',label:'BORROWING SHOCK',tone:'watch'},
    {id:'health-pressure',targetId:'health',label:'UNDER PRESSURE',tone:'pressure'},
    {id:'backlog-pressure',targetId:'hospitals',label:'BACKLOG LOSS RISING',tone:'pressure'},
  ],
  2025:[
    {id:'health-pressure',targetId:'health',label:'UNDER PRESSURE',tone:'pressure'},
    {id:'pensions-rise',targetId:'pensions',label:'BIG SPENDING INCREASE',tone:'watch'},
    {id:'debt-drag',targetId:'interest',label:'LARGEST COMMITTED DRAG',tone:'drag'},
    {id:'state-friction',targetId:'effective',label:'DELIVERY FRICTION',tone:'pressure'},
  ],
};

export const previousYear=(year:Year):Year|undefined=>{
  const years:Year[]=[2005,2010,2015,2020,2025];
  return years[years.indexOf(year)-1];
};
