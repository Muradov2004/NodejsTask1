const http = require("http");
const EventEmitter = require("events");
const encrypt = require("./encrypt");
const emitter = new EventEmitter();

emitter.on("encryptString", async (data) => {
  const value = await encrypt.encryptString(data.password);
  console.log(value);
});

emitter.on("compareString", async (data) => {
  const { originalPassword, hashPassword } = data;
  const value = await encrypt.compareString(originalPassword, hashPassword);
  console.log(value);
});

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/encrypt") {
    let body = "";
    req.on("data", (chunk) => {
      body = chunk.toString();
    });

    req.on("end", () => {
      const stringToEncrypt = JSON.parse(body);
      emitter.emit("encryptString", stringToEncrypt);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "success" }));
    });
  } else if (req.method === "POST" && req.url === "/compare") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      emitter.emit("compareString", data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "success" }));
    });
  } else {
    res.writeHead(404);
  }
});

server.listen(5000, () => {
  console.log("server started at 5000");
});
