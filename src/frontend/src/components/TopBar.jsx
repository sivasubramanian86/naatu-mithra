import React, { useState } from 'react';
import { Sun, Moon, MapPin, ChevronDown, Bell, Search, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cities } from '../data/cities';

const TopBar = ({ theme, toggleTheme, currentCity, setCity }) => {
    const [isCityOpen, setIsCityOpen] = useState(false);

    const cityName = currentCity === 'all' ? 'All Cities' : (cities.find(c => c.id === currentCity)?.name || 'Select City');

    return (
        <header className="sticky top-0 z-40 h-24 bg-[var(--header-bg)] backdrop-blur-2xl border-b border-[var(--border-color)] px-10 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-8 flex-grow">
                {/* Dashboard Meta */}
                <div className="hidden xl:flex flex-col">
                    <h4 className="text-xl font-black naatu-font tracking-tight text-[var(--text-primary)]">City Overview</h4>
                    <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">{cityName}, Naatu</p>
                </div>

                {/* Global Search */}
                <div className="hidden md:flex items-center gap-4 bg-[var(--card-bg)] px-6 py-3 rounded-2xl border border-[var(--border-color)] w-full max-w-lg group focus-within:ring-2 ring-[var(--primary)]/30 transition-all">
                    <Search size={18} className="text-[var(--text-secondary)] opacity-40" />
                    <input
                        type="text"
                        placeholder="Search local vibes..."
                        className="bg-transparent border-none outline-none text-sm w-full font-bold text-[var(--text-primary)] placeholder:opacity-30"
                    />
                </div>
            </div>

            <div className="flex items-center gap-8">
                {/* City Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setIsCityOpen(!isCityOpen)}
                        className="flex items-center gap-3 px-5 py-3 bg-[var(--card-bg)] dark:bg-white/5 rounded-2xl text-sm font-black border border-[var(--border-color)] shadow-md transition-all hover:border-[var(--primary)] hover:scale-105 active:scale-95"
                    >
                        <Globe size={18} className="text-[var(--primary)]" />
                        <span className="tracking-wide uppercase text-[10px]">{cityName}</span>
                        <ChevronDown size={14} className={`transition-transform duration-500 ${isCityOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isCityOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                className="absolute right-0 mt-4 w-56 glass-card overflow-hidden p-3 z-[60] bg-[var(--card-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                            >
                                <button
                                    onClick={() => { setCity('all'); setIsCityOpen(false); }}
                                    className={`w-full text-left px-5 py-3 rounded-xl text-sm font-black transition-all mb-1 ${currentCity === 'all'
                                        ? 'bg-[var(--primary)] text-white shadow-lg'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'
                                        }`}
                                >
                                    All Cities
                                </button>
                                {cities.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => { setCity(c.id); setIsCityOpen(false); }}
                                        className={`w-full text-left px-5 py-3 rounded-xl text-sm font-black transition-all mb-1 last:mb-0 ${currentCity === c.id
                                            ? 'bg-[var(--primary)] text-white shadow-lg'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'
                                            }`}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-4 border-l border-[var(--border-color)] pl-8">
                    <button
                        onClick={toggleTheme}
                        className="p-3.5 rounded-2xl bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all border border-[var(--border-color)] shadow-md hover:scale-110 active:scale-90"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button className="p-3.5 rounded-2xl bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all border border-[var(--border-color)] shadow-md hover:scale-110 relative">
                        <Bell size={20} />
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#C04D29] rounded-full border-2 border-[var(--header-bg)] animate-pulse"></div>
                    </button>

                    <div className="flex items-center gap-4 cursor-pointer group px-2 py-1 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center text-white font-black shadow-xl ring-2 ring-white/20 group-hover:scale-110 transition-transform">
                            <User size={24} />
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <p className="text-sm font-black text-[var(--text-primary)]">Explorer</p>
                            <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">Premium Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
