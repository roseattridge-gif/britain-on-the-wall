import {demoData,totalFunding,formatValue} from './demo';
import {nationalData} from './real/adapter';
export const dataMode=import.meta.env.VITE_DATA_MODE==='demo'?'demo':'real';
export const wallData=dataMode==='demo'?demoData:nationalData;
export {demoData,nationalData,totalFunding,formatValue};
