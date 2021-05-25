import React from "react";
import Cookies from "universal-cookie";
import { CircularProgress } from "@material-ui/core";

import Error from "../components/Error";

import metamask from "../libs/metamask";
import contract from "../libs/contract";

const cookie = new Cookies();

export default function handler(Component) {
  class Middleware extends React.Component {
    constructor(props) {
      super(props);
      const metamaskAvailability = metamask.isAvailable();

      this.state = {
        metamaskAvailability,
        isTester: false,
        loading: false,
        account: null,
      };
    }

    componentDidMount() {
      const checkTester = async (acc) => {
        this.setState({
          isTester: await contract.isTester(acc),
          loading: false,
        });
      };

      const account = cookie.get("account");

      if (account) {
        this.setState({
          account: account,
          loading: true,
        });

        checkTester(account);
      }
    }

    render() {
      if (!this.state.metamaskAvailability) {
        return (
          <>
            <Error message="Metamask extension is not available in your browser. Please install the extension to use this application." />
          </>
        );
      }

      if (this.state.loading) {
        return (
          <>
            <CircularProgress />
          </>
        );
      }

      if (!this.state.account) {
        return (
          <>
            <Error message="Please connect your metamask wallet" />
          </>
        );
      }

      if (this.state.account && !this.state.isTester) {
        return (
          <>
            <Error message="Your address is not registered as tester." />
          </>
        );
      }

      return (
        <>
          <Component {...this.props} />
        </>
      );
    }
  }

  return Middleware;
}
