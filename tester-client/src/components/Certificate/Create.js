import React, { useState } from "react";
import QRCode from "qrcode";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Error from "../Error";
import Navbar from "../Navbar";

import { REGISTRY_CONTRACT } from "../../../../config";
import certificateContract from "../../libs/test-certificate-contract";
import jwt from "../../libs/jwt";
import web3 from "../../libs/web3";

const useStyles = makeStyles((theme) => ({
  noMarginPadding: {
    padding: 0,
    margin: 0,
  },
  subForm: {
    height: "100%",
  },
  input: {
    width: "80%",
    marginTop: theme.spacing(4),
    marginLeft: "5vw",
  },
  primary: {
    backgroundColor: "#f50057",
  },
  registerContainer: {
    marginTop: theme.spacing(5),
    width: "90%",
  },
  register: {
    width: "8.7em",
    height: "3em",
    color: "#ffffff",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
    margin: "2.5vw",
  },
  uploadContainer: {
    marginTop: theme.spacing(4),
    marginLeft: "5vw",
    flexFlow: "row",
  },
  uploadButton: {
    marginTop: theme.spacing(4),
  },
  hidden: {
    display: "none",
  },
  closeIcon: {
    placeSelf: "flex-end",
  },
}));

export default function Registration(props) {
  const [formData, setFormData] = useState({
    loading: false,
    error: false,
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const [testTakenTimestamp, setTestTakenTimestamp] = useState(new Date());

  const [qrCode, setQRCode] = useState(null);

  const handleIdChange = (event) => {
    setFormData({ ...formData, id: event.target.value });
  };

  const handleTestTakenTimestampChange = (date) => {
    setTestTakenTimestamp(date);
    setFormData({ ...formData, test_taken_timestamp: Date.parse(date) });
  };

  const handleExpiryTimestampChange = (event) => {
    setFormData({ ...formData, expire_in: event.target.value });

    setFormData({
      ...formData,
      expiry_timestamp:
        formData.test_taken_timestamp + event.target.value * 24 * 3600000,
    });
  };

  const handleTestTypeChange = (event) => {
    setFormData({ ...formData, test_type: event.target.value });
  };

  const handleTestResultChange = (event) => {
    setFormData({ ...formData, test_result: event.target.value });
  };

  const handleExternalDataChange = (file) => {
    setFormData({ ...formData, external_data: file });
    setFormData({ ...formData, filename: file.name });
  };

  const handlePatientAddressChange = (event) => {
    setFormData({ ...formData, patient_address: event.target.value });
  };

  const handlePatientGenderChange = (event) => {
    setFormData({ ...formData, patient_gender: event.target.value });
  };

  const handlePatientAgeChange = (event) => {
    setFormData({ ...formData, patient_age: event.target.value });
  };

  const handleAdditionalInfoChange = (event) => {
    setFormData({ ...formData, additional_info: event.target.value });
  };

  const handlePINChange = (event) => {
    setFormData({ ...formData, PIN: event.target.value });
  };

  const postFormData = (data) => {
    return certificateContract.createTestCertificate(data);
  };

  const createCertificate = async (data) => {
    try {
      setFormData({ ...formData, loading: true });

      await postFormData(data);

      await setTimeout(async function () {
        setFormData({
          ...formData,
          loading: false,
        });
      }, 3000);
    } catch (e) {
      setFormData({ ...formData, error: true });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const data = await cleanData(formData);

    await createCertificate(data);
    await setupQRCode();
  };

  const cleanData = async (data) => {
    const clean = {
      encrypted_patient_id: await jwt.encrypt("symmetric", data.id, data.PIN),
      test_taken_timestamp: data.test_taken_timestamp,
      certificate_expiry_timestamp: data.expiry_timestamp,
      test_type: data.test_type,
      test_result: data.test_result,
      encrypted_external_data_pointer: await jwt.encrypt(
        "symmetric",
        data.filename,
        data.PIN
      ),
      patient_home_address: data.patient_address,
      patient_gender: data.patient_gender,
      patient_age: data.patient_age,
    };

    clean.digital_signature = await web3.sign(clean);

    return clean;
  };

  const setupQRCode = async () => {
    const qrData = {
      encrypted_patient_id: formData.encrypted_patient_id,
      public_key: REGISTRY_CONTRACT,
    };
    const qr = await QRCode.toDataURL(JSON.stringify(qrData));

    setQRCode(qr);
  };

  const classes = useStyles();

  return (
    <div>
      {!qrCode ? (
        <div>
          <Navbar />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
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
                fullWidth
                value={formData && formData.PIN}
                onChange={handlePINChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmitForm} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <form className={classes.noMarginPadding} onSubmit={handleOpen}>
            <Typography variant="h2" className={classes.header}>
              Create Certificate.
            </Typography>
            <hr className={classes.line} />
            <Grid container item xs={12} className={classes.subForm}>
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  variant="filled"
                  id="form-id"
                  label="Nomor Identitas"
                  value={formData && formData.id}
                  onChange={handleIdChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  className={classes.noMarginPadding}
                >
                  <KeyboardDatePicker
                    className={classes.input}
                    id="form-test-taken-timestamp"
                    label="Tanggal Tes Diambil"
                    format="MM/dd/yyyy"
                    value={testTakenTimestamp}
                    onChange={handleTestTakenTimestampChange}
                    variant="inline"
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  variant="filled"
                  id="form-expiry-timestamp"
                  label="Masa Berlaku Tes (dalam satuan hari)"
                  value={formData && formData.expire_in}
                  type="number"
                  onChange={handleExpiryTimestampChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  className={classes.input}
                  variant="filled"
                  id="form-test-type"
                  label="Tipe Tes Kit"
                  value={formData && formData.test_type}
                  onChange={handleTestTypeChange}
                >
                  {["Rapid Antibodi", "Swab Antigen", "PCR"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  className={classes.input}
                  variant="filled"
                  id="form-test-result"
                  label="Test Result"
                  value={formData && formData.test_result}
                  onChange={handleTestResultChange}
                >
                  {["Positive", "Negative"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  variant="filled"
                  id="form-patient-address"
                  label="Alamat Pasien"
                  value={formData && formData.patient_address}
                  onChange={handlePatientAddressChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  className={classes.input}
                  variant="filled"
                  id="form-patient-gender"
                  label="Jenis Kelamin Pasien"
                  value={formData && formData.patient_gender}
                  onChange={handlePatientGenderChange}
                >
                  {["Laki-laki", "Perempuan"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  variant="filled"
                  id="form-patient-age"
                  label="Umur Pasien"
                  type="number"
                  value={formData && formData.patient_age}
                  onChange={handlePatientAgeChange}
                />
              </Grid>{" "}
              <Grid item xs={6}>
                <TextField
                  className={classes.input}
                  variant="filled"
                  id="form-additional-info"
                  label="Keterangan Tambahan"
                  value={formData && formData.additional_info}
                  onChange={handleAdditionalInfoChange}
                />
              </Grid>
              <Grid container item xs={6} className={classes.uploadContainer}>
                <Grid container item alignItems="center">
                  <TextField
                    id="form-filename"
                    variant="filled"
                    value={formData ? formData.filename : "Upload File"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  alignItems="center"
                  className={classes.uploadButton}
                >
                  <React.Fragment>
                    <input
                      className={classes.hidden}
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => {
                        handleExternalDataChange(e.target.files[0]);
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="outlined" component="span">
                        Choose File
                      </Button>
                    </label>
                  </React.Fragment>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="flex-end"
                item
                className={classes.registerContainer}
              >
                {formData.loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    className={classes.register + " " + classes.primary}
                  >
                    Create
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <Error message={<img src={qrCode} alt={qrCode} />} />
      )}
    </div>
  );
}
