import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardList, FolderKanban, FileText, LogOut, Wrench, Users,
} from 'lucide-react';
import type { Role, Company } from '../data/mockData';

const adminLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders',    icon: ClipboardList,   label: 'Ordrar' },
  { to: '/projects',  icon: FolderKanban,    label: 'Projekt' },
  { to: '/quotes',    icon: FileText,        label: 'Offerter' },
  { to: '/team',      icon: Users,           label: 'Team' },
];

const contractorLinks = [
  { to: '/orders',    icon: ClipboardList, label: 'Mina Ordrar' },
  { to: '/projects',  icon: FolderKanban,  label: 'Mina Projekt' },
];

const employeeLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Min dag' },
  { to: '/orders',    icon: ClipboardList,   label: 'Ordrar' },
];

interface SidebarProps {
  role: Role;
  company: Company;
  onLogout: () => void;
}

const labelFor: Record<Role, string> = {
  admin:      'Administratör',
  contractor: 'Underentreprenör',
  employee:   'Anställd',
  superadmin: 'Superadmin',
};

const userFor: Record<Role, { name: string; email: string }> = {
  admin:      { name: 'Admin Demo',     email: 'admin@demo.se' },
  contractor: { name: 'Erik Svensson',  email: 'erik@uemontor.se' },
  employee:   { name: 'Maria Lindqvist', email: 'maria@demo.se' },
  superadmin: { name: 'Victor Vilches', email: 'victor@taskit.se' },
};

export function Sidebar({ role, company, onLogout }: SidebarProps) {
  const navigate = useNavigate();

  const links =
    role === 'admin' ? adminLinks :
    role === 'employee' ? employeeLinks :
    contractorLinks;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const user  = userFor[role];
  const color = company.color;

  return (
    <aside
      className="w-64 min-h-screen bg-brand-panel border-r flex flex-col fixed left-0 top-0 bottom-0 z-10"
      style={{ borderColor: `${color}1a` }}
    >
      <div className="p-6 border-b" style={{ borderColor: `${color}1a` }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            <span className="text-black font-bold text-base">{company.short}</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{company.name}</p>
            <p className="text-gray-500 text-xs">{labelFor[role]}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg border"
          style={{ backgroundColor: `${color}1a`, borderColor: `${color}33` }}
        >
          <div className="w-2 h-2 rounded-full pulse-green" style={{ backgroundColor: color }} />
          <span className="text-xs font-medium" style={{ color }}>
            {company.industry}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2">
        <p className="text-gray-600 text-xs font-medium uppercase tracking-wider px-3 mb-2">Meny</p>
        <ul className="space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: `${color}1a`, color, borderColor: `${color}33`, borderWidth: 1, borderStyle: 'solid' }
                    : undefined
                }
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive ? '' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
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

      <div className="p-4 border-t" style={{ borderColor: `${color}1a` }}>
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div
            className="w-7 h-7 rounded-full bg-[#2C2C2C] border flex items-center justify-center"
            style={{ borderColor: `${color}33` }}
          >
            <Wrench size={12} className="text-gray-400" />
          </div>
          <div>
            <p className="text-white text-xs font-medium">{user.name}</p>
            <p className="text-gray-600 text-xs">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm"
        >
          <LogOut size={14} />
          Byt roll / företag
        </button>
      </div>
    </aside>
  );
}
