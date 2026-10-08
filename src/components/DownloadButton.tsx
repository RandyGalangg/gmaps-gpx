import { Download, RotateCcw, Sparkles } from 'lucide-react';
import { sanitizeFilename } from '../utils/filename';
interface Props{xml:string;valid:boolean;filename:string;onReset:()=>void;}
export default function DownloadButton({xml,valid,filename,onReset}:Props){
 const download=()=>{if(!valid)return;const url=URL.createObjectURL(new Blob([xml],{type:'application/gpx+xml'}));const a=document.createElement('a');a.href=url;a.download=sanitizeFilename(filename);document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 return <div className="download-card">{!valid&&<p role="alert" className="mb-3 text-sm text-bad">GPX generation failed because the route data is incomplete.</p>}
 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime-300 text-ink shadow-[3px_3px_0_#0f172a]"><Sparkles size={18}/></span><div><p className="font-black">Ready to take it with you?</p><p className="mt-0.5 text-sm font-medium text-ink/55">Download the GPX file and import it into your device.</p></div></div><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={download} disabled={!valid} className="btn-primary"><Download size={18}/> Download GPX</button><button type="button" onClick={onReset} className="btn-secondary"><RotateCcw size={17}/> New route</button></div></div></div>;
}
