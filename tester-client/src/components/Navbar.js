import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import Logo from "../assets/logo.png";

import registryContract from "../libs/tester-registry-contract";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "",
  },
  end_item: {
    flexGrow: 1,
  },
  menu_button: {
    marginRight: theme.spacing(2),
  },
  navbar: {
    backgroundColor: "white",
    marginButton: "20px",
  },
  page_link: {
    margin: "0px 10px",
    color: "#000000",
    cursor: "pointer",
    textDecoration: "none",
  },
  nav_button: {
    margin: "5px",
  },
  hidden: {
    display: "none",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [isTester, setIsTester] = useState(false);

  const fetchIsTester = async () => {
    const tester = await registryContract.isTester();

    setIsTester(tester);
  };

  useEffect(() => {
    fetchIsTester();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar variant="dense">
          <Link to="/">
            <img
              alt="Client Logo"
              src={Logo}
              height="35px"
              style={{ marginRight: "20px", cursor: "pointer" }}
              href="localhost:3000"
            />
          </Link>
          <Typography variant="overline">
            <Link
              smooth
              to="/"
              style={{ textDecoration: "none" }}
              className={classes.page_link}
            >
              Tester Client
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.end_item}
          ></Typography>
          <Link to="/registration" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              className={(classes.nav_button, isTester ? classes.hidden : "")}
            >
              Registration
            </Button>
          </Link>
          <Link to="/certificates" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              className={(classes.nav_button, !isTester ? classes.hidden : "")}
            >
              Certificates
            </Button>
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://metamask.io/download"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              className={(classes.nav_button, isTester ? classes.hidden : "")}
            >
              Download Metamask
            </Button>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}
