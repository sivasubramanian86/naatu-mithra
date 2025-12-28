const fs = require('fs');
const path = require('path');

const KIRO_DIR = path.join(__dirname, '../.kiro');
const SCHEMA_FILE = path.join(KIRO_DIR, 'schema.md');

const validate = () => {
    console.log('--- NaatuMithra KB Validation ---');

    const files = fs.readdirSync(KIRO_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    mdFiles.forEach(file => {
        const content = fs.readFileSync(path.join(KIRO_DIR, file), 'utf8');
        if (content.length > 0) {
            console.log(`[PASS] ${file} - Content found.`);
        } else {
            console.log(`[FAIL] ${file} - File is empty.`);
        }
    });

    console.log('\nValidation complete.');
};

validate();
