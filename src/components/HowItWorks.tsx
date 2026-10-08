import { ArrowRight, Download, Link2, Route } from 'lucide-react';

const STEPS = [
  { n:'01', title:'Drop the link', text:'Paste a Google Maps directions link. Short app links work too.', icon:Link2, tag:'INPUT' },
  { n:'02', title:'Shape the route', text:'We read the stops and rebuild the road geometry with OpenStreetMap-based routing.', icon:Route, tag:'BUILD' },
  { n:'03', title:'Take the GPX', text:'Preview your route, set the file name, and export a GPX 1.1 file.', icon:Download, tag:'EXPORT' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section">
      <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6 lg:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works / 03 steps</p>
            <h2 className="mt-3 text-4xl font-black leading-[.95] tracking-[-.04em] md:text-6xl">
              No detours.<br /><span className="text-brand">Just your route.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-semibold leading-6 text-ink/50">
            One link in. A portable track out. The middle is handled for you.
          </p>
        </div>

        <ol className="how-grid mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ n, title, text, icon: Icon, tag }, i) => (
            <li key={n} className="step-card">
              <div className="flex items-center justify-between">
                <span className="step-number grid h-12 w-12 place-items-center rounded-2xl border-2 font-black">{n}</span>
                <span className="faq-index text-xs font-black tracking-[0.18em]">{tag}</span>
              </div>
              <div className="step-mini mt-7 flex h-20 items-center justify-between rounded-2xl px-4">
                <Icon size={30} strokeWidth={1.8} />
                {i < 2 && <ArrowRight className="text-ink/25" size={20} />}
                {i === 2 && <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-black text-white">GPX 1.1</span>}
              </div>
              <h3 className="mt-7 text-2xl font-black tracking-tight">{title}</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-ink/55">{text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex items-center gap-3 border-l-4 border-brand pl-4 text-sm font-semibold text-ink/50">
          <span>ROUTING NOTE</span>
          <span>·</span>
          <span>The generated track follows OpenStreetMap roads, so it can differ slightly from Google Maps.</span>
        </div>
      </div>
    </section>
  );
}
