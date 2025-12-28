const awsSolution = require('./awsSolution');
const gcpSolution = require('./gcpSolution');
const osSolution = require('./osSolution');
require('dotenv').config({ path: '../../../.env' });

const getProvider = (choice) => {
    // Smart default: If AI_PROVIDER is set, use it. 
    // If not, check if GEMINI_API_KEY is present -> use 'gcp'. 
    // Otherwise fallback to 'aws'.
    let defaultProvider = 'aws';
    if (process.env.GEMINI_API_KEY) {
        defaultProvider = 'google';
    }

    const provider = choice || process.env.AI_PROVIDER || defaultProvider;

    switch (provider.toLowerCase()) {
        case 'aws':
            return awsSolution;
        case 'gcp':
        case 'gemini':
        case 'google':
            return gcpSolution;
        case 'opensource':
        case 'os':
            return osSolution;
        default:
            console.warn(`Provider ${provider} not recognized. Falling back to AWS.`);
            return awsSolution;
    }
};

module.exports = { getProvider };
