import { readFileSync } from 'fs';
import { join } from 'path';

let cachedIndex: unknown = null;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  // Cache the index in memory after first read
  if (!cachedIndex) {
    const filePath = join(config.dataPath, 'cards-index.json');
    cachedIndex = JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  // Set cache headers for browser caching
  setHeader(event, 'Cache-Control', 'public, max-age=3600');

  return cachedIndex;
});
