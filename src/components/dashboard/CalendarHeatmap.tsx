import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  startOfWeek, 
  endOfWeek,
  isSameDay
} from 'date-fns';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

export function CalendarHeatmap() {
  const { trades } = useAppStore();
  const currentMonth = new Date(2023, 6, 1); // July 2023 for demo
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getDayPnL = (day: Date) => {
    const dayTrades = trades.filter(t => isSameDay(new Date(t.closeDate), day));
    if (dayTrades.length === 0) return null;
    return dayTrades.reduce((acc, t) => acc + t.netPnL, 0);
  };

  return (
    <Card className="border-[#ECECEC] shadow-sm overflow-hidden flex flex-col h-full bg-white">
      <div className="p-2 border-b border-[#ECECEC] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button className="p-0.5 hover:bg-slate-100 rounded transition-colors"><ChevronLeft className="w-3 h-3 text-slate-500" /></button>
            <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Today</span>
            <button className="p-0.5 hover:bg-slate-100 rounded transition-colors"><ChevronRight className="w-3 h-3 text-slate-500" /></button>
          </div>
          <span className="text-[12px] font-bold text-slate-800">{format(currentMonth, 'MMMM yyyy')}</span>
        </div>
      </div>
      <CardContent className="p-0 flex-1">
        <div className="grid grid-cols-7 border-b border-[#ECECEC] bg-slate-50/30">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-0.5 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 flex-1 h-[200px]">
          {days.map((day, idx) => {
            const pnl = getDayPnL(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            
            return (
              <div 
                key={idx} 
                className={cn(
                  "border-b border-r border-[#ECECEC] p-1 flex flex-col relative group cursor-pointer transition-colors hover:bg-slate-50",
                  !isCurrentMonth && "bg-slate-50/50 opacity-40",
                  idx % 7 === 6 && "border-r-0"
                )}
              >
                <span className="text-[10px] font-semibold text-slate-400 self-end pr-0.5">{format(day, 'd')}</span>
                {pnl !== null && (
                  <div className={cn(
                    "mt-auto mb-0.5 mx-0.5 rounded-md p-1 flex flex-col items-center justify-center border-l-2",
                    pnl >= 0 ? "bg-emerald-50/50 border-emerald-500" : "bg-rose-50/50 border-rose-500"
                  )}>
                    <span className={cn(
                      "text-[10px] font-bold",
                      pnl >= 0 ? "text-emerald-600" : "text-rose-600"
                    )}>
                      ${Math.abs(Math.round(pnl)).toLocaleString()}
                    </span>
                    <span className="text-[8px] font-medium text-slate-400">1 trade</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
