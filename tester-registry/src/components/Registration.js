import React, { useState } from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import Navbar from "./Navbar";

import contract from "../libs/contract";

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
  line: {},
}));

const cookie = new Cookies();

export default function Registration(props) {
  const [registered, setRegistered] = useState(false);

  const [formData, setFormData] = useState({
    loading: false,
    error: false,
  });

  const handleNameChange = (event) => {
    setFormData({ ...formData, institution_name: event.target.value });
  };

  const handleAddressChange = (event) => {
    setFormData({ ...formData, location: event.target.value });
  };

  const handleContactChange = (event) => {
    setFormData({ ...formData, contact: event.target.value });
  };

  const postFormData = async () => {
    try {
      const transaction = await contract.register(
        formData,
        cookie.get("account")
      );
      console.log(transaction);

      setRegistered(true);
    } catch (e) {
      throw e;
    }
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
    } catch (e) {
      setFormData({ ...formData, error: true });
    }
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await register();
    } catch (e) {
      console.log(e);
    }
  };

  const classes = useStyles();

  if (registered) return <Redirect to="/" />;
  else
    return (
      <div>
        <Navbar />
        <form className={classes.noMarginPadding} onSubmit={handleSubmitForm}>
          <Typography variant="h2" className={classes.header}>
            Registration.
          </Typography>
          <hr className={classes.line} />
          <Grid container item xs={12} className={classes.subForm}>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                variant="filled"
                id="form-name"
                label="Insitution Name"
                value={formData && formData.institution_name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                variant="filled"
                id="form-address"
                label="Address"
                value={formData && formData.location}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                variant="filled"
                id="form-contact"
                label="Contact"
                value={formData && formData.contact}
                onChange={handleContactChange}
              />
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
                  Register
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    );
}
