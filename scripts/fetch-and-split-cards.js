#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';

const setId = process.argv[2];
const apiKey = process.env.POKEMONTCG_API_KEY || '9ccac70d-f279-431e-bac2-086d4846ffe2';

if (!setId) {
  console.error('Usage: node fetch-and-split-cards.js <setId>');
  console.error('Example: node fetch-and-split-cards.js base1');
  process.exit(1);
}

const dataDir = path.resolve('data');
const cardsDir = path.join(dataDir, 'cards');
const setsDir = path.join(dataDir, 'sets');

// Ensure directories exist
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

console.log(`Fetching cards for set: ${setId}...`);

function fetchCards(setId, retries = 5) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&pageSize=250`;

    const options = {
      headers: {
        'X-Api-Key': apiKey,
        'Accept': 'application/json',
      },
    };

    const req = https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200 && data.length > 100) {
          resolve(JSON.parse(data));
        } else if (retries > 0) {
          console.log(`Retry ${6 - retries}/5 (status: ${res.statusCode}, size: ${data.length})...`);
          setTimeout(() => {
            fetchCards(setId, retries - 1).then(resolve).catch(reject);
          }, 3000);
        } else {
          reject(new Error(`Failed to fetch cards: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      if (retries > 0) {
        console.log(`Retry ${6 - retries}/5 (error: ${err.message})...`);
        setTimeout(() => {
          fetchCards(setId, retries - 1).then(resolve).catch(reject);
        }, 3000);
      } else {
        reject(err);
      }
    });
  });
}

try {
  const data = await fetchCards(setId);

  if (!data.data || !Array.isArray(data.data)) {
    console.error('Invalid API response: expected { data: [...] }');
    process.exit(1);
  }

  console.log(`Received ${data.data.length} cards`);

  // Save raw response
  const cardsJsonPath = path.join(cardsDir, `${setId}-cards.json`);
  fs.writeFileSync(cardsJsonPath, JSON.stringify(data, null, 2));
  console.log(`Saved raw response to ${cardsJsonPath}`);

  // Split into individual files
  const cardIds = [];

  data.data.forEach((card) => {
    const { tcgplayer, cardmarket, ...cardWithoutPrices } = card;

    const filename = path.join(cardsDir, `${card.id}.json`);
    fs.writeFileSync(filename, JSON.stringify(cardWithoutPrices, null, 2));
    cardIds.push(card.id);
  });

  console.log(`Created ${cardIds.length} card files in ${cardsDir}`);

  // Update set file with card references
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

  console.log('Done!');
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
