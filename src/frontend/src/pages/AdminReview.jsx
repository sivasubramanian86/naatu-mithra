import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Filter, Search, CheckCircle, Edit, Trash2, Eye, Flag, AlertTriangle, User } from 'lucide-react';

const AdminReview = () => {
    const reports = [
        { id: '#RT-102', user: 'Amit S.', type: 'Slang Submission', status: 'Pending', city: 'Mumbai', content: 'Bantai vibe check' },
        { id: '#RT-099', user: 'Sneha R.', type: 'Food Spot', status: 'Approved', city: 'Bengaluru', content: 'Hidden Dosa Point' },
        { id: '#RT-085', user: 'Rahul K.', type: 'Sound clip', status: 'Flagged', city: 'Delhi', content: 'Metro Noise' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 text-[var(--text-primary)]">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[var(--primary)]">
                        <div className="p-2 bg-[var(--primary)]/10 rounded-xl"><ShieldCheck size={24} /></div>
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Guardian Module</span>
                    </div>
                    <h1 className="text-5xl font-black naatu-font">Admin Review</h1>
                    <p className="text-[var(--text-secondary)] font-medium max-w-xl opacity-70">
                        Oversee the cultural heartbeat. Review, moderate, and approve submissions to maintain the Naatu quality.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 bg-[var(--accent)] text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
                        <ShieldCheck size={18} /> Admin Access Granted
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pending', count: 12, icon: <AlertTriangle className="text-[var(--primary)]" /> },
                    { label: 'Approved', count: 850, icon: <CheckCircle className="text-[var(--accent)]" /> },
                    { label: 'Flagged', count: 4, icon: <Flag className="text-red-500" /> },
                    { label: 'Moderators', count: 5, icon: <User className="text-[var(--secondary)]" /> },
                ].map(stat => (
                    <div key={stat.label} className="glass-card p-8 flex items-center gap-6">
                        <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl">{stat.icon}</div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
                            <p className="text-3xl font-black">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Moderation Table */}
            <div className="glass-card overflow-hidden">
                <div className="p-8 border-b border-[var(--border-color)] flex items-center justify-between bg-black/5 dark:bg-white/5">
                    <div className="flex items-center gap-6">
                        <h3 className="text-xl font-black naatu-font">Submissions Queue</h3>
                        <div className="flex items-center gap-3 bg-[var(--body-bg)] px-4 py-2 rounded-xl border border-[var(--border-color)]">
                            <Search size={14} className="opacity-30" />
                            <input type="text" placeholder="Filter submissions..." className="bg-transparent border-none outline-none text-xs font-bold w-48 text-[var(--text-primary)]" />
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:underline">
                        <Filter size={14} /> Advanced Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/5 dark:bg-white/5 text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] opacity-40">
                            <tr>
                                <th className="px-10 py-6">Ticket ID</th>
                                <th className="px-10 py-6">Contributor</th>
                                <th className="px-10 py-6">Submission Type</th>
                                <th className="px-10 py-6">City Context</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-10 py-8 font-black text-sm">{report.id}</td>
                                    <td className="px-10 py-8 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-xl flex items-center justify-center font-black text-[var(--primary)]">{report.user[0]}</div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{report.user}</span>
                                            <span className="text-[10px] opacity-40 uppercase font-black">Verified Contributor</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-xs font-bold px-4 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full">{report.type}</span>
                                    </td>
                                    <td className="px-10 py-8 text-xs font-bold opacity-40 uppercase tracking-widest">{report.city}</td>
                                    <td className="px-10 py-8">
                                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${report.status === 'Approved' ? 'text-[var(--accent)]' :
                                                report.status === 'Flagged' ? 'text-red-500' : 'text-[var(--primary)]'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${report.status === 'Approved' ? 'bg-[var(--accent)]' :
                                                    report.status === 'Flagged' ? 'bg-red-500' : 'bg-[var(--primary)]'
                                                }`}></div>
                                            {report.status}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl hover:text-[var(--primary)] transition-all shadow-md"><Edit size={16} /></button>
                                            <button className="p-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl hover:text-red-500 transition-all shadow-md"><Trash2 size={16} /></button>
                                            <button className="p-3 bg-[var(--primary)] text-white rounded-xl shadow-xl shadow-terracotta/20 outline-none border-none"><Eye size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-black/5 dark:bg-white/5 text-center">
                    <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Show Activity History</button>
                </div>
            </div>
        </div>
    );
};

export default AdminReview;
