const productParser = require('../lib/productParser');

const heritage = async (req, res) => {
    const { city } = req.params;

    try {
        // Simulated fetch from heritage.md
        res.json({
            city,
            cards: [
                { fact: "Example Heritage Fact", caption: "Caption vibes #Heritage" }
            ]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = heritage;
