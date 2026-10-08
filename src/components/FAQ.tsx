import { HelpCircle } from 'lucide-react';

const ITEMS: [string, string][] = [
  ['What is a GPX file?', 'GPX is an open XML format for tracks, routes and waypoints. Most GPS devices, cycling computers and navigation apps can import it.'],
  ['Can I convert any Google Maps route?', 'No. The link needs to describe a driving, cycling, or walking directions route. Google Maps app shortened links are supported, while transit and non-directions links are not.'],
  ['Can I use the GPX file on a cycling computer?', 'Usually yes. Import it using your device maker’s app or website. Check that your device supports track imports.'],
  ['Does this application store my route?', 'This app has no backend and does not save your routes. Your browser does send the stops to public OpenStreetMap routing and geocoding services to build the route, and those services may keep their own logs.'],
  ['Why can’t some Google Maps links be converted?', 'Google links usually hold only the stops, not the road path. We rebuild the path with a routing service, so we need clear stops. We never draw a straight line instead.'],
];

export default function FAQ() {
  return (
    <section id="faq" className="faq-section">
      <div className="mx-auto max-w-[1180px] px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border-2 border-ink bg-brand text-white shadow-[5px_5px_0_#111827]">
              <HelpCircle size={30} />
            </div>
            <p className="eyebrow">FAQ / QUICK ANSWERS</p>
            <h2 className="mt-3 text-4xl font-black leading-[.92] tracking-[-.04em] md:text-6xl">
              Before you<br /><span className="text-brand">hit export.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm font-medium leading-6 text-ink/50">
              The useful bits, without the manual.
            </p>
          </div>

          <div className="faq-list max-w-none">
            {ITEMS.map(([q, a], i) => (
              <details key={q} className="group">
                <summary className="faq-question flex cursor-pointer list-none items-start gap-4 px-5 py-5 sm:px-6">
                  <span className="faq-index pt-0.5 text-xs font-black tracking-[0.16em]">0{i + 1}</span>
                  <span className="flex-1 pr-2 font-black leading-6">{q}</span>
                  <span className="faq-mark grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-lg font-black transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="pb-6 pl-[52px] pr-14 text-sm font-medium leading-6 text-ink/55 sm:pl-[60px]">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
