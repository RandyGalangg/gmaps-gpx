export default function Hero() {
  const go = () => {
    const el = document.getElementById('route-url');
    el?.scrollIntoView({ block: 'center' });
    el?.focus({ preventScroll: true });
  };
  return (
    <section id="top" className="mx-auto max-w-[1240px] px-4 pb-10 pt-12 sm:px-6 md:pb-12 md:pt-16 lg:pt-20">
      <h1 className="max-w-3xl text-[32px] font-bold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl">
        Turn Google Maps Routes into GPX
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
        Paste a Google Maps route and generate a GPX file for your GPS, cycling computer, or navigation app.
      </p>
      <button type="button" onClick={go} className="btn-primary mt-7">Convert a Route</button>
    </section>
  );
}
