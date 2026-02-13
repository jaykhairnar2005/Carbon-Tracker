
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, BarChart2, Lightbulb, User, LogOut, Info, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const NavItem = ({ to, icon: Icon, label, active }) => {
    return (
        <Link to={to} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-nature-600' : 'text-gray-500 hover:text-nature-400'}`}>
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
            {active && (
                <motion.div
                    layoutId="nav-underline"
                    className="w-1 h-1 bg-nature-600 rounded-full mt-1"
                />
            )}
        </Link>
    );
};

const Layout = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/add', icon: PlusCircle, label: 'Add' },
        { to: '/reports', icon: BarChart2, label: 'Reports' },
        { to: '/tips', icon: Lightbulb, label: 'Tips' },
        { to: '/helpline', icon: Phone, label: 'Helpline' },
        { to: '/profile', icon: User, label: 'Profile' },
        { to: '/about', icon: Info, label: 'About' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // If not logged in, just render outlet (Login/Register pages will handle their own layout or use a simple wrapper)
    // However, if we want a public layout (like for About Us when not logged in), we might need logic.
    // For now, let's assume if no user, we show simple layout or redirect. 
    // Actually, App.jsx handles the routing protection. 
    // Here we just want to hide the main nav if not logged in, or maybe show a public nav.
    // Let's hide the bottom/side nav if not logged in.

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold text-nature-700 flex items-center gap-2">
                            🌱 CarbonTracker
                        </Link>
                        <div className="flex gap-4">
                            <Link to="/login" className="text-gray-600 hover:text-nature-600">Login</Link>
                            <Link to="/register" className="text-gray-600 hover:text-nature-600">Register</Link>
                            <Link to="/about" className="text-gray-600 hover:text-nature-600">About</Link>
                        </div>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto w-full p-4">
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-nature-700 flex items-center gap-2">
                        🌱 Tracker
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${location.pathname === item.to
                                ? 'bg-nature-50 text-nature-700'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center text-nature-700 font-bold">
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden bg-white shadow-sm sticky top-0 z-10">
                <div className="px-4 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-nature-700 flex items-center gap-2">
                        🌱 CarbonTracker
                    </h1>
                    <button onClick={handleLogout} className="text-gray-500">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto p-4 pb-24 md:pb-4 md:p-8 overflow-y-auto">
                <Outlet />
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 pb-safe z-10">
                <div className="flex justify-around py-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.to}
                            {...item}
                            active={location.pathname === item.to}
                        />
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
