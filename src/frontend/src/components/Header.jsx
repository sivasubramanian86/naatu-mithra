import React, { useState } from 'react';
import { Menu, X, Sun, Moon, MapPin, ChevronDown, MessageSquare, Car, Utensils, Music, BookOpen, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ activePage, setActivePage, theme, toggleTheme, currentCity, setCity }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', icon: <MapPin size={18} /> },
        { id: 'slang', label: 'Slang', icon: <MessageSquare size={18} /> },
        { id: 'travel', label: 'Travel', icon: <Car size={18} /> },
        { id: 'food', label: 'Food Mood', icon: <Utensils size={18} /> },
        { id: 'sounds', label: 'Sounds', icon: <Music size={18} /> },
        { id: 'heritage', label: 'Heritage', icon: <BookOpen size={18} /> },
        { id: 'admin', label: 'Admin', icon: <ShieldCheck size={18} />, admin: true },
    ];

    const cities = [
        { id: 'blr', name: 'Bengaluru' },
        { id: 'bom', name: 'Mumbai' },
        { id: 'del', name: 'Delhi' },
        { id: 'maa', name: 'Chennai' },
        { id: 'hyd', name: 'Hyderabad' },
        { id: 'ccu', name: 'Kolkata' },
    ];

    const cityName = cities.find(c => c.id === currentCity)?.name || 'Select City';

    return (
        <header className="sticky top-0 z-50 bg-[var(--earthy-bg)]/80 backdrop-blur-md border-b border-earthy-200 dark:border-earthy-800">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => { setActivePage('home'); setIsMenuOpen(false); }}
                >
                    <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-terracotta/20 shadow-lg group-hover:rotate-12 transition-transform">
                        N
                    </div>
                    <span className="text-2xl font-black tracking-tighter naatu-font text-terracotta">NaatuMithra</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navItems.filter(item => !item.admin).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActivePage(item.id)}
                            className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 transition-all ${activePage === item.id
                                    ? 'bg-terracotta text-white shadow-md'
                                    : 'text-earthy-600 dark:text-earthy-400 hover:bg-earthy-100 dark:hover:bg-earthy-900'
                                }`}
                        >
                            {item.icon}
                            <span className="text-sm uppercase tracking-wide">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* City Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setIsCityOpen(!isCityOpen)}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-earthy-100 dark:bg-earthy-900 rounded-full text-sm font-bold border border-earthy-200 dark:border-earthy-800"
                        >
                            <MapPin size={14} className="text-terracotta" />
                            {cityName}
                            <ChevronDown size={14} className={`transition-transform ${isCityOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isCityOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-48 glass-card overflow-hidden p-2 z-[60]"
                                >
                                    {cities.map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => { setCity(c.id); setIsCityOpen(false); }}
                                            className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-colors ${currentCity === c.id ? 'bg-terracotta text-white' : 'hover:bg-earthy-100 dark:hover:bg-earthy-900'
                                                }`}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-earthy-100 dark:bg-earthy-900 text-earthy-600 dark:text-earthy-400 hover:text-mustard transition-colors border border-earthy-200 dark:border-earthy-800"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button
                        className="lg:hidden p-2.5 rounded-full bg-earthy-100 dark:bg-earthy-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden bg-[var(--earthy-bg)] border-b border-earthy-200 dark:border-earthy-800 overflow-hidden"
                    >
                        <div className="p-4 space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActivePage(item.id); setIsMenuOpen(false); }}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activePage === item.id
                                            ? 'bg-terracotta text-white'
                                            : 'text-earthy-600 dark:text-earthy-400 hover:bg-earthy-100 dark:hover:bg-earthy-900'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                            <div className="pt-4 border-t border-earthy-200 dark:border-earthy-800 sm:hidden">
                                <p className="px-4 text-xs font-bold uppercase tracking-widest text-earthy-400 mb-2">Switch City</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {cities.map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => { setCity(c.id); setIsMenuOpen(false); }}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold border ${currentCity === c.id ? 'bg-terracotta border-terracotta text-white' : 'border-earthy-200 dark:border-earthy-800 text-earthy-600 dark:text-earthy-400'
                                                }`}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
