import { writeFileSync } from 'fs';

import { bootstrap } from './bootstrap';

/**
 * Generate the OpenAPI document with the api specification
 * It is used later on to create the client libraries
 * Use "npm run generate-openapi-doc"
 */

async function generateApiDoc() {
  const { document } = await bootstrap();

  const path = './output/openapi.json';

  writeFileSync(path, JSON.stringify(document), { flag: 'w' });
}

generateApiDoc();

setTimeout(() => {
  process.exit();
}, 3000);
