import * as path from 'path';
import * as express from 'express';
import * as WebSocket from 'ws';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Import demo room handlers
import { StateHandlerRoom } from "./room/state-handler";

const port = Number(process.env.PORT || 3553);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  engine: WebSocket.Server,
  server: createServer(app)
});

// Register StateHandlerRoom as "state_handler"
gameServer.register("state_handler", StateHandlerRoom);


app.use('/', express.static(path.join(__dirname, "static")));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);
console.log(`Listening on http://localhost:${ port }`);
