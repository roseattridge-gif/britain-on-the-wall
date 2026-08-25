import type {Year} from '../../types';
import {historicalSnapshots,type HistoricalFlow} from './historical';
import {displayPeriod,periodByRealYear,realYears,type RealYear} from './adapter';

export type HistoricalChange={id:string;label:string;direction:'in'|'out';from:RealYear;to:RealYear;amountDelta:number;perHundredDelta:number;rankDelta:number;comparability:HistoricalFlow['comparability'];technical:boolean;borrowing:boolean};
const flows=(year:RealYear,direction:'in'|'out')=>historicalSnapshots.find(x=>x.period===periodByRealYear[year])!.flows.filter(x=>x.direction===direction);
const baseId=(flow:HistoricalFlow)=>flow.id.split('-').slice(3).join('-');
export const historicalChanges=(from:RealYear,to:RealYear,direction:'in'|'out'='out'):HistoricalChange[]=>{
  const before=flows(from,direction),after=flows(to,direction);
  const ranks=(items:HistoricalFlow[])=>new Map([...items].sort((a,b)=>b.value-a.value).map((item,index)=>[baseId(item),index+1]));
  const beforeRanks=ranks(before),afterRanks=ranks(after);
  return after.map(item=>{const id=baseId(item),prior=before.find(x=>baseId(x)===id)!;return {id,label:item.label,direction,from,to,amountDelta:item.value-prior.value,perHundredDelta:item.perHundred-prior.perHundred,rankDelta:beforeRanks.get(id)!-afterRanks.get(id)!,comparability:item.comparability,technical:!!item.technical,borrowing:!!item.borrowing}});
};
export const majorHistoricalChanges=(from:RealYear,to:RealYear,limit=4)=>historicalChanges(from,to).sort((a,b)=>Math.abs(b.perHundredDelta)-Math.abs(a.perHundredDelta)).slice(0,limit);
export const isRealYear=(year:Year):year is RealYear=>(realYears as readonly number[]).includes(year);
export const periodLabel=(year:Year)=>displayPeriod(year);
