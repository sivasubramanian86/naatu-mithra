import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Hash, Filter, ChevronRight, Zap, Heart, Sparkles, MapPin, Loader2, X, Globe } from 'lucide-react';
import { matchFoodMoodAI, parseBilingualResponse, getGlobalEquivalentsAI } from '../services/aiService';

const FoodMood = ({ currentCity }) => {
    const moods = [
        { id: 'adventurous', label: 'Adventurous', emoji: '🌶️', color: '#FF4D00' },
        { id: 'comfy', label: 'Cosy & Comfy', emoji: '☕', color: '#6F4E37' },
        { id: 'hurry', label: 'In a Hurry', emoji: '🏃', color: '#00A86B' },
        { id: 'royal', label: 'Royal Feast', emoji: '👑', color: '#8E391F' }
    ];

    const dishes = [
        { id: 'blr_f1', name: 'Benne Dosa', origin: 'Bengaluru', city: 'blr', tags: ['Crispy', 'Butter'], desc: 'The legendary Davangere style butter dosa.', img: '/images/food/benne_dosa.png' },
        { id: 'bom_f1', name: 'Vada Pav', origin: 'Mumbai', city: 'bom', tags: ['Street', 'Spicy'], desc: 'The undisputed king of Mumbai street food.', img: '/images/food/vada_pav.png' },
        { id: 'del_f1', name: 'Chole Bhature', origin: 'Delhi', city: 'del', tags: ['Hearty', 'Spicy'], desc: 'Fluffy bhatures served with spicy chickpea curry.', img: '/images/food/chole_bhature.png' },
        { id: 'maa_f1', name: 'Idli Sambar', origin: 'Chennai', city: 'maa', tags: ['Healthy', 'Morning'], desc: 'Soft steamed rice cakes with drumstick sambar.', img: '/images/food/idli_sambar.png' },
        { id: 'ccu_f1', name: 'Puchka', origin: 'Kolkata', city: 'ccu', tags: ['Tangy', 'Street'], desc: 'Paper-thin shells filled with magic water.', img: '/images/food/puchka.png' },
        { id: 'hyd_f1', name: 'Hyderabadi Biryani', origin: 'Hyderabad', city: 'hyd', tags: ['Royal', 'Aromatic'], desc: 'World famous slow-cooked dum biryani.', img: '/images/food/biryani.png' },
        { id: 'pnq_f1', name: 'Puneri Misal', origin: 'Pune', city: 'pnq', tags: ['Spicy', 'Crunchy'], desc: 'A complex, spicy sprout curry topped with farsan.', img: '/images/food/misal_pav.png' },
        { id: 'amd_f1', name: 'Dhokla', origin: 'Ahmedabad', city: 'amd', tags: ['Light', 'Steamed'], desc: 'Spongy, savory gram flour cakes.', img: '/images/food/dhokla.png' },
        { id: 'jai_f1', name: 'Dal Baati Churma', origin: 'Jaipur', city: 'jai', tags: ['Traditional', 'Rich'], desc: 'The soul of Rajasthan in a single plate.', img: '/images/food/dal_baati_churma.png' },
        { id: 'cok_f1', name: 'Appam with Stew', origin: 'Kochi', city: 'cok', tags: ['Creamy', 'Breakfast'], desc: 'Lacy pancakes served with coconut milk stew.', img: '/images/food/appam_stew.png' },
        { id: 'lko_f1', name: 'Tunday Kabab', origin: 'Lucknow', city: 'lko', tags: ['Royal', 'Legacy'], desc: 'Melt-in-mouth kebabs from the Nawabi era.', img: '/images/food/tunday_kabab.png' },
        { id: 'vns_f1', name: 'Banarasi Paan', origin: 'Varanasi', city: 'vns', tags: ['Divine', 'Herbal'], desc: 'The ultimate culinary ritual of the holy city.', img: '/images/food/banarasi_paan.png' },
        { id: 'atq_f1', name: 'Amritsari Kulcha', origin: 'Amritsar', city: 'atq', tags: ['Butter', 'Crispy'], desc: 'Flaky flatbread baked in traditional tandoors.', img: '/images/food/amritsari_kulcha.png' },
        { id: 'ind_f1', name: 'Poha Jalebi', origin: 'Indore', city: 'ind', tags: ['Zesty', 'Sweet'], desc: 'The cleanest city\'s most colorful breakfast.', img: '/images/food/poha_jalebi.png' },
        { id: 'tny_f1', name: 'Tirunelveli Halwa', origin: 'Tirunelveli', city: 'tny', tags: ['Sweet', 'Iconic'], desc: 'Glistening ghee-rich wheat halwa.', img: '/images/food/tirunelveli_halwa.png' },
        { id: 'cjb_f1', name: 'Annapoorna Sambar', origin: 'Coimbatore', city: 'cjb', tags: ['Heritage', 'Flavor'], desc: 'A unique yellow lentil stew from the West.', img: '/images/food/annapoorna_sambar.png' },
        { id: 'trz_f1', name: 'Srirangam Puliyodharai', origin: 'Trichy', city: 'trz', tags: ['Temple', 'Tangy'], desc: 'Divine tamarind rice from the island temple.', img: '/images/food/puliyodharai.png' },
        { id: 'ixm_f1', name: 'Jigarthanda', origin: 'Madurai', city: 'ixm', tags: ['Cooling', 'Sweet'], desc: 'A heart-cooling drink for the city that never sleeps.', img: '/images/food/jigarthanda.png' },
        { id: 'trv_f1', name: 'Pazhampori', origin: 'Trivandrum', city: 'trv', tags: ['Fried', 'Tropical'], desc: 'Golden banana fritters, a Malayali mood.', img: '/images/food/pazhampori.png' },
        { id: 'ixc_f1', name: 'Paneer Tikka', origin: 'Chandigarh', city: 'ixc', tags: ['Grilled', 'Fresh'], desc: 'Charcoal grilled cottage cheese with Punjabi zest.', img: '/images/food/paneer_tikka.png' },
    ];

    const [activeMood, setActiveMood] = useState('adventurous');
    const [aiResult, setAiResult] = useState({ english: '', native: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const [viewMode, setViewMode] = useState('english');

    // Flavor Mapper State
    const [selectedDishForMap, setSelectedDishForMap] = useState(null);
    const [mappingResult, setMappingResult] = useState({ english: '', native: '' });
    const [isMapping, setIsMapping] = useState(false);
    const [mapViewMode, setMapViewMode] = useState('english');

    const handleAiRecommendation = async () => {
        setIsGenerating(true);
        setAiResult({ english: '', native: '' });
        try {
            const moodLabel = moods.find(m => m.id === activeMood)?.label || activeMood;
            const result = await matchFoodMoodAI(moodLabel, currentCity);
            const parsed = parseBilingualResponse(result);
            setAiResult(parsed);
            if (parsed.native && currentCity !== 'all') {
                setViewMode('native');
            } else {
                setViewMode('english');
            }
        } catch (error) {
            console.error("AI Error:", error);
            setAiResult({ english: "Oops! The flavor brain is taking a nap. Try the local specialties below! 🍛", native: '' });
            setViewMode('english');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleOpenFlavorMap = async (dish) => {
        setSelectedDishForMap(dish);
        setIsMapping(true);
        setMappingResult({ english: '', native: '' });
        try {
            const result = await getGlobalEquivalentsAI(dish.name, dish.city);
            const parsed = parseBilingualResponse(result);
            setMappingResult(parsed);
            if (parsed.native && dish.city !== 'all') {
                setMapViewMode('native');
            } else {
                setMapViewMode('english');
            }
        } catch (error) {
            console.error("Mapping Error:", error);
            setMappingResult({ english: "Oracle is still processing the flavor map. Try again later!", native: '' });
        } finally {
            setIsMapping(false);
        }
    };

    const displayDishes = currentCity === 'all'
        ? dishes
        : dishes.filter(d => d.city === currentCity).length > 0
            ? dishes.filter(d => d.city === currentCity)
            : dishes;

    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-20 relative">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--primary)]">
                        <div className="p-2 bg-[var(--primary)]/10 rounded-xl"><Utensils size={28} /></div>
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Culinary Compass</span>
                    </div>
                    <h1 className="text-7xl font-black naatu-font text-[var(--text-primary)] leading-tight">Food Mood</h1>
                    <p className="text-[var(--text-secondary)] font-medium max-w-2xl text-lg opacity-80">
                        Don't just eat. Experience flavors that match your current soul-state and regional Naatu context.
                    </p>
                </div>

                <div className="flex items-center gap-4 p-2 bg-black/5 dark:bg-white/5 rounded-3xl border border-white/5">
                    <button className="px-8 py-4 bg-white dark:bg-zinc-800 text-[var(--text-primary)] rounded-2xl shadow-xl text-xs font-black uppercase tracking-widest">Local Guide</button>
                    <button className="px-8 py-4 text-[var(--text-secondary)] text-xs font-black uppercase tracking-widest hover:text-[var(--primary)] transition-colors">Dietary Mix</button>
                </div>
            </div>

            {/* Mood Selector - Sleeker Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {moods.map((mood) => (
                    <motion.button
                        key={mood.id}
                        onClick={() => setActiveMood(mood.id)}
                        whileHover={{ y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative p-10 rounded-[40px] flex flex-col items-center justify-center gap-6 text-center transition-all duration-500 overflow-hidden ${activeMood === mood.id
                            ? 'bg-[var(--card-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-none'
                            : 'bg-black/5 dark:bg-white/5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                            }`}
                    >
                        {activeMood === mood.id && (
                            <motion.div
                                layoutId="mood-glow"
                                className="absolute inset-0 z-0 opacity-10"
                                style={{ backgroundColor: mood.color }}
                            />
                        )}
                        <span className="text-6xl relative z-10">{mood.emoji}</span>
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-primary)] relative z-10">{mood.label}</h3>
                    </motion.button>
                ))}
            </div>

            {/* AI Experience Section */}
            <div className="relative">
                {!aiResult.english && (
                    <div className="glass-card p-12 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] border-none rounded-[60px] flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-3xl">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-[100px]"></div>

                        <div className="relative z-10 space-y-6 max-w-2xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                <Zap size={16} className="text-white" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Neural Flavor Mapping</span>
                            </div>
                            <h2 className="text-5xl font-black text-white naatu-font leading-tight">Can't decide? Let AI decode your Naatu craving.</h2>
                            <p className="text-white/70 text-lg font-medium">Bilingual recommendations from Gemini, Claude, and Bedrock agents for {currentCity.toUpperCase()}.</p>
                        </div>

                        <button
                            onClick={handleAiRecommendation}
                            disabled={isGenerating}
                            className="relative z-10 group bg-white text-black px-12 py-6 rounded-[32px] font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>Decoding vibe... <Sparkles size={20} className="animate-spin" /></>
                            ) : (
                                <>Consult the Food Oracle <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {aiResult.english && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="glass-card p-0 border-none shadow-4xl bg-[var(--card-bg)] overflow-hidden relative rounded-[56px]"
                        >
                            <div className="absolute top-0 left-0 w-3 h-full bg-[var(--primary)]"></div>

                            {/* Tab Switcher Header */}
                            <div className="flex justify-between items-center px-12 pt-12 pb-8 border-b border-[var(--border-color)]/20">
                                <div className="flex items-center gap-8">
                                    <button
                                        onClick={() => setViewMode('english')}
                                        className={`flex flex-col items-start gap-1 pb-4 border-b-4 transition-all ${viewMode === 'english' ? 'border-[var(--primary)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Narrative</span>
                                        <span className={`text-sm font-black ${viewMode === 'english' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>English Explorer</span>
                                    </button>

                                    {aiResult.native && currentCity !== 'all' && (
                                        <button
                                            onClick={() => setViewMode('native')}
                                            className={`flex flex-col items-start gap-1 pb-4 border-b-4 transition-all ${viewMode === 'native' ? 'border-[var(--primary)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">Authentic</span>
                                            <span className={`text-sm font-black flex items-center gap-2 ${viewMode === 'native' ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}>
                                                <Globe size={14} /> Regional Script
                                            </span>
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={() => setAiResult({ english: '', native: '' })}
                                    className="p-4 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-12">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={viewMode}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="min-h-[200px]"
                                    >
                                        {viewMode === 'english' ? (
                                            <div className="space-y-6">
                                                <div className="p-4 bg-[var(--primary)]/5 inline-flex items-center gap-3 rounded-2xl text-[var(--primary)]">
                                                    <Sparkles size={20} />
                                                    <span className="text-xs font-black uppercase tracking-widest">Bilingual Food Oracle</span>
                                                </div>
                                                <p className="text-4xl font-black text-[var(--text-primary)] naatu-font leading-[1.4]">
                                                    "{aiResult.english}"
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-8 flex flex-col justify-center">
                                                <div className="flex items-center gap-3 text-[var(--primary)]">
                                                    <Globe size={24} />
                                                    <span className="text-lg font-black uppercase tracking-widest naatu-font">Native Flavor Profile</span>
                                                </div>
                                                <p className="text-6xl font-black text-[var(--primary)] leading-relaxed naatu-font">
                                                    {aiResult.native}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                <div className="mt-12 flex flex-wrap gap-4 pt-10 border-t border-[var(--border-color)]/20">
                                    <button className="btn-primary px-10 py-5">Order Authentic {activeMood.toUpperCase()} Feast</button>
                                    <button className="px-10 py-5 text-xs font-black uppercase tracking-widest border border-[var(--border-color)] rounded-[24px] hover:bg-[var(--border-color)] transition-colors">Bookmark Dish</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Recommendation Grid */}
            <div className="space-y-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h3 className="text-3xl font-black naatu-font text-[var(--text-primary)] whitespace-nowrap">Explore Local Staples</h3>
                        <div className="h-px w-64 bg-gradient-to-r from-[var(--border-color)] to-transparent opacity-30"></div>
                    </div>
                    <div className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                        <Sparkles size={12} /> Click Card for Global Flavor Map
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {displayDishes.map((dish, i) => (
                        <motion.button
                            key={dish.id}
                            onClick={() => handleOpenFlavorMap(dish)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card group flex flex-col w-full text-left border-none shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 rounded-[48px] overflow-hidden"
                        >
                            <div className="h-72 relative overflow-hidden pointer-events-none">
                                <img
                                    src={dish.img}
                                    alt={dish.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="absolute top-6 left-6 px-5 py-2.5 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={12} className="text-[var(--primary)]" /> {dish.origin}
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-grow space-y-6">
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        {dish.tags.map(t => (
                                            <span key={t} className="text-[9px] font-black uppercase tracking-widest text-[var(--primary)] opacity-80">{t}</span>
                                        ))}
                                    </div>
                                    <h4 className="text-3xl font-black text-[var(--text-primary)] leading-tight">{dish.name}</h4>
                                    <p className="text-[var(--text-secondary)] font-medium text-sm leading-relaxed opacity-60">{dish.desc}</p>
                                </div>

                                <div className="mt-auto pt-6 flex items-center justify-between">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                        Flavor Map <Globe size={14} className="group-hover:rotate-12 transition-transform" />
                                    </div>
                                    <Sparkles size={16} className="text-[var(--primary)] opacity-40 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Flavor Mapper Slide-over/Modal */}
            <AnimatePresence>
                {selectedDishForMap && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDishForMap(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[var(--card-bg)] border-l border-[var(--border-color)] z-[101] shadow-5xl p-0 flex flex-col"
                        >
                            <div className="p-12 flex justify-between items-center border-b border-[var(--border-color)]/20">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">Global Brainstorm</span>
                                    <h3 className="text-4xl font-black naatu-font text-[var(--text-primary)]">{selectedDishForMap.name}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedDishForMap(null)}
                                    className="p-4 bg-black/5 dark:bg-white/5 rounded-full hover:rotate-90 transition-transform duration-300"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
                                <div className="space-y-12">
                                    {/* Image and Header */}
                                    <div className="h-64 rounded-[40px] overflow-hidden shadow-2xl relative">
                                        <img src={selectedDishForMap.img} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-8 left-8 flex items-center gap-3">
                                            <div className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl">Local Soul</div>
                                            <div className="px-5 py-2.5 bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Global Core</div>
                                        </div>
                                    </div>

                                    {/* AI Comparison Content */}
                                    <div className="glass-card p-0 border-none bg-black/5 dark:bg-white/5 overflow-hidden">
                                        <div className="flex bg-black/5 p-2">
                                            <button
                                                onClick={() => setMapViewMode('english')}
                                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${mapViewMode === 'english' ? 'bg-white dark:bg-zinc-800 shadow-md text-[var(--primary)]' : 'opacity-40'}`}
                                            >
                                                Mental Model
                                            </button>
                                            <button
                                                onClick={() => setMapViewMode('native')}
                                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${mapViewMode === 'native' ? 'bg-white dark:bg-zinc-800 shadow-md text-[var(--primary)]' : 'opacity-40'}`}
                                            >
                                                Regional Pulse
                                            </button>
                                        </div>

                                        <div className="p-10 min-h-[300px] flex flex-col justify-center text-center">
                                            {isMapping ? (
                                                <div className="flex flex-col items-center gap-6 opacity-30">
                                                    <Loader2 size={48} className="animate-spin text-[var(--primary)]" />
                                                    <p className="text-sm font-black uppercase tracking-[0.3em]">Synapsing Global Flavors...</p>
                                                </div>
                                            ) : (
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={mapViewMode}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="space-y-8"
                                                    >
                                                        {mapViewMode === 'english' ? (
                                                            <div className="space-y-6">
                                                                <div className="inline-flex py-2 px-6 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-[10px] font-black uppercase tracking-widest">Global Decoding</div>
                                                                <p className="text-2xl font-bold italic leading-relaxed text-[var(--text-primary)]">
                                                                    "{mappingResult.english}"
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-6">
                                                                <div className="inline-flex py-2 px-6 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-full text-[10px] font-black uppercase tracking-widest">Native Nuance</div>
                                                                <p className="text-5xl font-black leading-relaxed naatu-font text-[var(--secondary)]">
                                                                    {mappingResult.native}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </AnimatePresence>
                                            )}
                                        </div>
                                    </div>

                                    {/* Comparison Visualizer Placeholder */}
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">Cross-City Comparison</h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-6 bg-black/5 dark:bg-white/5 rounded-3xl space-y-3">
                                                <div className="text-[9px] font-black uppercase opacity-30">Current Version</div>
                                                <div className="text-lg font-black">{selectedDishForMap.origin} Style</div>
                                                <p className="text-xs opacity-50 font-medium">Authentic local prep with specific regional spice mix.</p>
                                            </div>
                                            <div className="p-6 bg-[var(--primary)]/5 border border-[var(--primary)]/10 rounded-3xl space-y-3">
                                                <div className="text-[9px] font-black uppercase text-[var(--primary)] opacity-60">Global Twist</div>
                                                <div className="text-lg font-black text-[var(--primary)]">Fusion Equivalent</div>
                                                <p className="text-xs opacity-50 font-medium italic">"Think of it as a localized street-gourmet burger."</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-12 bg-black/5 border-t border-[var(--border-color)]/20">
                                <button className="w-full py-5 bg-[var(--primary)] text-white font-black text-sm uppercase tracking-[0.3em] rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
                                    Add to Taste Bucket List
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FoodMood;
