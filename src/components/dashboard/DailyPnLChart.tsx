import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const data = [
  { date: '07/12/23', pnl: 1200 },
  { date: '07/15/23', pnl: 800 },
  { date: '07/20/23', pnl: 500 },
  { date: '07/22/23', pnl: 1500 },
  { date: '07/26/23', pnl: 25000 },
  { date: '07/28/23', pnl: -1200 },
  { date: '07/31/23', pnl: 20000 },
  { date: '08/02/23', pnl: 42000 },
];

export function DailyPnLChart() {
  return (
    <Card className="border-[#ECECEC] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
        <CardTitle className="text-[12px] font-bold flex items-center gap-1.5 uppercase tracking-tight text-slate-600">
          Net Daily P&L <Info className="w-3 h-3 text-slate-300" />
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[140px] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
            />
            <Tooltip 
              cursor={{ fill: '#F1F5F9', opacity: 0.4 }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid #E2E8F0', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, 'Daily P&L']}
            />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.pnl >= 0 ? '#10B981' : '#EF4444'} 
                  opacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
