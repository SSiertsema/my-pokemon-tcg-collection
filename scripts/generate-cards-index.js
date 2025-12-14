#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cardsDir = path.join(__dirname, '../data/cards');
const outputPath = path.join(__dirname, '../data/cards-index.json');

console.log('Reading card files...');

const cardFiles = fs.readdirSync(cardsDir).filter(f => f.endsWith('.json'));
console.log(`Found ${cardFiles.length} card files`);

const index = [];

for (const file of cardFiles) {
  const filePath = path.join(cardsDir, file);
  const card = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Use short keys to reduce file size
  // i=id, n=name, si=setId, sn=setName, sr=series, t=types, st=supertype, sb=subtypes, r=rarity, nr=number
  // Image URL can be constructed from setId and number: https://images.pokemontcg.io/{setId}/{number}.png
  index.push({
    i: card.id,
    n: card.name,
    si: card.set?.id || '',
    sn: card.set?.name || '',
    sr: card.set?.series || '',
    t: card.types || [],
    st: card.supertype || '',
    sb: card.subtypes || [],
    r: card.rarity || '',
    nr: card.number || ''
  });
}

// Sort by setId, then by number
index.sort((a, b) => {
  if (a.si !== b.si) {
    return a.si.localeCompare(b.si);
  }
  return parseInt(a.nr) - parseInt(b.nr);
});

console.log(`Writing index with ${index.length} cards...`);
fs.writeFileSync(outputPath, JSON.stringify(index, null, 0));

const stats = fs.statSync(outputPath);
console.log(`Done! Index size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
