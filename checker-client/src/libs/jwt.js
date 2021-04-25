const jwt = require("jsonwebtoken");

function encrypt(payload, key) {
  return jwt.sign(payload, key);
}

function decrypt(token, key) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, key, function (err, result) {
      if (err) {
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  encrypt,
  decrypt,
};
