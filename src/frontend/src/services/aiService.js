import axios from 'axios';

// API Base from environment (Vite exposes VITE_ prefix vars)
// Fallback to relative path for same-origin or handled by proxy
const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Utility to parse bilingual AI responses.
 * (Kept here to avoid breaking component logic)
 */
export const parseBilingualResponse = (text) => {
    const englishPart = text.match(/\[English\]:\s*([\s\S]*?)(?=\[|$)/i)?.[1]?.trim() || '';
    const nativePart = text.match(/\[([^\]]+)\]:\s*([\s\S]*?)$/i)?.[2]?.trim() || '';
    return { english: englishPart || text, native: nativePart };
};

/**
 * Translates a phrase into regional slang using the Backend API.
 */
export const translateSlangAI = async (text, city) => {
    const response = await axios.post(`${API_BASE}/api/translate-slang`, { text, city });
    return response.data.paraphrase;
};

/**
 * Generates an AI-driven food recommendation via Backend API.
 */
export const matchFoodMoodAI = async (mood, city) => {
    const response = await axios.post(`${API_BASE}/api/food-mood`, { mood, city });
    return response.data.aiNote;
};

/**
 * Generates cultural deep-dive storytelling for heritage sites via Backend API.
 */
export const getHeritageInsightAI = async (site, city) => {
    const response = await axios.post(`${API_BASE}/api/heritage/${city}`, { site, city });
    return response.data.insight;
};

/**
 * Predicts travel outcomes via Backend API.
 */
export const predictTravelChaosAI = async (origin, destination, mission, city) => {
    const response = await axios.post(`${API_BASE}/api/predict-travel`, { origin, destination, mission, city });
    return response.data.aiNote;
};

/**
 * Maps a local dish to global equivalents via Backend API.
 */
export const getGlobalEquivalentsAI = async (dishName, city) => {
    const response = await axios.post(`${API_BASE}/api/mindmap`, { local_dish: dishName, city });
    return response.data.aiNote;
};
