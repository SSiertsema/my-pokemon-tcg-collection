#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';

const setId = process.argv[2];

if (!setId) {
  console.error('Usage: node download-set-images.js <setId>');
  console.error('Example: node download-set-images.js base1');
  process.exit(1);
}

const dataDir = path.resolve('data');
const publicDir = path.resolve('app/public/images');
const smallDir = path.join(publicDir, 'small');
const largeDir = path.join(publicDir, 'large');

// Ensure directories exist
[smallDir, largeDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Load set file to get card IDs
const setFilePath = path.join(dataDir, 'sets', `${setId}.json`);
if (!fs.existsSync(setFilePath)) {
  console.error(`Set file not found: ${setFilePath}`);
  process.exit(1);
}

const setData = JSON.parse(fs.readFileSync(setFilePath, 'utf-8'));
if (!setData.cards || setData.cards.length === 0) {
  console.error(`No cards found in set ${setId}`);
  process.exit(1);
}

console.log(`Downloading images for ${setData.cards.length} cards from set: ${setId}`);

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      resolve('skipped');
      return;
    }

    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve('downloaded');
        });
      } else {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function downloadCardImages(cardId) {
  // Load card to get image URLs
  const cardFilePath = path.join(dataDir, 'cards', `${cardId}.json`);
  if (!fs.existsSync(cardFilePath)) {
    console.warn(`  Card file not found: ${cardId}`);
    return { small: 'missing', large: 'missing' };
  }

  const card = JSON.parse(fs.readFileSync(cardFilePath, 'utf-8'));
  const results = { small: 'failed', large: 'failed' };

  // Download small image
  if (card.images?.small) {
    try {
      const smallPath = path.join(smallDir, `${cardId}.png`);
      results.small = await downloadImage(card.images.small, smallPath);
    } catch (err) {
      console.warn(`  Failed to download small image for ${cardId}: ${err.message}`);
    }
  }

  // Download large image
  if (card.images?.large) {
    try {
      const largePath = path.join(largeDir, `${cardId}.png`);
      results.large = await downloadImage(card.images.large, largePath);
    } catch (err) {
      console.warn(`  Failed to download large image for ${cardId}: ${err.message}`);
    }
  }

  return results;
}

// Process cards with concurrency limit
const concurrency = 5;
let downloaded = 0;
let skipped = 0;
let failed = 0;

async function processCards(cardIds) {
  for (let i = 0; i < cardIds.length; i += concurrency) {
    const batch = cardIds.slice(i, i + concurrency);
    const results = await Promise.all(batch.map(downloadCardImages));

    results.forEach((result, idx) => {
      const cardId = batch[idx];
      if (result.small === 'downloaded' || result.large === 'downloaded') {
        downloaded++;
        process.stdout.write(`\r  Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`);
      } else if (result.small === 'skipped' && result.large === 'skipped') {
        skipped++;
        process.stdout.write(`\r  Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`);
      } else {
        failed++;
        process.stdout.write(`\r  Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`);
      }
    });
  }
}

await processCards(setData.cards);

console.log(`\n\nDone! Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
