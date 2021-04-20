import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import Navbar from "../Navbar";

import registryContract from "../../libs/tester-registry-contract";

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
  const [formData, setFormData] = useState({
    loading: false,
    error: false,
  });

  const postFormData = () => {
    return registryContract.register(formData);
  };

  const register = async () => {
    try {
      setFormData({ ...formData, loading: true });

      await postFormData();

      await setTimeout(async function () {
        setFormData({
          ...formData,
          loading: false,
        });
      }, 3000);

      // window.location.reload();
    } catch (e) {
      setFormData({ ...formData, error: true });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await register();
  };

  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <form className={classes.noMarginPadding} onSubmit={handleSubmitForm}>
        <Typography variant="h2" className={classes.header}>
          Certificates.{" "}
          <Link to="/certificates/create">Issue Certificate?</Link>
        </Typography>
        <hr className={classes.line} />
        <Grid container item xs={12} className={classes.subForm}></Grid>
      </form>
    </div>
  );
}
