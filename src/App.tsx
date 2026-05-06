import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Projects } from './pages/Projects';
import { Quotes } from './pages/Quotes';
import { Sidebar } from './components/Sidebar';
import type { Role } from './data/mockData';

function AppLayout({ role, onLogout }: { role: Role; onLogout: () => void }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar role={role} onLogout={onLogout} />
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
  const [role, setRole] = useState<Role | null>(null);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            role ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={(r) => setRole(r)} />
            )
          }
        />
        {role ? (
          <Route
            path="/*"
            element={<AppLayout role={role} onLogout={() => setRole(null)} />}
          />
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </HashRouter>
  );
}
