import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, ArrowLeft, Plus, CheckCircle,
  Receipt, TrendingUp, Wallet,
} from 'lucide-react';

interface DemoTenant {
  slug: string;
  name: string;
  domain: string;
  status: 'ACTIVE' | 'PROVISIONING' | 'SUSPENDED';
  plan: 'bas' | 'professional' | 'enterprise';
  monthly: number;
  createdAt: string;
  fortnoxCustomerId: string | null;
}

const DEMO_TENANTS: DemoTenant[] = [
  { slug: 'byggmax',  name: 'Byggmax AB',          domain: 'byggmax.taskit.se',  status: 'ACTIVE',       plan: 'enterprise',   monthly: 1499, createdAt: '2026-01-15', fortnoxCustomerId: '1004' },
  { slug: 'vilches',  name: 'Vilches Entreprenad', domain: 'vilches.taskit.se',  status: 'ACTIVE',       plan: 'professional', monthly: 899,  createdAt: '2026-02-08', fortnoxCustomerId: '1007' },
  { slug: 'snickeri', name: 'Demo Snickeri AB',    domain: 'snickeri.taskit.se', status: 'ACTIVE',       plan: 'bas',          monthly: 499,  createdAt: '2026-03-22', fortnoxCustomerId: '1012' },
  { slug: 'malarna',  name: 'Målarna i Söder',     domain: 'malarna.taskit.se',  status: 'PROVISIONING', plan: 'professional', monthly: 899,  createdAt: '2026-05-14', fortnoxCustomerId: null },
];

export function Superadmin() {
  const navigate = useNavigate();
  const [selectedTenant, setSelectedTenant] = useState<DemoTenant | null>(null);

  const total   = DEMO_TENANTS.length;
  const active  = DEMO_TENANTS.filter(t => t.status === 'ACTIVE').length;
  const mrr     = DEMO_TENANTS.filter(t => t.status === 'ACTIVE').reduce((s, t) => s + t.monthly, 0);

  if (selectedTenant) {
    return <TenantDetail tenant={selectedTenant} onBack={() => setSelectedTenant(null)} />;
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <header className="bg-brand-panel border-b border-brand-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="text-brand-dark font-black text-sm">T</span>
          </div>
          <div>
            <div className="font-bold">Taskit Superadmin</div>
            <div className="text-xs text-brand-muted">admin.taskit.se</div>
          </div>
        </div>
        <button onClick={() => navigate('/demo')} className="flex items-center gap-2 text-brand-muted hover:text-white text-sm">
          <ArrowLeft className="h-4 w-4" />
          Tillbaka till demo-väljaren
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Building2,  label: 'Totalt tenants',  value: total,                   color: 'text-brand-primary' },
            { icon: CheckCircle, label: 'Aktiva',         value: active,                   color: 'text-green-400' },
            { icon: Wallet,      label: 'MRR (kr/mån)',   value: mrr.toLocaleString('sv-SE'), color: 'text-brand-primary' },
          ].map(s => (
            <div key={s.label} className="bg-brand-panel border border-brand-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-brand-muted uppercase tracking-wide">{s.label}</span>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div className="text-3xl font-black">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tenants */}
        <div className="bg-brand-panel border border-brand-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-brand-border flex items-center justify-between">
            <h2 className="font-bold">Tenants</h2>
            <button className="flex items-center gap-1.5 bg-brand-primary text-brand-dark text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
              Ny tenant
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-brand-muted text-xs border-b border-brand-border">
                <th className="text-left px-5 py-3 font-medium">Företag</th>
                <th className="text-left px-5 py-3 font-medium">Domän</th>
                <th className="text-left px-5 py-3 font-medium">Plan</th>
                <th className="text-left px-5 py-3 font-medium">Fortnox</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Skapad</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_TENANTS.map(t => (
                <tr
                  key={t.slug}
                  onClick={() => setSelectedTenant(t)}
                  className="border-b border-brand-border hover:bg-brand-primary/5 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4 font-medium">{t.name}</td>
                  <td className="px-5 py-4 text-brand-muted">{t.domain}</td>
                  <td className="px-5 py-4 capitalize">{t.plan} · {t.monthly} kr/mån</td>
                  <td className="px-5 py-4 text-brand-muted text-xs">
                    {t.fortnoxCustomerId ? `Kund #${t.fortnoxCustomerId}` : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-5 py-4 text-brand-muted text-xs">{t.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fortnox & info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-brand-panel border border-brand-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Receipt className="h-5 w-5 text-brand-primary" />
              <h3 className="font-bold">Fortnox-koppling</h3>
              <span className="ml-auto text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded">Ansluten</span>
            </div>
            <p className="text-sm text-brand-muted mb-3">
              Nya tenants får automatiskt en Fortnox-kund. Månadsfakturor skickas via Fortnox till kundens registrerade e-post.
            </p>
            <div className="text-xs text-brand-muted">Senast synkad: idag 12:04</div>
          </div>

          <div className="bg-brand-panel border border-brand-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-brand-primary" />
              <h3 className="font-bold">Tillväxt</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-brand-muted">Q1 2026</span><span>+2 tenants</span></div>
              <div className="flex justify-between"><span className="text-brand-muted">April 2026</span><span>+1 tenant</span></div>
              <div className="flex justify-between"><span className="text-brand-muted">Maj 2026 (pågående)</span><span className="text-brand-primary">+1 tenant</span></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: DemoTenant['status'] }) {
  const styles: Record<DemoTenant['status'], { label: string; cls: string }> = {
    ACTIVE:       { label: 'Aktiv',        cls: 'bg-green-900 text-green-300' },
    PROVISIONING: { label: 'Provisioning', cls: 'bg-yellow-900 text-yellow-300' },
    SUSPENDED:    { label: 'Pausad',       cls: 'bg-red-900 text-red-300' },
  };
  const s = styles[status];
  return <span className={`text-xs px-2 py-0.5 rounded font-medium ${s.cls}`}>{s.label}</span>;
}

function TenantDetail({ tenant, onBack }: { tenant: DemoTenant; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <header className="bg-brand-panel border-b border-brand-border px-6 py-4">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-muted hover:text-white text-sm mb-2">
          <ArrowLeft className="h-4 w-4" />
          Alla tenants
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{tenant.name}</h1>
            <p className="text-xs text-brand-muted">{tenant.domain}</p>
          </div>
          <StatusBadge status={tenant.status} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Plan-väljare */}
        <div className="bg-brand-panel border border-brand-border rounded-xl p-5">
          <h2 className="font-bold mb-4">Prisplan</h2>
          <div className="grid grid-cols-3 gap-3">
            {(['bas', 'professional', 'enterprise'] as const).map(p => (
              <button
                key={p}
                disabled={p === tenant.plan}
                className={`p-4 rounded-xl border text-left transition-colors ${
                  p === tenant.plan
                    ? 'border-brand-primary bg-brand-primary/10'
                    : 'border-brand-border hover:border-brand-primary/50 bg-brand-panel'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium capitalize">{p}</span>
                  {p === tenant.plan && <CheckCircle className="h-4 w-4 text-brand-primary" />}
                </div>
                <span className="text-xs text-brand-muted">{p === 'bas' ? 499 : p === 'professional' ? 899 : 1499} kr/mån</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fakturor */}
        <div className="bg-brand-panel border border-brand-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Taskit-fakturor</h2>
            <button className="flex items-center gap-1.5 text-sm bg-brand-border hover:bg-brand-primary hover:text-brand-dark text-white px-3 py-1.5 rounded-lg transition-colors">
              <Plus className="h-3.5 w-3.5" />
              Ny faktura
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-brand-muted text-xs border-b border-brand-border">
                <th className="text-left py-2">Period</th>
                <th className="text-left py-2">Belopp</th>
                <th className="text-left py-2">Förfall</th>
                <th className="text-left py-2">Status</th>
                <th className="text-right py-2">Fortnox</th>
              </tr>
            </thead>
            <tbody>
              {['2026-05', '2026-04', '2026-03'].map((period, i) => (
                <tr key={period} className="border-b border-brand-border">
                  <td className="py-3">{period}</td>
                  <td className="py-3">{tenant.monthly} kr</td>
                  <td className="py-3 text-brand-muted text-xs">{period}-15</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${i === 0 ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'}`}>
                      {i === 0 ? 'Skickad' : 'Betald'}
                    </span>
                  </td>
                  <td className="py-3 text-right text-xs text-brand-muted">#{1000 + i + 4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hantering */}
        <div className="bg-brand-panel border border-brand-border rounded-xl p-5">
          <h2 className="font-bold mb-4">Hantera konto</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-1.5 bg-orange-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Pausa
            </button>
            <button className="flex items-center gap-1.5 border border-red-800 text-red-300 text-sm px-4 py-2 rounded-lg hover:bg-red-900 transition-colors">
              Avsluta konto
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
