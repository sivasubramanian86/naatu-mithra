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

        const promptFn = PROMPTS[task];
        const promptText = promptFn
            ? promptFn(context)
            : `Act as a GCP Vertex AI Agent. Task: ${task}. City: ${context.city}. Context: ${context.meaning || context.text}.`;

        // Direct REST API call to bypass SDK credential issues
        // Using gemini-flash-latest (confirmed available via listModels)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: promptText }]
                    }]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error("No content generated from Gemini API");
            }
        } catch (error) {
            console.error("GCP Solution REST Error:", error);
            throw error;
        }
    },

    async getScalingConfig() {
        return {
            platform: 'GCP Cloud Run / Vertex AI Agent Builder',
            mode: 'Managed Container'
        };
    }
};

module.exports = gcpSolution;
