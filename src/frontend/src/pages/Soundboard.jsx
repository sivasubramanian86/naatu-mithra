import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Share2, Volume2, MapPin, Heart, Info, Headphones } from 'lucide-react';

const Soundboard = ({ currentCity }) => {
    const allSounds = [
        { id: 'blr_01', title: 'Filter Coffee Sizzle', city: 'blr', cityName: 'Bengaluru', context: 'Morning ritual', duration: '0:05', path: '/sounds/blr_01.mp3' },
        { id: 'blr_02', title: 'Traffic Honks', city: 'blr', cityName: 'Bengaluru', context: 'Silk Board Vibes', duration: '0:08', path: '/sounds/blr_02.mp3' },
        { id: 'blr_03', title: 'Garden Rustle', city: 'blr', cityName: 'Bengaluru', context: 'Cubbon Park', duration: '0:04', path: '/sounds/blr_03.mp3' },

        { id: 'bom_01', title: 'Local Train Whistle', city: 'bom', cityName: 'Mumbai', context: 'City pulse', duration: '0:03', path: '/sounds/bom_01.mp3' },
        { id: 'bom_02', title: 'Sea Waves', city: 'bom', cityName: 'Mumbai', context: 'Marine Drive', duration: '0:06', path: '/sounds/bom_02.mp3' },
        { id: 'bom_03', title: 'Cutting Chai Clink', city: 'bom', cityName: 'Mumbai', context: 'Evening ritual', duration: '0:02', path: '/sounds/bom_03.mp3' },

        { id: 'del_01', title: 'Metro Door Chime', city: 'del', cityName: 'Delhi', context: 'Commute', duration: '0:04', path: '/sounds/del_01.mp3' },
        { id: 'del_02', title: 'Street Food Sizzle', city: 'del', cityName: 'Delhi', context: 'Chandni Chowk', duration: '0:05', path: '/sounds/del_02.mp3' },
        { id: 'del_03', title: 'Rickshaw Bell', city: 'del', cityName: 'Delhi', context: 'Old Delhi', duration: '0:02', path: '/sounds/del_03.mp3' },

        { id: 'maa_01', title: 'Marina Beach Waves', city: 'maa', cityName: 'Chennai', context: 'Nature', duration: '0:06', path: '/sounds/maa_01.mp3' },
        { id: 'maa_02', title: 'Temple Bell', city: 'maa', cityName: 'Chennai', context: 'Mylapore', duration: '0:03', path: '/sounds/maa_02.mp3' },
        { id: 'maa_03', title: 'Carnatic Alaap', city: 'maa', cityName: 'Chennai', context: 'Sabha Vibe', duration: '0:10', path: '/sounds/maa_03.mp3' },

        { id: 'ccu_01', title: 'Puchka Seller Call', city: 'ccu', cityName: 'Kolkata', context: 'Street Food', duration: '0:05', path: '/sounds/ccu_01.mp3' },
        { id: 'ccu_02', title: 'Tram Bell', city: 'ccu', cityName: 'Kolkata', context: 'Heritage', duration: '0:03', path: '/sounds/ccu_02.mp3' },
        { id: 'ccu_03', title: 'Baul Song', city: 'ccu', cityName: 'Kolkata', context: 'Folk Soul', duration: '0:12', path: '/sounds/ccu_03.mp3' },

        { id: 'hyd_01', title: 'Irani Chai Aroma', city: 'hyd', cityName: 'Hyderabad', context: 'Evening', duration: '0:04', path: '/sounds/hyd_01.mp3' },
        { id: 'hyd_02', title: 'Bangle Jingle', city: 'hyd', cityName: 'Hyderabad', context: 'Laad Bazaar', duration: '0:02', path: '/sounds/hyd_02.mp3' },
        { id: 'hyd_03', title: 'Biryani Steam', city: 'hyd', cityName: 'Hyderabad', context: 'Dum Kitchen', duration: '0:05', path: '/sounds/hyd_03.mp3' },

        { id: 'pnq_01', title: 'Peshwa Era Bells', city: 'pnq', cityName: 'Pune', context: 'Heritage', duration: '0:07', path: '/sounds/pnq_01.mp3' },
        { id: 'pnq_02', title: 'Dhol Tasha', city: 'pnq', cityName: 'Pune', context: 'Ganpati Vibe', duration: '0:15', path: '/sounds/pnq_02.mp3' },
        { id: 'pnq_03', title: 'College Hubbub', city: 'pnq', cityName: 'Pune', context: 'FC Road', duration: '0:06', path: '/sounds/pnq_03.mp3' },

        { id: 'amd_01', title: 'Garba Beats', city: 'amd', cityName: 'Ahmedabad', context: 'Festival', duration: '0:08', path: '/sounds/amd_01.mp3' },
        { id: 'amd_02', title: 'Kite Whistle', city: 'amd', cityName: 'Ahmedabad', context: 'Uttarayan', duration: '0:02', path: '/sounds/amd_02.mp3' },
        { id: 'amd_03', title: 'Market Barter', city: 'amd', cityName: 'Ahmedabad', context: 'Law Garden', duration: '0:05', path: '/sounds/amd_03.mp3' },

        { id: 'jai_01', title: 'Ghoomar Rhythm', city: 'jai', cityName: 'Jaipur', context: 'Royal Dance', duration: '0:06', path: '/sounds/jai_01.mp3' },
        { id: 'jai_02', title: 'Camel Bell', city: 'jai', cityName: 'Jaipur', context: 'Heritage Run', duration: '0:03', path: '/sounds/jai_02.mp3' },
        { id: 'jai_03', title: 'Folk Sarangi', city: 'jai', cityName: 'Jaipur', context: 'Palace Vibe', duration: '0:12', path: '/sounds/jai_03.mp3' },

        { id: 'cok_01', title: 'Backwater Ripple', city: 'cok', cityName: 'Kochi', context: 'Serenity', duration: '0:09', path: '/sounds/cok_01.mp3' },
        { id: 'cok_02', title: 'Boat Horn', city: 'cok', cityName: 'Kochi', context: 'Ferry Life', duration: '0:04', path: '/sounds/cok_02.mp3' },
        { id: 'cok_03', title: 'Spice Market Call', city: 'cok', cityName: 'Kochi', context: 'Mattancherry', duration: '0:05', path: '/sounds/cok_03.mp3' },

        { id: 'lko_01', title: 'Evening Azaan', city: 'lko', cityName: 'Lucknow', context: 'Spiritual', duration: '0:08', path: '/sounds/lko_01.mp3' },
        { id: 'lko_02', title: 'Kathak Ghungroo', city: 'lko', cityName: 'Lucknow', context: 'Royal Court', duration: '0:05', path: '/sounds/lko_02.mp3' },
        { id: 'lko_03', title: 'Gourmet Sizzle', city: 'lko', cityName: 'Lucknow', context: 'Chowk Kebabs', duration: '0:04', path: '/sounds/lko_03.mp3' },

        { id: 'vns_01', title: 'Ganga Aarti Peal', city: 'vns', cityName: 'Varanasi', context: 'Ritual', duration: '0:12', path: '/sounds/vns_01.mp3' },
        { id: 'vns_02', title: 'Temple Chant', city: 'vns', cityName: 'Varanasi', context: 'Kashi Vibes', duration: '0:08', path: '/sounds/vns_02.mp3' },
        { id: 'vns_03', title: 'River Splash', city: 'vns', cityName: 'Varanasi', context: 'Ghat Morning', duration: '0:03', path: '/sounds/vns_03.mp3' },

        { id: 'ixc_01', title: 'Lake Breeze', city: 'ixc', cityName: 'Chandigarh', context: 'Nature', duration: '0:10', path: '/sounds/ixc_01.mp3' },
        { id: 'ixc_02', title: 'Cycle Ring', city: 'ixc', cityName: 'Chandigarh', context: 'Clean City', duration: '0:02', path: '/sounds/ixc_02.mp3' },
        { id: 'ixc_03', title: 'Leaf Rustle', city: 'ixc', cityName: 'Chandigarh', context: 'Gardens', duration: '0:04', path: '/sounds/ixc_03.mp3' },

        { id: 'atq_01', title: 'Langar Chants', city: 'atq', cityName: 'Amritsar', context: 'Spiritual', duration: '0:11', path: '/sounds/atq_01.mp3' },
        { id: 'atq_02', title: 'Harmonium Peace', city: 'atq', cityName: 'Amritsar', context: 'Golden Hour', duration: '0:06', path: '/sounds/atq_02.mp3' },
        { id: 'atq_03', title: 'Dhaba Hubbub', city: 'atq', cityName: 'Amritsar', context: 'Kulcha Vibe', duration: '0:05', path: '/sounds/atq_03.mp3' },

        { id: 'ind_01', title: 'Poha Market Hubbub', city: 'ind', cityName: 'Indore', context: 'Morning', duration: '0:05', path: '/sounds/ind_01.mp3' },
        { id: 'ind_02', title: 'Street Food Tapping', city: 'ind', cityName: 'Indore', context: 'Sarafa Night', duration: '0:03', path: '/sounds/ind_02.mp3' },
        { id: 'ind_03', title: 'Temple Bells', city: 'ind', cityName: 'Indore', context: 'Khajrana', duration: '0:04', path: '/sounds/ind_03.mp3' },

        { id: 'tny_01', title: 'Halwa Kadai Sizzling', city: 'tny', cityName: 'Tirunelveli', context: 'Sweet Making', duration: '0:06', path: '/sounds/tny_01.mp3' },
        { id: 'tny_02', title: 'River Flow', city: 'tny', cityName: 'Tirunelveli', context: 'Thamirabarani', duration: '0:08', path: '/sounds/tny_02.mp3' },
        { id: 'tny_03', title: 'Temple Chants', city: 'tny', cityName: 'Tirunelveli', context: 'Nellaiappar', duration: '0:05', path: '/sounds/tny_03.mp3' },

        { id: 'cjb_01', title: 'Annapoorna Sambar Stir', city: 'cjb', cityName: 'Coimbatore', context: 'Cuisine', duration: '0:04', path: '/sounds/cjb_01.mp3' },
        { id: 'cjb_02', title: 'Factory Hum', city: 'cjb', cityName: 'Coimbatore', context: 'Industrial Spirit', duration: '0:06', path: '/sounds/cjb_02.mp3' },
        { id: 'cjb_03', title: 'Hill Breeze', city: 'cjb', cityName: 'Coimbatore', context: 'Marudhamalai', duration: '0:07', path: '/sounds/cjb_03.mp3' },

        { id: 'trz_01', title: 'Rockfort Temple Bell', city: 'trz', cityName: 'Trichy', context: 'Heritage', duration: '0:05', path: '/sounds/trz_01.mp3' },
        { id: 'trz_02', title: 'Market Chatter', city: 'trz', cityName: 'Trichy', context: 'Gandhi Market', duration: '0:06', path: '/sounds/trz_02.mp3' },
        { id: 'trz_03', title: 'Elephant Trumpet', city: 'trz', cityName: 'Trichy', context: 'Temple Elephant', duration: '0:03', path: '/sounds/trz_03.mp3' },

        { id: 'ixm_01', title: 'Jigarthanda Froth', city: 'ixm', cityName: 'Madurai', context: 'Refreshment', duration: '0:07', path: '/sounds/ixm_01.mp3' },
        { id: 'ixm_02', title: 'Night Market Hubbub', city: 'ixm', cityName: 'Madurai', context: 'Thoonga Nagaram', duration: '0:10', path: '/sounds/ixm_02.mp3' },
        { id: 'ixm_03', title: 'Mallipoo Fragrance', city: 'ixm', cityName: 'Madurai', context: 'Flower Market', duration: '0:04', path: '/sounds/ixm_03.mp3' },

        { id: 'trv_01', title: 'Pazhampori Frying', city: 'trv', cityName: 'Trivandrum', context: 'Evening Snack', duration: '0:08', path: '/sounds/trv_01.mp3' },
        { id: 'trv_02', title: 'Rain Patter', city: 'trv', cityName: 'Trivandrum', context: 'Monsoon Vibe', duration: '0:05', path: '/sounds/trv_02.mp3' },
        { id: 'trv_03', title: 'Sanku Chime', city: 'trv', cityName: 'Trivandrum', context: 'Temple Ritual', duration: '0:03', path: '/sounds/trv_03.mp3' },
    ];

    const [playingId, setPlayingId] = useState(null);
    const [audio] = useState(new Audio());

    const togglePlay = (id, path) => {
        if (playingId === id) {
            audio.pause();
            setPlayingId(null);
        } else {
            audio.src = path;
            audio.play();
            setPlayingId(id);
            audio.onended = () => setPlayingId(null);
        }
    };

    const sounds = currentCity === 'all'
        ? allSounds
        : allSounds.filter(s => s.city === currentCity);

    // Grouping logic for "All Cities" view
    const groupedSounds = currentCity === 'all'
        ? allSounds.reduce((acc, sound) => {
            if (!acc[sound.cityName]) acc[sound.cityName] = [];
            acc[sound.cityName].push(sound);
            return acc;
        }, {})
        : null;

    return (
        <div className="max-w-6xl mx-auto space-y-16 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[var(--primary)]">
                        <div className="p-2 bg-[var(--primary)]/10 rounded-xl"><Headphones size={24} /></div>
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Audio Archives</span>
                    </div>
                    <h1 className="text-6xl font-black naatu-font text-[var(--text-primary)]">Soundboard</h1>
                    <p className="text-[var(--text-secondary)] font-medium max-w-xl opacity-70">
                        Immerse yourself in the auditory soul of India. Authentic Naatu recordings from the heart of our cities.
                    </p>
                </div>

                <div className="flex items-center gap-4 px-6 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-md">
                    <div className="p-2 bg-[var(--accent)]/10 rounded-lg"><Volume2 size={16} className="text-[var(--accent)]" /></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black opacity-40">Audio Quality</span>
                        <span className="text-sm font-black text-[var(--text-primary)]">Spatial 3D</span>
                    </div>
                </div>
            </div>

            {currentCity === 'all' ? (
                Object.entries(groupedSounds).map(([cityName, citySounds]) => (
                    <div key={cityName} className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-black naatu-font text-[var(--text-primary)] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">{cityName}</h2>
                            <div className="h-px flex-grow bg-[var(--border-color)] opacity-20"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {citySounds.map((sound, i) => (
                                <SoundCard key={sound.id} sound={sound} playingId={playingId} togglePlay={togglePlay} delay={i * 0.05} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {sounds.map((sound, i) => (
                        <SoundCard key={sound.id} sound={sound} playingId={playingId} togglePlay={togglePlay} delay={i * 0.05} />
                    ))}
                </div>
            )}
        </div>
    );
};

const SoundCard = ({ sound, playingId, togglePlay, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="glass-card group relative overflow-hidden h-64 flex flex-col justify-between p-8 border-none shadow-2xl"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--primary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="flex justify-between items-start relative z-10">
            <div className="space-y-1">
                <h3 className="text-2xl font-black naatu-font text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{sound.title}</h3>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-40 text-[var(--text-secondary)]">
                    <MapPin size={12} className="text-[var(--primary)]" /> {sound.cityName}
                </div>
            </div>
            <button className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors"><Heart size={20} /></button>
        </div>

        <div className="flex items-end justify-between relative z-10">
            <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">{sound.context}</p>
                <p className="text-xs font-bold opacity-40 text-[var(--text-secondary)]">{sound.duration}</p>
            </div>

            <div className="flex gap-3">
                <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[var(--text-primary)] hover:text-[var(--primary)] transition-all hover:scale-110 shadow-md">
                    <Share2 size={20} />
                </button>
                <button
                    onClick={() => togglePlay(sound.id, sound.path)}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all outline-none border-none ${playingId === sound.id ? 'bg-white text-black' : 'bg-[var(--primary)] text-white'
                        }`}
                >
                    {playingId === sound.id ? <Volume2 size={28} /> : <Play size={28} fill="currentColor" />}
                </button>
            </div>
        </div>

        {/* Visualizer Placeholder */}
        <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-center gap-1.5 opacity-10 group-hover:opacity-30 transition-opacity px-10">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={playingId === sound.id ? { height: [10, 40, 20, 30, 10] } : { height: 10 }}
                    transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                    className="w-1 bg-[var(--primary)] rounded-full"
                />
            ))}
        </div>
    </motion.div>
);

export default Soundboard;
