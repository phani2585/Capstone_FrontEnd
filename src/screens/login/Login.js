import React, { Component } from "react";
import * as Constants from "../../common/Constants";
import * as Utils from "../../common/Utils";
import * as UtilsUI from "../../common/UtilsUI";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Typography from "@material-ui/core/Typography";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

// inline styles for Material-UI components
const styles = {
  loginCard: {
    marginLeft: "50%",
    width: "25%",
    transform: "translateX(-50%)"
  },
  formControl: {
    width: "90%"
  },
  loginButton: {
    display: "block",
    marginTop: 30
  }
};

/**
 * Class component for login page
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  constructor() {
    super();

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.loginClickHandler = this.loginClickHandler.bind(this);
  }

  state = {
    loginFormUserValues: {
      // object containing values entered by the user in the text fields of the login form
      username: "",
      password: ""
    },
    loginFormValidationClassNames: {
      // object containing the classnames for the validation messages displayed below the text fields of the login form
      username: Constants.DisplayClassname.DISPLAY_NONE,
      password: Constants.DisplayClassname.DISPLAY_NONE
    },
    loginErrorMsg: "" // error message displayed for wrong credentials in the login form
  };

  /**
   * Event handler called when the username text field is changed by the user
   * @param event defualt parameter for onChange
   * @memberof Login
   */
  usernameChangeHandler = event => {
    let currentLoginFormValues = { ...this.state.loginFormUserValues };
    currentLoginFormValues.username = event.target.value;
    this.setState({
      loginFormUserValues: currentLoginFormValues
    });
  };

  /**
   * Event handler called when the password text field is changed by the user
   * @param event defualt parameter for onChange
   * @memberof Login
   */
  passwordChangeHandler = event => {
    let currentLoginFormValues = { ...this.state.loginFormUserValues };
    currentLoginFormValues.password = event.target.value;
    this.setState({
      loginFormUserValues: currentLoginFormValues
    });
  };

  /**
   * Event handler called when the login button is clicked
   * @memberof Login
   */
  loginClickHandler = () => {
    // declaring variables
    let testUsername = "upgrad";
    let testPassword = "upgrad";
    let access_token = "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";

    // clearing the error message; based on the validation of user input values
    this.setState({
      loginErrorMsg: ""
    });

    // finding the class names for the username and password validation messages - to be displayed or not
    let username_validation_classname = UtilsUI.findValidationMessageClassname(
      this.state.loginFormUserValues.username,
      Constants.ValueTypeEnum.FORM_FIELD
    );
    let password_validation_classname = UtilsUI.findValidationMessageClassname(
      this.state.loginFormUserValues.password,
      Constants.ValueTypeEnum.FORM_FIELD
    );

    // setting the class names for the username and password validation messages - to be displayed or not
    let currentLoginFormValidationClassNames = {
      ...this.state.loginFormValidationClassNames
    };
    currentLoginFormValidationClassNames.username = username_validation_classname;
    currentLoginFormValidationClassNames.password = password_validation_classname;
    this.setState({
      loginFormValidationClassNames: currentLoginFormValidationClassNames
    });

    // validating user values only when both the fields (username and password) are entered by the user
    if (
      !Utils.isAnyValueOfObjectUndefinedOrNullOrEmpty(
        this.state.loginFormUserValues
      )
    ) {
      // setting the login error message if the credentials do not match to the values of the variables defined above
      if (
        this.state.loginFormUserValues.username !== testUsername ||
        this.state.loginFormUserValues.password !== testPassword
      ) {
        this.setState({
          loginErrorMsg: Constants.LOGIN_CREDENTIALS_ERROR_MSG
        });
        // setting access-token and redirecting the user to the home page if the credentials match to the values of the variables defined above
      } else {
        sessionStorage.setItem("access-token", access_token);
        this.props.history.push({
          pathname: "/home/"
        });
      }
    }
  };

  /**
   * Function called when the component is rendered
   * @memberof Login
   */
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider>
        <div className="login-main-container">
          <Header
            showLink={false}
            history={this.props.history}
            showSearch={false}
            showUpload={false}
            showProfile={false}
            enableMyAccount={false}
          />
          <div className="login-body-container">
            <Card className={classes.loginCard}>
              <CardContent>
                <Typography variant="headline" component="h2">
                  LOGIN
                </Typography>
                <br />

                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    type="text"
                    onChange={this.usernameChangeHandler}
                  />
                  <FormHelperText
                    className={
                      this.state.loginFormValidationClassNames.username
                    }
                  >
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />

                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={this.passwordChangeHandler}
                  />
                  <FormHelperText
                    className={
                      this.state.loginFormValidationClassNames.password
                    }
                  >
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>

                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  onClick={this.loginClickHandler}
                >
                  Login
                </Button>
                {Utils.isUndefinedOrNullOrEmpty(
                  this.state.loginErrorMsg
                ) ? null : (
                  <div className="error-msg">{this.state.loginErrorMsg}</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
