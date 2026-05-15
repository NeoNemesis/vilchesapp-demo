import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Check, Building2, Users, FileText, Calendar,
  Zap, Shield, Globe, BarChart3, Wrench, Receipt, Network,
  Bot, MapPin, ScanLine,
} from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-brand-dark/80 backdrop-blur border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
              <span className="text-brand-dark font-black text-lg">T</span>
            </div>
            <span className="font-bold text-xl">Taskit</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-brand-muted hover:text-white transition-colors">Funktioner</a>
            <a href="#pricing" className="text-brand-muted hover:text-white transition-colors">Priser</a>
            <a href="#network" className="text-brand-muted hover:text-white transition-colors">Företagsnätverk</a>
          </div>
          <button
            onClick={() => navigate('/demo')}
            className="bg-brand-primary text-brand-dark font-bold px-5 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors text-sm"
          >
            Prova demo →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Zap className="h-4 w-4" />
            SaaS för hantverks- och serviceföretag
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-slide-up">
            Hela ditt företag
            <br />
            <span className="text-brand-primary">i en plattform</span>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-10 animate-slide-up">
            Projekt, offerter, fakturor, tidsrapporter, materialhantering, AI-skanning av kvitton.
            Anslut till andra Taskit-företag och dela projekt sömlöst.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <button
              onClick={() => navigate('/demo')}
              className="bg-brand-primary text-brand-dark font-bold px-8 py-4 rounded-lg hover:bg-brand-primary/90 transition-all text-lg flex items-center gap-2 group"
            >
              Prova live-demon
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="text-brand-muted hover:text-white px-6 py-4 transition-colors text-lg"
            >
              Se funktioner ↓
            </a>
          </div>
          <p className="text-sm text-brand-muted mt-6">Ingen registrering. Inga creditcard. Klicka & prova.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-brand-border bg-brand-panel/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '19', label: 'Moduler' },
            { value: '4', label: 'Roller' },
            { value: '4', label: 'Språk' },
            { value: 'GDPR', label: 'Compliant' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-black text-brand-primary mb-1">{s.value}</div>
              <div className="text-sm text-brand-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Allt ditt företag behöver</h2>
            <p className="text-xl text-brand-muted">Från första kundkontakt till slutfaktura</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: 'Projekthantering',
                desc: 'Projekt med team, tidsplan, dokument, bilder och statusspårning från start till slut.',
              },
              {
                icon: FileText,
                title: 'AI-genererade offerter',
                desc: 'Skapa offerter på sekunder. Mallar, ROT/RUT, publik länk för signering, automatisk uppföljning.',
              },
              {
                icon: Receipt,
                title: 'Fakturering & Fortnox',
                desc: 'Skapa fakturor direkt eller synka till Fortnox. Automatisk e-postutskick till kund.',
              },
              {
                icon: ScanLine,
                title: 'AI-OCR för kvitton',
                desc: 'Fotografera kvitto, AI läser belopp, datum, leverantör. Skickas direkt till Fortnox.',
              },
              {
                icon: Calendar,
                title: 'Tidsrapportering',
                desc: 'Personal rapporterar tid, admin attesterar, lönedata auto-genereras. Google Calendar-sync.',
              },
              {
                icon: MapPin,
                title: 'Kartvy för projekt',
                desc: 'Se alla projekt på karta. Geokodning av adresser, ruttplanering, statusfärg per pin.',
              },
              {
                icon: Bot,
                title: 'Automatiseringar',
                desc: 'n8n-workflows för e-postnotiser, Telegram, lead-generering. Anpassa själv eller använd mallar.',
              },
              {
                icon: BarChart3,
                title: 'Google Analytics',
                desc: 'Webbplats-statistik direkt i dashboarden. Trafik, konverteringar, hot pages.',
              },
              {
                icon: Network,
                title: 'Cross-company',
                desc: 'Underleverantörer som också använder Taskit får ditt projekt i SIN egen app. Inga dubbla inlogg.',
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="bg-brand-panel border border-brand-border rounded-xl p-6 hover:border-brand-primary/40 transition-colors group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <f.icon className="h-5 w-5 text-brand-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network feature highlight */}
      <section id="network" className="py-24 px-6 bg-brand-panel/30 border-y border-brand-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-3 py-1 rounded-full text-xs font-medium mb-4">
                <Network className="h-3 w-3" />
                Unikt för Taskit
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Företagsnätverk
                <br />
                <span className="text-brand-primary">utan dubbla inlogg</span>
              </h2>
              <p className="text-lg text-brand-muted mb-6 leading-relaxed">
                När du tilldelar ett projekt till en underleverantör som också använder Taskit:
              </p>
              <ul className="space-y-3 text-brand-muted">
                {[
                  'De ser projektet direkt i sin egen Taskit-app',
                  'Accepterar/avböjer med ett klick',
                  'Rapporterar tid och status tillbaka till dig automatiskt',
                  'All data isolerad — de ser BARA projektet du delat',
                  'Inga e-postkedjor, ingen handpåläggning',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-panel border border-brand-border rounded-2xl p-8 font-mono text-sm">
              <div className="text-brand-muted mb-4">// Flödet, förenklat</div>
              <div className="space-y-2 text-xs">
                <div><span className="text-brand-primary">Företag A</span> skapar projekt</div>
                <div className="pl-4 text-brand-muted">↓</div>
                <div>Bjuder in <span className="text-brand-primary">Företag B</span> via e-post</div>
                <div className="pl-4 text-brand-muted">↓</div>
                <div>Taskit hittar B i nätverket</div>
                <div className="pl-4 text-brand-muted">↓</div>
                <div><span className="text-brand-primary">Företag B</span> får notis i sin app</div>
                <div className="pl-4 text-brand-muted">↓</div>
                <div>B accepterar → projektet syns hos båda</div>
                <div className="pl-4 text-brand-muted">↓</div>
                <div>B rapporterar tid → A ser direkt</div>
                <div className="text-brand-primary mt-4">✓ Inga dubbla inlogg, inga export/import</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Enkla priser</h2>
            <p className="text-xl text-brand-muted">Välj plan efter företagets behov</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Bas',
                price: 499,
                desc: 'För enmansföretag och små team',
                features: ['Projekt', 'Personal', 'Tidsrapporter', 'Kalender', 'Rapporter'],
                cta: 'Kom igång',
              },
              {
                name: 'Professional',
                price: 899,
                desc: 'Komplett system för växande företag',
                features: ['Allt i Bas', 'Fakturor', 'Offerter', 'Material', 'Kunder', 'Lön', 'Underleverantörer'],
                cta: 'Mest populär',
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: 1499,
                desc: 'För etablerade företag med komplexa flöden',
                features: ['Allt i Professional', 'AI-OCR för kvitton', 'Google Analytics', 'Automatiseringar', 'Cross-company', 'Aktivitetsloggar'],
                cta: 'Kontakta oss',
              },
            ].map(p => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 ${
                  p.highlight
                    ? 'bg-gradient-to-b from-brand-primary/20 to-brand-panel border-2 border-brand-primary'
                    : 'bg-brand-panel border border-brand-border'
                }`}
              >
                {p.highlight && (
                  <div className="inline-block bg-brand-primary text-brand-dark text-xs font-bold px-3 py-1 rounded-full mb-3">
                    POPULÄR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
                <p className="text-brand-muted text-sm mb-6">{p.desc}</p>
                <div className="mb-6">
                  <span className="text-5xl font-black">{p.price}</span>
                  <span className="text-brand-muted ml-2">kr/mån</span>
                </div>
                <ul className="space-y-2 mb-8 text-sm">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-brand-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${
                    p.highlight
                      ? 'bg-brand-primary text-brand-dark hover:bg-brand-primary/90'
                      : 'bg-brand-border text-white hover:bg-brand-primary hover:text-brand-dark'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-brand-muted mt-8">
            Uppstart: 2 990 kr engång (setup, branding, onboarding) · 14 dagar pengarna-tillbaka-garanti
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-brand-dark to-brand-panel">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Redo att se Taskit i drift?</h2>
          <p className="text-xl text-brand-muted mb-10">
            Öppna demon, välj en roll och klicka runt. Ingen registrering, inget creditcard.
          </p>
          <button
            onClick={() => navigate('/demo')}
            className="bg-brand-primary text-brand-dark font-black px-10 py-5 rounded-xl hover:bg-brand-primary/90 transition-all text-xl inline-flex items-center gap-3 group"
          >
            Öppna demon
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand-primary flex items-center justify-center">
              <span className="text-brand-dark font-black text-xs">T</span>
            </div>
            <span className="text-brand-muted text-sm">© 2026 Taskit</span>
          </div>
          <div className="text-sm text-brand-muted">
            taskit.se · victorvilches@protonmail.com
          </div>
        </div>
      </footer>
    </div>
  );
}
