import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";
import Card from "./Card";

import contract from "../../libs/contract";

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
}));

export default function Certificates(props) {
  const [certs, setCerts] = useState([]);

  const classes = useStyles();

  const fetchCert = async () => {
    const certAmount = await contract.getCertificateAmountByTester();

    console.log(certAmount);

    const certificates = [];
    for (let i = 0; i < certAmount; i++) {
      const certificate = {};
      certificate.certificate_id = await contract.getCertificateId(i);

      console.log(certificate);

      const cert = await contract.getCertificate(certificate.certificate_id);

      console.log(cert);

      certificates[i] = certificate;
    }

    setCerts(certificates);
  };

  useEffect(() => {
    fetchCert();
  }, []);

  return (
    <div>
      <Navbar />
      <Typography variant="h2" className={classes.header}>
        Certificates. <Link to="/certificates/create">Issue Certificate?</Link>
      </Typography>
      <hr className={classes.line} />
      <Grid container item xs={12} className={classes.subForm}>
        {certs.map((cert) => (
          <Card
            encrypted_patient_id={cert.encrypted_patient_id}
            test_taken_timestamp={cert.test_taken_timestamp}
            certificate_expiry_timestamp={cert.certificate_expiry_timestamp}
            test_type={cert.test_type}
            test_result={cert.test_result}
            patient_home_address={cert.patient_home_address}
            patient_gender={cert.patient_gender}
            patient_age={cert.patient_age}
          />
        ))}
      </Grid>
    </div>
  );
}
