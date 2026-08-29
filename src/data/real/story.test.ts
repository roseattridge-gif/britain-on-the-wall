import {describe,expect,it} from 'vitest';
import {governmentForEvent,handoverTrajectory,immigrationStory,sortedStoryEvents,storyEvidence} from './story';

describe('How We Got Here story model',()=>{
  it('gives every event source evidence and a relationship class',()=>{const ids=new Set(storyEvidence.map(item=>item.id));for(const event of immigrationStory.events){expect(event.sourceIds.length).toBeGreaterThan(0);event.sourceIds.forEach(id=>expect(ids.has(id)).toBe(true));expect(event.relationship).toBeTruthy()}});
  it('keeps government periods ordered and non-overlapping',()=>{const periods=immigrationStory.governmentPeriods;for(let index=1;index<periods.length;index++)expect(periods[index-1].endDate!<=periods[index].startDate).toBe(true)});
  it('maps every policy event to the government holding office',()=>{for(const event of immigrationStory.events.filter(item=>item.track==='policy'))expect(governmentForEvent(event,immigrationStory.governmentPeriods)?.id).toBe(event.governmentId)});
  it('sorts story dates deterministically',()=>{const dates=sortedStoryEvents(immigrationStory).map(item=>item.date);expect(dates).toEqual([...dates].sort())});
  it('calculates the handover comparison without calling it attribution',()=>{const handover=handoverTrajectory(immigrationStory);expect(handover.beforeValue).toBe(649);expect(handover.afterValue).toBe(204);expect(handover.inherited).toBe('falling');expect(immigrationStory.summary.cannotSay).toMatch(/cannot assign/i)});
  it('never upgrades followed-by chronology to causal wording',()=>{const forbidden=/caused|because of|resulted in|delivered the fall/i;for(const event of immigrationStory.events.filter(item=>item.relationship==='followed-by'))expect(`${event.title} ${event.summary}`).not.toMatch(forbidden)});
});
