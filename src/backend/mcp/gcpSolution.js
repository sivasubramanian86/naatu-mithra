const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '../../../.env' });

/**
 * GCP E2E Solution
 * Uses Vertex AI / Gemini SDK and GCP suite components.
 */
const gcpSolution = {
    name: 'GCP-VertexAI-Gemini',

    async executeTask(task, context) {
        console.log(`[GCP Solution] Processing task: ${task}`);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `Act as a GCP Vertex AI Agent. Task: ${task}. City: ${context.city}. 
    Context: ${context.meaning || context.text}. Provide a culturally rich response.`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    },

    async getScalingConfig() {
        return {
            platform: 'GCP Cloud Run / Vertex AI Agent Builder',
            mode: 'Managed Container'
        };
    }
};

module.exports = gcpSolution;
