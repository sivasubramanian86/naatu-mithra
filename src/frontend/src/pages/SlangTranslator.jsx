import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Share2, History, Languages, MapPin, Info, MessageCircle, Star, Sparkles, Globe } from 'lucide-react';
import { translateSlangAI, parseBilingualResponse } from '../services/aiService';

const SlangTranslator = ({ currentCity }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState({ english: '', native: '' });
    const [isTranslating, setIsTranslating] = useState(false);
    const [isAI, setIsAI] = useState(false);
    const [viewMode, setViewMode] = useState('english');

    const handleTranslate = async () => {
        if (!input.trim()) return;
        setIsTranslating(true);
        setIsAI(false);

        try {
            const aiTranslation = await translateSlangAI(input, currentCity);
            const parsed = parseBilingualResponse(aiTranslation);
            setOutput(parsed);
            setIsAI(true);
            // Default to native if available and city is selected
            if (parsed.native && currentCity !== 'all') {
                setViewMode('native');
            } else {
                setViewMode('english');
            }
        } catch (error) {
            console.warn("AI translation failed, using fallback.");
            setOutput({ english: `That's classic regional slang! It means you're acting with total confidence. 🔥`, native: '' });
            setViewMode('english');
        } finally {
            setIsTranslating(false);
        }
    };

    const handleShare = async () => {
        const title = `Naatu Slang | ${currentCity.toUpperCase()}`;
        const text = `Learned this on Naatu Mithra: "${input}" -> ${viewMode === 'english' ? output.english : output.native}`;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url: window.location.href });
            } catch (err) {
                console.warn("Share failed", err);
            }
        } else {
            const waUrl = `https://wa.me/?text=${encodeURIComponent(title + '\n' + text)}`;
            window.open(waUrl, '_blank');
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[var(--primary)]">
                        <div className="p-2 bg-[var(--primary)]/10 rounded-xl"><Languages size={24} /></div>
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Dialect Decoder</span>
                    </div>
                    <h1 className="text-5xl font-black naatu-font text-[var(--text-primary)]">Slang Translator</h1>
                    <p className="text-[var(--text-secondary)] font-medium max-w-xl opacity-70">
                        Bridge the gap between languages. Master the regional nuances of your city's streets instantly in authentic Naatu style.
                    </p>
                </div>

                <div className="flex items-center gap-4 px-6 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-md">
                    <MapPin size={18} className="text-[var(--accent)]" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black opacity-40">Current Context</span>
                        <span className="text-sm font-black">{currentCity.toUpperCase()} Vibes</span>
                    </div>
                </div>
            </div>

            {/* Translation Bench */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                <div className="glass-card p-10 space-y-8 relative overflow-hidden group border-t-4 border-t-[var(--primary)]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black uppercase tracking-widest text-[var(--text-primary)] opacity-40">Input Phrase</h3>
                        <Info size={16} className="text-[var(--text-secondary)] opacity-30" />
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type anything (e.g., 'Maccha, what's the scene?')"
                        className="w-full bg-black/5 dark:bg-white/5 border-none outline-none p-6 rounded-3xl min-h-[220px] text-xl font-bold placeholder:opacity-20 resize-none text-[var(--text-primary)]"
                    />

                    <button
                        onClick={handleTranslate}
                        disabled={isTranslating || !input.trim()}
                        className="w-full py-5 btn-primary gap-3 text-lg group shadow-xl shadow-terracotta/20"
                    >
                        {isTranslating ? 'Decoding...' : 'Translate to Naatu'}
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="glass-card p-0 relative overflow-hidden flex flex-col justify-between border-t-4 border-t-[var(--secondary)]">
                    <div className="">
                        <div className="flex items-center justify-between px-10 pt-10 pb-6 border-b border-[var(--border-color)]/30">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => setViewMode('english')}
                                    className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${viewMode === 'english' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-secondary)] opacity-40'}`}
                                >
                                    English
                                </button>
                                {output.native && currentCity !== 'all' && (
                                    <button
                                        onClick={() => setViewMode('native')}
                                        className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${viewMode === 'native' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--text-secondary)] opacity-40'}`}
                                    >
                                        Regional
                                    </button>
                                )}
                            </div>
                            {isAI && (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                                    <Sparkles size={10} /> AI Powered
                                </div>
                            )}
                        </div>

                        <div className="p-10">
                            <AnimatePresence mode="wait">
                                {output.english ? (
                                    <motion.div
                                        key={viewMode}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="min-h-[160px] flex items-center"
                                    >
                                        {viewMode === 'english' ? (
                                            <p className="text-2xl font-bold leading-relaxed italic text-[var(--text-primary)]">
                                                "{output.english}"
                                            </p>
                                        ) : (
                                            <p className="text-4xl font-black leading-relaxed text-[var(--primary)] naatu-font">
                                                {output.native}
                                            </p>
                                        )}
                                    </motion.div>
                                ) : (
                                    <div className="min-h-[160px] flex items-center justify-center opacity-30 text-center border-2 border-dashed border-[var(--border-color)] rounded-3xl">
                                        <p className="font-bold text-sm">Translation will appear here.<br />Bilingual results powered by Gemini & Claude.</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="p-10 pt-0">
                        <button
                            onClick={handleShare}
                            className="w-full py-5 bg-[var(--primary)] text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all outline-none border-none"
                        >
                            <Share2 size={20} /> Share Decoding
                        </button>
                    </div>
                </div>
            </div>

            {/* Regional Context */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Origin', value: 'Street Dialect', icon: <MapPin className="text-[var(--primary)]" /> },
                    { label: 'Usage', value: 'Bilingual / Authentic', icon: <Globe className="text-[var(--accent)]" /> },
                    { label: 'Intelligence', value: 'Multi-Model AI', icon: <Sparkles className="text-[var(--secondary)]" /> },
                ].map(item => (
                    <div key={item.label} className="glass-card p-6 flex items-center gap-6">
                        <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl">{item.icon}</div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{item.label}</p>
                            <p className="text-sm font-black text-[var(--text-primary)]">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlangTranslator;
