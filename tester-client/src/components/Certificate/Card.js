import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import contract from "../../libs/contract";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  revoke: {
    width: "8.7em",
    height: "3em",
    color: "#ffffff",
    backgroundColor: "#f50057",
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    textAlign: "center",
  },
  rightSide: {
    float: "right",
    marginLeft: "5px",
    fontWeight: "bold",
  },
  bottom: {
    marginBottom: "5px",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "bold",
    marginBottom: "22px",
  },
});

export default function CertificateCard(props) {
  const classes = useStyles();

  const revokeCertificate = async () => {
    await contract.revokeTestCertificate(props.certificate_id);

    window.location.reload();
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          className={(classes.pos, classes.center)}
        >
          ID: {props.certificate_id}
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          ID Pasien Terenkripsi:{" "}
          <div className={classes.rightSide}>{props.encrypted_patient_id}</div>
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          Tanggal Tes Dilakukan:{" "}
          <div className={classes.rightSide}>{props.test_taken_timestamp}</div>
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          Tanggal Kadaluarsa Surat Tes:{" "}
          <div className={classes.rightSide}>
            {props.certificate_expiry_timestamp}
          </div>
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          Tipe Tes: <div className={classes.rightSide}>{props.test_type}</div>
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          Hasil Tes:{" "}
          <div className={classes.rightSide}>{props.test_result}</div>
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          Alamat Pasien:{" "}
          <div className={classes.rightSide}>{props.patient_home_address}</div>
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          Jenis Kelamin Pasien:{" "}
          <div className={classes.rightSide}>{props.patient_gender}</div>
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          Umur Pasien:{" "}
          <div className={classes.rightSide}>{props.patient_age}</div>
        </Typography>
      </CardContent>
      <CardActions className={(classes.center, classes.bottom)}>
        <div>
          {" "}
          {props.is_revoked ? (
            <Typography variant="body2" component="h1">
              <div className={classes.bold}>Surat telah dicabut!</div>
            </Typography>
          ) : (
            <Button className={classes.revoke} onClick={revokeCertificate}>
              Cabut Surat
            </Button>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
