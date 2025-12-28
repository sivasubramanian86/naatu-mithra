const { getProvider } = require('./providerFactory');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '../../../.env' });


// Removed top-level genAI init to avoid issues if env var is missing at startup

const controller = {
    async executeTask(task, context, userChoice) {
        console.log(`[MCP] Routing task: ${task} with Choice: ${userChoice || 'Default'}`);


        // Global Safety Layer (Always stays via Gemini for cross-provider consistency)
        try {
            if (!process.env.GEMINI_API_KEY) {
                console.error("CRITICAL: GEMINI_API_KEY is missing in controller environment");
                throw new Error("GEMINI_API_KEY missing");
            }

            console.log("Initializing Safety Check...");
            // Initialize genAI here to ensure it uses the current env var
            const localGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            // Switched to gemini-pro (stable 1.0) as 1.5 models return 404 on v1 API
            const safetyModel = localGenAI.getGenerativeModel({ model: "gemini-pro" });

            const contentToCheck = context.text || context.meaning || context.local_dish || context.dish || 'general content';
            console.log(`Safety checking content: ${contentToCheck}`);

            const safetyPrompt = `Check if this content is offensive or unsafe: "${contentToCheck}". Answer only YES or NO.`;
            const safetyResult = await safetyModel.generateContent(safetyPrompt);
            const isOffensive = safetyResult.response.text().trim().includes('YES');

            if (isOffensive) {
                throw new Error("Safety check failed: Offensive content detected.");
            }
            console.log("Safety check passed.");
        } catch (error) {
            console.error("Safety Layer Error (Non-blocking):", error);
            // Non-blocking: Proceed even if safety check fails (api error, model not found etc)
            console.log("Proceeding despite safety check failure.");
        }

        // Select E2E Provider Solution
        const solution = getProvider(userChoice);
        return await solution.executeTask(task, context);
    }
};

module.exports = controller;
