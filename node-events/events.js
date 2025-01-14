const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("jamesssss");
});

myEmitter.emit("newSale");

///////////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request recreive");
  res.end("request received");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for request");
});
