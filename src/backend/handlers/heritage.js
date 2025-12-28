const controller = require('../mcp/controller');

const heritage = async (req, res) => {
    // If POST, we generate an AI insight
    if (req.method === 'POST') {
        const { city, site } = req.body;
        try {
            const context = { city, text: `Provide a heritage insight for ${site} in ${city}`, site };
            const result = await controller.executeTask('heritage_insight', context);
            return res.json({ insight: result });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Default GET: list heritage sites (simplified)
    const { city } = req.params;
    res.json({
        city,
        cards: [
            { fact: "Example Heritage Fact", caption: "Caption vibes #Heritage" }
        ]
    });
};

module.exports = heritage;
