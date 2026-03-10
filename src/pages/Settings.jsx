import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <SettingsIcon className="text-gray-500" />
                    Settings
                </h2>
                <p className="text-gray-600 mt-2">Configure dashboard preferences.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">
                <p>Settings Content Coming Soon...</p>
            </div>
        </div>
    );
};

export default Settings;
