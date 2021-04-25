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

import contract from "../libs/contract";

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

  const cleanCertificate = () => {
    return {};
  };

  const fetchCertificate = async () => {
    const tester = await contract.getTesterDetail(qrData.public_key);
    const certificate = await contract.getCertificate(qrData.certificate_id);
    const patient = await contract.getPatientDetail(qrData.certificate_id);
  };

  const handleSubmit = () => {};

  return (
    <div>
      <Navbar />
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter PIN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Masukkan PIN pasien yang akan digunakan untuk mengakses surat tes.
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
  );
}
