#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Usage: node split-cards.js <cards.json>');
  console.error('Example: node split-cards.js data/cards/cards.json');
  process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputDir = path.dirname(inputPath);
const setsDir = path.join(path.dirname(outputDir), 'sets');

if (!fs.existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(inputPath, 'utf-8');
const data = JSON.parse(fileContent);

if (!data.data || !Array.isArray(data.data)) {
  console.error('Invalid cards.json format: expected { data: [...] }');
  process.exit(1);
}

const cardIds = [];
let setId = null;
let count = 0;

data.data.forEach(card => {
  const { tcgplayer, cardmarket, ...cardWithoutPrices } = card;

  const filename = path.join(outputDir, `${card.id}.json`);
  fs.writeFileSync(filename, JSON.stringify(cardWithoutPrices, null, 2));

  cardIds.push(card.id);
  if (!setId && card.set?.id) {
    setId = card.set.id;
  }
  count++;
});

console.log(`Created ${count} card files in ${outputDir}`);

// Update set file with card references
if (setId) {
  const setFilePath = path.join(setsDir, `${setId}.json`);
  if (fs.existsSync(setFilePath)) {
    const setContent = fs.readFileSync(setFilePath, 'utf-8');
    const setData = JSON.parse(setContent);
    setData.cards = cardIds;
    fs.writeFileSync(setFilePath, JSON.stringify(setData, null, 2));
    console.log(`Updated ${setFilePath} with ${cardIds.length} card references`);
  } else {
    console.warn(`Set file not found: ${setFilePath}`);
  }
}
