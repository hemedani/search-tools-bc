const CryptoJS = require("crypto-js"),
  secret = "justsimpletext";

exports.encryotText = (req, res) => {
  const { text } = req.body;
  const encrypted = CryptoJS.AES.encrypt(text, secret).toString();
  const md5 = CryptoJS.MD5(text).toString();
  const sha1 = CryptoJS.SHA1(text).toString();
  const sha256 = CryptoJS.SHA256(text).toString();
  const sha224 = CryptoJS.SHA224(text).toString();
  const sha384 = CryptoJS.SHA384(text).toString();
  const sha3 = CryptoJS.SHA3(text).toString();
  const ripemd160 = CryptoJS.RIPEMD160(text).toString();
  const sha512 = CryptoJS.SHA512(text).toString();

  return res.send({ encrypted, sha1, md5, sha256, sha512, sha224, sha384, sha3, ripemd160, secret });
};

exports.decryptText = (req, res) => {
  const { encrypted } = req.body;
  const decrypted = CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
  return res.send({ decrypted });
};
