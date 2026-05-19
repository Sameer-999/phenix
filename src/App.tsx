/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/Dashboard';
import { NotebookPage } from './pages/Notebook';
import { ImportPage } from './pages/Import';
import { InsightsPage } from './pages/Insights';
import { DailyJournalModal } from './components/dashboard/DailyJournalModal';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [journalOpen, setJournalOpen] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === 'daily-journal') {
      setJournalOpen(true);
    } else {
      setActivePage(page);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'notebook':
        return <NotebookPage onOpenJournal={() => setJournalOpen(true)} />;
      case 'import':
        return <ImportPage />;
      case 'insights':
        return <InsightsPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <h2 className="text-2xl font-bold mb-2">{activePage}</h2>
            <p>This page is under development in this clone.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Layout activePage={activePage} onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
      <DailyJournalModal open={journalOpen} onOpenChange={setJournalOpen} />
    </>
  );
}
