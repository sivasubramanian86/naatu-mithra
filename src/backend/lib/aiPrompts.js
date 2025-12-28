// --- NaatuMithra Backend AI Prompt Library ---

const CITY_LANG_MAP = {
    'blr': { name: 'Kannada', script: 'ಕನ್ನಡ' },
    'bom': { name: 'Marathi', script: 'ಮರಾठी' },
    'del': { name: 'Hindi', script: 'हिन्दी' },
    'maa': { name: 'Tamil', script: 'தமிழ்' },
    'ccu': { name: 'Bengali', script: 'বাংলা' },
    'hyd': { name: 'Telugu', script: 'తెలుగు' },
    'pnq': { name: 'Marathi', script: 'ಮರಾಠಿ' },
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
    'nag': { name: 'Marathi', script: 'ಮರಾಠಿ' },
    'vtz': { name: 'Telugu', script: 'తెలుగు' },
    'pat': { name: 'Hindi', script: 'हिन्दी' },
    'bho': { name: 'Hindi', script: 'हिन्दी' },
    'thn': { name: 'Marathi', script: 'ಮರಾಠಿ' },
    'luh': { name: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
    'agr': { name: 'Hindi', script: 'हिन्दी' },
    'nsk': { name: 'Marathi', script: 'ಮರಾಠಿ' },
    'fdb': { name: 'Hindi', script: 'हिन्दी' }
};

const slangContext = `
## South India
- Bengaluru (BLR): Maga (Bro), Sakkath (Awesome), Guru (Respect), Bombat (Fantastic).
- Chennai (MAA): Machan (Bro), Semma (Great), Gala-gala (Loud/Fun), Appidiya (Really?).
- Kochi (COK): Aliyan (Bro), Adipoli (Awesome), Scene (Intense), Sada (Boring).
- Tirunelveli (TNY): Elae (Hey/Bro), Arumai (Excellent), Vettai (Grand).
- Coimbatore (CJB): Re (Neutral suffix), Mass (Super), Gettu (Style).
`;

const foodContext = `
- Bengaluru: Benne Dosa, Filter Coffee, Chow Chow Bath.
- Mumbai: Vada Pav, Misal Pav, Keema Ghotala.
- Delhi: Chole Bhature, Butter Chicken, Paranthas.
- Chennai: Idli Sambar, Masala Dosa, Jigarthanda.
- Kolkata: Puchka, Roshogolla, Macher Jhol.
- Hyderabad: Dum Biryani, Haleem, Irani Chai.
`;

const heritageContext = `
- Bengaluru: Vidhana Soudha (Neo-Dravidian architecture), Tipu Sultan's Summer Palace (Teakwood).
- Mumbai: Gateway of India (Indo-Saracenic), Elephanta Caves (Shiva carvings).
- Delhi: Qutub Minar (Victory tower), Red Fort (Mughal seat).
- Chennai: Kapaleeshwarar Temple (Dravidian), Fort St. George.
- Kolkata: Victoria Memorial (Marble), Howrah Bridge (Engineering marvel).
- Hyderabad: Charminar (Plague memorial), Golconda Fort.
`;

const travelContext = `
- Bengaluru (Metro): High crowd peak, +5 Health Karma. (Auto): Traffic factor 1.5, -2 Stress Karma.
- Mumbai (Local Train): "Superhuman agility" required, +10 Health Karma, FASTEST.
- Delhi (Metro): Reliable, high connectivity, +10 Carbon Score.
`;

const mentalModelContext = `
- Dosa -> Savory Crepe / Pancake.
- Idli -> Steamed Sourdough Rice Cake.
- Vada Pav -> Indian Slider / Potato Burger.
- Biryani -> Spiced Rice Pilaf (with complex layering).
`;

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

const PROMPTS = {
    'slang_paraphrase': (context) => getBilingualPrompt(`
        You are "Naatu Mithra", a local cultural expert. 
        Context of regional slang: ${slangContext}
        Current City: ${context.city}
        Translate/Explain this phrase in the local slang and style of ${context.city}: "${context.text}"
    `, context.city),

    'food_mood_mapping': (context) => getBilingualPrompt(`
        You are "Naatu Mithra", a local food guide.
        Regional Food Context: ${foodContext}
        User Mood: ${context.mood}
        User City: ${context.city}
        Recommend a specific local dish and explain WHY it matches their ${context.mood} mood in ${context.city}.
        Mention a specific "flavor profile" (e.g., Umami, Zesty, Piquant).
    `, context.city),

    'heritage_insight': (context) => getBilingualPrompt(`
        You are a master storyteller and historian for "Naatu Mithra".
        Heritage Context: ${heritageContext}
        Site: ${context.site}
        City: ${context.city}
        Tell a fascinating, lesser-known legend or architectural secret about this site.
        Use a storytelling tone and local pride. Keep it under 100 words.
    `, context.city),

    'travel_prediction': (context) => getBilingualPrompt(`
        You are the "Traffic Oracle" for "Naatu Mithra".
        Travel Context: ${travelContext}
        Route: ${context.origin} to ${context.destination}
        Mission: ${context.mission || 'General Commute'}
        City: ${context.city}
        Predict the "Road Karma" score (1-10) and provide a witty, authentic forecast.
        Mention specific regional modes (e.g., Mumbai Local, Bangalore Auto) if relevant.
    `, context.city),

    'mindmap_generation': (context) => getBilingualPrompt(`
        You are the "Flavor Mapper" for "Naatu Mithra".
        Mental Model Context: ${mentalModelContext}
        Regional Food Context: ${foodContext}
        Dish: ${context.local_dish}
        City: ${context.city}
        
        Task:
        1. Map this dish to a "Global Equivalent" (mental model) so a foreigner can understand it.
        2. Explain how the version of this dish (or a similar one) in ${context.city} differs from other cities.
        3. Keep it witty, authentic, and "Naatu".
    `, context.city)
};

module.exports = { PROMPTS };
