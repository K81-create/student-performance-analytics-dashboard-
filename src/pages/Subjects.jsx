import React from 'react';
import { BookOpen } from 'lucide-react';

const Subjects = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BookOpen className="text-purple-500" />
                    Subjects & Courses
                </h2>
                <p className="text-gray-600 mt-2">Manage course curriculum and subjects.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">
                <p>Subjects Content Coming Soon...</p>
            </div>
        </div>
    );
};

export default Subjects;
