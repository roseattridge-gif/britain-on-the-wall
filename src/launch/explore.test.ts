import {describe,expect,it} from 'vitest';
import {answerQuestion,claims,journeys} from './explore';

describe('deterministic launch exploration',()=>{
  it.each([
    ['What is the tax gap?','tax-gap'],['How much benefit fraud and error is there?','benefit-error'],['Is public service efficiency improving?','productivity'],['What happened to immigration?','migration'],['What about homelessness?','housing'],
  ])('routes %s to evidence', (question,id)=>{const result=answerQuestion(question);expect(result?.claim.id).toBe(id);expect(result?.claim.evidenceIds.length).toBeGreaterThan(0)});
  it('stops cleanly outside coverage',()=>expect(answerQuestion('How should Britain reform schools?')).toBeUndefined());
  it('limits the public claim set and resolves every claim to evidence',()=>{expect(claims).toHaveLength(5);claims.forEach(claim=>{expect(claim.evidenceIds.length).toBeGreaterThan(0);expect(claim.context).toBeTruthy()})});
  it('provides two bounded, shareable journeys',()=>{expect(journeys.immigration.steps).toHaveLength(7);expect(journeys.health.steps).toHaveLength(7);Object.values(journeys).flatMap(item=>item.steps).forEach(step=>{expect(step.limit).toBeTruthy();expect(step.evidenceIds.length).toBeGreaterThan(0)})});
});
