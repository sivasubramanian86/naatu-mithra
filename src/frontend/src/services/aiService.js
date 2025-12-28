import { GoogleGenerativeAI } from "@google/generative-ai";

// API Keys from environment
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const AWS_CREDENTIALS = import.meta.env.VITE_AWS_CREDENTIALS; // Placeholder for Bedrock logic

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "dummy_key");

// City to Native Language Mapping
const CITY_LANG_MAP = {
    'blr': { name: 'Kannada', script: 'ಕನ್ನಡ' },
    'bom': { name: 'Marathi', script: 'मराठी' },
    'del': { name: 'Hindi', script: 'हिन्दी' },
    'maa': { name: 'Tamil', script: 'தமிழ்' },
    'ccu': { name: 'Bengali', script: 'বাংলা' },
    'hyd': { name: 'Telugu', script: 'తెలుగు' },
    'pnq': { name: 'Marathi', script: 'मराठी' },
    'amd': { name: 'Gujarati', script: 'ગુજરાતી' },
    'jai': { name: 'Hindi', script: 'हिन्दी' },
    'cok': { name: 'Malayalam', script: 'മലയാളം' },
    'lko': { name: 'Hindi', script: 'हिन्दी' },
    'vns': { name: 'Hindi', script: 'हिन्दी' },
    'ixc': { name: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
    'atq': { name: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
    'ind': { name: 'Hindi', script: 'हिन्दी' },
    'tny': { name: 'Tamil', script: 'தமிழ்' },
    'cjb': { name: 'Tamil', script: 'தமிழ்' },
    'trz': { name: 'Tamil', script: 'தமிழ்' },
    'ixm': { name: 'Tamil', script: 'தமிழ்' },
    'trv': { name: 'Malayalam', script: 'മലയാളം' },
    'srt': { name: 'Gujarati', script: 'ગુજરાતી' },
    'nag': { name: 'Marathi', script: 'मराठी' },
    'vtz': { name: 'Telugu', script: 'తెలుగు' },
    'pat': { name: 'Hindi', script: 'हिन्दी' },
    'bho': { name: 'Hindi', script: 'हिन्दी' },
    'thn': { name: 'Marathi', script: 'मराठी' },
    'luh': { name: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
    'agr': { name: 'Hindi', script: 'हिन्दी' },
    'nsk': { name: 'Marathi', script: 'मराठी' },
    'fdb': { name: 'Hindi', script: 'हिन्दी' }
};

// Context from local knowledge base (RAG-like simulation)
const slangContext = `
## South India
- Bengaluru (BLR): Maga (Bro), Sakkath (Awesome), Guru (Respect), Bombat (Fantastic).
- Chennai (MAA): Machan (Bro), Semma (Great), Gala-gala (Loud/Fun), Appidiya (Really?).
- Kochi (COK): Aliyan (Bro), Adipoli (Awesome), Scene (Intense), Sada (Boring).
- Tirunelveli (TNY): Elae (Hey/Bro), Arumai (Excellent), Vettai (Grand).
- Coimbatore (CJB): Re (Neutral suffix), Mass (Super), Gettu (Style).
- Trichy (TRZ): Da (Suffix), Pa (Respectful suffix), Vera Level (Next level).
- Madurai (IXM): Nanba (Friend), Gethu (Awesome), Marana Mass (Ultimate).
- Trivandrum (TRV): Aliya (Bro), Polichu (Awesome), Thallu (Boast).

## West & Central India
- Mumbai (BOM): Bantai (Homie), Kadak (Excellent), Vatali (Leave), Kharcha-Paani (Bribe/Tip).
- Pune (PNQ): Lay Bhaari (Excellent), Vishesh (Special), Raada (Chaos), Punter (Friend).
- Ahmedabad (AMD): Jalsa Kar (Have fun), Baka (Friend), Su Che (What is it?), Majama (Fine).
- Indore (IND): Bhaiya (Bro), Chakkao (Awesome), Lapak (Quick/Great).

## North & East India
- Delhi (DEL): Bhasad (Chaos), Jugaad (Hack), Kalesh (Fight), Oye (Hey).
- Kolkata (CCU): Dada (Brother), Lyadh (Laziness), Khub Bhalo (Very good), Fatafati (Outstanding).
- Lucknow (LKO): Amaa (Hey), Muskuraiye (Smile), Nawab (Royal), Tahzeeb (Etiquette).
- Varanasi (VNS): Guru (Respected), Mahadev (Greeting), Banarasi (Local style).
- Chandigarh (IXC): Veerji (Brother), Chakde (Go for it), Ghaint (Cool).
- Amritsar (ATQ): Paaji (Brother), Sira (End/Top), Shava (Hooray).
- Jaipur (JAI): Ghani Khamma (Greeting), Padharo (Welcome), Chokho (Good), Bindaas (Carefree).
- Surat (SRT): Jalsa (Fun), Locho (Problem/Dish), Baka (Friend), Su Che (What's up?).
- Nagpur (NAG): Hao (Yes), Bhava (Bro), Lay Bhaari (Excellent), Kaay (What).
- Vizag (VTZ): Mama (Bro), Abbabba (Wow), Bagundi (Good), Enti (What).
- Patna (PAT): Ka Ho (What's up), Bhaiyaji (Respect), Gardaa (Awesome), Thik Hai (Okay).
- Bhopal (BHO): Amaa (Hey), Miyan (Friend), Gajab (Awesome), Khaun (Where).
- Ludhiana (LUH): Chakde (Go), Pra (Bro), Ghaint (Cool), Sira (End).
- Agra (AGR): Bhaya (Bro), Gazab (Great), Kya Haal (How are you).
- Nashik (NSK): Bhava (Bro), Khulla (Excellent), Kivaa (Vibe).
- Faridabad (FDB): Tau (Elder), Bawli Pooch (Silley), Kati Zeher (Awesome).
`;

const foodContext = `
- Bengaluru: Benne Dosa, Filter Coffee, Chow Chow Bath.
- Mumbai: Vada Pav, Misal Pav, Keema Ghotala.
- Delhi: Chole Bhature, Butter Chicken, Paranthas.
- Chennai: Idli Sambar, Masala Dosa, Jigarthanda.
- Kolkata: Puchka, Roshogolla, Macher Jhol.
- Hyderabad: Dum Biryani, Haleem, Irani Chai.
- Pune: Puneri Misal, Puran Poli, Mastani.
- Ahmedabad: Dhokla, Handvo, Thepla.
- Jaipur: Dal Baati Churma, Ker Sangri, Laal Maas.
- Kochi: Appam with Stew, Karimeen Pollichathu.
- Lucknow: Tunday Kabab, Galouti Kabab, Basket Chaat.
- Varanasi: Banarasi Paan, Kachori Sabzi, Tamatar Chaat.
- Chandigarh: Paneer Tikka, Butter Naan, Makki di Roti.
- Amritsar: Amritsari Kulcha, Lassi, Langar Dal.
- Indore: Poha Jalebi, Bhutte Ka Kees, Sabudana Khichdi.
- Tirunelveli: Tirunelveli Halwa, Kothu Parotta.
- Coimbatore: Annapoorna Sambar, Ariseṁ Paruppu Sādam.
- Trichy: Srirangam Puliyodharai, Trichy Bun Butter Jam.
- Madurai: Jigarthanda, Kari Parotta, Madurai Idli.
- Trivandrum: Pazhampori, Karimeen, Kerala Sadya.
- Surat: Surati Locho, Ghari, Undhiyu.
- Nagpur: Tarri Poha, Saoji Mutton, Santra Barfi.
- Vizag: Bamboo Chicken, Punugulu, Sea Food.
- Patna: Litti Chokha, Anarsa, Sattu Paratha.
- Bhopal: Poha Jalebi, Bhopali Gosht Korma, Sulemani Chai.
- Ludhiana: Tandoori Chicken, Dal Makhani, Sarson da Saag.
- Agra: Petha, Bedai, Mughlai Paratha.
- Nashik: Misal Pav, Wine Grapes, Puran Poli.
- Faridabad: Rabri-Jalebi, Haryanvi Churma.
`;

const heritageContext = `
- Bengaluru: Vidhana Soudha (Neo-Dravidian architecture), Tipu Sultan's Summer Palace (Teakwood).
- Mumbai: Gateway of India (Indo-Saracenic), Elephanta Caves (Shiva carvings).
- Delhi: Qutub Minar (Victory tower), Red Fort (Mughal seat).
- Chennai: Kapaleeshwarar Temple (Dravidian), Fort St. George.
- Kolkata: Victoria Memorial (Marble), Howrah Bridge (Engineering marvel).
- Hyderabad: Charminar (Plague memorial), Golconda Fort.
- Pune: Shaniwar Wada (Peshwa seat), Aga Khan Palace.
- Kochi: Chinese Fishing Nets (Zheng He legacy), Mattancherry Palace.
- Madurai: Meenakshi Amman Temple (Gopurams).
- Varanasi: Kashi Vishwanath, Ganga Ghats.
- Surat: Dutch Garden, Dumas Beach.
- Nagpur: Deekshabhoomi, Zero Mile Stone.
- Vizag: INS Kursura, Araku Valley Nearby.
- Patna: Golghar, Takht Sri Patna Sahib.
- Bhopal: Sanchi Stupa Nearby, Upper Lake.
- Agra: Taj Mahal, Agra Fort, Fatehpur Sikri.
- Nashik: Trimbakeshwar, Sula Vineyards.
`;

const travelContext = `
- Bengaluru (Metro): High crowd peak, +5 Health Karma. (Auto): Traffic factor 1.5, -2 Stress Karma.
- Mumbai (Local Train): "Superhuman agility" required, +10 Health Karma, FASTEST.
- Delhi (Metro): Reliable, high connectivity, +10 Carbon Score.
- Kolkata (Tram): Heritage speed, +15 Carbon Score, Zen State.
- Chennai (MRTS): Coastal views, predictable, +8 Karma.
- Hyderabad (RTC Bus): High crowd, 1.8x time factor.
`;

/**
 * Orchestrates calls across different AI providers.
 */
const callAI = async (prompt, modelCandidates = ["gemini-2.0-flash"]) => {
    // 1. Try Gemini
    if (GEMINI_API_KEY) {
        for (const modelName of modelCandidates) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text().trim();
            } catch (error) {
                console.warn(`Gemini ${modelName} failed:`, error.message);
                if (!error.message?.includes('404')) break;
            }
        }
    }

    // 2. Try Claude (using fetch for Zero-Dependency integration)
    if (CLAUDE_API_KEY) {
        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': CLAUDE_API_KEY,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-haiku-20240307',
                    max_tokens: 1024,
                    messages: [{ role: 'user', content: prompt }]
                })
            });
            const data = await response.json();
            return data.content[0].text.trim();
        } catch (error) {
            console.warn("Claude AI failed:", error.message);
        }
    }

    // 3. AWS Bedrock Placeholder (Specific Strands/Agent logic can be injected here)
    if (AWS_CREDENTIALS) {
        console.warn("AWS Bedrock integration active - Routing through Strands Agent...");
        // bedock logic...
    }

    throw new Error("No AI providers available or all failed.");
};

/**
 * Utility to parse bilingual AI responses.
 */
export const parseBilingualResponse = (text) => {
    const englishPart = text.match(/\[English\]:\s*([\s\S]*?)(?=\[|$)/i)?.[1]?.trim() || '';
    const nativePart = text.match(/\[([^\]]+)\]:\s*([\s\S]*?)$/i)?.[2]?.trim() || '';
    return { english: englishPart || text, native: nativePart };
};

/**
 * Enhanced prompt wrapper for bilingual output.
 */
const getBilingualPrompt = (basePrompt, city) => {
    const lang = CITY_LANG_MAP[city] || { name: 'English', script: 'English' };
    return `
        ${basePrompt}
        
        CRITICAL: provide the response in exactly this bilingual format:
        [English]: (Your witty Naatu English explanation)
        [${lang.name}]: (${lang.script} script translation of the above)
        
        Keep both versions authentic and in the Naatu vibe.
    `;
};

/**
 * Translates a phrase into regional slang using Multi-Model AI.
 */
export const translateSlangAI = async (text, city) => {
    const basePrompt = `
        You are "Naatu Mithra", a local cultural expert. 
        Context of regional slang: ${slangContext}
        Current City: ${city}
        Translate/Explain this phrase in the local slang and style of ${city}: "${text}"
    `;
    const prompt = getBilingualPrompt(basePrompt, city);
    return await callAI(prompt, ["gemini-2.0-flash", "gemini-1.5-flash"]);
};

/**
 * Generates an AI-driven food recommendation with bilingual output.
 */
export const matchFoodMoodAI = async (mood, city) => {
    const basePrompt = `
        You are "Naatu Mithra", a local food guide.
        Regional Food Context: ${foodContext}
        User Mood: ${mood}
        User City: ${city}
        Recommend a specific local dish and explain WHY it matches their ${mood} mood in ${city}.
        Mention a specific "flavor profile" (e.g., Umami, Zesty, Piquant).
    `;
    const prompt = getBilingualPrompt(basePrompt, city);
    return await callAI(prompt);
};

/**
 * Generates cultural deep-dive storytelling for heritage sites.
 */
export const getHeritageInsightAI = async (site, city) => {
    const basePrompt = `
        You are a master storyteller and historian for "Naatu Mithra".
        Heritage Context: ${heritageContext}
        Site: ${site}
        City: ${city}
        Tell a fascinating, lesser-known legend or architectural secret about this site.
        Use a storytelling tone and local pride. Keep it under 100 words.
    `;
    const prompt = getBilingualPrompt(basePrompt, city);
    return await callAI(prompt);
};

/**
 * Predicts travel outcomes and road karma.
 */
export const predictTravelChaosAI = async (origin, destination, mission, city) => {
    const basePrompt = `
        You are the "Traffic Oracle" for "Naatu Mithra".
        Travel Context: ${travelContext}
        Route: ${origin} to ${destination}
        Mission: ${mission}
        City: ${city}
        Predict the "Road Karma" score (1-10) and provide a witty, authentic forecast.
        Mention specific regional modes (e.g., Mumbai Local, Bangalore Auto) if relevant.
    `;
    const prompt = getBilingualPrompt(basePrompt, city);
    return await callAI(prompt);
};

const mentalModelContext = `
- Dosa -> Savory Crepe / Pancake.
- Idli -> Steamed Sourdough Rice Cake.
- Vada Pav -> Indian Slider / Potato Burger.
- Biryani -> Spiced Rice Pilaf (with complex layering).
- Ragi Mudde -> Polenta / Rustic grain balls.
- Puchka/Pani Puri -> Explosive Water Spheres / Spicy Canapés.
- Dal Baati -> Hard Rolls with Lentil Stew.
- Appam -> Fermented Rice Hopper.
- Poha -> Spiced Flattened Rice.
`;

/**
 * Maps a local dish to global "mental models" and cross-city comparisons.
 */
export const getGlobalEquivalentsAI = async (dishName, city) => {
    const basePrompt = `
        You are the "Flavor Mapper" for "Naatu Mithra".
        Mental Model Context: ${mentalModelContext}
        Regional Food Context: ${foodContext}
        Dish: ${dishName}
        City: ${city}
        
        Task:
        1. Map this dish to a "Global Equivalent" (mental model) so a foreigner can understand it.
        2. Explain how the version of this dish (or a similar one) in ${city} differs from other cities (e.g., Bangalore Idli vs Chennai Idli).
        3. Keep it witty, authentic, and "Naatu".
    `;
    const prompt = getBilingualPrompt(basePrompt, city);
    return await callAI(prompt);
};
