import {useCallback,useRef,useState} from 'react';
export type Camera={x:number;y:number;scale:number};
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
export function useCamera(initial:Camera){const [camera,setCamera]=useState(initial);const drag=useRef<{x:number;y:number;cx:number;cy:number}|null>(null);
 const focus=useCallback((target:Camera)=>setCamera(target),[]);
 const zoomAt=useCallback((factor:number,cx:number,cy:number)=>setCamera(c=>{const next=clamp(c.scale*factor,.32,2.4);return{x:cx-(cx-c.x)*(next/c.scale),y:cy-(cy-c.y)*(next/c.scale),scale:next}}),[]);
 const onWheel=useCallback((e:React.WheelEvent)=>{e.preventDefault();const r=e.currentTarget.getBoundingClientRect();zoomAt(Math.exp(-e.deltaY*.0012),e.clientX-r.left,e.clientY-r.top)},[zoomAt]);
 const onPointerDown=useCallback((e:React.PointerEvent)=>{if((e.target as HTMLElement).closest('button'))return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,cx:camera.x,cy:camera.y}},[camera]);
 const onPointerMove=useCallback((e:React.PointerEvent)=>{if(!drag.current)return;setCamera(c=>({...c,x:drag.current!.cx+e.clientX-drag.current!.x,y:drag.current!.cy+e.clientY-drag.current!.y}))},[]);
 const onPointerUp=useCallback(()=>{drag.current=null},[]);
 return{camera,setCamera,focus,zoomAt,handlers:{onWheel,onPointerDown,onPointerMove,onPointerUp,onPointerCancel:onPointerUp}}}
