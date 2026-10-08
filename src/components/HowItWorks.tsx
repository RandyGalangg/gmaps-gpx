const STEPS = [
  ['01', 'Paste your link', 'Copy a Google Maps directions link and paste it into the converter.'],
  ['02', 'We rebuild the route', 'Stops are read from the link and the road geometry is requested from OpenStreetMap-based routing.'],
  ['03', 'Download the GPX', 'Preview the result, adjust the file name if you want, then export a GPX 1.1 file.'],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1160px] px-4 py-16 sm:px-6 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Simple by design</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">From route link to GPX in three steps.</h2>
      </div>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {STEPS.map(([n, t, d]) => (
          <li key={n} className="card relative overflow-hidden">
            <span className="text-sm font-bold text-brand">{n}</span>
            <h3 className="mt-8 font-bold">{t}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm text-muted">The route follows OpenStreetMap roads, so it can differ slightly from the one Google shows.</p>
    </section>
  );
}
