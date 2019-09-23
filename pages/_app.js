import App, { Container } from "next/app";
import Page from "./Page";

class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <p>Hola a todos sharing! </p>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
