import React, { useState } from 'react';
import { Sparkles, Brain, Zap, Target, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function InsightsPage() {
  const { trades } = useAppStore();
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAIInsight = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `Analyze these recent trades and provide trading behavioral insights and improvement suggestions: ${JSON.stringify(trades)}`,
          systemInstruction: "You are an elite AI Trading Mentor. Analyze performance data and identify patterns, psychological biases, and specific areas for improvement. Be direct, professional, and data-driven."
        }),
      });
      const data = await response.json();
      setInsight(data.text);
    } catch (error) {
      console.error(error);
      setInsight("Error generating insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-8">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#6C4CF1] flex items-center justify-center shadow-lg shadow-[#6C4CF1]/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI Insights</h2>
        </div>
        <p className="text-[13px] text-slate-500 font-medium">Advanced behavioral analytics powered by Gemini AI to identify your edge and weakness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[#6C4CF1]/20 bg-[#6C4CF1]/5 shadow-none group hover:bg-[#6C4CF1]/10 transition-colors">
          <CardHeader className="py-3 px-4">
            <Brain className="w-5 h-5 text-[#6C4CF1] mb-1.5" />
            <CardTitle className="text-[14px] font-bold">Behavioral Patterns</CardTitle>
            <CardDescription className="text-[11px]">Identifies repetitive habits in your execution.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-emerald-500/20 bg-emerald-50 shadow-none group hover:bg-emerald-100 transition-colors">
          <CardHeader className="py-3 px-4">
            <Target className="w-5 h-5 text-emerald-600 mb-1.5" />
            <CardTitle className="text-[14px] font-bold">Best Setups</CardTitle>
            <CardDescription className="text-[11px]">Detects which strategies yield the highest ROI.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-rose-500/20 bg-rose-50 shadow-none group hover:bg-rose-100 transition-colors">
          <CardHeader className="py-3 px-4">
            <AlertTriangle className="w-5 h-5 text-rose-600 mb-1.5" />
            <CardTitle className="text-[14px] font-bold">Weakness Detection</CardTitle>
            <CardDescription className="text-[11px]">Flags consistent mistakes and risk violations.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-[#ECECEC] shadow-sm overflow-hidden bg-white">
        <CardHeader className="border-b border-[#ECECEC] flex flex-row items-center justify-between py-4 px-6">
          <div className="space-y-0.5">
            <CardTitle className="text-[16px] font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Improvement Suggestions
            </CardTitle>
            <CardDescription className="text-[12px]">Analyze your recent performance with AI.</CardDescription>
          </div>
          <Button 
            onClick={generateAIInsight} 
            disabled={loading}
            className="bg-[#6C4CF1] hover:bg-[#5A3ED9] text-white rounded-xl px-4 h-9 gap-2 font-bold shadow-lg shadow-indigo-500/20 text-[12px]"
          >
            {loading ? "Analyzing..." : "Generate AI Analysis"}
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {insight ? (
            <div className="prose prose-sm prose-indigo max-w-none">
              <div className="whitespace-pre-wrap text-[13px] text-slate-700 leading-relaxed font-medium">
                {insight}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <Lightbulb className="w-6 h-6 text-slate-300" />
              </div>
              <div className="max-w-md">
                <p className="text-[13px] text-slate-400 font-medium">No results found yet. Let's analyze your data to find your edge and improve your performance.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-[#ECECEC] shadow-sm">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-[14px] font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> Daily Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {[
              { label: 'Maintain Risk/Reward > 2:1', status: 'In Progress' },
              { label: 'Limit daily losses to $2,000', status: 'Completed' },
              { label: 'Journal every executed trade', status: 'In Progress' }
            ].map(goal => (
              <div key={goal.label} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[12px] font-bold text-slate-700">{goal.label}</span>
                <Badge variant={goal.status === 'Completed' ? 'default' : 'secondary'} className={cn("text-[10px] font-bold px-1.5 h-5", goal.status === 'Completed' ? 'bg-emerald-500' : '')}>
                  {goal.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="border-[#ECECEC] shadow-sm">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-[14px] font-bold flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-4 h-4" /> Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
             <p className="text-[13px] text-slate-500 italic">"Your largest losses often come from adding to losers. Be disciplined with your stops."</p>
             <div className="w-full h-px bg-slate-100 my-2" />
             <div className="flex flex-wrap gap-1.5">
               {['FOMO', 'Overtrading', 'Revenge Trading', 'No Stop Loss'].map(m => (
                 <Badge key={m} variant="outline" className="text-[10px] font-bold text-rose-500 border-rose-100 bg-rose-50 rounded-lg">{m}</Badge>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
