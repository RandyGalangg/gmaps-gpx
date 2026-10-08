import { Github, Route } from 'lucide-react';
import { GITHUB_URL } from '../config';

export default function Header() {
  return (
    <header className="sticky top-0 z-[1000] border-b border-line/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white shadow-sm"><Route size={17} aria-hidden /></span>
          Maps<span className="text-brand">→</span>GPX
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-semibold">
          <a href="#how-it-works" className="hidden min-h-11 items-center px-3 text-muted transition-colors hover:text-ink md:flex">How it works</a>
          <a href="#faq" className="hidden min-h-11 items-center px-3 text-muted transition-colors hover:text-ink md:flex">FAQ</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-2 text-muted transition-colors hover:bg-canvas hover:text-ink">
            <Github size={19} aria-hidden /><span className="hidden md:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
