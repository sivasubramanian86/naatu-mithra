const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const KIRO_DIR = path.join(__dirname, '../../../.kiro');

const parseMarkdownSection = (filePath, sectionHeader) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const sections = content.split('## ');
        const section = sections.find(s => s.startsWith(sectionHeader));

        if (!section) return [];

        // Simple parser for bullet points
        return section
            .split('\n')
            .filter(line => line.trim().startsWith('- '))
            .map(line => {
                const parts = line.replace('- ', '').split(': ');
                const phrase = parts[0]?.replace(/\*\*/g, '').trim();
                const rest = parts[1]?.split('.');
                const meaning = rest?.[0]?.trim();
                const emoji = line.match(/[\u{1F300}-\u{1F6FF}]/u)?.[0] || '📍';
                return { phrase, meaning, emoji };
            });
    } catch (err) {
        console.error(`Error parsing ${filePath}:`, err);
        return [];
    }
};

const getSlangByCity = async (cityId) => {
    const filePath = path.join(KIRO_DIR, 'slang.md');
    const cityNameMap = {
        'blr': 'Bengaluru',
        'bom': 'Mumbai',
        'del': 'Delhi',
        'maa': 'Chennai'
        // ... add more or lookup from product.md
    };
    const cityName = cityNameMap[cityId.toLowerCase()] || cityId;
    return parseMarkdownSection(filePath, cityName);
};

module.exports = {
    getSlangByCity
};
