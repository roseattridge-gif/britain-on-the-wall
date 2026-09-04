import {render} from '@testing-library/react';
import {describe,expect,it} from 'vitest';
import {MoneyDisplay} from './MoneyDisplay';

describe('MoneyDisplay',()=>{
  it('keeps symbol, numeric value and unit as separate unbroken elements',()=>{
    const{container}=render(<MoneyDisplay value="313.7" unit="bn"/>),display=container.querySelector('.money-display')!;
    expect(display.querySelector('.currency-symbol')).toHaveTextContent('£');
    expect(display.querySelector('.money-value')).toHaveTextContent('313.7');
    expect(display.querySelector('.money-unit')).toHaveTextContent('bn');
    expect(display).toHaveTextContent('£313.7bn');
  });

  it('omits the unit cleanly for the central £100 display',()=>{
    const{container}=render(<MoneyDisplay value="100"/>);
    expect(container.querySelector('.money-value')).toHaveTextContent('100');
    expect(container.querySelector('.money-unit')).not.toBeInTheDocument();
  });
});
