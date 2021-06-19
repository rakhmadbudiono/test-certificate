import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { VerifiedUser } from "@material-ui/icons";

import Navbar from "./Navbar";

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
  testerSection: {
    textAlign: "center",
    marginTop: "5vh",
  },
  patientSection: {
    marginTop: "5vh",
    marginRight: "20vw",
    marginLeft: "20vw",
  },
  rightSide: {
    float: "right",
  },
  certificateSection: {
    marginTop: "5vh",
    marginRight: "20vw",
    marginLeft: "20vw",
    marginBottom: "5vh",
  },
  revoked: {
    margin: "5vw",
    textAlign: "center",
  },
  approved: {
    display: "flex",
    placeContent: "center",
  },
  verifiedIcon: {
    marginRight: "1vw",
    fontSize: "36px",
  },
}));

export default function Certificate(props) {
  const classes = useStyles();

  return (
    <div className={classes.noMarginPadding}>
      <Navbar />
      <Typography variant="h2" className={classes.header}>
        Certificate.
      </Typography>
      <Grid item className={classes.qrReader}>
        <div className={classes.testerSection}>
          <Typography variant="h3">{props.tester_institution_name}</Typography>
          <Typography variant="h5">{props.tester_location}</Typography>
          <Typography variant="h5">
            Kontak: {props.tester_contact} | Node Address:{" "}
            {props.tester_node_address}
          </Typography>
          {props.is_tester_approved ? (
            <div className={classes.approved}>
              <VerifiedUser className={classes.verifiedIcon} />
              <Typography variant="h5">Approved by Authority</Typography>
            </div>
          ) : (
            ""
          )}
        </div>
        <hr className={classes.line} />
        <div className={classes.patientSection}>
          <Typography variant="h4">Identitas Pasien</Typography>
          <hr />
          <Typography variant="h5">
            Nomor KTP{" "}
            <div className={classes.rightSide}>{props.patient_id}</div>
          </Typography>
          <hr />
          <Typography variant="h5">
            Umur <div className={classes.rightSide}>{props.patient_age}</div>
          </Typography>
          <hr />
          <Typography variant="h5">
            Jenis Kelamin{" "}
            <div className={classes.rightSide}>{props.patient_gender}</div>
          </Typography>
          <hr />
          <Typography variant="h5">
            Alamat
            <div className={classes.rightSide}>
              {props.patient_home_address}
            </div>
          </Typography>
        </div>
        {props.certificate_is_revoked ? (
          <Typography className={classes.revoked} variant="h4">
            Surat Tes Telah dicabut oleh Pembuat Surat
          </Typography>
        ) : (
          <div className={classes.certificateSection}>
            <Typography variant="h4">Data Tes</Typography>
            <hr />
            <Typography variant="h5">
              Tanggal Tes Diambil{" "}
              <div className={classes.rightSide}>
                {props.certificate_test_taken_timestamp.toDateString()}
              </div>
            </Typography>
            <hr />
            <Typography variant="h5">
              Tanggal Surat Kadaluarsa{" "}
              <div className={classes.rightSide}>
                {props.certificate_expiry_timestamp.toDateString()}
              </div>
            </Typography>
            <hr />
            <Typography variant="h5">
              Jenis Tes
              <div className={classes.rightSide}>
                {props.certificate_test_type}
              </div>
            </Typography>
            <hr />
            <Typography variant="h5">
              Hasil Tes
              <div className={classes.rightSide}>
                {props.certificate_test_result}
              </div>
            </Typography>
            <hr />
            <a target="_blank" href={props.certificate_external_data_pointer}>
              <Typography variant="h5">Dokumen Surat</Typography>
            </a>
            <hr />

            <Typography variant="h5">
              Verifikasi Keasilan Surat{" "}
              <div className={classes.rightSide}>
                {props.certificate_digital_signature ? "ASLI" : "PALSU"}
              </div>
            </Typography>
          </div>
        )}
      </Grid>
    </div>
  );
}
