import { ArrowRight, Sparkles } from 'lucide-react';
export default function Hero(){
 const go=()=>{const el=document.getElementById('route-url');el?.scrollIntoView({block:'center'});el?.focus({preventScroll:true})};
 return <section id="top" className="hero-ref">
  <div className="shell hero-ref-inner">
   <div className="hero-kicker"><span className="dot"><Sparkles size={12}/></span>Free · No account · No API key <span>→</span></div>
   <h1 className="hero-ref-title">Turn your route<br/><span className="soft">into a <span className="font-extrabold">GPX track.</span></span></h1>
   <p className="hero-ref-sub">Convert a Google Maps directions route into a portable GPX file for your GPS, cycling computer, or navigation app.</p>
   <div className="hero-actions"><button onClick={go} className="btn-primary">Convert a route <ArrowRight size={17}/></button><a href="#how-it-works" className="btn-secondary">How it works</a></div>
   <div className="hero-art" aria-hidden>
    <div className="hero-route-line"/><i className="hero-pin a"/><i className="hero-pin b"/><i className="hero-pin c"/>
    <div className="hero-blob blue"><span className="hero-blob-icon">↗</span></div>
    <div className="hero-blob purple"><span className="hero-blob-icon">⌁</span></div>
    <div className="hero-blob lime"><span className="hero-blob-icon">●</span></div>
    <div className="hero-blob orange"><span className="hero-blob-icon">↯</span></div>
   </div>
  </div>
 </section>
}