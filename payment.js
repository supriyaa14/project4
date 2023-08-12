import React, { Component } from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getCartTotal();
  }

  getCartTotal() {
    fetch("/api/cart/total")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ totalPrice: data.totalPrice });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { totalPrice } = this.state;

    StripeCheckout.open({
      key: "YOUR_STRIPE_KEY",
      amount: totalPrice * 100,
      name: "E-commerce Website",
      description: "Payment for your order",
      currency: "USD",
      email: this.props.user.email,
      success: (data) => {
        this.setState({ isLoading: false });
        alert("Payment successful!");
      },
      error: (error) => {
        this.setState({ isLoading: false });
        alert(error.message);
      },
    });
  }

  render() {
    const { totalPrice, isLoading } = this.state;

    if (isLoading) {
      return (
        <div>
          <h3>Processing payment...</h3>
          <div className="spinner"></div>
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Checkout</h3>
        <div>
          <p>Total price: <strong>$ {totalPrice}</strong></p>
        </div>
        <input type="submit" value="Pay" />
      </form>
    );
  }
}

const App = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Checkout user={user} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
