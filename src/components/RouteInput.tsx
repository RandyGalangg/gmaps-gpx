import { CheckCircle2, Loader2, ClipboardPaste } from 'lucide-react';
import { useState } from 'react'; import type { FormEvent } from 'react';
import { validateInput } from '../utils/validation'; import type { Status } from '../hooks/useRouteConverter';
interface Props{value:string;onChange:(v:string)=>void;onSubmit:()=>void;status:Status}
export default function RouteInput({value,onChange,onSubmit,status}:Props){
 const [touched,setTouched]=useState(false);const validity=validateInput(value);const loading=status==='loading';const showError=touched&&validity!=='valid';const message=validity==='empty'?'Paste a Google Maps route URL.':'Please enter a valid Google Maps route URL.';
 const paste=async()=>{try{const text=await navigator.clipboard.readText();onChange(text);setTouched(true)}catch{}};
 const submit=(e:FormEvent)=>{e.preventDefault();setTouched(true);if(validity==='valid'&&!loading)onSubmit()};
 return <form onSubmit={submit} className="border-2 border-ink bg-soft p-4 sm:p-5" noValidate>
  <div className="flex items-center justify-between gap-3"><label htmlFor="route-url" className="text-sm font-black">Google Maps route</label><button type="button" onClick={paste} className="mono-label flex items-center gap-1.5 hover:text-ink"><ClipboardPaste size={14}/> Paste</button></div>
  <div className="mt-3 relative"><input id="route-url" type="url" inputMode="url" autoComplete="off" value={value} disabled={loading} onChange={e=>onChange(e.target.value)} onBlur={()=>setTouched(true)} placeholder="https://maps.app.goo.gl/…" aria-invalid={showError} aria-describedby="route-url-msg" className="field input-v2 pr-12"/>{validity==='valid'&&<CheckCircle2 size={20} className="absolute right-5 top-7 text-ok"/>}</div>
  <p id="route-url-msg" role={showError?'alert':undefined} className={`mt-2 min-h-5 text-xs font-semibold ${showError?'text-bad':'text-muted'}`}>{showError?message:'Directions links, including shortened mobile links.'}</p>
  <button type="submit" disabled={loading} className="btn-primary mt-4 w-full">{loading&&<Loader2 size={18} className="animate-spin"/>}{loading?'Building route…':'Convert to GPX'} <span>↗</span></button>
 </form>
}