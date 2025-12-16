import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const cardIds: string[] = body?.ids || [];

  if (!Array.isArray(cardIds) || cardIds.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Card IDs array is required',
    });
  }

  const cards = cardIds
    .map((id) => {
      const filePath = join(config.dataPath, 'cards', `${id}.json`);
      if (!existsSync(filePath)) {
        return null;
      }
      return JSON.parse(readFileSync(filePath, 'utf-8'));
    })
    .filter(Boolean);

  return cards;
});
