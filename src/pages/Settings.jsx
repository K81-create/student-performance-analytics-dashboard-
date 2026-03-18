import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Palette, Database, Shield, ChevronRight } from 'lucide-react';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        atRiskAlerts: true,
        weeklyReport: false,
        attendanceWarnings: true,
    });

    const [thresholds, setThresholds] = useState({
        passMarks: 40,
        minAttendance: 75,
        atRiskAttendance: 75,
    });

    const [theme, setTheme] = useState('light');

    const handleNotifToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleThresholdChange = (key, value) => {
        setThresholds(prev => ({ ...prev, [key]: Number(value) }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <SettingsIcon className="text-gray-500" />
                    Settings
                </h2>
                <p className="text-gray-600 mt-2">Configure your dashboard preferences and thresholds.</p>
            </div>

            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <Bell size={20} className="text-blue-500" />
                    Notifications
                </h3>
                <div className="space-y-4">
                    {[
                        { key: 'atRiskAlerts', label: 'At-risk student alerts', desc: 'Get notified when students fall below passing thresholds' },
                        { key: 'weeklyReport', label: 'Weekly performance report', desc: 'Receive a weekly summary of class performance' },
                        { key: 'attendanceWarnings', label: 'Attendance warnings', desc: 'Alert when attendance drops below minimum requirement' },
                    ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div>
                                <p className="font-medium text-gray-800">{label}</p>
                                <p className="text-sm text-gray-500">{desc}</p>
                            </div>
                            <button
                                onClick={() => handleNotifToggle(key)}
                                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${notifications[key] ? 'bg-blue-500' : 'bg-gray-300'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${notifications[key] ? 'translate-x-7' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Thresholds */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <Database size={20} className="text-purple-500" />
                    Performance Thresholds
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { key: 'passMarks', label: 'Pass Mark (%)', min: 1, max: 100 },
                        { key: 'minAttendance', label: 'Min. Attendance (%)', min: 1, max: 100 },
                        { key: 'atRiskAttendance', label: 'At-Risk Threshold (%)', min: 1, max: 100 },
                    ].map(({ key, label, min, max }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                            <input
                                type="number"
                                min={min}
                                max={max}
                                value={thresholds[key]}
                                onChange={(e) => handleThresholdChange(key, e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            />
                        </div>
                    ))}
                </div>
                <button className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    Save Thresholds
                </button>
            </div>

            {/* Appearance */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <Palette size={20} className="text-pink-500" />
                    Appearance
                </h3>
                <div className="flex gap-4">
                    {['light', 'dark', 'system'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`px-5 py-2 rounded-lg border capitalize font-medium transition-colors ${theme === t ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* About */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <Shield size={20} className="text-green-500" />
                    About
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between"><span>Version</span><span className="font-medium text-gray-800">1.0.0</span></div>
                    <div className="flex justify-between"><span>Framework</span><span className="font-medium text-gray-800">React 18</span></div>
                    <div className="flex justify-between"><span>Charts</span><span className="font-medium text-gray-800">Recharts</span></div>
                    <div className="flex justify-between border-t pt-3"><span>License</span><span className="font-medium text-gray-800">MIT</span></div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
