import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>E-commerce Website</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
            <a href="/checkout">Checkout</a>
          </nav>
        </header>
        <main>
          <section id="products">
            <h2>Products</h2>
            <ul>
              <li>
                <img src="img/product1.jpg" alt="Product 1">
                <h3>Product 1</h3>
                <p>$100</p>
                <button>Add to Cart</button>
              </li>
              <li>
                <img src="img/product2.jpg" alt="Product 2">
                <h3>Product 2</h3>
                <p>$200</
