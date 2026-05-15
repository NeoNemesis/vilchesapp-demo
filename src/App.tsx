import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { DemoSelector } from './pages/DemoSelector';
import { Superadmin } from './pages/Superadmin';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Projects } from './pages/Projects';
import { Quotes } from './pages/Quotes';
import { Sidebar } from './components/Sidebar';
import { type Role, type Company, companies } from './data/mockData';

function AppLayout({ role, company, onLogout }: { role: Role; company: Company; onLogout: () => void }) {
  return (
    <div className="flex min-h-screen bg-brand-dark">
      <Sidebar role={role} company={company} onLogout={onLogout} />
      <main className="flex-1 ml-64 min-h-screen overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/projects" element={<Projects />} />
          {role === 'admin' && <Route path="/quotes" element={<Quotes />} />}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<{ role: Role; company: Company } | null>(null);

  const handleSelect = (companySlug: string, role: Role) => {
    const company = companies.find(c => c.slug === companySlug) ?? companies[0];
    setSession({ role, company });
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo" element={<DemoSelector onSelect={handleSelect} />} />
        <Route
          path="/superadmin"
          element={
            session?.role === 'superadmin'
              ? <Superadmin />
              : <Navigate to="/demo" replace />
          }
        />
        <Route
          path="/app/*"
          element={
            session && session.role !== 'superadmin' ? (
              <AppLayout
                role={session.role}
                company={session.company}
                onLogout={() => setSession(null)}
              />
            ) : (
              <Navigate to="/demo" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
