import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe,expect,it} from 'vitest';
import App from './App';

describe('approved £100 national Wall',()=>{
  it('states the public-money question in the primary composition',()=>{render(<App/>);expect(screen.getByRole('heading',{name:/Where Britain’s£100 comes from/})).toBeInTheDocument();expect(screen.getByRole('heading',{name:/Where Britain’s£100 goes/})).toBeInTheDocument();expect(screen.getByText('of every £100')).toBeInTheDocument()});
  it('shows the reconciled real national pool',()=>{render(<App/>);expect(screen.getAllByText('£1.360tn').length).toBeGreaterThan(0);expect(screen.getAllByText('£100').length).toBeGreaterThan(0);expect(screen.getByText('Raised or borrowed')).toBeInTheDocument()});
  it('orders the largest real source first',()=>{render(<App/>);const sources=screen.getAllByRole('button',{name:/percent$/}).slice(0,6);expect(sources[0]).toHaveAccessibleName(/Income & social contributions £44.90, 44.9 percent/)});
  it('orders Health as the largest destination with precise hierarchy',()=>{render(<App/>);const health=screen.getByRole('button',{name:/Health & social care £23.06, 23.1 percent/});expect(health).toHaveTextContent('£23.06');expect(health).toHaveTextContent('23.1%');expect(health).toHaveTextContent('£313.7bn')});
  it('keeps borrowing visibly separate from receipts',()=>{render(<App/>);const borrowing=screen.getByRole('button',{name:/Borrowing £9.54/});expect(borrowing).toHaveClass('borrowing');expect(borrowing).toHaveTextContent('Fills the gap · not revenue')});
  it('treats technical reconciliation as not a service',()=>{render(<App/>);const technical=screen.getByRole('button',{name:/Accounting & statistical adjustments/});expect(technical).toHaveClass('technical');expect(technical).toHaveTextContent('NOT A SERVICE')});
  it('switches numeric hierarchy without changing taxonomy',async()=>{render(<App/>);await userEvent.click(screen.getByRole('button',{name:'£ BILLIONS'}));expect(screen.getByRole('button',{name:/Health & social care £313.7bn, 23.1 percent/})).toHaveTextContent('£23.06 / £100');expect(screen.getByRole('button',{name:/Income & social contributions £610.7bn, 44.9 percent/})).toBeInTheDocument()});
  it('offers exactly the five accepted complete outturns',()=>{render(<App/>);['2021–22','2022–23','2023–24','2024–25'].forEach(period=>expect(screen.getByRole('button',{name:period})).toBeInTheDocument());expect(screen.getByRole('button',{name:/2025–26LATEST/})).toBeInTheDocument()});
  it('updates the same Wall from real historical adapters',async()=>{render(<App/>);await userEvent.click(screen.getByRole('button',{name:'2021–22'}));expect(screen.getByRole('button',{name:/Health & social care £24.63/})).toBeInTheDocument();expect(screen.getByText(/Select a later year/)).toBeInTheDocument()});
  it('opens evidence in place',async()=>{render(<App/>);await userEvent.click(screen.getByRole('button',{name:/Income & social contributions/}));expect(screen.getByText('Challenge the number')).toBeInTheDocument();expect(screen.getByRole('main')).toHaveClass('national-wall')});
  it('labels outcomes as illustrative context',()=>{render(<App/>);expect(screen.getByText('ILLUSTRATIVE CONTEXT · NOT HISTORICAL EVIDENCE')).toBeInTheDocument();expect(screen.getAllByText('Evidence upgrade pending')).toHaveLength(5)});
  it('contains proportional physical unit tokens and flow paths',()=>{const{container}=render(<App/>);expect(container.querySelectorAll('.unit-tokens i').length).toBeGreaterThan(190);expect(container.querySelectorAll('.editorial-flows path')).toHaveLength(20)});
});
