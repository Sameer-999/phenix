import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
} from '@/components/ui/dialog';
import { X, TrendingUp, MoreVertical, Undo, Redo, Bold, Italic, Underline, Type, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const chartData = [
  { val: 0 }, { val: 20 }, { val: 10 }, { val: 400 }, { val: 600 }
];

interface DailyJournalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DailyJournalModal({ open, onOpenChange }: DailyJournalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1000px] h-[90vh] p-0 gap-0 border-[#ECECEC] rounded-2xl overflow-hidden flex flex-col bg-white">
        <DialogHeader className="p-4 border-b border-[#ECECEC] flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-bold text-slate-800">Daily Log</DialogTitle>
          <DialogClose className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2.5">
                  <h2 className="text-xl font-bold text-slate-800">Tue, Aug 01, 2023</h2>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-xl font-bold text-emerald-500">Net P&L $579.50</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="w-48 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="modalPnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#10B981" strokeWidth={2} fill="url(#modalPnl)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-4 gap-x-8 gap-y-3 flex-1">
                {[
                  { label: 'Total Trades', value: '3' },
                  { label: 'Winners', value: '3' },
                  { label: 'Gross P&L', value: '$687' },
                  { label: 'Commissions', value: '$108' },
                  { label: 'Winrate', value: '100%' },
                  { label: 'Losers', value: '0' },
                  { label: 'Volume', value: '15' },
                  { label: 'Profit Factor', value: '--' },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between min-w-[100px] border-r border-slate-100 last:border-0 pr-8 last:pr-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{m.label}</span>
                    <span className="text-[12px] font-bold text-slate-700">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Container */}
            <div className="border border-[#ECECEC] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#6C4CF1]/20 transition-all">
              {/* Toolbar */}
              <div className="p-1.5 border-b border-[#ECECEC] bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-0.5">
                  {[Bold, Italic, Underline, Type, '|', Type, List, ListOrdered, '|', LinkIcon, ImageIcon, Plus].map((Icon, i) => {
                    if (Icon === '|') return <div key={i} className="w-px h-3 bg-slate-200 mx-1" />;
                    return (
                      <button key={i} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-slate-500 hover:text-slate-800 transition-all">
                        {/* @ts-ignore */}
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center space-x-0.5">
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-slate-400"><Undo className="w-3.5 h-3.5" /></button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-slate-400"><Redo className="w-3.5 h-3.5" /></button>
                  <div className="w-px h-3 bg-slate-200 mx-1" />
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white text-slate-400"><MoreVertical className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {/* Editable Area */}
              <div className="p-6 min-h-[300px] outline-none" contentEditable>
                <div className="prose prose-sm prose-slate max-w-none">
                  <span className="bg-amber-100 text-amber-900 px-1 font-bold text-[13px]">🤠 Pre Market game Plan</span>
                  <p className="mt-3 font-medium text-slate-700 text-[13px]">Market<br />- Market news coming out 945-10AM EST.</p>
                  
                  <div className="my-6 rounded-xl overflow-hidden border border-[#ECECEC] max-w-2xl">
                    <img src="https://images.unsplash.com/photo-1611974717482-9993309a4d8c?auto=format&fit=crop&q=80&w=1000" alt="Chart" className="w-full opacity-90" />
                  </div>

                  <p className="font-medium text-slate-700 text-[13px]">Watchlist</p>
                  <br />
                  <span className="bg-[#6C4CF1] text-white px-1 font-bold text-[13px]">🤴 Day Recap</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
