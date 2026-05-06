import { TrendingUp, Package, FolderKanban, FileText } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { orders, projects, monthlyRevenue, formatCurrency, formatDate } from '../data/mockData';
import { OrderBadge } from '../components/Badge';

const stats = [
  {
    label: 'Månadsintäkt',
    value: '287 500 kr',
    change: '+12%',
    positive: true,
    icon: TrendingUp,
    sub: 'vs föregående månad',
  },
  {
    label: 'Aktiva ordrar',
    value: '12',
    change: '+3',
    positive: true,
    icon: Package,
    sub: 'senaste 30 dagarna',
  },
  {
    label: 'Aktiva projekt',
    value: '5',
    change: '±0',
    positive: true,
    icon: FolderKanban,
    sub: 'varav 3 pågående',
  },
  {
    label: 'Offerter väntande',
    value: '8',
    change: '-2',
    positive: false,
    icon: FileText,
    sub: 'kräver åtgärd',
  },
];

const recentOrders = orders.slice(0, 5);
const activeProjects = projects.filter((p) => p.status === 'in_progress');

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c1c1c] border border-[rgba(74,229,74,0.2)] rounded-lg p-3 text-sm">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-[#4AE54A] font-semibold">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  return (
    <div className="p-8 animate-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">God morgon, Admin 👋</h1>
        <p className="text-gray-500 text-sm">Här är en överblick av dagens status</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, change, positive, icon: Icon, sub }) => (
          <div
            key={label}
            className="bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-2xl p-5 hover:border-[rgba(74,229,74,0.25)] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs font-medium">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-[#4AE54A]/10 flex items-center justify-center">
                <Icon size={14} className="text-[#4AE54A]" />
              </div>
            </div>
            <p className="text-white text-2xl font-bold mb-1">{value}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${positive ? 'text-[#4AE54A]' : 'text-red-400'}`}>
                {change}
              </span>
              <span className="text-gray-600 text-xs">{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Projects grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="xl:col-span-3 bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold">Intäkter per månad</h2>
              <p className="text-gray-600 text-xs mt-0.5">Senaste 6 månaderna</p>
            </div>
            <span className="text-[#4AE54A] text-xs bg-[#4AE54A]/10 border border-[#4AE54A]/20 px-2.5 py-1 rounded-full font-medium">
              SEK
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyRevenue} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(74,229,74,0.05)' }} />
              <Bar dataKey="revenue" fill="#4AE54A" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active Projects */}
        <div className="xl:col-span-2 bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Aktiva projekt</h2>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-white text-sm font-medium truncate max-w-[160px]">{project.name}</p>
                  <span className="text-[#4AE54A] text-sm font-bold flex-shrink-0">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-[#2C2C2C] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4AE54A] rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-gray-600 text-xs">{project.customer}</p>
                  <p className="text-gray-600 text-xs">{project.team.length} montör{project.team.length > 1 ? 'er' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(74,229,74,0.1)]">
          <h2 className="text-white font-semibold">Senaste ordrar</h2>
          <span className="text-gray-600 text-xs">Visar 5 av 12</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)]">
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium">Order</th>
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium">Kund</th>
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium hidden md:table-cell">Montör</th>
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium">Status</th>
              <th className="text-right px-6 py-3 text-gray-600 text-xs font-medium">Belopp</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr
                key={order.id}
                className="border-b border-[rgba(255,255,255,0.03)] hover:bg-white/2 transition-colors"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <td className="px-6 py-3.5">
                  <p className="text-white text-sm font-medium">{order.orderNumber}</p>
                  <p className="text-gray-600 text-xs">{formatDate(order.date)}</p>
                </td>
                <td className="px-6 py-3.5">
                  <p className="text-gray-300 text-sm">{order.customer}</p>
                  <p className="text-gray-600 text-xs">{order.supplier}</p>
                </td>
                <td className="px-6 py-3.5 hidden md:table-cell">
                  <p className="text-gray-400 text-sm">
                    {order.assignedTo ?? <span className="text-yellow-600 italic">Ej tilldelad</span>}
                  </p>
                </td>
                <td className="px-6 py-3.5">
                  <OrderBadge status={order.status} />
                </td>
                <td className="px-6 py-3.5 text-right">
                  <p className="text-white text-sm font-medium">{formatCurrency(order.amount)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
