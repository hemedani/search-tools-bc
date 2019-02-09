const bodyParser = require("body-parser");
const EncryptContoller = require("./controllers/EncryptController");
const jsonParser = bodyParser.json();

module.exports = app => {
  // Encrypt & Decrypt
  app.post("/crypto/encrypt", jsonParser, EncryptContoller.encryotText);
  app.post("/crypto/decrypt", jsonParser, EncryptContoller.decryptText);
};
