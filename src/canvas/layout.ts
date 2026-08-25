import {wallData} from '../data';

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
  {x:320,y:270},{x:830,y:150},{x:1300,y:165},
  {x:1710,y:210},{x:690,y:570},{x:2230,y:190},
];
const domainLayout:Record<string,{point:Point;size:number;colour:string}>={
  health:{point:{x:430,y:1050},size:280,colour:'#5fae9b'},pensions:{point:{x:960,y:1040},size:260,colour:'#7aa8c4'},welfare:{point:{x:1490,y:1070},size:240,colour:'#9e91bd'},education:{point:{x:2010,y:1030},size:230,colour:'#d0a45e'},
  defence:{point:{x:2440,y:800},size:205,colour:'#6888ad'},justice:{point:{x:2300,y:1150},size:180,colour:'#b58a79'},housing:{point:{x:2350,y:1450},size:185,colour:'#9fa56f'},transport:{point:{x:2050,y:1570},size:190,colour:'#5c9fa6'},
  admin:{point:{x:1370,y:1510},size:180,colour:'#789b89'},interest:{point:{x:1010,y:1500},size:210,colour:'#8d9394'},economy:{point:{x:650,y:1490},size:180,colour:'#a88d65'},environment:{point:{x:300,y:1460},size:155,colour:'#6d9b78'},
  culture:{point:{x:2500,y:1700},size:145,colour:'#987c9d'},technical:{point:{x:1710,y:1460},size:190,colour:'#6f7778'},
};
const outcomePoints:Point[]=[
  {x:2800,y:320},{x:2800,y:590},{x:2800,y:860},{x:2800,y:1130},{x:2800,y:1400},
];
const componentPoints:Point[]=[
  {x:610,y:820},{x:940,y:750},{x:1190,y:880},{x:1180,y:1120},{x:900,y:1280},
];

export const operations:CanvasNode[]=[
  ['gp-appointments','GP appointments','Users',300,600],['cdc-tests','Diagnostic tests','ScanLine',520,520],
  ['ae-attendances','A&E attendances','Ambulance',755,610],['rtt-list','Elective waiting list','Activity',360,1030],
  ['rtt-18-weeks','18-week access','Timer',610,1120],['gp-experience','GP experience','HeartPulse',810,970],
].map(([id,label,icon,x,y])=>({id:String(id),label:String(label),icon:String(icon),point:{x:Number(x),y:Number(y)},size:145,colour:'#c8d9d3',kind:'operation',parentId:'hospitals',evidenceId:`e-health-${id}`}));

export const canvasNodes:CanvasNode[]=[
  ...wallData.funding.map((n,i)=>({id:n.id,label:n.name,icon:n.icon,point:fundingPoints[i],size:n.borrowing?205:220,colour:n.borrowing?'#9a83c9':'#78c8d3',kind:'funding' as const,evidenceId:n.evidenceId})),
  {id:'state',label:'The State / Treasury',icon:'Landmark',point:STATE_POINT,size:390,colour:'#f5f0df',kind:'state'},
  ...wallData.domains.map(n=>({id:n.id,label:n.short,icon:n.icon,...domainLayout[n.id],kind:'domain' as const,evidenceId:n.evidenceId})),
  ...wallData.outcomes.map((n,i)=>({id:n.id,label:n.name,icon:['TrendingUp','HeartPulse','ShieldCheck','GraduationCap','Landmark'][i],point:outcomePoints[i],size:[235,260,220,225,240][i],kind:'outcome' as const,evidenceId:n.evidenceId})),
  ...wallData.healthComponents.map((n,i)=>({id:n.id,label:n.name,icon:n.icon,point:componentPoints[i],size:n.id==='hospitals'?205:165,colour:'#a9d3c4',kind:'component' as const,parentId:'health',evidenceId:n.evidenceId})),
  ...operations,
];

export const focusTargets:Record<string,{x:number;y:number;scale:number}>={
  britain:{x:1600,y:880,scale:.46},
  health:{x:980,y:1010,scale:.92},
  hospitals:{x:610,y:820,scale:1.48},
};
