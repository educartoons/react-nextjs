import React from "react";
import UpdateItem from "../components/UpdateItem";

const updateItem = props => {
  return (
    <div>
      <UpdateItem id={props.query.id} />
    </div>
  );
};

export default updateItem;
