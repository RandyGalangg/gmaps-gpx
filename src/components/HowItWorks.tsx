const STEPS = [
  ['Paste your link', 'Copy the address of a Google Maps directions page and paste it above.'],
  ['We rebuild the route', 'Stops are read from the link and the road geometry is requested from OpenStreetMap-based routing.'],
  ['Download the GPX', 'Check the preview, adjust the name, then save a GPX 1.1 file.'],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6">
      <h2 className="text-2xl font-bold md:text-3xl">How It Works</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {STEPS.map(([t, d], i) => (
          <li key={t} className="card">
            <p className="mb-1 font-semibold">{i + 1}. {t}</p>
            <p className="text-muted">{d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-muted">The route follows OpenStreetMap roads, so it can differ slightly from the one Google shows.</p>
    </section>
  );
}
