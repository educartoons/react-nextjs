import React, { Component } from "react";
import Title from "./styles/Title";
import PriceTag from "./styles/Price";
import ItemStyles from "./styles/ItemStyles";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";

class Item extends Component {
  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: "/item",
              query: {
                id: item.id
              }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "/update",
              query: {
                id: item.id
              }
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <button>Add to Cart ➕</button>
          <DeleteItem id={item.id}>Delete 🛑</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
