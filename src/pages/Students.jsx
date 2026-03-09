import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';

const Students = ({ data, sampleDataLoaded }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const safeData = data || [];
    const filteredData = safeData.filter(student =>
        student?.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student?.studentId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Users className="text-blue-500" />
                        Students Directory
                    </h2>
                    <p className="text-gray-600 mt-2">Manage and view all students here.</p>
                </div>

                {sampleDataLoaded && (
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                )}
            </div>

            {!sampleDataLoaded ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">
                    <p>No student data available. Please go to the Dashboard to upload a CSV or load sample data.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-4 font-semibold text-gray-700">Student ID</th>
                                    <th className="p-4 font-semibold text-gray-700">Name</th>
                                    <th className="p-4 font-semibold text-gray-700">Department</th>
                                    <th className="p-4 font-semibold text-gray-700">Subject</th>
                                    <th className="p-4 font-semibold text-gray-700">Semester</th>
                                    <th className="p-4 font-semibold text-gray-700">Marks</th>
                                    <th className="p-4 font-semibold text-gray-700">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((student, index) => (
                                        <tr key={`${student.studentId}-${student.subject}-${index}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{student.studentId}</td>
                                            <td className="p-4 text-gray-700">{student.studentName}</td>
                                            <td className="p-4 text-gray-600">{student.department}</td>
                                            <td className="p-4 text-gray-600">{student.subject}</td>
                                            <td className="p-4 text-gray-600">{student.semester}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${student.marks >= 75 ? 'bg-green-100 text-green-800' :
                                                    student.marks >= 40 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {student.marks}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${student.attendance >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {student.attendance}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-gray-500">
                                            No students found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
