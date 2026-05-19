export type TradeStatus = "Win" | "Loss" | "Break even";

export interface Trade {
  id: string;
  closeDate: string;
  symbol: string;
  netPnL: number;
  status: TradeStatus;
  setup?: string;
  winRate?: number;
  profitFactor?: number;
  account?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  netPnL: number;
  content: string;
  trades: Trade[];
}

export interface WorkspaceState {
  trades: Trade[];
  activeJournal: JournalEntry | null;
  selectedAccount: string;
  dateRange: { from: Date; to: Date };
  setTrades: (trades: Trade[]) => void;
  setSelectedAccount: (account: string) => void;
  setDateRange: (range: { from: Date; to: Date }) => void;
}
