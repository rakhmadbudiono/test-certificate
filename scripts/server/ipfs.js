const IPFS = require("ipfs-api");

const { IPFS_HOST, IPFS_PORT } = require("../../config");

const ipfs = new IPFS({
  host: IPFS_HOST,
  port: IPFS_PORT,
  protocol: "https",
});

async function upload(file) {
  const trx = await ipfs.files.add(file);

  return trx[0].hash;
}

module.exports = {
  upload,
};
