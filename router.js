const bodyParser = require("body-parser");
const EncryptContoller = require("./controllers/EncryptController");
const jsonParser = bodyParser.json();

module.exports = app => {
  // Encrypt & Decrypt
  app.post("/api/crypto/encrypt", jsonParser, EncryptContoller.encryotText);
  app.post("/api/crypto/decrypt", jsonParser, EncryptContoller.decryptText);
};
