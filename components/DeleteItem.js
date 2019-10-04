import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Error from "./Error";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  handleClick = async (e, deleteItemMutation) => {
    e.preventDefault();
    console.log("deleting...");
    if (confirm("are you sure ?")) {
      const res = await deleteItemMutation();
    }
  };
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    const items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({
      query: ALL_ITEMS_QUERY,
      data: {
        items: items
      }
    });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { loading, error }) => {
          if (error) return <Error error={error} />;
          return (
            <button onClick={e => this.handleClick(e, deleteItem)}>
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
