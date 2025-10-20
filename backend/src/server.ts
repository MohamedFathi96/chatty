import { createApp } from "./app.ts";
import { connectToDatabase } from "./db/mongoose.ts";
import { config } from "./config/index.ts";
import { logger } from "./lib/logger.ts";

async function start() {
  await connectToDatabase();
  const app = createApp();
  app.listen(config.port, () => {
    logger.info(`Server listening on http://localhost:${config.port}`);
  });
}

start().catch((err) => {
  logger.error("Failed to start server", { err });
  process.exit(1);
});
