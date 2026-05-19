import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';

export function RecentTrades() {
  const { trades } = useAppStore();

  return (
    <Card className="border-[#ECECEC] shadow-sm col-span-2 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-[#ECECEC] flex items-center justify-between">
        <Tabs defaultValue="recent" className="w-[320px]">
          <TabsList className="bg-slate-100/50 p-0.5 rounded-lg h-8">
            <TabsTrigger value="open" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-[11px] font-bold px-3 uppercase tracking-tight">Open Positions</TabsTrigger>
            <TabsTrigger value="recent" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-[11px] font-bold px-3 uppercase tracking-tight">Recent Trades</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <CardContent className="p-0 h-[225px] overflow-auto">
        <Table>
          <TableHeader className="bg-slate-50/50 sticky top-0">
            <TableRow className="border-b border-[#ECECEC]">
              <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1.5 h-8">Close Date</TableHead>
              <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1.5 h-8">Symbol</TableHead>
              <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1.5 h-8 text-right pr-4">Net P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id} className="border-b border-[#ECECEC] hover:bg-slate-50 transition-colors h-8">
                <TableCell className="text-[12px] font-medium text-slate-600 py-1">{trade.closeDate}</TableCell>
                <TableCell className="text-[12px] font-bold text-slate-800 py-1">{trade.symbol}</TableCell>
                <TableCell className={`text-[12px] font-bold text-right py-1 pr-4 ${trade.netPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {trade.netPnL >= 0 ? `$${trade.netPnL.toLocaleString()}` : `-$${Math.abs(trade.netPnL).toLocaleString()}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
