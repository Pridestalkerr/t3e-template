import express from "express";
import next from "next";
import http from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = express();

  // Handle Next.js rendering
  server.get("*", (req, res) => {
    void handle(req, res);
  });

  // Set up the HTTP server and Socket.IO
  const httpServer = http.createServer(server);

  // Start the server
  const port = process.env.PORT || 3000;
  httpServer.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
