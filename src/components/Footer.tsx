import { GITHUB_URL } from '../config';

export default function Footer() {
  const link = 'flex min-h-11 items-center text-muted hover:text-ink';
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-bold">Google Maps to GPX</p>
          <p className="mt-1 text-muted">Convert Google Maps routes into GPX files.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col md:flex-row md:gap-6">
          <a className={link} href="#how-it-works">How it works</a>
          <a className={link} href="#faq">FAQ</a>
          <a className={link} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
      <p className="mx-auto max-w-[1240px] px-4 pb-8 text-sm text-muted sm:px-6">&copy; 2026 Google Maps to GPX</p>
    </footer>
  );
}
