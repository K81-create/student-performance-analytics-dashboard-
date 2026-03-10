import React, { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Added analytics cards: Top Performing Subject and Needs Attention section
const Subjects = ({ data, sampleDataLoaded }) => {
    // Calculate aggregate data per subject
    const subjectStats = useMemo(() => {
        if (!data || data.length === 0) return [];

        const stats = {};

        data.forEach(item => {
            if (!stats[item.subject]) {
                stats[item.subject] = {
                    subject: item.subject,
                    totalMarks: 0,
                    totalAttendance: 0,
                    count: 0,
                    passCount: 0,
                    highestMark: 0,
                };
            }

            stats[item.subject].totalMarks += item.marks;
            stats[item.subject].totalAttendance += item.attendance;
            stats[item.subject].count += 1;

            if (item.marks >= 40) stats[item.subject].passCount += 1;
            if (item.marks > stats[item.subject].highestMark) stats[item.subject].highestMark = item.marks;
        });

        return Object.values(stats).map(stat => ({
            ...stat,
            avgMarks: Math.round(stat.totalMarks / stat.count),
            avgAttendance: Math.round(stat.totalAttendance / stat.count),
            passPercentage: Math.round((stat.passCount / stat.count) * 100)
        })).sort((a, b) => b.avgMarks - a.avgMarks);
    }, [data]);

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BookOpen className="text-purple-500" />
                    Subjects & Courses
                </h2>
                <p className="text-gray-600 mt-2">Manage course curriculum and analyze subject-wise performance.</p>
            </div>

            {!sampleDataLoaded ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">
                    <p>No subject data available. Please go to the Dashboard to upload a CSV or load sample data.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Data Table */}
                    <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                            <h3 className="text-lg font-bold text-gray-800">Subject Overview</h3>
                            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{subjectStats.length} Subjects</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="p-4 font-semibold text-gray-700">Subject Name</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Students</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Avg marks</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Highest</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Pass %</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Avg Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjectStats.map((stat, index) => (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{stat.subject}</td>
                                            <td className="p-4 text-gray-600 text-center">{stat.count}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-sm font-medium inline-block w-12 ${stat.avgMarks >= 75 ? 'bg-green-100 text-green-800' :
                                                    stat.avgMarks >= 40 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {stat.avgMarks}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600 text-center font-medium">{stat.highestMark}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="text-sm font-medium text-gray-700">{stat.passPercentage}%</span>
                                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${stat.passPercentage >= 75 ? 'bg-green-500' : stat.passPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                            style={{ width: `${stat.passPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${stat.avgAttendance >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {stat.avgAttendance}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Analytics Sidebar */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Top Performing Subject</h3>
                            {subjectStats.length > 0 && (
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                                    <p className="text-green-800 font-bold text-xl mb-1">{subjectStats[0].subject}</p>
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="text-center">
                                            <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Avg Marks</p>
                                            <p className="text-2xl font-black text-green-700">{subjectStats[0].avgMarks}</p>
                                        </div>
                                        <div className="h-8 w-px bg-green-200"></div>
                                        <div className="text-center">
                                            <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Pass Rate</p>
                                            <p className="text-2xl font-black text-green-700">{subjectStats[0].passPercentage}%</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Needs Attention</h3>
                            {subjectStats.length > 0 && (
                                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 border border-red-100">
                                    <p className="text-red-800 font-bold text-xl mb-1">{subjectStats[subjectStats.length - 1].subject}</p>
                                    <div className="flex justify-between items-center mt-3">
                                        <div className="text-center">
                                            <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">Avg Marks</p>
                                            <p className="text-2xl font-black text-red-700">{subjectStats[subjectStats.length - 1].avgMarks}</p>
                                        </div>
                                        <div className="h-8 w-px bg-red-200"></div>
                                        <div className="text-center">
                                            <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">Pass Rate</p>
                                            <p className="text-2xl font-black text-red-700">{subjectStats[subjectStats.length - 1].passPercentage}%</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Pass Rate Comparison</h3>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={subjectStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                        <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                        <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#4B5563' }} width={80} />
                                        <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="passPercentage" name="Pass Rate %" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={15} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subjects;
