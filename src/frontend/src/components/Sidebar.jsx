import React from 'react';
import { Home, MessageSquare, Car, Utensils, Music, BookOpen, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activePage, setActivePage }) => {
    const navItems = [
        { id: 'home', label: 'Home', icon: <Home size={22} /> },
        { id: 'slang', label: 'Slang', icon: <MessageSquare size={22} /> },
        { id: 'travel', label: 'Travel', icon: <Car size={22} /> },
        { id: 'food', label: 'Food Mood', icon: <Utensils size={22} /> },
        { id: 'sounds', label: 'Sounds', icon: <Music size={22} /> },
        { id: 'heritage', label: 'Heritage', icon: <BookOpen size={22} /> },
        { id: 'admin', label: 'Admin', icon: <ShieldCheck size={22} />, admin: true },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-24 lg:w-72 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] z-50 flex flex-col shadow-2xl">
            {/* Brand */}
            <div
                className="p-10 flex items-center gap-4 cursor-pointer group"
                onClick={() => setActivePage('home')}
            >
                <div className="w-12 h-12 min-w-[48px] bg-[var(--primary)] rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl ring-4 ring-[var(--primary)]/20 transition-transform group-hover:rotate-12">
                    N
                </div>
                <span className="hidden lg:block text-3xl font-black naatu-font text-[var(--primary)] tracking-tighter">NaatuMithra</span>
            </div>

            {/* Nav */}
            <nav className="flex-grow px-6 py-6 space-y-3 overflow-y-auto hide-scrollbar">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`w-full flex items-center gap-5 p-4 rounded-2xl font-black transition-all group relative overflow-hidden ${activePage === item.id
                                ? 'bg-[var(--primary)] text-white shadow-2xl shadow-terracotta/30 scale-105'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'
                            }`}
                    >
                        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                            {item.icon}
                        </div>
                        <span className="hidden lg:block text-sm uppercase tracking-[0.2em] relative z-10">{item.label}</span>
                        {activePage === item.id && (
                            <motion.div
                                layoutId="sidebar-accent"
                                className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-white rounded-l-full"
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* Footer / Status */}
            <div className="p-8 hidden lg:block border-t border-[var(--border-color)] bg-black/5 dark:bg-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Naatu Secure</p>
                        <p className="text-sm font-bold opacity-80">Explorer Mode</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
