const controller = require('../mcp/controller');

const predictTravel = async (req, res) => {
    const { city, origin, destination, choice } = req.body;

    try {
        const context = {
            city,
            text: `Travel from ${origin} to ${destination}`,
            origin,
            destination
        };

        // In a real app, we'd query travel_rules.md and use an model to rank
        const result = await controller.executeTask('travel_prediction', context, choice);

        res.json({
            city,
            bestMode: 'Metro',
            time: '30 mins',
            crowd: 'Moderate',
            karma: { health: +5, carbon: +15 },
            aiNote: result
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = predictTravel;
