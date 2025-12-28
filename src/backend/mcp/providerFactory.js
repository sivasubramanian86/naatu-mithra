const awsSolution = require('./awsSolution');
const gcpSolution = require('./gcpSolution');
const osSolution = require('./osSolution');
require('dotenv').config({ path: '../../../.env' });

const getProvider = (choice) => {
    const provider = choice || process.env.AI_PROVIDER || 'aws';

    switch (provider.toLowerCase()) {
        case 'aws':
            return awsSolution;
        case 'gcp':
        case 'gemini':
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
