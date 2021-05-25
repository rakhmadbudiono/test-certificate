import React from "react";

import Error from "../components/Error";

import metamask from "../libs/metamask";

export default function handler(Component) {
  class Middleware extends React.Component {
    constructor(props) {
      super(props);
      const metamaskAvailability = metamask.isAvailable();

      this.state = { metamaskAvailability };
    }

    render() {
      if (!this.state.metamaskAvailability) {
        return (
          <>
            <Error message="Metamask extension is not available in your browser. Please install the extension to use this application." />
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
