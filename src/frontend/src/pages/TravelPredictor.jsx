import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictTravelChaosAI, parseBilingualResponse } from '../services/aiService';
import { Sparkles, MapPin, Search, Navigation, Heart, Shield, Wind, ArrowRight, Compass, Globe, X } from 'lucide-react';

const TravelPredictor = ({ currentCity }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [mission, setMission] = useState('Minimal Chaos');
    const [oracleResult, setOracleResult] = useState({ english: '', native: '' });
    const [isCalculating, setIsCalculating] = useState(false);
    const [viewMode, setViewMode] = useState('english');

    const handleCalculateKarma = async () => {
        if (!origin || !destination) return;
        setIsCalculating(true);
        setOracleResult({ english: '', native: '' });
        try {
            const result = await predictTravelChaosAI(origin, destination, mission, currentCity);
            const parsed = parseBilingualResponse(result);
            setOracleResult(parsed);
            // Default to native if available and city is selected
            if (parsed.native && currentCity !== 'all') {
                setViewMode('native');
            } else {
                setViewMode('english');
            }
        } catch (error) {
            console.error("Traffic Oracle failed", error);
            setOracleResult({ english: "The Traffic Oracle is momentarily blinded by smog. Proceed with caution!", native: '' });
            setViewMode('english');
        } finally {
            setIsCalculating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[var(--primary)]">
                        <div className="p-2 bg-[var(--primary)]/10 rounded-xl"><Navigation size={24} /></div>
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Traffic Oracle</span>
                    </div>
                    <h1 className="text-5xl font-black naatu-font text-[var(--text-primary)]">Travel Predictor</h1>
                    <p className="text-[var(--text-secondary)] font-medium max-w-xl opacity-70">
                        Predict regional travel chaos before it happens. Get routes optimized for Karma, health, and local vibes in Naatu style.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Search Panel */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-10 relative overflow-hidden border-l-4 border-l-[var(--primary)]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40 ml-2">Start Point</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] transition-transform group-focus-within:scale-125" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Current location"
                                            className="input-naatu pl-12"
                                            value={origin}
                                            onChange={(e) => setOrigin(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40 ml-2">End Point</label>
                                    <div className="relative group">
                                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--secondary)] transition-transform group-focus-within:scale-125" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Where to, chief?"
                                            className="input-naatu pl-12"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-black text-[var(--text-primary)] mb-4">Travel Mission</p>
                                <div className="flex flex-wrap gap-4">
                                    {['Aesthetic Route', 'Fastest Path', 'Minimal Chaos', 'Healthy Air'].map(pref => (
                                        <button
                                            key={pref}
                                            onClick={() => setMission(pref)}
                                            className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${mission === pref ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/5' : 'border-[var(--border-color)] bg-[var(--body-bg)] text-[var(--text-primary)] hover:border-[var(--primary)]/50'}`}
                                        >
                                            {pref}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleCalculateKarma}
                                disabled={isCalculating || !origin || !destination}
                                className="w-full py-5 btn-primary gap-3 text-lg shadow-xl shadow-terracotta/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCalculating ? 'Consulting Oracle...' : 'Calculate Road Karma'}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Prediction Display Area */}
                    <div className="min-h-[440px] glass-card overflow-hidden relative group p-0 flex flex-col">
                        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 -z-10"></div>
                        <AnimatePresence mode="wait">
                            {oracleResult.english ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col h-full w-full"
                                >
                                    {/* Result Tab Header */}
                                    <div className="flex justify-between items-center px-10 pt-10 pb-6 border-b border-[var(--border-color)]/30">
                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={() => setViewMode('english')}
                                                className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${viewMode === 'english' ? 'border-[var(--secondary)] text-[var(--secondary)]' : 'border-transparent text-[var(--text-secondary)] opacity-40'}`}
                                            >
                                                Forecasting
                                            </button>
                                            {oracleResult.native && currentCity !== 'all' && (
                                                <button
                                                    onClick={() => setViewMode('native')}
                                                    className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${viewMode === 'native' ? 'border-[var(--secondary)] text-[var(--secondary)]' : 'border-transparent text-[var(--text-secondary)] opacity-40'}`}
                                                >
                                                    Regional Warn
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setOracleResult({ english: '', native: '' })}
                                            className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <div className="p-10 flex-grow flex flex-col justify-center">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={viewMode}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-6"
                                            >
                                                {viewMode === 'english' ? (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-3 text-[var(--secondary)]">
                                                            <Sparkles size={24} className="animate-pulse" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Neural Forecast Decoded</span>
                                                        </div>
                                                        <p className="text-2xl font-bold italic leading-relaxed text-[var(--text-primary)]">
                                                            "{oracleResult.english}"
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2 mb-2 text-[var(--primary)]">
                                                            <Globe size={18} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Regional Ground Truth</span>
                                                        </div>
                                                        <p className="text-4xl font-black leading-relaxed text-[var(--primary)] naatu-font">
                                                            {oracleResult.native}
                                                        </p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <div className="px-10 py-8 border-t border-[var(--border-color)]/30 flex justify-between items-center bg-black/5">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Route Confidence: 94%</p>
                                        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--secondary)] flex items-center gap-2 group">
                                            Share Forecast <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center space-y-6 text-center p-12 w-full h-full"
                                >
                                    <Compass size={64} className={`text-[var(--primary)] opacity-20 ${isCalculating ? 'animate-spin' : 'animate-spin-slow'}`} />
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black naatu-font text-[var(--text-primary)]">Regional Intelligence Map</h3>
                                        <p className="text-sm text-[var(--text-secondary)] opacity-60 max-w-sm">
                                            {isCalculating ? 'Scanning local traffic clusters...' : `Visualizing traffic clusters and local events in ${currentCity.toUpperCase()}.`}
                                        </p>
                                    </div>
                                    {!isCalculating && (
                                        <button className="btn-primary text-[10px] px-8 py-4 bg-[var(--accent)] hover:brightness-110 uppercase tracking-widest">Activate Live Tracking</button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Sidebar Stats */}
                <div className="space-y-8">
                    <div className="glass-card p-10 bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/80 text-white border-none shadow-2xl">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-white/10 rounded-2xl"><Shield size={24} /></div>
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-widest">Route Karma</h3>
                                <p className="text-[10px] opacity-60 font-bold uppercase">Safety & Health</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm font-black">
                                    <span>Air Quality</span>
                                    <span className="text-[var(--secondary)]">Good</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[var(--secondary)] w-[85%]"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm font-black">
                                    <span>Mental Peace</span>
                                    <span className="text-green-300">Stable</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-400 w-[92%]"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm font-black">
                                    <span>Traffic Vibe</span>
                                    <span className="text-white/60">Heavy</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/30 w-[40%]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white/10 rounded-3xl text-center space-y-2">
                            <p className="text-4xl font-black">{oracleResult.english ? (Math.random() * 2 + 7).toFixed(1) : '8.4'}</p>
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-50">Local Scorecard</p>
                        </div>
                    </div>

                    <div className="glass-card p-8 flex items-start gap-4">
                        <div className="p-3 bg-[var(--accent)]/10 rounded-xl shrink-0"><Wind size={20} className="text-[var(--accent)]" /></div>
                        <div>
                            <p className="text-sm font-black mb-1 text-[var(--text-primary)]">Low Carbon Path</p>
                            <p className="text-xs text-[var(--text-secondary)] opacity-60">Switch to EV or Cycle to gain +50 Karma points.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelPredictor;
