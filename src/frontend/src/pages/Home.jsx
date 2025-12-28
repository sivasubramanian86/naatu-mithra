import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Shield, Zap, Globe, Compass, Star } from 'lucide-react';
import { cities } from '../data/cities';

const Home = ({ setActivePage, setCity }) => {

    const stats = [
        { label: 'Cities', value: '20+', icon: <Globe className="text-[var(--primary)]" /> },
        { label: 'Slangs', value: '2000+', icon: <Zap className="text-[var(--secondary)]" /> },
        { label: 'Dishes', value: '1000+', icon: <Sparkles className="text-[var(--accent)]" /> },
    ];

    return (
        <div className="space-y-16">
            {/* Cinematic Hero */}
            <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-1 lg:p-1.5 shadow-2xl shadow-terracotta/20">
                <div className="relative bg-[var(--body-bg)] rounded-[38px] p-12 lg:p-20 overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 blur-[120px] rounded-full -mr-20 -mt-20 shrink-0"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent)]/5 blur-[120px] rounded-full -ml-20 -mb-20 shrink-0"></div>

                    <div className="relative z-10 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 ring-1 ring-[var(--primary)]/20 shadow-sm"
                        >
                            <Star size={12} />
                            Ancient Roots, Modern Vibes
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-8xl font-black naatu-font leading-[0.9] text-[var(--text-primary)] mb-8"
                        >
                            Discover the <span className="text-gradient-naatu">Naatu</span> Spirit
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl leading-relaxed font-medium"
                        >
                            Explore the soulful essence of local India. From hidden food joints to secret alleys, NaatuMithra is your companion in decoding the city's pulse.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6"
                        >
                            <button
                                onClick={() => setActivePage('slang')}
                                className="btn-primary gap-3 text-lg px-px-10 py-5"
                            >
                                Start Exploring <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>

                    {/* Stat Badges */}
                    <div className="absolute right-20 bottom-20 hidden 2xl:flex gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="glass-card p-8 min-w-[160px] text-center"
                            >
                                <div className="flex justify-center mb-4">{stat.icon}</div>
                                <p className="text-3xl font-black mb-1 text-[var(--text-primary)]">{stat.value}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cultural Hubs Carousel */}
            <section className="space-y-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black naatu-font text-[var(--text-primary)]">City Hubs</h2>
                        <p className="text-[var(--text-secondary)] font-bold opacity-60">Authentic regional experiences across 10 major cities.</p>
                    </div>
                    <button className="text-[var(--primary)] font-black text-sm uppercase tracking-widest hover:underline">All Hubs</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {cities.map((city, i) => (
                        <motion.div
                            key={city.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-[450px] rounded-[32px] overflow-hidden shadow-2xl cursor-pointer"
                        >
                            <img
                                src={city.img}
                                alt={city.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                            <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                                {city.tag}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                                <h3 className="text-3xl font-black text-white mb-2 naatu-font">{city.name}</h3>
                                <p className="text-white/70 text-sm font-medium mb-6 line-clamp-2">{city.desc}</p>
                                <button
                                    onClick={() => { setCity(city.id); setActivePage('slang'); }}
                                    className="w-full py-4 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest transition-all hover:bg-[var(--primary)] hover:text-white border-none outline-none"
                                >
                                    Explore City
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Multi-Cloud Trust */}
            <section className="glass-card p-12 lg:p-20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] opacity-50"></div>
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black naatu-font text-[var(--text-primary)]">Secured by Indian Innovation</h2>
                        <p className="text-lg text-[var(--text-secondary)] font-medium max-w-2xl mx-auto opacity-70">
                            Harnessing the power of Multi-Cloud AI (Bedrock & Vertex) to deliver safe, relevant, and hyper-local insights.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-2xl"><Globe className="text-blue-600" /></div>
                            <span className="text-2xl font-black tracking-tighter">Scalable GCP</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-2xl"><Shield className="text-orange-600" /></div>
                            <span className="text-2xl font-black tracking-tighter">Robust AWS</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-2xl"><Compass className="text-green-600" /></div>
                            <span className="text-2xl font-black tracking-tighter">Naatu AI Engine</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
