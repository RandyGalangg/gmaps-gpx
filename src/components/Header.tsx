import { Github, Moon, Route, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GITHUB_URL } from '../config';
export default function Header(){
 const [dark,setDark]=useState(false);
 useEffect(()=>{const saved=localStorage.getItem('maps-gpx-theme');const prefers=window.matchMedia('(prefers-color-scheme: dark)').matches;const next=saved?saved==='dark':prefers;document.documentElement.classList.toggle('dark',next);setDark(next)},[]);
 const toggle=()=>{const next=!dark;document.documentElement.classList.toggle('dark',next);localStorage.setItem('maps-gpx-theme',next?'dark':'light');setDark(next)};
 return <header className="sticky top-0 z-50 bg-canvas/80 px-4 py-3 backdrop-blur-md">
  <div className="floating-nav mx-auto flex h-14 max-w-[980px] items-center justify-between rounded-full px-3 sm:px-5">
   <nav className="hidden items-center gap-1 text-sm font-medium md:flex"><a className="rounded-full px-3 py-2 hover:bg-soft" href="#converter">Converter</a><a className="rounded-full px-3 py-2 hover:bg-soft" href="#how-it-works">How it works</a><a className="rounded-full px-3 py-2 hover:bg-soft" href="#faq">FAQ</a></nav>
   <a href="#top" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-xl font-extrabold tracking-[-.05em]"><span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-canvas"><Route size={16}/></span>Maps→GPX</a>
   <div className="ml-auto flex items-center gap-2"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium md:block">GitHub</a><button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white">{dark?<Sun size={16}/>:<Moon size={16}/>}</button></div>
  </div>
 </header>
}