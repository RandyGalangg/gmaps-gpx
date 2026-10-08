import { Github, Moon, Route, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GITHUB_URL } from '../config';

export default function Header() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('maps-gpx-theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = saved ? saved === 'dark' : prefers;
    document.documentElement.classList.toggle('dark', next);
    setDark(next);
  }, []);
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('maps-gpx-theme', next ? 'dark' : 'light');
    setDark(next);
  };
  return (
    <header className="sticky top-0 z-[1000] border-b border-ink/10 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex min-h-11 items-center gap-3 font-black tracking-[-0.03em]">
          <span className="relative grid h-9 w-9 rotate-[-6deg] place-items-center rounded-[10px] bg-ink text-canvas shadow-[3px_3px_0_#84cc16] transition-transform group-hover:rotate-0"><Route size={18} aria-hidden /></span>
          <span className="text-lg">MAPS<span className="text-brand">→</span>GPX</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-bold">
          <a href="#how-it-works" className="hidden min-h-11 items-center rounded-full px-4 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink md:flex">How it works</a>
          <a href="#faq" className="hidden min-h-11 items-center rounded-full px-4 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink md:flex">FAQ</a>
          <button type="button" onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-surface text-ink transition-transform hover:-translate-y-0.5">
            {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
          </button>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-surface px-3 text-ink transition-transform hover:-translate-y-0.5"><Github size={18} aria-hidden /><span className="hidden md:inline">GitHub</span></a>
        </nav>
      </div>
    </header>
  );
}
