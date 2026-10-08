import { Github, Route } from 'lucide-react';
import { GITHUB_URL } from '../config';

export default function Footer() {
  const link = 'flex min-h-11 items-center text-muted transition-colors hover:text-ink';
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-bold tracking-tight"><span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white"><Route size={15} aria-hidden /></span>Maps<span className="text-brand">→</span>GPX</div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">A small utility for turning Google Maps routes into portable GPX files.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col md:flex-row md:gap-6">
          <a className={link} href="#how-it-works">How it works</a>
          <a className={link} href="#faq">FAQ</a>
          <a className={link} href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Github size={16} className="mr-2" aria-hidden /> GitHub</a>
        </nav>
      </div>
      <div className="border-t border-line/70">
        <p className="mx-auto max-w-[1160px] px-4 py-5 text-xs text-muted sm:px-6">&copy; 2026 Maps→GPX. Built for simple route exports.</p>
      </div>
    </footer>
  );
}
