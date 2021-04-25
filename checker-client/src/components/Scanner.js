import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Dialog,
} from "@material-ui/core";

import Navbar from "./Navbar";
import Certificate from "./Certificate";
import Error from "./Error";

import contract from "../libs/contract";
import jwt from "../libs/jwt";
import web3 from "../libs/web3";

const useStyles = makeStyles((theme) => ({
  noMarginPadding: {
    padding: 0,
    margin: 0,
  },
  primary: {
    backgroundColor: "#f50057",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
    margin: "2.5vw",
  },
  qrReader: {
    marginTop: "10vw",
    textAlign: "-webkit-center",
    width: "100vw",
  },
  readerBox: {
    width: "10vw",
    height: "100%",
  },
}));

export default function Scanner() {
  const classes = useStyles();
  const qrRef = useRef(null);

  const [qrData, setQRData] = useState("");
  const [PIN, setPIN] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [parsed, setParsed] = React.useState(null);

  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setQRData(JSON.parse(result));
      setOpen(true);
    }
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const handlePINChange = (event) => {
    setPIN(event.target.value);
  };

  const cleanCertificate = async (tester, patient, certificate) => {
    return {
      tester_node_address: qrData.public_key,
      tester_institution_name: tester.institutionName,
      tester_location: tester.location,
      tester_contact: tester.contact,
      patient_id: await jwt.decrypt(certificate.encryptedPatientId, PIN),
      patient_gender: patient.patientGender,
      patient_age: patient.patientAge,
      patient_home_address: patient.patientAddress,
      certificate_test_taken_timestamp: new Date(
        certificate.testTakenTimestamp
      ),
      certificate_expiry_timestamp: new Date(
        certificate.certificateExpiryTimestamp
      ),
      certificate_test_type: certificate.testType,
      certificate_test_result: certificate.testResult,
      certificate_is_revoked: certificate.isRevoked,
      certificate_external_data_pointer: await jwt.decrypt(
        certificate.encryptedExternalDataPointer,
        PIN
      ),
      certificate_digital_signature: await web3.verify(
        certificate.digitalSignature,
        qrData.public_key
      ),
    };
  };

  const fetchCertificate = async () => {
    //const tester = await contract.getTesterDetail(qrData.public_key);
    //const patient = await contract.getPatientDetail(qrData.certificate_id);
    //const certificate = await contract.getCertificate(qrData.certificate_id);

    const tester = {
      institutionName: "RS. Tester 1",
      location: "Jl. Ganesha No. 10, Bandung",
      contact: "(022) 2500935",
    };

    const patient = {
      patientAge: "22",
      patientGender: "Laki-laki",
      patientAddress: "Jl. Cisitu Indah Gg. Masjid No. 21, Bandung",
    };

    const certificate = {
      certificateExpiryTimestamp: 1619936700000,
      digitalSignature:
        '{"message":"{\\"encrypted_patient_id\\":\\"eyJhbGciOiJIUzI1NiJ9.MzUxNjExMjYxMDk4MDAx.Z541z1HJaXJA8Fq3rxkieiB3oYgBo_IWbJcqMmfJO_0\\",\\"test_taken_timestamp\\":1619334960000,\\"certificate_expiry_timestamp\\":1619939760000,\\"test_type\\":\\"Swab Antigen\\",\\"test_result\\":\\"Negative\\",\\"encrypted_external_data_pointer\\":\\"eyJhbGciOiJIUzI1NiJ9.ZG93bmxvYWQgKDcpLnBuZw.pc-P0XOLb_ogDLgP-yi5OAFM2XX93pyt1cgtHlK-hMM\\",\\"patient_home_address\\":\\"Jl. Cisitu Indah Gg. Masjid No. 21\\",\\"patient_gender\\":\\"Laki-laki\\",\\"patient_age\\":\\"22\\"}","messageHash":"0x4e260819c5bb1549ebbf804081516817b4efc66d6c79453fa33d1081c7be117f","v":"0x1b","r":"0x6c2e45bf5b3574000a91616341e3d4c3d230f0566564b4ecd3defe5667013357","s":"0x085e8b0e2319231440af185e3fdf55430522132c71819a4205cf947156c3115c","signature":"0x6c2e45bf5b3574000a91616341e3d4c3d230f0566564b4ecd3defe5667013357085e8b0e2319231440af185e3fdf55430522132c71819a4205cf947156c3115c1b"}',
      encryptedExternalDataPointer:
        "eyJhbGciOiJIUzI1NiJ9.ZG93bmxvYWQgKDQpLnBuZw.bc8rTziuWkvvv9vjdqvs6ZpkAqLupWf3B1yMjHxa2iw",
      encryptedPatientId:
        "eyJhbGciOiJIUzI1NiJ9.MzUxNjExMjYxMDk4MDAx.Z541z1HJaXJA8Fq3rxkieiB3oYgBo_IWbJcqMmfJO_0",
      testResult: "Negative",
      testTakenTimestamp: 1619331900000,
      testType: "Rapid Antibodi",
      isRevoked: false,
    };

    const correctPIN = await jwt.decrypt(certificate.encryptedPatientId, PIN);

    if (correctPIN) {
      const data = await cleanCertificate(tester, patient, certificate);

      const certificateComponent = (
        <Certificate
          tester_node_address={data.tester_node_address}
          tester_institution_name={data.tester_institution_name}
          tester_location={data.tester_location}
          tester_contact={data.tester_contact}
          patient_id={data.patient_id}
          patient_gender={data.patient_gender}
          patient_age={data.patient_age}
          patient_home_address={data.patient_home_address}
          certificate_test_taken_timestamp={
            data.certificate_test_taken_timestamp
          }
          certificate_expiry_timestamp={data.certificate_expiry_timestamp}
          certificate_test_type={data.certificate_test_type}
          certificate_test_result={data.certificate_test_result}
          certificate_is_revoked={data.certificate_is_revoked}
          certificate_digital_signature={data.certificate_digital_signature}
          certificate_external_data_pointer={
            data.certificate_external_data_pointer
          }
        />
      );
      setParsed(certificateComponent);
    } else {
      const errorComponent = <Error message="PIN yang Anda masukkan salah." />;
      setParsed(errorComponent);
    }
  };

  const handleSubmit = async () => {
    await fetchCertificate();
  };

  return (
    <div>
      {parsed ? (
        parsed
      ) : (
        <div>
          <Navbar />
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Enter PIN</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Masukkan PIN pasien yang akan digunakan untuk mengakses surat
                tes.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="PIN"
                type="password"
                fullWidth
                value={PIN}
                onChange={handlePINChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <div className={classes.noMarginPadding}>
            <Typography variant="h2" className={classes.header}>
              Scan QR Code.
            </Typography>
            <hr className={classes.line} />
            <Grid item className={classes.qrReader}>
              <Button
                className={classes.btn}
                variant="contained"
                color="secondary"
                onClick={onScanFile}
              >
                Scan Qr Code
              </Button>
              <div className={classes.readerBox}>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
                />
              </div>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}
