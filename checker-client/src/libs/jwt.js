const jwt = require("jsonwebtoken");

function encrypt(type, payload, key) {
  if (type === "symmetric") {
    return jwt.sign(payload, key);
  } else if (type === "asymmetric") {
    return jwt.sign(payload, key, { algorithm: "RS256" });
  }
}

function decrypt(type, token, key) {
  if (type === "symmetric") {
    return jwt.verify(token, key);
  } else if (type === "asymmetric") {
    return jwt.verify(token, key, { algorithms: ["RS256"] });
  }
}

module.exports = {
  encrypt,
  decrypt,
};
