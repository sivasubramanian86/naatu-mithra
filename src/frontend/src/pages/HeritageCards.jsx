import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Share2, Download, Zap, Sparkles, ChevronLeft, ChevronRight, Star, History, Globe } from 'lucide-react';
import { getHeritageInsightAI } from '../services/aiService';

const HeritageCards = ({ currentCity }) => {
    const allCards = [
        { id: 'blr_h1', city: 'blr', title: 'Vidhana Soudha', fact: 'The largest legislative building in India, built in Neo-Dravidian style.', img: '/images/bangalore.png' },
        { id: 'bom_h1', city: 'bom', title: 'Gateway of India', fact: 'Built to welcome King George V in 1911, it stands as Mumbai\'s iconic sentinel.', img: '/images/mumbai.png' },
        { id: 'del_h1', city: 'del', title: 'India Gate', fact: 'A war memorial commemorating soldiers of the British Indian Army.', img: '/images/delhi.png' },
        { id: 'maa_h1', city: 'maa', title: 'Kapaleeshwarar Temple', fact: 'A 7th-century masterpiece dedicated to Lord Shiva in Mylapore.', img: '/images/chennai.png' },
        { id: 'ccu_h1', city: 'ccu', title: 'Victoria Memorial', fact: 'A massive marble building dedicated to the memory of Queen Victoria.', img: '/images/kolkata.png' },
        { id: 'hyd_h1', city: 'hyd', title: 'Charminar', fact: 'Built in 1591 to commemorate the end of a plague.', img: '/images/hyderabad.png' },
        { id: 'pnq_h1', city: 'pnq', title: 'Shaniwar Wada', fact: 'The seat of the Peshwas of the Maratha Empire until 1818.', img: '/images/pune.png' },
        { id: 'amd_h1', city: 'amd', title: 'Adalaj Stepwell', fact: 'A unique five-story deep architectural marvel built in 1498.', img: '/images/ahmedabad.png' },
        { id: 'jai_h1', city: 'jai', title: 'Hawa Mahal', fact: 'Built so royal women could observe street festivals without being seen.', img: '/images/jaipur.png' },
        { id: 'cok_h1', city: 'cok', title: 'Chinese Fishing Nets', fact: 'Believe to be introduced by traders from the court of Kublai Khan.', img: '/images/kochi.png' },
        { id: 'lko_h1', city: 'lko', title: 'Bara Imambara', fact: 'Its central hall is the largest arched hall in the world without any pillars.', img: '/images/lucknow.png' },
        { id: 'vns_h1', city: 'vns', title: 'Kashi Vishwanath', fact: 'One of the twelve Jyotirlingas, the holiest of Shiva temples.', img: '/images/varanasi.png' },
        { id: 'ixc_h1', city: 'ixc', title: 'Rock Garden', fact: 'Created entirely from industrial and home waste by Nek Chand.', img: '/images/chandigarh.png' },
        { id: 'atq_h1', city: 'atq', title: 'Golden Temple', fact: 'Over 100,000 people eat at its community kitchen (Langar) every day.', img: '/images/amritsar.png' },
        { id: 'ind_h1', city: 'ind', title: 'Rajwada Palace', fact: 'A 200-year-old seven-story palace of the Holkars.', img: '/images/indore.png' },
        { id: 'tny_h1', city: 'tny', title: 'Nellaiappar Temple', fact: 'One of the largest Shiva temples in Tamil Nadu, dating back to 700 AD.', img: '/images/tirunelveli.png' },
        { id: 'cjb_h1', city: 'cjb', title: 'Marudhamalai', fact: 'An ancient hill temple dedicated to Lord Murugan, with a history of 1200 years.', img: '/images/coimbatore.png' },
        { id: 'trz_h1', city: 'trz', title: 'Rockfort', fact: 'The temple is built on an 83m high ancient rock that is older than the Himalayas.', img: '/images/trichy.png' },
        { id: 'ixm_h1', city: 'ixm', title: 'Meenakshi Amman', fact: 'Features 14 gopurams (gateway towers) covered in thousands of colorful stone figures.', img: '/images/madurai.png' },
        { id: 'trv_h1', city: 'trv', title: 'Padmanabhaswamy', fact: 'Often cited as the wealthiest place of worship in the world.', img: '/images/trivandrum.png' },
        { id: 'srt_h1', city: 'srt', title: 'Dumas Beach', fact: 'A popular urban beach in Surat known for its black sand.', img: '/images/surat.png' },
        { id: 'nag_h1', city: 'nag', title: 'Deekshabhoomi', fact: 'A sacred monument of Buddhism where Dr. Ambedkar converted.', img: '/images/nagpur.png' },
        { id: 'vtz_h1', city: 'vtz', title: 'INS Kursura Submarine Museum', fact: 'A real decommissioned submarine turned into a museum on the beach.', img: '/images/vizag.png' },
        { id: 'pat_h1', city: 'pat', title: 'Golghar', fact: 'A massive granary with a unique beehive-shaped structure.', img: '/images/patna.png' },
        { id: 'bho_h1', city: 'bho', title: 'Sanchi Stupa', fact: 'One of the oldest stone structures in India, located near Bhopal.', img: '/images/bhopal.png' },
        { id: 'thn_h1', city: 'thn', title: 'Upvan Lake', fact: 'A serene lake in Thane known for its cultural festivals.', img: '/images/thane.png' },
        { id: 'luh_h1', city: 'luh', title: 'Clock Tower', fact: 'An iconic landmark in the heart of Ludhiana.', img: '/images/ludhiana.png' },
        { id: 'agr_h1', city: 'agr', title: 'Taj Mahal', fact: 'The legendary ivory-white marble mausoleum on the banks of Yamuna.', img: '/images/agra.png' },
        { id: 'nsk_h1', city: 'nsk', title: 'Panchavati', fact: 'A holy site on the banks of Godavari, central to the Ramayana.', img: '/images/nashik.png' },
        { id: 'fdb_h1', city: 'fdb', title: 'Surajkund', fact: 'An ancient reservoir and site of the famous international craft mela.', img: '/images/faridabad.png' },
    ];

    const cards = currentCity === 'all'
        ? allCards
        : allCards.filter(c => c.city === currentCity).length > 0
            ? allCards.filter(c => c.city === currentCity)
            : allCards;

    const [activeIndex, setActiveIndex] = useState(0);
    const [neuralLegend, setNeuralLegend] = useState({ english: '', native: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        setNeuralLegend({ english: '', native: '' });
    }, [currentCity, activeIndex]);

    useEffect(() => {
        setActiveIndex(0);
    }, [currentCity]);

    const parseBilingualResponse = (text) => {
        const englishPart = text.match(/\[English\]:\s*([\s\S]*?)(?=\[|$)/i)?.[1]?.trim() || '';
        const nativePart = text.match(/\[([^\]]+)\]:\s*([\s\S]*?)$/i)?.[2]?.trim() || '';
        return { english: englishPart || text, native: nativePart };
    };

    const handleGenerateNeuralLegend = async () => {
        setIsGenerating(true);
        try {
            const rawInsight = await getHeritageInsightAI(cards[activeIndex].title, currentCity);
            const parsed = parseBilingualResponse(rawInsight);
            setNeuralLegend(parsed);
        } catch (error) {
            console.error("Neural Legend generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleShare = async () => {
        const title = `Naatu Mithra | ${cards[activeIndex].title}`;
        const text = `${cards[activeIndex].fact}\n\nLegend: ${neuralLegend.english || 'Unlock deep-dive legends on Naatu Mithra!'}`;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url: window.location.href });
            } catch (err) {
                console.warn("Share failed", err);
            }
        } else {
            // Fallback to WhatsApp
            const waUrl = `https://wa.me/?text=${encodeURIComponent(title + '\n' + text)}`;
            window.open(waUrl, '_blank');
        }
    };

    const handleDownload = () => {
        // Simple download fallback: Open image in new tab or trigger system print
        // For actual image capture, we'd normally use html2canvas if available.
        window.print();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 h-full flex flex-col pt-4">
            {/* Page Header Redesign */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[var(--primary)]">
                        <div className="p-2 bg-[var(--primary)]/10 rounded-xl"><Globe size={24} /></div>
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Cultural Ledger</span>
                    </div>
                    <h1 className="text-5xl font-black naatu-font text-[var(--text-primary)]">Heritage Cards</h1>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        onClick={handleGenerateNeuralLegend}
                        disabled={isGenerating}
                        className={`group flex items-center gap-4 px-8 py-4 rounded-full border-2 transition-all duration-500 shadow-xl ${isGenerating ? 'border-[var(--secondary)] bg-[var(--secondary)]/5 animate-pulse' : 'border-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white'}`}
                    >
                        <Sparkles size={20} className={isGenerating ? 'animate-spin' : 'group-hover:scale-125 transition-transform'} />
                        <span className="text-sm font-black uppercase tracking-widest">
                            {isGenerating ? 'Consulting Ancestors...' : 'Unlock City Secrets'}
                        </span>
                    </button>
                    <div className="px-6 py-4 bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3">
                        <Star size={16} className="text-yellow-500" fill="currentColor" /> Collectors: v5.2
                    </div>
                </div>
            </div>

            {/* Cinematic Card Swiper */}
            <div className="flex-grow relative flex items-center justify-center py-6 min-h-[700px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        ref={cardRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="relative w-full max-w-2xl aspect-[3/4.2] rounded-[56px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/20 group"
                    >
                        <img
                            src={cards[activeIndex].img}
                            alt={cards[activeIndex].title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                        {/* Top Badge */}
                        <div className="absolute top-10 left-10 flex items-center gap-3 p-3 bg-black/30 backdrop-blur-2xl rounded-2xl border border-white/10 text-white/80">
                            <Zap size={20} className="text-[var(--primary)]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{currentCity.toUpperCase()} RARE CARD</span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-12 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-6xl font-black text-white naatu-font leading-none">{cards[activeIndex].title}</h2>
                                <div className="h-1 w-24 bg-[var(--primary)] rounded-full"></div>
                            </div>

                            <div className="space-y-6">
                                <AnimatePresence mode="wait">
                                    {neuralLegend.english ? (
                                        <motion.div
                                            key="neural-view"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black uppercase text-[var(--secondary)] tracking-[0.3em]">Neural Legend</span>
                                                <p className="text-2xl text-white font-bold leading-relaxed italic">
                                                    "{neuralLegend.english}"
                                                </p>
                                            </div>

                                            {neuralLegend.native && (
                                                <div className="pt-4 border-t border-white/10">
                                                    <span className="text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.3em] opacity-60">Regional Roots</span>
                                                    <p className="text-3xl text-[var(--primary)] font-black leading-relaxed mt-2 naatu-font">
                                                        {neuralLegend.native}
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="static-fact"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-2"
                                        >
                                            <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.3em]">Quick Fact</span>
                                            <p className="text-xl text-white/90 font-medium leading-relaxed max-w-lg">
                                                "{cards[activeIndex].fact}"
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleShare}
                                    className="flex-grow py-5 bg-[var(--primary)] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all border-none"
                                >
                                    <Share2 size={18} /> Share Legend
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="p-5 bg-white/10 backdrop-blur-3xl text-white rounded-3xl border border-white/20 hover:bg-white hover:text-black transition-all active:scale-90"
                                >
                                    <Download size={22} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Swiper Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 lg:px-0 lg:-mx-24 pointer-events-none">
                    <button
                        onClick={() => setActiveIndex((i) => (i > 0 ? i - 1 : cards.length - 1))}
                        className="p-8 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all text-[var(--text-primary)] pointer-events-auto backdrop-blur-xl"
                    >
                        <ChevronLeft size={36} />
                    </button>
                    <button
                        onClick={() => setActiveIndex((i) => (i < cards.length - 1 ? i + 1 : 0))}
                        className="p-8 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all text-[var(--text-primary)] pointer-events-auto backdrop-blur-xl"
                    >
                        <ChevronRight size={36} />
                    </button>
                </div>
            </div>

            {/* Pagination Grid */}
            <div className="flex justify-center flex-wrap gap-4 pb-12">
                {cards.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${activeIndex === i ? 'w-12 bg-[var(--primary)]' : 'w-2.5 bg-[var(--border-color)] opacity-30 hover:opacity-100'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeritageCards;
