import React from "react";
import { CircularProgress } from "@material-ui/core";

import Error from "../components/Error";

import metamask from "../libs/metamask";
import contract from "../libs/contract";

export default function handler(Component) {
  class Middleware extends React.Component {
    constructor(props) {
      super(props);
      const metamaskAvailability = metamask.isAvailable();

      this.state = { metamaskAvailability, isTester: false, loading: true };
    }

    componentDidMount() {
      const checkTester = async () => {
        this.setState({
          isTester: await contract.isTester(),
          loading: false,
        });
      };
      checkTester();
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

      if (!this.state.isTester) {
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
