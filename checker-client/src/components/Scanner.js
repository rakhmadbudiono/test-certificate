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

  const hexToDate = (hex) => {
    const text = hex.toString();
    const timestamp = parseInt(text);

    return new Date(timestamp);
  };

  const cleanCertificate = async (
    tester,
    patient,
    certificate,
    signature,
    approved
  ) => {
    return {
      tester_node_address: qrData.public_key,
      tester_institution_name: tester[0],
      tester_location: tester[1],
      tester_contact: tester[2],
      patient_id: await jwt.decrypt(certificate[0], PIN),
      patient_gender: patient[1],
      patient_age: patient[2].toString(),
      patient_home_address: patient[0],
      certificate_test_taken_timestamp: hexToDate(certificate[1]),
      certificate_expiry_timestamp: hexToDate(certificate[2]),
      certificate_test_type: certificate[3],
      certificate_test_result: certificate[4],
      certificate_is_revoked: certificate[5],
      certificate_external_data_pointer: await jwt.decrypt(certificate[6], PIN),
      certificate_digital_signature: await verifySignature(
        signature[1].toString(),
        qrData.public_key
      ),
      is_tester_approved: approved,
    };
  };

  const verify = (token) => {
    return jwt.decrypt(token, PIN);
  };

  const verifySignature = (sign, key) => {
    return web3.verify(sign, key);
  };

  const fetchCertificate = async () => {
    const tester = await contract.getTesterDetail(qrData.public_key);
    const approved = await contract.isTesterApproved(qrData.public_key);
    const patient = await contract.getPatientDetail(qrData.certificate_id);
    const certificate = await contract.getCertificate(qrData.certificate_id);
    const signature = await contract.getCertificateDigitalSignature(
      qrData.certificate_id
    );

    const correctPIN = await verify(certificate[0].toString());

    if (correctPIN) {
      const data = await cleanCertificate(
        tester,
        patient,
        certificate,
        signature,
        approved
      );

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
          is_tester_approved={data.is_tester_approved}
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
