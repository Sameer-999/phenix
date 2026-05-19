import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, activePage, onNavigate }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#F6F7FB]">
        <Sidebar activePage={activePage} onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="px-6 py-3 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
