import React from 'react';
import { Github, Twitter, Instagram, Globe, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-earthy-200 dark:border-earthy-800 bg-earthy-100/50 dark:bg-earthy-950/50">
            <div className="container mx-auto px-4 py-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center text-white font-bold">N</div>
                            <h4 className="text-xl font-black naatu-font text-terracotta">NaatuMithra</h4>
                        </div>
                        <p className="text-earthy-600 dark:text-earthy-400 leading-relaxed max-w-md">
                            Your hyper-local friend for navigating the chaotic beauty of Indian cities.
                            Bridging cultural gaps with linguistic nuance, gastronomic moods, and micro-mobility insights.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-earthy-200 dark:bg-earthy-800 hover:text-terracotta transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="p-2 rounded-full bg-earthy-200 dark:bg-earthy-800 hover:text-terracotta transition-colors"><Instagram size={18} /></a>
                            <a href="https://github.com" className="p-2 rounded-full bg-earthy-200 dark:bg-earthy-800 hover:text-terracotta transition-colors"><Github size={18} /></a>
                            <a href="#" className="p-2 rounded-full bg-earthy-200 dark:bg-earthy-800 hover:text-terracotta transition-colors"><Globe size={18} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h5 className="font-bold text-xs uppercase tracking-widest text-terracotta">Navigation</h5>
                        <ul className="space-y-3 text-sm font-bold text-earthy-600 dark:text-earthy-400">
                            <li className="hover:text-terracotta cursor-pointer transition-colors">Experience Home</li>
                            <li className="hover:text-terracotta cursor-pointer transition-colors">Slang Directory</li>
                            <li className="hover:text-terracotta cursor-pointer transition-colors">Food Mapper</li>
                            <li className="hover:text-terracotta cursor-pointer transition-colors">Heritage Deck</li>
                        </ul>
                    </div>

                    {/* Cloud Info */}
                    <div className="space-y-4">
                        <h5 className="font-bold text-xs uppercase tracking-widest text-terracotta">Infrastructure</h5>
                        <p className="text-sm font-medium text-earthy-600 dark:text-earthy-400">
                            Orchestrated via MCP + RAG across:
                        </p>
                        <div className="space-y-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 text-xs font-bold">AWS BEDROCK AGENT CORE</div>
                            <div className="flex items-center gap-2 text-xs font-bold">GCP VERTEX AI BUILDER</div>
                            <div className="flex items-center gap-2 text-xs font-bold">LLAMA 3 OPEN SOURCE</div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-earthy-200 dark:border-earthy-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wider text-earthy-400">
                    <p className="flex items-center gap-1.5 uppercase">
                        Designed with <Heart size={12} className="text-red-500 fill-red-500" /> for the vibrant cities of Bharat
                    </p>
                    <div className="flex gap-8 uppercase">
                        <span>&copy; {new Date().getFullYear()} NaatuMithra</span>
                        <a href="#" className="hover:text-terracotta transition-colors">Privacy</a>
                        <a href="#" className="hover:text-terracotta transition-colors">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
