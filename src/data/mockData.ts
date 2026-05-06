export type OrderStatus =
  | 'pending'
  | 'assigned'
  | 'in_progress'
  | 'awaiting_delivery'
  | 'delivered'
  | 'installing'
  | 'completed';

export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected';
export type ProjectStatus = 'planning' | 'in_progress' | 'completed';
export type Role = 'admin' | 'contractor';

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  supplier: string;
  description: string;
  status: OrderStatus;
  assignedTo: string | null;
  date: string;
  deliveryDate: string | null;
  amount: number;
}

export interface Project {
  id: string;
  name: string;
  customer: string;
  address: string;
  status: ProjectStatus;
  progress: number;
  team: string[];
  startDate: string;
  endDate: string;
  value: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  description: string;
  amount: number;
  status: QuoteStatus;
  date: string;
  aiGenerated: boolean;
}

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'Volvo Cars AB',
    supplier: 'AJ Produkter',
    description: 'Kontorsinredning – 24 skrivbord, 48 stolar',
    status: 'completed',
    assignedTo: 'Erik Svensson',
    date: '2024-11-01',
    deliveryDate: '2024-11-15',
    amount: 125000,
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Pysslingens Förskola',
    supplier: 'Lekolar',
    description: 'Lekutrustning – klätterställning, mjukmattor',
    status: 'installing',
    assignedTo: 'Maria Lindqvist',
    date: '2024-11-08',
    deliveryDate: '2024-11-20',
    amount: 67500,
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'ICA Maxi Halmstad',
    supplier: 'AJ Produkter',
    description: 'Förvaringslösningar – 80 hyllplan, stödfötter',
    status: 'assigned',
    assignedTo: 'Johan Petersson',
    date: '2024-11-10',
    deliveryDate: '2024-11-28',
    amount: 45000,
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Akademiska Sjukhuset',
    supplier: 'Kinnarps',
    description: 'Patientrumsöbler – 40 sängar, nattduksbord',
    status: 'delivered',
    assignedTo: 'Erik Svensson',
    date: '2024-11-05',
    deliveryDate: '2024-11-18',
    amount: 210000,
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: 'Göteborgs Stad',
    supplier: 'AJ Produkter',
    description: 'Kontorsmöbler – mötesbord, stolar',
    status: 'pending',
    assignedTo: null,
    date: '2024-11-12',
    deliveryDate: null,
    amount: 89000,
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-006',
    customer: 'Region Halland',
    supplier: 'Kinnarps',
    description: 'Skåp och garderober – 60 enheter',
    status: 'in_progress',
    assignedTo: 'Maria Lindqvist',
    date: '2024-11-03',
    deliveryDate: '2024-11-22',
    amount: 95000,
  },
  {
    id: '7',
    orderNumber: 'ORD-2024-007',
    customer: 'Solhaga Förskola',
    supplier: 'Lekolar',
    description: 'Lekmöbler – bord, stolar, hyllor (barnstorlek)',
    status: 'awaiting_delivery',
    assignedTo: 'Johan Petersson',
    date: '2024-11-07',
    deliveryDate: '2024-11-25',
    amount: 38500,
  },
  {
    id: '8',
    orderNumber: 'ORD-2024-008',
    customer: 'Handelsbanken',
    supplier: 'AJ Produkter',
    description: 'Ergonomiska stolar – 30 st kontorsstolar',
    status: 'completed',
    assignedTo: 'Erik Svensson',
    date: '2024-10-28',
    deliveryDate: '2024-11-08',
    amount: 45500,
  },
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'Kontorsrenovering Volvo',
    customer: 'Volvo Cars AB',
    address: 'Torslandavägen 1, Göteborg',
    status: 'in_progress',
    progress: 85,
    team: ['Erik Svensson', 'Johan Petersson'],
    startDate: '2024-10-15',
    endDate: '2024-11-30',
    value: 287500,
  },
  {
    id: '2',
    name: 'Förskoleinstallation Pysslingen',
    customer: 'Pysslingens Förskola',
    address: 'Storgatan 12, Halmstad',
    status: 'in_progress',
    progress: 60,
    team: ['Maria Lindqvist'],
    startDate: '2024-11-01',
    endDate: '2024-12-15',
    value: 112000,
  },
  {
    id: '3',
    name: 'Sjukhusmöblering Akademiska',
    customer: 'Akademiska Sjukhuset',
    address: 'Dag Hammarskjölds väg 17, Uppsala',
    status: 'planning',
    progress: 30,
    team: ['Erik Svensson'],
    startDate: '2024-11-20',
    endDate: '2025-01-31',
    value: 450000,
  },
  {
    id: '4',
    name: 'ICA Maxi Halmstad – inredning',
    customer: 'ICA Maxi Halmstad',
    address: 'Köpmansgatan 5, Halmstad',
    status: 'completed',
    progress: 100,
    team: ['Johan Petersson', 'Maria Lindqvist'],
    startDate: '2024-09-01',
    endDate: '2024-10-20',
    value: 195000,
  },
  {
    id: '5',
    name: 'Region Halland – kontorslösning',
    customer: 'Region Halland',
    address: 'Södra Vägen 9, Halmstad',
    status: 'in_progress',
    progress: 45,
    team: ['Maria Lindqvist'],
    startDate: '2024-11-05',
    endDate: '2024-12-20',
    value: 165000,
  },
];

export const quotes: Quote[] = [
  {
    id: '1',
    quoteNumber: 'OFF-2024-045',
    customer: 'Volvo Cars AB',
    description: 'Kontorsinredning fas 2 – 15 arbetsplatser',
    amount: 187500,
    status: 'accepted',
    date: '2024-11-01',
    aiGenerated: true,
  },
  {
    id: '2',
    quoteNumber: 'OFF-2024-046',
    customer: 'Pysslingens Förskola',
    description: 'Utomhuslek – klätterpark och sandlåda',
    amount: 67500,
    status: 'sent',
    date: '2024-11-05',
    aiGenerated: true,
  },
  {
    id: '3',
    quoteNumber: 'OFF-2024-047',
    customer: 'ICA Maxi Halmstad',
    description: 'Lagerförvaringssystem – pall- och hyllsystem',
    amount: 89000,
    status: 'draft',
    date: '2024-11-10',
    aiGenerated: false,
  },
  {
    id: '4',
    quoteNumber: 'OFF-2024-048',
    customer: 'Region Halland',
    description: 'Möblering av nytt kontor – 45 arbetsplatser',
    amount: 312000,
    status: 'accepted',
    date: '2024-10-28',
    aiGenerated: true,
  },
  {
    id: '5',
    quoteNumber: 'OFF-2024-049',
    customer: 'Handelsbanken',
    description: 'Ergonomisk uppgradering – 30 arbetsplatser',
    amount: 45500,
    status: 'rejected',
    date: '2024-11-08',
    aiGenerated: false,
  },
];

export const monthlyRevenue = [
  { month: 'Jun', revenue: 185000 },
  { month: 'Jul', revenue: 142000 },
  { month: 'Aug', revenue: 213000 },
  { month: 'Sep', revenue: 198000 },
  { month: 'Okt', revenue: 265000 },
  { month: 'Nov', revenue: 287500 },
];

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Väntande',
  assigned: 'Tilldelad',
  in_progress: 'Pågående',
  awaiting_delivery: 'Väntar leverans',
  delivered: 'Levererad',
  installing: 'Installerar',
  completed: 'Slutförd',
};

export const quoteStatusLabels: Record<QuoteStatus, string> = {
  draft: 'Utkast',
  sent: 'Skickad',
  accepted: 'Godkänd',
  rejected: 'Avvisad',
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  planning: 'Planering',
  in_progress: 'Pågående',
  completed: 'Slutförd',
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
