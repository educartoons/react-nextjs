import React, { Component } from "react";
import formatMonet from "../lib/formatMoney";
import Form from "./styles/Form";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeimage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeimage: $largeimage
    ) {
      id
      title
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeimage: "",
    price: 0
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };
  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "billabong");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dowafljsv/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeimage: file.eager[0].secure_url
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();

              const res = await createItem();
              console.log(res);
              Router.push({
                pathname: "/item",
                query: {
                  id: res.data.createItem.id
                }
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  id="file"
                  placeholder="Upload an image"
                  type="file"
                  name="file"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload preview"
                  />
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  id="title"
                  placeholder="Title"
                  type="text"
                  name="title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  id="price"
                  placeholder="Price"
                  type="number"
                  name="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  placeholder="Description"
                  name="description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
