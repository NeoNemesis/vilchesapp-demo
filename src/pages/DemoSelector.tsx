import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Wrench, Briefcase, Shield } from 'lucide-react';
import { companies, type Role } from '../data/mockData';

interface Props {
  onSelect: (companySlug: string, role: Role) => void;
}

const ROLES: { role: Role; label: string; description: string; icon: any }[] = [
  { role: 'admin',      label: 'Admin',              description: 'Full kontroll över företaget',  icon: Briefcase },
  { role: 'contractor', label: 'Underentreprenör',   description: 'Tilldelade projekt & rapporter', icon: Wrench },
  { role: 'employee',   label: 'Anställd (montör)',  description: 'Tidsrapportering & uppgifter',  icon: Users },
];

export function DemoSelector({ onSelect }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <nav className="px-6 py-4 border-b border-brand-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Tillbaka
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center">
              <span className="text-brand-dark font-black text-sm">T</span>
            </div>
            <span className="font-bold">Taskit Demo</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">Välj vad du vill se</h1>
          <p className="text-brand-muted text-lg">Demon är fullt klickbar — ingen registrering behövs.</p>
        </div>

        {/* Superadmin direkt */}
        <div className="mb-12">
          <h2 className="text-sm uppercase tracking-wider text-brand-muted mb-3">Plattformsperspektiv</h2>
          <button
            onClick={() => { onSelect('byggmax', 'superadmin'); navigate('/superadmin'); }}
            className="w-full bg-gradient-to-r from-brand-primary/20 to-brand-panel border border-brand-primary rounded-xl p-6 text-left hover:border-brand-primary/80 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-primary flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-brand-dark" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg mb-1">Taskit Superadmin</div>
                <div className="text-sm text-brand-muted">
                  Se hur du som plattformsägare hanterar alla kunder, prisplaner, fakturor och Fortnox-koppling
                </div>
              </div>
              <span className="text-brand-primary group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        </div>

        {/* Företags-vyer */}
        <div>
          <h2 className="text-sm uppercase tracking-wider text-brand-muted mb-3">Kundperspektiv — välj företag och roll</h2>

          <div className="space-y-6">
            {companies.map(company => (
              <div key={company.slug} className="bg-brand-panel border border-brand-border rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-brand-border flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0"
                    style={{ backgroundColor: company.color + '33', color: company.color }}
                  >
                    {company.short}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{company.name}</div>
                    <div className="text-xs text-brand-muted">{company.industry}</div>
                  </div>
                  <div className="text-xs text-brand-muted font-mono">{company.domain}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-border">
                  {ROLES.map(r => (
                    <button
                      key={r.role}
                      onClick={() => { onSelect(company.slug, r.role); navigate('/app/dashboard'); }}
                      className="bg-brand-panel hover:bg-brand-primary/10 px-5 py-4 text-left transition-colors group"
                    >
                      <r.icon className="h-5 w-5 mb-2" style={{ color: company.color }} />
                      <div className="font-semibold text-sm mb-0.5 group-hover:text-brand-primary">{r.label}</div>
                      <div className="text-xs text-brand-muted">{r.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-brand-muted mt-10">
          Tips: Logga in som Admin på <strong>Byggmax</strong>, dela projekt till <strong>Vilches Entreprenad</strong> —
          växla sen till Vilches och se hur de tar emot uppdraget.
        </p>
      </div>
    </div>
  );
}
