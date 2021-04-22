import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  },
});

export default function CertificateCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.pos}>
          ID: {props.encrypted_patient_id}
        </Typography>
        <Typography variant="body2" component="p">
          Tanggal Tes Dilakukan: {props.test_taken_timestamp}
        </Typography>
        <Typography variant="body2" component="p">
          Tanggal Kadaluarsa Surat Tes: {props.certificate_expiry_timestamp}
        </Typography>
        <Typography variant="body2" component="p">
          Tipe Tes: {props.test_type}
        </Typography>
        <Typography variant="body2" component="p">
          Hasil Tes: {props.test_result}
        </Typography>
        <Typography variant="body2" component="p">
          Alamat Pasien: {props.patient_home_address}
        </Typography>
        <Typography variant="body2" component="p">
          Jenis Kelamin Pasien: {props.patient_gender}
        </Typography>
        <Typography variant="body2" component="p">
          Umur Pasien: {props.patient_age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={classes.revoke}>Cabut Surat</Button>
      </CardActions>
    </Card>
  );
}
