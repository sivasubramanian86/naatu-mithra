const productParser = require('../lib/productParser');
const controller = require('../mcp/controller');

const translateSlang = async (req, res) => {
    const { city, text, choice } = req.body;

    if (!city || !text) {
        return res.status(400).json({ error: 'City and text are required.' });
    }

    try {
        const citySlang = await productParser.getSlangByCity(city);
        const match = citySlang.find(s => text.toLowerCase().includes(s.phrase.toLowerCase()));

        const context = {
            city,
            text,
            meaning: match ? match.meaning : "Unknown slang",
            emoji: match ? match.emoji : "📍"
        };

        const paraphrase = await controller.executeTask('slang_paraphrase', context, choice);

        res.json({
            city,
            original: text,
            meaning: context.meaning,
            emoji: context.emoji,
            paraphrase: paraphrase
        });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Failed to translate slang.' });
    }
};

module.exports = translateSlang;
