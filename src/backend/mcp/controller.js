const { getProvider } = require('./providerFactory');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '../../../.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const controller = {
    async executeTask(task, context, userChoice) {
        console.log(`[MCP] Routing task: ${task} with Choice: ${userChoice || 'Default'}`);

        // Global Safety Layer (Always stays via Gemini for cross-provider consistency)
        const safetyModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const safetyPrompt = `Check if this content is offensive or unsafe: "${context.text || context.meaning}". Answer only YES or NO.`;
        const safetyResult = await safetyModel.generateContent(safetyPrompt);
        const isOffensive = safetyResult.response.text().trim().includes('YES');

        if (isOffensive) {
            throw new Error("Safety check failed: Offensive content detected.");
        }

        // Select E2E Provider Solution
        const solution = getProvider(userChoice);
        return await solution.executeTask(task, context);
    }
};

module.exports = controller;
