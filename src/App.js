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

  const today = new Date().toLocaleDateString();

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <Dashboard
            data={data}
            setData={setData}
            sampleDataLoaded={sampleDataLoaded}
            setSampleDataLoaded={setSampleDataLoaded}
          />
        );

      case 'Students':
        return <Students data={data} sampleDataLoaded={sampleDataLoaded} />;

      case 'Subjects':
        return <Subjects data={data} sampleDataLoaded={sampleDataLoaded} />;

      case 'Reports':
        return <Reports data={data} sampleDataLoaded={sampleDataLoaded} />;

      case 'Settings':
        return <Settings />;

      default:
        return (
          <Dashboard
            data={data}
            setData={setData}
            sampleDataLoaded={sampleDataLoaded}
            setSampleDataLoaded={setSampleDataLoaded}
          />
        );
    }
  };

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>

      {/* Header */}
      <div
        style={{
          padding: "15px 30px",
          background: "#1f2937",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        <div>📊 Student Analytics Dashboard</div>
        <div style={{ fontSize: "14px", fontWeight: "normal" }}>
          {today}
        </div>
      </div>

      {/* Main Layout */}
      <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
        {renderContent()}
      </DashboardLayout>

    </div>
  );
};

export default StudentAnalyticsDashboard;
