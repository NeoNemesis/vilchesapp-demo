import type { OrderStatus, QuoteStatus, ProjectStatus } from '../data/mockData';
import { orderStatusLabels, quoteStatusLabels, projectStatusLabels } from '../data/mockData';

const orderColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  assigned: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  in_progress: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  awaiting_delivery: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  delivered: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  installing: 'bg-[#4AE54A]/15 text-[#4AE54A] border-[#4AE54A]/30',
  completed: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

const quoteColors: Record<QuoteStatus, string> = {
  draft: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  sent: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  accepted: 'bg-[#4AE54A]/15 text-[#4AE54A] border-[#4AE54A]/30',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const projectColors: Record<ProjectStatus, string> = {
  planning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  in_progress: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  completed: 'bg-[#4AE54A]/15 text-[#4AE54A] border-[#4AE54A]/30',
};

export function OrderBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${orderColors[status]}`}>
      {orderStatusLabels[status]}
    </span>
  );
}

export function QuoteBadge({ status }: { status: QuoteStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${quoteColors[status]}`}>
      {quoteStatusLabels[status]}
    </span>
  );
}

export function ProjectBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${projectColors[status]}`}>
      {projectStatusLabels[status]}
    </span>
  );
}
