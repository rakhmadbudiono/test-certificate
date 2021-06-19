import React, { useState } from "react";
import Cookies from "universal-cookie";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
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
    textAlign: "center",
  },
  input: {
    width: "75%",
    marginLeft: "5vw",
    marginRight: "5vw",
  },
  primary: {
    backgroundColor: "#f50057",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    marginTop: theme.spacing(4),
  },
  search: {
    width: "8.7em",
    height: "3em",
    color: "#ffffff",
    marginTop: "0.5vh",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
    margin: "2.5vw",
  },
  card: {
    margin: "2.5vw",
    marginLeft: "20vw",
    marginRight: "20vw",
  },
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
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
  button: {
    width: "8.7em",
    height: "3em",
    color: "#ffffff",
    backgroundColor: "#f50057",
    textAlign: "center",
  },
}));

export default function Authority() {
  const [authority, setAuthority] = useState(null);

  const [formData, setFormData] = useState({
    loading: false,
    error: false,
  });

  const handleTextFieldChange = (event) => {
    setFormData({ ...formData, authority_address: event.target.value });
  };

  const postFormData = async () => {
    try {
      const isAuthority = await contract.isAuthority(
        formData.authority_address
      );

      saveAuthority(isAuthority);
    } catch (e) {
      setAuthority({
        error: e,
      });

      throw e;
    }
  };

  const saveAuthority = (isAuthority) => {
    setAuthority({ is_authority: isAuthority });
  };

  const search = async () => {
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
      await search();
    } catch (e) {
      console.log(e);
    }
  };

  const addAuthority = async () => {
    await contract.addAuthority(
      formData.authority_address,
      cookie.get("account")
    );

    window.location.reload();
  };

  const classes = useStyles();

  const cookie = new Cookies();

  return (
    <div>
      <Navbar />
      <form className={classes.noMarginPadding} onSubmit={handleSubmitForm}>
        <Typography variant="h2" className={classes.header}>
          Add Authority.
        </Typography>
        <hr />
        <div className={classes.searchContainer}>
          <TextField
            className={classes.input}
            variant="filled"
            id="authority-address"
            label="Enter Authority Address"
            value={formData && formData.authority_address}
            onChange={handleTextFieldChange}
          />
          <div>
            {formData.loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                className={classes.search + " " + classes.primary}
              >
                Search
              </Button>
            )}
          </div>
        </div>
      </form>
      <div className={classes.card}>
        {authority ? (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={(classes.pos, classes.center)}
              >
                Address: {formData.authority_address}
              </Typography>
              <hr />
              <Typography variant="body2" component="p">
                Role:{" "}
                <div className={classes.rightSide}>
                  {authority.is_authority ? "Authority" : "Not Authority"}
                </div>
              </Typography>
            </CardContent>
            <CardActions className={(classes.center, classes.bottom)}>
              <div>
                {" "}
                {!authority.is_authority ? (
                  <Button className={classes.button} onClick={addAuthority}>
                    Add
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </CardActions>
          </Card>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
