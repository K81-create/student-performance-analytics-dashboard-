import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="text-green-500" />
                    Analytics & Reports
                </h2>
                <p className="text-gray-600 mt-2">Generate and download detailed performance reports.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">
                <p>Reports Content Coming Soon...</p>
            </div>
        </div>
    );
};

export default Reports;
