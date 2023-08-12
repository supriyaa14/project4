import React, { Component } from "react";
import ReactDOM from "react-dom";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        errors: ["Passwords do not match"],
      });
      return;
    }

    const data = {
      email,
      password,
    };

    fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.props.history.push("/login");
        } else {
          this.setState({
            errors: data.errors,
          });
        }
      });
  }

  render() {
    const { email, password, confirmPassword, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Registration</h3>
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={this.handleChange}
        />
        <input type="submit" value="Register" />
      </form>
    );
  }
}

const App = () => {
  return (
    <div>
      <Registration />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: [],
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    const data = {
      email,
      password,
    };

    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.props.history.push("/");
        } else {
          this.setState({
            errors: data.errors,
          });
