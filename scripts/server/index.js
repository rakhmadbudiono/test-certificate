const fs = require("fs");
const contract = require("./contract");
const ipfs = require("./ipfs");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3003;

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create", async (req, res, next) => {
  try {
    const certificate = {
      encrypted_patient_id: req.body.encrypted_patient_id,
      test_taken_timestamp: req.body.test_taken_timestamp,
      certificate_expiry_timestamp: req.body.certificate_expiry_timestamp,
      test_type: req.body.test_type,
      test_result: req.body.test_result,
      encrypted_external_data_pointer: req.body.encrypted_external_data_pointer,
      patient_home_address: req.body.patient_home_address,
      patient_gender: req.body.patient_gender,
      patient_age: req.body.patient_age,
      additional_info: req.body.additional_info,
      digital_signature: req.body.digital_signature,
    };

    await contract.createTestCertificate(certificate, req.body.address);

    res.status(200).json({ message: "sucessfully create test certificate" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/ipfs", async (req, res, next) => {
  try {
    const data = fs.readFileSync("SuratCovid.pdf");
    await ipfs.upload(data);

    res.status(200).json({ message: "sucessfully upload file to ipfs" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
