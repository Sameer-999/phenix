import React from 'react';
import { Bell, ChevronDown, Calendar as CalendarIcon, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/lib/store';
import { format } from 'date-fns';

export function Navbar() {
  const { selectedAccount, dateRange } = useAppStore();

  return (
    <div className="h-12 bg-white/80 backdrop-blur-md border-b border-[#ECECEC] sticky top-0 z-10 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <h1 className="text-lg font-bold text-[#1D1D21]">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-[#F6F7FB] px-2.5 py-1 rounded-lg border border-[#ECECEC] text-[13px] font-medium text-slate-600 gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
          <span>{format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-white border-[#ECECEC] text-slate-700 h-8 rounded-lg px-2.5">
              <div className="w-4 h-4 rounded bg-indigo-100 flex items-center justify-center">
                <Wallet className="w-3 h-3 text-indigo-600" />
              </div>
              <span className="text-[13px] font-medium">{selectedAccount}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem className="text-[13px]">2023 TradingUA</DropdownMenuItem>
            <DropdownMenuItem className="text-[13px]">Demo Account</DropdownMenuItem>
            <DropdownMenuItem className="text-[13px]">Add Account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors relative">
          <Bell className="w-4 h-4" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-slate-100" />
        </div>
      </div>
    </div>
  );
}
