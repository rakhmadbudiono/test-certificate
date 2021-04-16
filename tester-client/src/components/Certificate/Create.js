import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";

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
}));

export default function Registration(props) {
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
      <form className={classes.noMarginPadding} onSubmit={handleSubmitForm}>
        <Grid container item xs={12} className={classes.subForm}>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-name"
              label="Insitution Name"
              value={formData && formData.institution_name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-address"
              label="Address"
              value={formData && formData.location}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
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
