import {demoData} from '../data';

export type Point={x:number;y:number};
export type CanvasNode={
  id:string;
  kind:'funding'|'state'|'domain'|'outcome'|'component'|'operation';
  label:string;
  icon:string;
  point:Point;
  size:number;
  colour?:string;
  evidenceId?:string;
  parentId?:string;
};

export const WORLD={width:3200,height:1800};
export const STATE_POINT={x:1530,y:650};

const fundingPoints:Point[]=[
  {x:280,y:250},{x:610,y:155},{x:955,y:170},
  {x:1290,y:250},{x:650,y:470},{x:2200,y:155},
];
const domainPoints:Point[]=[
  {x:900,y:1030},{x:1250,y:1080},{x:1600,y:1100},{x:1950,y:1040},
  {x:2290,y:960},{x:2450,y:1190},{x:2170,y:1370},{x:1810,y:1430},
  {x:1440,y:1450},{x:1080,y:1400},{x:740,y:1360},{x:2580,y:1480},
];
const domainSizes=[280,260,240,230,205,180,185,190,195,180,210,165];
const domainColours=['#5fae9b','#7aa8c4','#9e91bd','#d0a45e','#6888ad','#b58a79','#9fa56f','#5c9fa6','#789b89','#8d9394','#9b7f9d','#7c8987'];
const outcomePoints:Point[]=[
  {x:2860,y:470},{x:2920,y:710},{x:2870,y:950},{x:2940,y:1190},{x:2820,y:1430},
];
const componentPoints:Point[]=[
  {x:610,y:820},{x:940,y:750},{x:1190,y:880},{x:1180,y:1120},{x:900,y:1280},
];

export const operations:CanvasNode[]=[
  ['workforce','Workforce','Users',300,600],['estates','Estates','Building2',520,520],
  ['procurement','Procurement','ShoppingBasket',755,610],['emergency','Emergency care','Ambulance',360,1030],
  ['elective','Elective care','Activity',610,1120],['diagnostics','Diagnostics','ScanLine',810,970],
].map(([id,label,icon,x,y])=>({id:String(id),label:String(label),icon:String(icon),point:{x:Number(x),y:Number(y)},size:145,colour:'#c8d9d3',kind:'operation',parentId:'hospitals',evidenceId:'e-hospitals'}));

export const canvasNodes:CanvasNode[]=[
  ...demoData.funding.map((n,i)=>({id:n.id,label:n.name,icon:n.icon,point:fundingPoints[i],size:n.borrowing?205:220,colour:n.borrowing?'#9a83c9':'#78c8d3',kind:'funding' as const,evidenceId:n.evidenceId})),
  {id:'state',label:'The State / Treasury',icon:'Landmark',point:STATE_POINT,size:390,colour:'#f5f0df',kind:'state'},
  ...demoData.domains.map((n,i)=>({id:n.id,label:n.short,icon:n.icon,point:domainPoints[i],size:domainSizes[i],colour:domainColours[i],kind:'domain' as const,evidenceId:n.evidenceId})),
  ...demoData.outcomes.map((n,i)=>({id:n.id,label:n.name,icon:['TrendingUp','HeartPulse','ShieldCheck','GraduationCap','Landmark'][i],point:outcomePoints[i],size:[235,260,220,225,240][i],kind:'outcome' as const,evidenceId:n.evidenceId})),
  ...demoData.healthComponents.map((n,i)=>({id:n.id,label:n.name,icon:n.icon,point:componentPoints[i],size:n.id==='hospitals'?205:165,colour:'#a9d3c4',kind:'component' as const,parentId:'health',evidenceId:n.evidenceId})),
  ...operations,
];

export const focusTargets:Record<string,{x:number;y:number;scale:number}>={
  britain:{x:1600,y:880,scale:.46},
  health:{x:900,y:1010,scale:.92},
  hospitals:{x:610,y:820,scale:1.48},
};
