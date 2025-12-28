const controller = require('../mcp/controller');

const mindmap = async (req, res) => {
    const { city, local_dish, choice } = req.body;

    try {
        const context = { city, text: `Generate mindmap for ${local_dish}`, local_dish };
        const result = await controller.executeTask('mindmap_generation', context, choice);

        res.json({
            nodes: [
                { id: '1', data: { label: local_dish }, position: { x: 250, y: 5 } },
                { id: '2', data: { label: 'Global Equivalent' }, position: { x: 100, y: 100 } },
                { id: '3', data: { label: 'Key Ingredients' }, position: { x: 400, y: 100 } },
            ],
            edges: [
                { id: 'e1-2', source: '1', target: '2' },
                { id: 'e1-3', source: '1', target: '3' },
            ],
            aiNote: result
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = mindmap;
