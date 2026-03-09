import React, { useMemo } from 'react';
import { FileText, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const Reports = ({ data, sampleDataLoaded }) => {
    // Calculate report statistics
    const reportData = useMemo(() => {
        if (!data || data.length === 0) return null;

        // Group by department
        const deptStats = {};

        data.forEach(item => {
            if (!deptStats[item.department]) {
                deptStats[item.department] = {
                    department: item.department,
                    totalMarks: 0,
                    totalAttendance: 0,
                    count: 0,
                    passCount: 0,
                    failCount: 0,
                };
            }

            deptStats[item.department].totalMarks += item.marks;
            deptStats[item.department].totalAttendance += item.attendance;
            deptStats[item.department].count += 1;

            if (item.marks >= 40) {
                deptStats[item.department].passCount += 1;
            } else {
                deptStats[item.department].failCount += 1;
            }
        });

        const departments = Object.values(deptStats).map(stat => ({
            ...stat,
            avgMarks: Math.round(stat.totalMarks / stat.count),
            avgAttendance: Math.round(stat.totalAttendance / stat.count),
            passRate: Math.round((stat.passCount / stat.count) * 100)
        }));

        // Overall pass/fail for pie chart
        const totalPassed = departments.reduce((acc, curr) => acc + curr.passCount, 0);
        const totalFailed = departments.reduce((acc, curr) => acc + curr.failCount, 0);

        const pieData = [
            { name: 'Passed', value: totalPassed, color: '#10b981' },
            { name: 'Failed', value: totalFailed, color: '#ef4444' }
        ];

        return { departments, pieData, totalPassed, totalFailed };
    }, [data]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText className="text-green-500" />
                        Analytics & Reports
                    </h2>
                    <p className="text-gray-600 mt-2">Generate and download detailed performance reports across departments.</p>
                </div>

                {sampleDataLoaded && (
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <Download size={18} />
                        Export PDF Report
                    </button>
                )}
            </div>

            {!sampleDataLoaded ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">
                    <p>No report data available. Please go to the Dashboard to upload a CSV or load sample data.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Charts Section */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Overall Completion Rate</h3>
                            <div className="h-[250px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={reportData.pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {reportData.pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-[-10px]">
                                    <p className="text-3xl font-black text-gray-800">
                                        {Math.round((reportData.totalPassed / (reportData.totalPassed + reportData.totalFailed)) * 100)}%
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium">Pass Rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-4 opacity-90">Quick Summary</h3>
                            <div className="space-y-4">
                                <div className="bg-white bg-opacity-20 rounded-xl p-4 flex justify-between items-center">
                                    <span className="font-medium">Total Assessments</span>
                                    <span className="text-xl font-bold">{reportData.totalPassed + reportData.totalFailed}</span>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-xl p-4 flex justify-between items-center">
                                    <span className="font-medium">Total Passed</span>
                                    <span className="text-xl font-bold">{reportData.totalPassed}</span>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-xl p-4 flex justify-between items-center">
                                    <span className="font-medium">Total Failed</span>
                                    <span className="text-xl font-bold">{reportData.totalFailed}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Department Performance Table */}
                    <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                            <h3 className="text-lg font-bold text-gray-800">Department Performance Metrics</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="p-4 font-semibold text-gray-700">Department</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Avg Marks</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Avg Attendance</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Pass Rate</th>
                                        <th className="p-4 font-semibold text-gray-700 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.departments.map((dept, index) => {
                                        let statusColor = 'text-gray-500';
                                        let StatusIcon = Minus;
                                        let statusText = 'Average';

                                        if (dept.passRate >= 75) {
                                            statusColor = 'text-green-500';
                                            StatusIcon = TrendingUp;
                                            statusText = 'Excellent';
                                        } else if (dept.passRate < 50) {
                                            statusColor = 'text-red-500';
                                            StatusIcon = TrendingDown;
                                            statusText = 'Critical';
                                        }

                                        return (
                                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-medium text-gray-900">{dept.department}</td>
                                                <td className="p-4 text-center">
                                                    <span className={`font-semibold ${dept.avgMarks >= 70 ? 'text-green-600' :
                                                            dept.avgMarks >= 40 ? 'text-gray-700' : 'text-red-600'
                                                        }`}>
                                                        {dept.avgMarks}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${dept.avgAttendance >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {dept.avgAttendance}%
                                                    </span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="font-bold text-gray-800">{dept.passRate}%</span>
                                                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                                                            <div
                                                                className={`h-full rounded-full ${dept.passRate >= 75 ? 'bg-green-500' : dept.passRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                style={{ width: `${dept.passRate}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className={`flex items-center justify-center gap-1 ${statusColor} font-medium text-sm`}>
                                                        <StatusIcon size={16} />
                                                        {statusText}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
