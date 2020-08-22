import React, { Component } from "react";
import ReactGA from "react-ga";

export default () => Composed =>  
  class extends Component {
    static async getInitialProps(ctx) {
      const initialProps = Composed.getInitialProps
        ? await Composed.getInitialProps(ctx)
        : {};
      return initialProps;
    }

    componentDidMount() {
      console.log('PAGE VIEW');
      ReactGA.initialize('ID_ANALYTICS');
      ReactGA.pageview(window.location.pathname);
    }

    render() {
      return <Composed {...this.props} />;
    }
  };