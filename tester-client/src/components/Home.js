import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid } from "@material-ui/core";

import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 15px",
  },
  grid_container: {
    padding: "10vh 0",
  },
  header: {
    textAlign: "center",
    minHeight: "70vh",
  },
  tagline_title: {
    fontWeight: "bold",
    marginBottom: "5vh",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <Container className={classes.container}>
        <Grid
          container
          id="header"
          direction="column"
          justify="space-evenly"
          alignItems="center"
          className={` ${classes.grid_container} ${classes.header}`}
        >
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.tagline_title}>
              Tester Client.
            </Typography>
            <Typography variant="h5">
              Register your node address and create immutable test certificate.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          id="about-sec"
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.grid_container}
        ></Grid>
      </Container>
    </div>
  );
}
