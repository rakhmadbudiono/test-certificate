import React from "react";
import { CircularProgress } from "@material-ui/core";

import Error from "../components/Error";
import Registration from "../components/Registration";

import metamask from "../libs/metamask";
import registryContract from "../libs/tester-registry-contract";

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
          isTester: await registryContract.isTester(),
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
            <Error
              message="Your address is not registered as tester."
              testerError={true}
            />
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
