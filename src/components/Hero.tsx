import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero(){
  const go=()=>{const el=document.getElementById('route-url');el?.scrollIntoView({block:'center'});el?.focus({preventScroll:true})};
  return (
    <section id="top" className="hero-ref">
      <div className="shell hero-ref-inner">
        <div className="hero-kicker"><span className="dot"><Sparkles size={12}/></span>Free · No account</div>
        <h1 className="hero-ref-title">Turn your route<br/><span className="soft">into a <span className="font-extrabold">GPX track.</span></span></h1>
        <p className="hero-ref-sub">Google Maps → GPX, ready for your GPS or navigation app.</p>
        <div className="hero-actions">
          <button onClick={go} className="btn-primary">Convert a route <ArrowRight size={17}/></button>
          <a href="#how-it-works" className="btn-secondary">How it works</a>
        </div>
        <div className="hero-art" aria-hidden>
          <svg className="hero-art-svg" viewBox="0 0 1180 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 190C220 80 315 230 440 140S650 75 760 155s220 75 330-35" stroke="#111" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="90" cy="190" r="11" fill="#69A8FF" stroke="#111" strokeWidth="4"/>
            <circle cx="440" cy="140" r="11" fill="#B56CFF" stroke="#111" strokeWidth="4"/>
            <circle cx="760" cy="155" r="11" fill="#B8DF00" stroke="#111" strokeWidth="4"/>
            <circle cx="1090" cy="120" r="11" fill="#FF7625" stroke="#111" strokeWidth="4"/>
            <g transform="translate(105 125)"><path d="M0 52C0 20 20 0 53 0s53 20 53 52c0 27-20 50-53 50S0 79 0 52Z" fill="#69A8FF"/><path d="M25 35c8-12 23-12 31 0M70 35c8-12 23-12 31 0" stroke="#111" strokeWidth="4" strokeLinecap="round"/><path d="m50 58 10 0" stroke="#111" strokeWidth="4" strokeLinecap="round"/></g>
            <g transform="translate(330 55)"><path d="M0 80C0 28 35 0 92 0s92 28 92 80c0 44-35 78-92 78S0 124 0 80Z" fill="#B56CFF"/><circle cx="58" cy="75" r="5" fill="#111"/><circle cx="118" cy="75" r="5" fill="#111"/><path d="M76 100c12 9 26 9 38 0" stroke="#111" strokeWidth="4" strokeLinecap="round"/></g>
            <g transform="translate(575 48)"><path d="M0 82C0 30 38 0 98 0s98 30 98 82c0 44-38 78-98 78S0 126 0 82Z" fill="#B8DF00"/><circle cx="65" cy="74" r="5" fill="#111"/><circle cx="132" cy="74" r="5" fill="#111"/><path d="M84 101c12 10 27 10 39 0" stroke="#111" strokeWidth="4" strokeLinecap="round"/></g>
            <g transform="translate(850 70)"><path d="M0 72C0 26 34 0 88 0s88 26 88 72c0 42-34 72-88 72S0 114 0 72Z" fill="#FF7625"/><path d="m62 73 30-30 27 27-30 30-27-27Z" stroke="#111" strokeWidth="4"/><path d="M75 61 107 93" stroke="#111" strokeWidth="4"/></g>
          </svg>
        </div>
      </div>
    </section>
  );
}
