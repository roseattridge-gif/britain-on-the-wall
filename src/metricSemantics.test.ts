import {describe,expect,it} from 'vitest';
import {formatPublicMetricValue,publicMetricSemantics} from './metricSemantics';

describe('public metric semantics',()=>{
  it('keeps required unit nouns on public values',()=>{
    expect(formatPublicMetricValue('health-rtt-waiting',7110000,'pathways')).toContain('pathways');
    expect(formatPublicMetricValue('asylum-awaiting-initial',64426,'people')).toContain('people');
    expect(formatPublicMetricValue('housing-temporary-accommodation',135580,'households')).toContain('households');
    expect(formatPublicMetricValue('health-workforce',1380000,'FTE')).toContain('FTE staff');
    expect(formatPublicMetricValue('housing-net-additions',208600,'dwellings')).toContain('homes');
    expect(formatPublicMetricValue('health-rtt-18-week',65.3,'percent')).toContain('within 18 weeks');
  });
  it('keeps unit meaning on both sides of comparisons',()=>{
    const comparison=(id:string,a:number,b:number,unit:string)=>`${formatPublicMetricValue(id,a,unit)} → ${formatPublicMetricValue(id,b,unit)}`;
    expect(comparison('health-rtt-waiting',7540000,7110000,'pathways').match(/pathways/g)).toHaveLength(2);
    expect(comparison('asylum-awaiting-initial',124802,64426,'people').match(/people/g)).toHaveLength(2);
    expect(comparison('housing-temporary-accommodation',117450,135580,'households').match(/households/g)).toHaveLength(2);
  });
  it('defines every configured public metric with geography',()=>{for(const metric of Object.values(publicMetricSemantics)){expect(metric.publicLabel).toBeTruthy();expect(metric.publicDefinition).toBeTruthy();expect(metric.geographyLabel).toBeTruthy()}});
});
