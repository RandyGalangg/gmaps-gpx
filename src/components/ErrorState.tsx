import { AlertTriangle } from 'lucide-react'; import type { AppErrorCode } from '../types/route';
const COPY:Record<AppErrorCode,{title:string;help:string}>={
INVALID_URL:{title:'Please enter a valid Google Maps route URL.',help:'Open your route in Google Maps, then copy the full address from the browser bar.'},
UNSUPPORTED_URL:{title:'This Google Maps link format is not currently supported.',help:'Shortened links, transit routes and non-directions links cannot be read.'},
NO_ROUTE:{title:"We couldn't determine the route geometry from this link.",help:'The link needs at least a start and an end point. Use the Directions view in Google Maps.'},
ROUTE_UNAVAILABLE:{title:"We couldn't determine the route geometry from this link.",help:'No route was found for this travel mode. Try different stops.'},
GEOCODE_FAILED:{title:"We couldn't determine the route geometry from this link.",help:'One of the place names could not be located. Try a more specific place name.'},
NETWORK:{title:'Connection failed. Please try again.',help:'Check your internet connection and retry.'},
API:{title:"We couldn't retrieve the route right now.",help:'The public routing service may be busy. Wait a moment and retry.'}};
export default function ErrorState({code}:{code:AppErrorCode}){const {title,help}=COPY[code];return <div className="border-2 border-bad bg-surface p-6" role="alert"><div className="flex gap-3"><AlertTriangle className="shrink-0 text-bad" size={22}/><div><p className="font-black text-bad">{title}</p><p className="mt-2 text-sm text-muted">{help}</p></div></div></div>}