import { Github, Menu, Moon, Route, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GITHUB_URL } from '../config';

export default function Header() {
  const [dark,setDark]=useState(false);
  useEffect(()=>{const saved=localStorage.getItem('maps-gpx-theme');const prefers=window.matchMedia('(prefers-color-scheme: dark)').matches;const next=saved?saved==='dark':prefers;document.documentElement.classList.toggle('dark',next);setDark(next)},[]);
  const toggle=()=>{const next=!dark;document.documentElement.classList.toggle('dark',next);localStorage.setItem('maps-gpx-theme',next?'dark':'light');setDark(next)};
  return <header className="sticky top-0 z-[1000] bg-canvas/85 px-4 py-3 backdrop-blur-md sm:px-6">
    <div className="floating-nav shell flex h-14 max-w-[1080px] items-center justify-between rounded-full px-3 sm:px-5">
      <a href="#top" className="flex items-center gap-2 font-black"><span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-canvas"><Route size={17}/></span><span className="hidden sm:inline">Maps → GPX</span></a>
      <nav className="hidden items-center gap-1 text-sm font-bold md:flex"><a className="rounded-full px-4 py-2 hover:bg-soft" href="#converter">Converter</a><a className="rounded-full px-4 py-2 hover:bg-soft" href="#how-it-works">How it works</a><a className="rounded-full px-4 py-2 hover:bg-soft" href="#faq">FAQ</a></nav>
      <div className="flex items-center gap-1"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden h-10 w-10 place-items-center rounded-full md:grid"><Github size={18}/></a><button onClick={toggle} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-full hover:bg-soft">{dark?<Sun size={18}/>:<Moon size={18}/>}</button><button aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full md:hidden"><Menu size={19}/></button></div>
    </div>
  </header>
}