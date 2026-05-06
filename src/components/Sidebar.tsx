import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  FileText,
  LogOut,
  Wrench,
} from 'lucide-react';
import type { Role } from '../data/mockData';

const adminLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders', icon: ClipboardList, label: 'Ordrar' },
  { to: '/projects', icon: FolderKanban, label: 'Projekt' },
  { to: '/quotes', icon: FileText, label: 'Offerter' },
];

const contractorLinks = [
  { to: '/orders', icon: ClipboardList, label: 'Mina Ordrar' },
  { to: '/projects', icon: FolderKanban, label: 'Mina Projekt' },
];

interface SidebarProps {
  role: Role;
  onLogout: () => void;
}

export function Sidebar({ role, onLogout }: SidebarProps) {
  const navigate = useNavigate();
  const links = role === 'admin' ? adminLinks : contractorLinks;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <aside className="w-64 min-h-screen bg-[#141414] border-r border-[rgba(74,229,74,0.1)] flex flex-col fixed left-0 top-0 bottom-0 z-10">
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(74,229,74,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#4AE54A] flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-base">V</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">VilchesApp</p>
            <p className="text-gray-500 text-xs">
              {role === 'admin' ? 'Administratör' : 'Montör'}
            </p>
          </div>
        </div>
      </div>

      {/* Role indicator */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#4AE54A]/10 border border-[#4AE54A]/20">
          <div className="w-2 h-2 rounded-full bg-[#4AE54A] pulse-green" />
          <span className="text-[#4AE54A] text-xs font-medium">
            {role === 'admin' ? 'Admin-läge' : 'Montör-läge'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <p className="text-gray-600 text-xs font-medium uppercase tracking-wider px-3 mb-2">
          Meny
        </p>
        <ul className="space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#4AE54A]/10 text-[#4AE54A] border border-[#4AE54A]/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[rgba(74,229,74,0.1)]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#2C2C2C] border border-[rgba(74,229,74,0.2)] flex items-center justify-center">
            <Wrench size={12} className="text-gray-400" />
          </div>
          <div>
            <p className="text-white text-xs font-medium">
              {role === 'admin' ? 'Admin Demo' : 'Erik Svensson'}
            </p>
            <p className="text-gray-600 text-xs">
              {role === 'admin' ? 'admin@demo.se' : 'montör@demo.se'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm"
        >
          <LogOut size={14} />
          Logga ut
        </button>
      </div>
    </aside>
  );
}
