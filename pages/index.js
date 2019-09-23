import React, { Component } from "react";
import Link from "next/link";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hola alli</h1>
        <Link href="/sell">Ir a Ventas</Link>
      </div>
    );
  }
}

export default Home;
