const controller = require('../mcp/controller');

/**
 * Handler for Global Equivalents (Flavor Mapper)
 * Maps local dishes to global equivalents with cultural context
 */
async function globalEquivalentsHandler(req, res) {
    try {
        const { dish, city } = req.body;

        if (!dish || !city) {
            return res.status(400).json({ error: 'Missing required fields: dish, city' });
        }

        console.log(`[Global Equivalents] Dish: ${dish}, City: ${city}`);

        // Use MCP controller to generate global equivalents
        const result = await controller.executeTask('global-equivalents', {
            dish,
            city,
            meaning: `Map ${dish} from ${city} to global equivalents`
        }, 'google');

        res.json({
            aiNote: result.aiNote || result,
            dish,
            city,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('[Global Equivalents Error]:', error);
        res.status(500).json({
            error: 'Failed to generate global equivalents',
            details: error.message
        });
    }
}

module.exports = globalEquivalentsHandler;
