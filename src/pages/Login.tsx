import { useNavigate } from 'react-router-dom';
import type { Role } from '../data/mockData';

interface LoginProps {
  onLogin: (role: Role) => void;
}

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    onLogin(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Demo Banner */}
      <div className="bg-[#4AE54A] text-black text-center text-sm py-2.5 font-semibold tracking-wide">
        DEMO — Ingen inloggning krävs. Välj en roll nedan för att utforska systemet.
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Hero */}
        <div className="text-center mb-14 animate-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4AE54A] mb-6 shadow-lg shadow-[#4AE54A]/20">
            <span className="text-black font-bold text-2xl">V</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight mb-3">
            VilchesApp
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Komplett ordersystem för&nbsp;inredning&nbsp;&amp;&nbsp;montage.
            Hantera ordrar, projekt och offerter på ett ställe.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl w-full animate-in" style={{ animationDelay: '0.1s' }}>
          <RoleCard
            emoji="🏢"
            title="Administratör"
            subtitle="Full åtkomst"
            description="Hantera ordrar, projekt, offerter, fakturor och personal i ett komplett vy."
            features={[
              'Översiktsdashboard med statistik',
              'Orderhantering med leveransstatus',
              'Projektledning med teamtilldelning',
              'AI-genererade offerter',
            ]}
            ctaText="Logga in som Admin"
            onClick={() => handleLogin('admin')}
            highlighted
          />
          <RoleCard
            emoji="🔧"
            title="Montör / Installatör"
            subtitle="Fältvy"
            description="Se dina tilldelade ordrar och projekt. Rapportera utfört arbete och ladda upp foton."
            features={[
              'Mina tilldelade ordrar',
              'Mina pågående projekt',
              'Tidrapportering',
              'Fältrapporter & foton',
            ]}
            ctaText="Logga in som Montör"
            onClick={() => handleLogin('contractor')}
          />
        </div>

        {/* Workflow teaser */}
        <div className="mt-14 max-w-3xl w-full animate-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-600 text-xs text-center uppercase tracking-widest mb-6">
            Så funkar systemet
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { step: '1', label: 'Skanna order', desc: 'Foto → automatisk OCR-läsning' },
              { step: '2', label: 'Tilldela montör', desc: 'Rätt person till rätt jobb' },
              { step: '3', label: 'Följ leverans', desc: '7-stegs statusspårning' },
              { step: '4', label: 'Fakturera', desc: 'Automatisk fakturagenerering' },
            ].map(({ step, label, desc }) => (
              <div
                key={step}
                className="bg-[#141414] border border-[rgba(74,229,74,0.1)] rounded-xl p-4 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-[#4AE54A]/10 border border-[#4AE54A]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#4AE54A] text-sm font-bold">{step}</span>
                </div>
                <p className="text-white text-sm font-medium mb-1">{label}</p>
                <p className="text-gray-600 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-gray-700 text-xs">
          All data i denna demo är fiktiva exempeldata · VilchesApp © 2024
        </p>
      </div>
    </div>
  );
}

interface RoleCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  onClick: () => void;
  highlighted?: boolean;
}

function RoleCard({ emoji, title, subtitle, description, features, ctaText, onClick, highlighted }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-6 rounded-2xl border transition-all duration-200 group ${
        highlighted
          ? 'bg-[#1c1c1c] border-[#4AE54A]/30 hover:border-[#4AE54A] hover:shadow-lg hover:shadow-[#4AE54A]/10'
          : 'bg-[#141414] border-[rgba(74,229,74,0.1)] hover:border-[rgba(74,229,74,0.3)] hover:bg-[#1c1c1c]'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{emoji}</span>
        <span className="text-xs text-[#4AE54A] bg-[#4AE54A]/10 border border-[#4AE54A]/20 px-2 py-0.5 rounded-full font-medium">
          {subtitle}
        </span>
      </div>
      <h2 className="text-white font-bold text-xl mb-2">{title}</h2>
      <p className="text-gray-500 text-sm mb-5 leading-relaxed">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
            <span className="text-[#4AE54A] flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 text-[#4AE54A] font-semibold text-sm group-hover:gap-3 transition-all">
        {ctaText}
        <span className="text-base">→</span>
      </div>
    </button>
  );
}
