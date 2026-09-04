import type {MetricComparability,MetricPolarity} from '../data/real/story';

export type IntelligenceDimension='money'|'capacity'|'output'|'outcome'|'context';
export type IntelligenceStatus='official'|'derived-from-official'|'unavailable';
export type IntelligenceDirection='up'|'down'|'flat';
export type IntelligenceConfidence='high'|'medium';
export type MeasurementBasis='fiscal-year'|'calendar-year'|'year-ending'|'month-end-snapshot'|'monthly-total'|'point-in-time';

export type IntelligenceMetricPoint={
  periodId:string;
  measurementPeriod:string;
  date?:string;
  value?:number;
  evidenceIds:string[];
  comparability:MetricComparability;
  status:IntelligenceStatus;
};

export type IntelligenceMetricSeries={
  metricId:string;
  topicId:string;
  label:string;
  definition:string;
  dimension:IntelligenceDimension;
  unit:string;
  polarity:MetricPolarity;
  geography:string;
  measurementBasis:MeasurementBasis;
  points:IntelligenceMetricPoint[];
};

export type SignalExplanation={observed:string;whyFlagged:string;cannotSay:string};
export type InflectionType='peak'|'trough'|'reversal-up'|'reversal-down'|'acceleration'|'deceleration';

export type InflectionSignal={
  kind:'inflection';
  id:string;
  topicId:string;
  metricId:string;
  type:InflectionType;
  periodId:string;
  measurementPeriod:string;
  previousValue?:number;
  value:number;
  nextValue?:number;
  absoluteChange?:number;
  percentageChange?:number;
  materiality:number;
  comparability:IntelligenceConfidence;
  evidenceIds:string[];
  explanation:SignalExplanation;
};

export type ContradictionPattern='spend-up-outcome-down'|'spend-down-outcome-up'|'capacity-up-performance-down'|'capacity-down-performance-up'|'output-up-backlog-up'|'output-up-outcome-down'|'supply-up-affordability-down'|'spend-up-output-down';
export type RelationshipKind='money-to-outcome'|'capacity-to-outcome'|'output-to-outcome'|'money-to-output'|'supply-to-outcome';

export type IntelligenceRelationship={
  id:string;
  topicId:string;
  leftMetricId:string;
  rightMetricId:string;
  allowedSignalTypes:ContradictionPattern[];
  relationship:RelationshipKind;
  interpretation:'co-movement-only';
  periodAlignment:string;
};

export type ContradictionSignal={
  kind:'contradiction';
  id:string;
  topicId:string;
  relationshipId:string;
  type:ContradictionPattern;
  periodId:string;
  leftMetricId:string;
  rightMetricId:string;
  leftDirection:IntelligenceDirection;
  rightDirection:IntelligenceDirection;
  rightInterpretation?:'improved'|'deteriorated';
  leftMeasurementPeriod:string;
  rightMeasurementPeriod:string;
  materiality:number;
  comparability:IntelligenceConfidence;
  evidenceIds:string[];
  explanation:SignalExplanation;
};

export type IntelligenceSignal=InflectionSignal|ContradictionSignal;
