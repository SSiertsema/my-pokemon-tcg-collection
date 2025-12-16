import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  const filePath = join(config.dataPath, 'sets.json');
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  return data;
});
