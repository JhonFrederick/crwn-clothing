import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoole } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({email:"", password: ""})
  }

  handleChange = event => {
    const {value, name} = event.target;
    this.setState({[name]: value})

  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput name="email" type="email"
                     handleChange={this.handleChange}
                     label="Email"
                     value={this.state.email} required/>
          <FormInput name="password" type="password"
                     label="Password"
                     handleChange={this.handleChange}
                     value={this.state.password} required/>
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton onClick={signInWithGoole}>SIGN IN WITH GOOLE</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn;