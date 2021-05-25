import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Cookies from "universal-cookie";

import ConnectWallet from "./ConnectWallet";

import Logo from "../assets/logo.png";

import contract from "../libs/contract";

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

const cookie = new Cookies();

export default function Navbar() {
  const classes = useStyles();

  const [isTester, setIsTester] = useState(false);
  const [isAuthority, setIsAuthority] = useState(false);
  const [account, setAccount] = useState(null);

  const fetchIsTester = async () => {
    if (account) {
      const tester = await contract.isTester(account);
      setIsTester(tester);
    }
  };

  const fetchIsAuthority = async () => {
    if (account) {
      const authority = await contract.isAuthority(account);
      setIsAuthority(authority);
    }
  };

  const fetchAccount = () => {
    const acc = cookie.get("account");
    setAccount(acc);
  };

  useEffect(() => {
    fetchAccount();
    fetchIsTester();
    fetchIsAuthority();
  });

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
              Tester Registry
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.end_item}
          ></Typography>
          <Link to="/verify" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.nav_button}
            >
              Verify Tester
            </Button>
          </Link>
          <Link to="/registration" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              className={
                (classes.nav_button,
                account == null || isTester ? classes.hidden : "")
              }
            >
              Tester Registration
            </Button>
          </Link>
          <Link to="/approval" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              className={
                (classes.nav_button, !isAuthority ? classes.hidden : "")
              }
            >
              Tester Approval
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
          <ConnectWallet />
        </Toolbar>
      </AppBar>
    </div>
  );
}
