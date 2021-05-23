import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
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
  card: {
    margin: "2.5vw",
  },
}));

const cookie = new Cookies();

export default function Certificates(props) {
  const [certs, setCerts] = useState([]);

  const classes = useStyles();

  const hexToDate = (hex) => {
    const text = hex.toString();
    const timestamp = parseInt(text);
    const date = new Date(timestamp);

    return date.toDateString();
  };

  const shortToken = (token) => {
    return `${token.substring(0, 5)}...${token.substring(
      token.length - 5,
      token.length
    )}`;
  };

  const formatCertificate = async (id, cert, detail) => {
    const certificate = {
      certificate_id: id.toString(),
      encrypted_patient_id: shortToken(cert[0]),
      test_taken_timestamp: hexToDate(cert[1]),
      certificate_expiry_timestamp: hexToDate(cert[2]),
      test_type: cert[3],
      test_result: cert[4],
      is_revoked: cert[5],
      patient_home_address: detail[0],
      patient_gender: detail[1],
      patient_age: detail[2].toString(),
    };

    return certificate;
  };

  const fetchCert = async () => {
    const certAmount = await contract.getCertificateAmountByTester(
      cookie.get("account")
    );

    const certificates = [];
    for (let i = 0; i < certAmount; i++) {
      const id = await contract.getCertificateId(i, cookie.get("account"));

      const cert = await contract.getCertificate(id);
      const detail = await contract.getPatientDetail(id);

      certificates[certAmount - i] = await formatCertificate(id, cert, detail);
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
          <div className={classes.card}>
            <Card
              certificate_id={cert.certificate_id}
              encrypted_patient_id={cert.encrypted_patient_id}
              test_taken_timestamp={cert.test_taken_timestamp}
              certificate_expiry_timestamp={cert.certificate_expiry_timestamp}
              test_type={cert.test_type}
              test_result={cert.test_result}
              patient_home_address={cert.patient_home_address}
              patient_gender={cert.patient_gender}
              patient_age={cert.patient_age}
              is_revoked={cert.is_revoked}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
}
