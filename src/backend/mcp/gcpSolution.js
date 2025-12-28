const { GoogleGenerativeAI } = require("@google/generative-ai");
const { PROMPTS } = require("../lib/aiPrompts");
require('dotenv').config({ path: '../../../.env' });

/**
 * GCP E2E Solution
 * Uses Vertex AI / Gemini SDK and GCP suite components.
 */
const gcpSolution = {
    name: 'GCP-VertexAI-Gemini',

    async executeTask(task, context) {
        console.log(`[GCP Solution] Processing task: ${task}`);

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured on the server.");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Switched to gemini-pro (stable 1.0) to avoid 404/Auth errors with 1.5 on v1 API
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const promptFn = PROMPTS[task];
        const prompt = promptFn
            ? promptFn(context)
            : `Act as a GCP Vertex AI Agent. Task: ${task}. City: ${context.city}. Context: ${context.meaning || context.text}.`;

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
