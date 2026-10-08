import { ArrowDown, Check, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const go = () => {
    const el = document.getElementById('route-url');
    el?.scrollIntoView({ block: 'center' });
    el?.focus({ preventScroll: true });
  };

  return (
    <section id="top" className="relative overflow-hidden border-b border-line/70 bg-white">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
      </div>
      <div className="relative mx-auto max-w-[1160px] px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-20 lg:pt-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted">
            <ShieldCheck size={14} aria-hidden className="text-brand" /> Free · No account · No API key
          </div>
          <h1 className="max-w-3xl text-[38px] font-bold leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-[68px]">
            Turn Google Maps routes into <span className="text-brand">GPX.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">
            Paste a route, preview the rebuilt path, and download a GPX file for your GPS, cycling computer, or navigation app.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button type="button" onClick={go} className="btn-primary sm:w-auto">
              Convert a route <ArrowDown size={17} aria-hidden />
            </button>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted">
              <span className="inline-flex items-center gap-1.5"><Check size={15} className="text-ok" /> Driving</span>
              <span className="inline-flex items-center gap-1.5"><Check size={15} className="text-ok" /> Cycling</span>
              <span className="inline-flex items-center gap-1.5"><Check size={15} className="text-ok" /> Walking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
