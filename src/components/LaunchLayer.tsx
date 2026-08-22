import {useEffect,useState} from 'react';

const GA_ID=import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()||'G-9SLN78SFTT';
const KIT_ACTION=import.meta.env.VITE_KIT_FORM_ACTION?.trim();
const CONSENT_KEY='botw_analytics_consent';

function loadAnalytics(){
  if(!GA_ID||document.querySelector(`script[data-ga="${GA_ID}"]`))return;
  const script=document.createElement('script');
  script.async=true;script.dataset.ga=GA_ID;
  script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.append(script);
  const w=window as Window&{dataLayer?:unknown[];gtag?:(...args:unknown[])=>void};
  w.dataLayer=w.dataLayer||[];w.gtag=(...args:unknown[])=>w.dataLayer!.push(args);
  w.gtag('js',new Date());w.gtag('config',GA_ID,{anonymize_ip:true});
}

export function LaunchLayer(){
  const [choice,setChoice]=useState<string|null>(()=>localStorage.getItem(CONSENT_KEY));
  const [status,setStatus]=useState('');
  useEffect(()=>{if(choice==='accepted')loadAnalytics()},[choice]);
  const choose=(value:'accepted'|'rejected')=>{localStorage.setItem(CONSENT_KEY,value);setChoice(value)};
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
    if(!KIT_ACTION){setStatus('The early list is nearly ready. Please check back shortly.');return}
    setStatus('Joining…');
    try{const response=await fetch(KIT_ACTION,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok)throw new Error();form.reset();setStatus('You’re on the wall. Check your inbox to confirm.');(window as Window&{gtag?:(...args:unknown[])=>void}).gtag?.('event','sign_up',{method:'Kit'})}
    catch{setStatus('That did not go through. Please try again in a moment.')}
  };
  return <>
    <section className="launch" id="join"><div><span className="eyebrow">The wall is going up</span><h2>Come and stand back from it.</h2><p>Join the early list for build notes, first access and an invitation to help shape what belongs on the wall.</p></div><form onSubmit={submit}><label htmlFor="join-email">Email address</label><div><input id="join-email" name="email_address" type="email" autoComplete="email" placeholder="you@example.com" required/><button type="submit">Join the list →</button></div><label className="join-consent"><input type="checkbox" required/>I’d like to receive Britain on the Wall emails. I can unsubscribe at any time.</label><p role="status">{status}</p></form></section>
    {choice===null&&<aside className="cookie" aria-label="Cookie choices"><p>We use optional analytics to understand what people find useful. Nothing optional loads unless you agree. <a href="privacy.html">Privacy</a></p><div><button onClick={()=>choose('rejected')}>No thanks</button><button className="allow" onClick={()=>choose('accepted')}>Allow analytics</button></div></aside>}
  </>;
}
