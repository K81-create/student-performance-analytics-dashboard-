import React, { useState } from 'react';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Subjects from './pages/Subjects';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const StudentAnalyticsDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Students':
        return <Students />;
      case 'Subjects':
        return <Subjects />;
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default StudentAnalyticsDashboard;