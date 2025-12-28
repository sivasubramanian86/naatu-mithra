const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
require('dotenv').config({ path: '../../../.env' });

const client = new BedrockRuntimeClient({
    region: process.env.BEDROCK_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.BEDROCK_ACCESS_KEY,
        secretAccessKey: process.env.BEDROCK_SECRET_KEY,
    },
});

const invokeBedrock = async (modelId, prompt) => {
    try {
        const input = {
            modelId: modelId,
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
                max_tokens_to_sample: 300,
                temperature: 0.5,
            }),
        };

        const command = new InvokeModelCommand(input);
        const response = await client.send(command);
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        return responseBody.completion;
    } catch (err) {
        console.error("Bedrock Invocation Error:", err);
        throw err;
    }
};

module.exports = { invokeBedrock };
