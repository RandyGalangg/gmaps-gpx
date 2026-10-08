const ITEMS: [string, string][] = [
  ['What is a GPX file?', 'GPX is an open XML format for tracks, routes and waypoints. Most GPS devices, cycling computers and navigation apps can import it.'],
  ['Can I convert any Google Maps route?', 'No. The link must be a google.com/maps/dir/ directions link for driving, cycling or walking. Shortened links and transit routes are not supported.'],
  ['Can I use the GPX file on a cycling computer?', 'Usually yes. Import it using your device maker\u2019s app or website. Check that your device supports track imports.'],
  ['Does this application store my route?', 'This app has no backend and does not save your routes. Your browser does send the stops to public OpenStreetMap routing and geocoding services to build the route, and those services may keep their own logs.'],
  ['Why can\u2019t some Google Maps links be converted?', 'Google links usually hold only the stops, not the road path. We rebuild the path with a routing service, so we need clear stops. We never draw a straight line instead.'],
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-6">
      <h2 className="text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
      <div className="mt-6 max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white">
        {ITEMS.map(([q, a]) => (
          <details key={q} className="group px-5 py-1">
            <summary className="flex min-h-11 cursor-pointer items-center py-2 font-semibold">{q}</summary>
            <p className="pb-4 text-muted">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
