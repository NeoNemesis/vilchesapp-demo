import { useState } from 'react';
import { Search, ScanLine } from 'lucide-react';
import { orders, formatCurrency, formatDate } from '../data/mockData';
import type { OrderStatus } from '../data/mockData';
import { OrderBadge } from '../components/Badge';

const filterTabs: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'Alla', value: 'all' },
  { label: 'Väntande', value: 'pending' },
  { label: 'Tilldelade', value: 'assigned' },
  { label: 'Pågående', value: 'in_progress' },
  { label: 'Väntar leverans', value: 'awaiting_delivery' },
  { label: 'Levererade', value: 'delivered' },
  { label: 'Installerar', value: 'installing' },
  { label: 'Slutförda', value: 'completed' },
];

const statusSteps: OrderStatus[] = [
  'pending',
  'assigned',
  'in_progress',
  'awaiting_delivery',
  'delivered',
  'installing',
  'completed',
];

const statusStepLabels: Record<OrderStatus, string> = {
  pending: 'Väntande',
  assigned: 'Tilldelad',
  in_progress: 'Pågående',
  awaiting_delivery: 'Väntar',
  delivered: 'Levererad',
  installing: 'Installerar',
  completed: 'Klar',
};

function StatusProgress({ status }: { status: OrderStatus }) {
  const currentIndex = statusSteps.indexOf(status);
  return (
    <div className="flex items-center gap-0.5">
      {statusSteps.map((step, i) => (
        <div
          key={step}
          className={`h-1 flex-1 rounded-full ${
            i <= currentIndex ? 'bg-[#4AE54A]' : 'bg-[#2C2C2C]'
          }`}
          title={statusStepLabels[step]}
        />
      ))}
    </div>
  );
}

export function Orders() {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchesFilter = activeFilter === 'all' || o.status === activeFilter;
    const matchesSearch =
      search === '' ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Ordrar</h1>
          <p className="text-gray-500 text-sm">{orders.length} ordrar totalt</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4AE54A] hover:bg-[#3bc93b] text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
          <ScanLine size={15} />
          Skanna order
        </button>
      </div>

      {/* OCR hint */}
      <div className="mb-5 p-4 bg-[#4AE54A]/5 border border-[#4AE54A]/20 rounded-xl flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#4AE54A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <ScanLine size={14} className="text-[#4AE54A]" />
        </div>
        <div>
          <p className="text-[#4AE54A] text-sm font-medium">OCR-skanning inbyggd</p>
          <p className="text-gray-500 text-xs mt-0.5">
            Ta ett foto av en papperorder från AJ Produkter, Lekolar eller Kinnarps — systemet läser av orderdata automatiskt.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Sök order, kund eller beskrivning..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[rgba(74,229,74,0.4)] transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterTabs.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === value
                  ? 'bg-[#4AE54A] text-black'
                  : 'bg-[#1c1c1c] text-gray-400 border border-[rgba(74,229,74,0.1)] hover:text-white'
              }`}
            >
              {label}
              {value !== 'all' && (
                <span className="ml-1.5 opacity-60">
                  {orders.filter((o) => o.status === value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-600">Inga ordrar matchar sökningen</div>
        )}
        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-2xl overflow-hidden hover:border-[rgba(74,229,74,0.25)] transition-all cursor-pointer"
            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
          >
            {/* Row */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-0.5">
                  <p className="text-white font-semibold text-sm">{order.orderNumber}</p>
                  <OrderBadge status={order.status} />
                </div>
                <p className="text-gray-400 text-sm truncate">{order.customer} · {order.supplier}</p>
              </div>
              <div className="hidden md:block w-48">
                <StatusProgress status={order.status} />
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white font-semibold text-sm">{formatCurrency(order.amount)}</p>
                <p className="text-gray-600 text-xs">{formatDate(order.date)}</p>
              </div>
              <div className="text-gray-600 text-sm">{expandedId === order.id ? '▲' : '▼'}</div>
            </div>

            {/* Expanded detail */}
            {expandedId === order.id && (
              <div className="border-t border-[rgba(74,229,74,0.08)] px-5 py-4 bg-[#181818]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <Detail label="Beskrivning" value={order.description} />
                  <Detail label="Montör" value={order.assignedTo ?? 'Ej tilldelad'} highlight={!order.assignedTo} />
                  <Detail label="Beställt" value={formatDate(order.date)} />
                  <Detail label="Leveransdatum" value={order.deliveryDate ? formatDate(order.deliveryDate) : '–'} />
                </div>
                <div className="mb-3">
                  <p className="text-gray-600 text-xs mb-2">Orderstatus – 7 steg</p>
                  <div className="flex items-center gap-2">
                    {statusSteps.map((step) => {
                      const done = statusSteps.indexOf(step) <= statusSteps.indexOf(order.status);
                      return (
                        <div key={step} className="flex-1 text-center">
                          <div className={`h-1.5 rounded-full mb-1 ${done ? 'bg-[#4AE54A]' : 'bg-[#2C2C2C]'}`} />
                          <p className={`text-xs ${done ? 'text-[#4AE54A]' : 'text-gray-700'}`}>
                            {statusStepLabels[step]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Detail({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-gray-600 text-xs mb-0.5">{label}</p>
      <p className={`text-sm font-medium ${highlight ? 'text-yellow-500 italic' : 'text-gray-300'}`}>{value}</p>
    </div>
  );
}
