// backend TBSHB taxi bisim Banovan Hamedan
const express = require("express");
const http = require("http");

const cors = require("cors");

const router = require("./router");

let app = express();

app.use(cors());

const port = process.env.PORT || 1366;
const server = http.createServer(app);

router(app);

server.listen(port);
console.log("Server roye in port ejra shod : ", port);
