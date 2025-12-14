#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cardsDir = path.join(__dirname, '../data/cards');
const outputPath = path.join(__dirname, '../data/cards-index.json');

console.log('Reading card files from:', cardsDir);

const cardFiles = fs.readdirSync(cardsDir).filter(f => f.endsWith('.json'));
console.log('Found', cardFiles.length, 'JSON files');

const index = [];
let skipped = 0;

for (const file of cardFiles) {
  const filePath = path.join(cardsDir, file);
  const card = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Skip files that are not individual cards (e.g., bulk data files)
  if (!card.id || !card.name) {
    skipped++;
    continue;
  }

  // Use short keys to reduce file size
  const entry = {
    i: card.id,
    n: card.name,
    si: card.set ? card.set.id : '',
    sn: card.set ? card.set.name : '',
    sr: card.set ? card.set.series : '',
    t: card.types || [],
    st: card.supertype || '',
    sb: card.subtypes || [],
    r: card.rarity || '',
    nr: card.number || ''
  };

  index.push(entry);
}

console.log('Skipped', skipped, 'non-card files');

// Sort by setId, then by card number
index.sort(function(a, b) {
  if (a.si !== b.si) {
    return a.si.localeCompare(b.si);
  }
  return parseInt(a.nr) - parseInt(b.nr);
});

console.log('Writing index with', index.length, 'cards');
console.log('First entry:', JSON.stringify(index[0]));

fs.writeFileSync(outputPath, JSON.stringify(index));

const stats = fs.statSync(outputPath);
console.log('Done! Index size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
