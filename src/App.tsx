import React, { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { CaseEntryPage } from './pages/CaseEntryPage';
import { CaseViewPage } from './pages/CaseViewPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ChatPage } from './pages/ChatPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'case-entry':
        return <CaseEntryPage />;
      case 'case-view':
        return <CaseViewPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'chat':
        return <ChatPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;