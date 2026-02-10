import React from "react";
import { LayoutDashboard, Users, BookOpen, FileText, Settings, LogOut } from "lucide-react";

const Sidebar = ({ activePage, onNavigate }) => {
    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Students", icon: <Users size={20} /> },
        { name: "Subjects", icon: <BookOpen size={20} /> },
        { name: "Reports", icon: <FileText size={20} /> },
        { name: "Settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className="w-64 bg-white border-r h-full hidden lg:flex flex-col flex-shrink-0 sticky top-16">
            <div className="p-4 flex-1">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => onNavigate(item.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === item.name
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
