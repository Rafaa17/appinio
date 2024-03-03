import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { bootstrap } from './bootstrap';

const port = 8000;

async function main() {
  const { app, document } = await bootstrap();

  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.debug(`Listening on port ${port}`);
}

main();
