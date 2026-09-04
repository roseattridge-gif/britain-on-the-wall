type Props={value:string;unit?:string;className?:string};

export function MoneyDisplay({value,unit,className=''}:Props){return <span className={`money-display ${className}`.trim()}><span className="currency-symbol" aria-hidden="true">£</span><span className="money-value">{value}</span>{unit&&<span className="money-unit">{unit}</span>}</span>}
