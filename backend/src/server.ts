import { createApp } from "./app.ts";
import { connectToDatabase } from "./db/mongoose.ts";
import { config } from "./config/index.ts";
import { logger } from "./lib/logger.ts";
import { createServer } from "http";
import { initializeWebSocketService } from "./services/websocket.service.ts";

async function start() {
  await connectToDatabase();
  const app = createApp();
  
  // Create HTTP server
  const server = createServer(app);
  
  // Initialize WebSocket service
  const webSocketService = initializeWebSocketService(server);
  logger.info("WebSocket service initialized");
  
  server.listen(config.port, () => {
    logger.info(`Server listening on http://localhost:${config.port}`);
    logger.info(`WebSocket server ready for connections`);
  });
}

start().catch((err) => {
  logger.error("Failed to start server", { err });
  process.exit(1);
});
