function isAvailable() {
  return "ethereum" in window && "isMetaMask" in window.ethereum;
}

module.exports = {
  isAvailable,
};
