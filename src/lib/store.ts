import { create } from 'zustand';
import { WorkspaceState, Trade } from '../types';
import { addDays, startOfMonth } from 'date-fns';

export const useAppStore = create<WorkspaceState>((set) => ({
  trades: [
    { id: '1', closeDate: '2023-08-02', symbol: 'SPY', netPnL: 412.80, status: 'Win' },
    { id: '2', closeDate: '2022-08-02', symbol: 'SPY', netPnL: -4956.97, status: 'Loss' },
    { id: '3', closeDate: '2023-07-28', symbol: 'SPY', netPnL: 67.75, status: 'Win' },
    { id: '4', closeDate: '2023-07-28', symbol: 'SPY', netPnL: -332.33, status: 'Loss' },
    { id: '5', closeDate: '2023-07-26', symbol: 'SPY', netPnL: -432.28, status: 'Loss' },
    { id: '6', closeDate: '2023-08-01', symbol: 'SPY', netPnL: 832.29, status: 'Win' },
  ],
  activeJournal: null,
  selectedAccount: '2023 TradingUA',
  dateRange: { 
    from: startOfMonth(new Date(2023, 7, 1)), 
    to: new Date(2023, 7, 10) 
  },
  setTrades: (trades: Trade[]) => set({ trades }),
  setSelectedAccount: (account: string) => set({ selectedAccount: account }),
  setDateRange: (dateRange) => set({ dateRange }),
}));
