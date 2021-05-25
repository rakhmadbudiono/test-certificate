import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import Navbar from "./Navbar";
import TesterCard from "./TesterCard";

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
}));

export default function Approval() {
  const [tester, setTester] = useState(null);

  const [formData, setFormData] = useState({
    loading: false,
    error: false,
  });

  const handleTextFieldChange = (event) => {
    setFormData({ ...formData, tester_address: event.target.value });
  };

  const postFormData = async () => {
    try {
      const tester = await contract.getTesterDetail(formData.tester_address);
      const approved = await contract.isTesterApproved(formData.tester_address);

      saveTester(tester, approved);
    } catch (e) {
      setTester({
        error: e,
      });

      throw e;
    }
  };

  const saveTester = (tester, approved) => {
    setTester({
      tester_address: formData.tester_address,
      tester_institution_name: tester[0],
      tester_location: tester[1],
      tester_contact: tester[2],
      is_tester_approved: approved,
    });
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

  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <form className={classes.noMarginPadding} onSubmit={handleSubmitForm}>
        <Typography variant="h2" className={classes.header}>
          Approve and Revoke Tester.
        </Typography>
        <hr />
        <div className={classes.searchContainer}>
          <TextField
            className={classes.input}
            variant="filled"
            id="tester-address"
            label="Enter Tester Address"
            value={formData && formData.tester_address}
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
        {tester ? (
          <TesterCard
            tester_address={tester.tester_address}
            tester_institution_name={tester.tester_institution_name}
            tester_location={tester.tester_location}
            tester_contact={tester.tester_contact}
            is_tester_approved={tester.is_tester_approved}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
