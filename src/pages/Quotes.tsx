import { Sparkles, Send, FileText, Plus } from 'lucide-react';
import { quotes, formatCurrency, formatDate } from '../data/mockData';
import { QuoteBadge } from '../components/Badge';

const stats = [
  { label: 'Totalt offerterade', value: '702 000 kr', icon: FileText },
  { label: 'Godkänt värde', value: '545 000 kr', icon: Sparkles },
  { label: 'Konverteringsgrad', value: '60%', icon: Send },
];

export function Quotes() {
  const total = quotes.reduce((s, q) => s + q.amount, 0);
  const accepted = quotes.filter((q) => q.status === 'accepted');

  return (
    <div className="p-8 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Offerter</h1>
          <p className="text-gray-500 text-sm">{quotes.length} offerter · {accepted.length} godkända</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4AE54A] hover:bg-[#3bc93b] text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} />
          Ny offert
        </button>
      </div>

      {/* AI hint */}
      <div className="mb-6 p-5 bg-gradient-to-r from-[#4AE54A]/5 to-transparent border border-[#4AE54A]/20 rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#4AE54A]/10 border border-[#4AE54A]/20 flex items-center justify-center flex-shrink-0">
          <Sparkles size={18} className="text-[#4AE54A]" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">AI-driven offertgenerering</p>
          <p className="text-gray-500 text-xs mt-0.5">
            Systemet analyserar historiska projekt för att automatiskt föreslå pris, material och arbetstid för nya offerter.
            Tidsbesparing: upp till 80% jämfört med manuell beräkning.
          </p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-[#4AE54A] font-bold text-lg">3/5</p>
          <p className="text-gray-600 text-xs">AI-genererade</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-xl p-4 text-center"
          >
            <Icon size={16} className="text-[#4AE54A] mx-auto mb-2" />
            <p className="text-white font-bold text-base">{value}</p>
            <p className="text-gray-600 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Quote list */}
      <div className="bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-2xl overflow-hidden">
        <div className="border-b border-[rgba(74,229,74,0.1)] px-6 py-4">
          <h2 className="text-white font-semibold">Alla offerter</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)]">
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium">Offert</th>
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium">Kund</th>
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium hidden md:table-cell">Beskrivning</th>
              <th className="text-left px-6 py-3 text-gray-600 text-xs font-medium">Status</th>
              <th className="text-right px-6 py-3 text-gray-600 text-xs font-medium">Belopp</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr
                key={quote.id}
                className="border-b border-[rgba(255,255,255,0.03)] hover:bg-white/2 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium">{quote.quoteNumber}</p>
                    {quote.aiGenerated && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#4AE54A] bg-[#4AE54A]/10 border border-[#4AE54A]/20 px-1.5 py-0.5 rounded-full">
                        <Sparkles size={9} />
                        AI
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5">{formatDate(quote.date)}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-300 text-sm">{quote.customer}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-gray-500 text-sm truncate max-w-[200px]">{quote.description}</p>
                </td>
                <td className="px-6 py-4">
                  <QuoteBadge status={quote.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-white text-sm font-semibold">{formatCurrency(quote.amount)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-[rgba(74,229,74,0.1)] flex justify-between">
          <p className="text-gray-600 text-sm">Totalt offerterat</p>
          <p className="text-white font-bold text-sm">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
}
