import {healthSystemMetrics} from '../data/real/healthStory';
import {historicalSnapshots} from '../data/real/historical';
import {housingSystemMetrics} from '../data/real/housingStory';
import {immigrationSystemMetrics,type StoryMetric} from '../data/real/story';
import type {IntelligenceDimension,IntelligenceMetricSeries,IntelligenceRelationship,MeasurementBasis} from './types';

const periodIds=['2021-22','2022-23','2023-24','2024-25','2025-26'];

type StoryAdapterOptions={topicId:string;dimension:IntelligenceDimension;geography:string;measurementBasis:MeasurementBasis};
export const adaptStoryMetric=(metric:StoryMetric,options:StoryAdapterOptions):IntelligenceMetricSeries=>({metricId:metric.id,topicId:options.topicId,label:metric.label,definition:metric.definition,dimension:options.dimension,unit:metric.points[0]?.unit??'',polarity:metric.polarity,geography:options.geography,measurementBasis:options.measurementBasis,points:metric.points.map((point,index)=>({periodId:periodIds[index],measurementPeriod:point.periodLabel,date:point.date,value:point.value,evidenceIds:point.sourceIds,comparability:point.comparability,status:point.status==='not-yet-available'?'unavailable':point.status}))});

const spendSeries=(topicId:'health'|'housing',flowSuffix:string,label:string):IntelligenceMetricSeries=>({metricId:`${topicId}-spend`,topicId,label,definition:`UK public-sector ${label.toLowerCase()} expenditure in current prices.`,dimension:'money',unit:'£bn current prices',polarity:'neutral-context',geography:'United Kingdom',measurementBasis:'fiscal-year',points:historicalSnapshots.map((snapshot,index)=>{const flow=snapshot.flows.find(item=>item.id.endsWith(flowSuffix))!;return {periodId:periodIds[index],measurementPeriod:snapshot.period,date:`${Number(snapshot.period.slice(0,4))+1}-03-31`,value:flow.value,evidenceIds:flow.sourceIds,comparability:flow.comparability==='not-comparable'?'low':flow.comparability,status:'official'}})});

const immigrationNetMigration:StoryMetric={id:'net-migration',label:'Net migration',definition:'Official long-term international net migration series in development.',polarity:'neutral-context',points:[
  {metricId:'net-migration',date:'2022-06-30',periodLabel:'YE June 2022 · revised series',unit:'thousand',sourceIds:['story-ons-net-migration'],status:'not-yet-available',comparability:'low'},
  {metricId:'net-migration',date:'2023-03-31',periodLabel:'YE March 2023',value:944,unit:'thousand',sourceIds:['story-ons-net-migration'],status:'official',comparability:'medium'},
  {metricId:'net-migration',date:'2024-06-30',periodLabel:'YE June 2024',value:649,unit:'thousand',sourceIds:['story-ons-net-migration'],status:'official',comparability:'medium'},
  {metricId:'net-migration',date:'2024-12-31',periodLabel:'YE December 2024',value:345,unit:'thousand',sourceIds:['story-ons-net-migration'],status:'official',comparability:'medium'},
  {metricId:'net-migration',date:'2025-06-30',periodLabel:'YE June 2025 · provisional',value:204,unit:'thousand',sourceIds:['story-ons-net-migration'],status:'official',comparability:'medium'},
]};

export const intelligenceSeries:IntelligenceMetricSeries[]=[
  spendSeries('health','-out-health','Health and social care spend'),
  ...healthSystemMetrics.map(metric=>adaptStoryMetric(metric,{topicId:'health',dimension:metric.id==='health-workforce'?'capacity':metric.id==='health-rtt-activity'?'output':'outcome',geography:'England',measurementBasis:metric.id==='health-rtt-activity'?'monthly-total':'month-end-snapshot'})),
  adaptStoryMetric(immigrationNetMigration,{topicId:'immigration',dimension:'context',geography:'United Kingdom',measurementBasis:'year-ending'}),
  ...immigrationSystemMetrics.map(metric=>adaptStoryMetric(metric,{topicId:'immigration',dimension:metric.id==='asylum-substantive-decisions'?'output':'outcome',geography:'United Kingdom',measurementBasis:metric.id==='asylum-substantive-decisions'?'calendar-year':'point-in-time'})),
  spendSeries('housing','-out-housing','Housing and communities spend'),
  ...housingSystemMetrics.map(metric=>adaptStoryMetric(metric,{topicId:'housing',dimension:metric.id==='housing-net-additions'?'output':'outcome',geography:'England',measurementBasis:metric.id==='housing-net-additions'?'fiscal-year':metric.id==='housing-affordability'?'calendar-year':'month-end-snapshot'})),
];

export const intelligenceRelationships:IntelligenceRelationship[]=[
  {id:'health-spend-waiting',topicId:'health',leftMetricId:'health-spend',rightMetricId:'health-rtt-waiting',allowedSignalTypes:['spend-up-outcome-down','spend-down-outcome-up'],relationship:'money-to-outcome',interpretation:'co-movement-only',periodAlignment:'fiscal spend is intentionally aligned to the March RTT snapshot while both actual periods remain visible.'},
  {id:'health-spend-18-week',topicId:'health',leftMetricId:'health-spend',rightMetricId:'health-rtt-18-week',allowedSignalTypes:['spend-up-outcome-down','spend-down-outcome-up'],relationship:'money-to-outcome',interpretation:'co-movement-only',periodAlignment:'fiscal spend is intentionally aligned to the March RTT snapshot while both actual periods remain visible.'},
  {id:'health-workforce-waiting',topicId:'health',leftMetricId:'health-workforce',rightMetricId:'health-rtt-waiting',allowedSignalTypes:['capacity-up-performance-down','capacity-down-performance-up'],relationship:'capacity-to-outcome',interpretation:'co-movement-only',periodAlignment:'both measures use the aligned March story observation.'},
  {id:'health-workforce-18-week',topicId:'health',leftMetricId:'health-workforce',rightMetricId:'health-rtt-18-week',allowedSignalTypes:['capacity-up-performance-down','capacity-down-performance-up'],relationship:'capacity-to-outcome',interpretation:'co-movement-only',periodAlignment:'both measures use the aligned March story observation.'},
  {id:'health-activity-waiting',topicId:'health',leftMetricId:'health-rtt-activity',rightMetricId:'health-rtt-waiting',allowedSignalTypes:['output-up-backlog-up'],relationship:'output-to-outcome',interpretation:'co-movement-only',periodAlignment:'March monthly activity is intentionally aligned to the March month-end waiting stock; neither is annualised.'},
  {id:'immigration-decisions-backlog',topicId:'immigration',leftMetricId:'asylum-substantive-decisions',rightMetricId:'asylum-awaiting-initial',allowedSignalTypes:['output-up-backlog-up'],relationship:'output-to-outcome',interpretation:'co-movement-only',periodAlignment:'calendar-year decision output is intentionally aligned to the 31 December backlog stock.'},
  {id:'housing-spend-supply',topicId:'housing',leftMetricId:'housing-spend',rightMetricId:'housing-net-additions',allowedSignalTypes:['spend-up-output-down'],relationship:'money-to-output',interpretation:'co-movement-only',periodAlignment:'both measures cover the aligned fiscal year, with UK spend and England supply geography retained.'},
  {id:'housing-supply-affordability',topicId:'housing',leftMetricId:'housing-net-additions',rightMetricId:'housing-affordability',allowedSignalTypes:['supply-up-affordability-down'],relationship:'supply-to-outcome',interpretation:'co-movement-only',periodAlignment:'fiscal-year supply is intentionally aligned to the calendar-year affordability observation; actual periods remain visible.'},
  {id:'housing-supply-temporary-accommodation',topicId:'housing',leftMetricId:'housing-net-additions',rightMetricId:'housing-temporary-accommodation',allowedSignalTypes:['output-up-outcome-down'],relationship:'supply-to-outcome',interpretation:'co-movement-only',periodAlignment:'fiscal-year supply is aligned to the 31 March temporary-accommodation stock; actual periods remain visible.'},
];

export const seriesById=(topicId:string,metricId:string)=>intelligenceSeries.find(series=>series.topicId===topicId&&series.metricId===metricId);
