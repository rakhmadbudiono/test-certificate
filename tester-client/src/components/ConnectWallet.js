import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useWallet, UseWalletProvider } from "use-wallet";
import Cookies from "universal-cookie";

import config from "../../../config";

const useStyles = makeStyles((theme) => ({
  nav_button: {
    margin: "5px",
  },
}));

const cookie = new Cookies();

function ConnectWallet() {
  const classes = useStyles();
  const wallet = useWallet();

  const [status, setStatus] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    await wallet.connect();
  };

  const logout = (e) => {
    e.preventDefault();
    wallet.reset();

    cookie.remove("account");

    window.location.reload();
  };

  useEffect(() => {
    const account = cookie.get("account");

    if (!account && wallet.status === "connected") {
      cookie.set("account", wallet.account);
    }

    setStatus(cookie.get("account") != null);
  });

  return (
    <div>
      {status ? (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.nav_button}
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.nav_button}
          onClick={login}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default () => (
  <UseWalletProvider
    chainId={config.CHAIN_ID}
    connectors={{
      provided: { provider: window.cleanEthereum },
    }}
  >
    <ConnectWallet />
  </UseWalletProvider>
);
