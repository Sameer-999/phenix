import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const data = [
  { subject: 'Win %', A: 120, fullMark: 150 },
  { subject: 'Avg win/loss', A: 98, fullMark: 150 },
  { subject: 'Profit factor', A: 86, fullMark: 150 },
];

export function ZellaScore() {
  return (
    <Card className="border-[#ECECEC] shadow-sm relative">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
        <CardTitle className="text-[12px] font-bold flex items-center gap-1.5 uppercase tracking-tight text-slate-600">
          Zella Score <Info className="w-3 h-3 text-slate-300" />
        </CardTitle>
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-1 py-0 text-[10px] uppercase font-bold">BETA</Badge>
      </CardHeader>
      <CardContent className="h-[140px] flex flex-col items-center justify-center p-0">
        <ResponsiveContainer width="100%" height="80%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
            />
            <Radar
              name="Score"
              dataKey="A"
              stroke="#6C4CF1"
              fill="#6C4CF1"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="absolute bottom-2 flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Score:</span>
            <span className="text-lg font-bold text-emerald-500">100.0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
