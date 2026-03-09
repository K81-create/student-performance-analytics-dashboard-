import React, { useState } from 'react';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Subjects from './pages/Subjects';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const StudentAnalyticsDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [data, setData] = useState([]);
  const [sampleDataLoaded, setSampleDataLoaded] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard
          data={data}
          setData={setData}
          sampleDataLoaded={sampleDataLoaded}
          setSampleDataLoaded={setSampleDataLoaded}
        />;
      case 'Students':
        return <Students data={data} sampleDataLoaded={sampleDataLoaded} />;
      case 'Subjects':
        return <Subjects data={data} sampleDataLoaded={sampleDataLoaded} />;
      case 'Reports':
        return <Reports data={data} sampleDataLoaded={sampleDataLoaded} />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard
          data={data}
          setData={setData}
          sampleDataLoaded={sampleDataLoaded}
          setSampleDataLoaded={setSampleDataLoaded}
        />;
    }
  };

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default StudentAnalyticsDashboard;