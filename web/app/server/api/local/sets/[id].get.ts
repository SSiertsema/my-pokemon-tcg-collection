import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Set ID is required',
    });
  }

  const filePath = join(config.dataPath, 'sets', `${id}.json`);

  if (!existsSync(filePath)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Set not found: ${id}`,
    });
  }

  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  return data;
});
