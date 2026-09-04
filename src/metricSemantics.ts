export type PublicMetricSemantics={publicLabel:string;publicUnit?:string;publicDefinition:string;geographyLabel:string};

export const publicMetricSemantics:Record<string,PublicMetricSemantics>={
  'health-spend':{publicLabel:'Health & social care spending',publicUnit:'£bn',publicDefinition:'UK public spending on health and social care.',geographyLabel:'United Kingdom'},
  'health-workforce':{publicLabel:'NHS workforce',publicUnit:'FTE staff',publicDefinition:'Hospital and Community Health Service workforce.',geographyLabel:'England'},
  'health-rtt-activity':{publicLabel:'NHS treatments completed',publicUnit:'pathways',publicDefinition:'Completed RTT pathways during March.',geographyLabel:'England'},
  'health-rtt-waiting':{publicLabel:'NHS waiting list',publicUnit:'pathways',publicDefinition:'Incomplete RTT pathways awaiting consultant-led treatment.',geographyLabel:'England'},
  'health-rtt-18-week':{publicLabel:'18-week NHS performance',publicUnit:'of RTT pathways within 18 weeks',publicDefinition:'Share of incomplete RTT pathways waiting no more than 18 weeks.',geographyLabel:'England'},
  'net-migration':{publicLabel:'Net migration',publicUnit:'net migration',publicDefinition:'Long-term immigration minus long-term emigration.',geographyLabel:'United Kingdom'},
  'asylum-awaiting-initial':{publicLabel:'People awaiting an asylum decision',publicUnit:'people',publicDefinition:'Main applicants and dependants awaiting an initial decision.',geographyLabel:'United Kingdom'},
  'asylum-substantive-decisions':{publicLabel:'People receiving asylum decisions',publicUnit:'people',publicDefinition:'Main applicants and dependants receiving a substantive initial decision.',geographyLabel:'United Kingdom'},
  'housing-spend':{publicLabel:'Housing & communities spending',publicUnit:'£bn',publicDefinition:'UK public spending on housing and community amenities.',geographyLabel:'United Kingdom'},
  'housing-net-additions':{publicLabel:'Homes added',publicUnit:'homes',publicDefinition:'Net additional dwellings.',geographyLabel:'England'},
  'housing-affordability':{publicLabel:'House price to earnings',publicUnit:'× earnings',publicDefinition:'Median house price divided by median earnings.',geographyLabel:'England'},
  'housing-temporary-accommodation':{publicLabel:'Households in temporary accommodation',publicUnit:'households',publicDefinition:'Households in temporary accommodation under homelessness duties.',geographyLabel:'England'},
};
export const semanticsFor=(metricId:string)=>publicMetricSemantics[metricId];
export const formatPublicMetricValue=(metricId:string,value:number|undefined,technicalUnit:string)=>{
  if(value===undefined)return 'Not yet available';
  if(technicalUnit==='bn'||technicalUnit.includes('£bn'))return `£${value.toFixed(1)}bn`;
  if(metricId==='health-rtt-18-week')return `${value.toFixed(1)}% of RTT pathways within 18 weeks`;
  if(metricId==='housing-affordability')return `${value.toFixed(2)}× earnings`;
  if(metricId==='health-workforce')return `${(value/1e6).toFixed(2)}m FTE staff`;
  if(metricId==='health-rtt-waiting'||metricId==='health-rtt-activity')return `${(value/1e6).toFixed(2)}m pathways`;
  if(metricId==='net-migration')return `${value.toLocaleString()}k net migration`;
  const unit=semanticsFor(metricId)?.publicUnit;
  return `${value.toLocaleString()}${unit?` ${unit}`:''}`;
};
export const formatPublicMetricDelta=(metricId:string,value:number|undefined,technicalUnit:string)=>value===undefined?'No comparable value':`${value>=0?'↑':'↓'} ${formatPublicMetricValue(metricId,Math.abs(value),technicalUnit)}`;
const evidenceMetricIds:Record<string,string>={'story-health-rtt':'health-rtt-waiting','story-health-activity':'health-rtt-activity','story-health-workforce':'health-workforce','story-ons-net-migration':'net-migration','story-asylum-awaiting':'asylum-awaiting-initial','story-asylum-decisions':'asylum-substantive-decisions','story-housing-supply':'housing-net-additions','story-housing-affordability':'housing-affordability','story-housing-temporary-accommodation':'housing-temporary-accommodation'};
export const metricIdForEvidence=(evidenceId:string)=>evidenceMetricIds[evidenceId];
