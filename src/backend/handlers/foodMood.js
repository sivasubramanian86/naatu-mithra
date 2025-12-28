const controller = require('../mcp/controller');

const foodMood = async (req, res) => {
    const { city, mood, choice } = req.body;

    try {
        const context = { city, text: `I am feeling ${mood}`, mood };
        const result = await controller.executeTask('food_mood_mapping', context, choice);

        res.json({
            city,
            mood,
            suggestion: "Masala Dosa",
            equivalent: "Savory Crepe",
            aiNote: result
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = foodMood;
