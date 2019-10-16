import React from "react";
import PleaseSignIn from "../components/PleaseSignIn";
import Permissions from "../components/Permissions";

const permissions = () => {
  return (
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  );
};

export default permissions;
