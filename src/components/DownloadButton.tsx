import { Download, RotateCcw } from 'lucide-react';
import { sanitizeFilename } from '../utils/filename';
interface Props{xml:string;valid:boolean;filename:string;onReset:()=>void}
export default function DownloadButton({xml,valid,filename,onReset}:Props){
 const download=()=>{if(!valid)return;const url=URL.createObjectURL(new Blob([xml],{type:'application/gpx+xml'}));const a=document.createElement('a');a.href=url;a.download=sanitizeFilename(filename);document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)};
 return <div className="border-t-2 border-ink pt-5"><div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={download} disabled={!valid} className="btn-primary flex-1"><Download size={18}/> Download GPX</button><button type="button" onClick={onReset} className="btn-secondary"><RotateCcw size={17}/> Another route</button></div>{!valid&&<p role="alert" className="mt-2 text-sm text-bad">GPX generation failed because the route data is incomplete.</p>}</div>
}