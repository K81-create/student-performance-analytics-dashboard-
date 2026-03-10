import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children, activePage, onNavigate }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Navbar />

            <div className="flex max-w-7xl mx-auto h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <Sidebar activePage={activePage} onNavigate={onNavigate} />

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
