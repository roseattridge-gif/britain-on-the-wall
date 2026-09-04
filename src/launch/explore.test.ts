import {describe,expect,it} from 'vitest';
import {answerQuestion,claims,journeys,supportedQuestions} from './explore';
import {splitMetricDisplay} from '../components/MetricValue';

describe('deterministic launch exploration',()=>{
  it.each([
    ['What is the tax gap?','tax-gap'],['How much benefit fraud and error is there?','benefit-error'],['Is public service efficiency improving?','productivity'],['What happened to immigration?','migration'],['What about homelessness?','housing'],
  ])('routes %s to evidence', (question,id)=>{const result=answerQuestion(question);expect(result?.claim.id).toBe(id);expect(result?.claim.evidenceIds.length).toBeGreaterThan(0)});
  it('stops cleanly outside coverage',()=>expect(answerQuestion('How should Britain reform schools?')).toBeUndefined());
  it.each([
    ['How large is the tax gap?','tax-gap'],['How much tax goes uncollected?','tax-gap'],['Is NHS waiting list falling?','waiting-falling'],['Are NHS waiting lists coming down?','waiting-falling'],['Did Labour inherit falling immigration?','inherit-migration'],['Was migration already falling before Labour?','inherit-migration'],['How much goes on debt interest?','debt-interest'],['How much is lost through benefit fraud and error?','benefit-error'],['Is public-service productivity improving?','productivity'],['How many households in temporary accommodation?','housing'],
  ])('covers the launch question matrix: %s',(question,id)=>{const answer=answerQuestion(question);expect(answer?.claim.id).toBe(id);expect(answer?.keyEvidence.display).toBeTruthy();expect(answer?.claim.focusTarget.kind).toMatch(/story|value-leakage|national/)});
  it.each(['What should we do about schools?','Who should I vote for?','Is immigration good?','Which party is best?','What will GDP be in 2030?'])('honestly stops for unsupported question: %s',question=>expect(answerQuestion(question)).toBeUndefined());
  it('publishes a broad deterministic catalogue',()=>expect(supportedQuestions.length).toBeGreaterThanOrEqual(23));
  it.each([['7.11m pathways','7.11m','pathways'],['1.38m FTE staff','1.38m','FTE staff'],['65.3% of RTT pathways within 18 weeks','65.3%','of RTT pathways within 18 weeks'],['7.64× earnings','7.64×','earnings']])('splits %s into magnitude and unit',(display,number,unit)=>expect(splitMetricDisplay(display)).toEqual({number,unit}));
  it('limits the public claim set and gives every claim a bounded reading',()=>{expect(claims).toHaveLength(5);claims.forEach(claim=>{expect(claim.evidenceIds.length).toBeGreaterThan(0);expect(claim.botwReading).toBeTruthy();expect(claim.doesNotProve).toBeTruthy()})});
  it('provides two bounded, shareable journeys',()=>{expect(journeys.immigration.steps).toHaveLength(7);expect(journeys.health.steps).toHaveLength(7);Object.values(journeys).flatMap(item=>item.steps).forEach(step=>{expect(step.limit).toBeTruthy();expect(step.evidenceIds.length).toBeGreaterThan(0)})});
});
