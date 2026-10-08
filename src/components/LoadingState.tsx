import { Check, Loader2, MapPinned } from 'lucide-react';
import type { Stage } from '../hooks/useRouteConverter';
const STAGES:{id:Stage;label:string}[]=[{id:'analyzing',label:'Analyzing your link'},{id:'resolving',label:'Finding the route'},{id:'generating',label:'Building GPX file'}];
export default function LoadingState({stage}:{stage:Stage}) {
 const current=STAGES.findIndex(s=>s.id===stage);
 return <div className="card min-h-[280px]" role="status" aria-live="polite">
  <div className="mb-6 flex items-start gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white shadow-[3px_3px_0_#84cc16]"><MapPinned size={19}/></span><div><p className="font-black">Building your GPX</p><p className="mt-1 text-sm font-medium text-ink/50">This usually takes a few seconds.</p></div></div>
  <ol className="space-y-2">{STAGES.map((s,i)=><li key={s.id} className={`flex min-h-12 items-center gap-3 rounded-xl border-2 px-3 ${i===current?'border-brand/30 bg-brand/5':'border-transparent'} ${i>current?'text-ink/35':''}`}>{i<current?<span className="grid h-7 w-7 place-items-center rounded-full bg-ok text-white"><Check size={16}/></span>:i===current?<span className="grid h-7 w-7 place-items-center rounded-full bg-brand/10"><Loader2 size={16} className="animate-spin text-brand"/></span>:<span className="h-7 w-7 rounded-full border-2 border-line"/>}<span className={i===current?'font-bold':''}>{s.label}</span></li>)}</ol>
 </div>;
}
