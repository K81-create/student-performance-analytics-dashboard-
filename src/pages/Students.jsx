import React from 'react';
import { Users } from 'lucide-react';

const Students = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="text-blue-500" />
                    Students Directory
                </h2>
                <p className="text-gray-600 mt-2">Manage and view all students here.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">
                <p>Students Content Coming Soon...</p>
            </div>
        </div>
    );
};

export default Students;
