import React, { Component } from 'react';
import './Header.css';
import * as Utils from "../../common/Utils";
import * as UtilsUI from "../../common/UtilsUI";
import * as Constants from "../../common/Constants";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import accountCircle from '../../assets/icon/accountCircle.svg';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
//import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/icons/Close';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// custom styles for upload modal
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

/**
 * Functional component for displaying Tab components
 * @param props properties passed by parent component to child component
 */
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

// inline styles for Material-UI components
const styles = {
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    input: {
        display: 'none',
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer',

    },
    searchInput: {
        width: "80%"
    }
};
 

/**
 * Class component for the header
 * @class Header
 * @extends {Component}
 */
class Header extends Component {

    constructor() {
        super();

        this.openModalHandler = this.openModalHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.tabChangeHandler = this.tabChangeHandler.bind(this);
        this.inputContactnoChangeHandler = this.inputContactnoChangeHandler.bind(this);
        this.inputLoginPasswordChangeHandler = this.inputLoginPasswordChangeHandler.bind(this);
        this.loginSignedupCustomer = this.loginSignedupCustomer.bind(this);
        this.inputFirstNameChangeHandler = this.inputFirstNameChangeHandler.bind(this);
        this.inputLastNameChangeHandler = this.inputLastNameChangeHandler.bind(this);
        this.inputEmailChangeHandler = this.inputEmailChangeHandler.bind(this);
        this.inputRegisterPasswordChangeHandler = this.inputRegisterPasswordChangeHandler.bind(this);
        this.inputContactChangeHandler = this.inputContactChangeHandler.bind(this);
        this.signupNewCustomer = this.signupNewCustomer.bind(this);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
    }

        state = {
        loginFormUserValues: {
            // object containing values entered by the user in the text fields of the login form
            contactno: "",
            loginPassword: ""
        },
        loginFormValidationClassNames: {
            // object containing the classnames for the validation messages displayed below the text fields of the login form
            contactno: Constants.DisplayClassname.DISPLAY_NONE,
            loginPassword: Constants.DisplayClassname.DISPLAY_NONE
        },
        loginErrorMsg: "", // error message displayed for wrong credentials in the login form 
        signupFormUserValues: {
            contact: "",
            email: "",
            firstname: "",
            lastname: "",
            registerPassword: "",
        },
        signupFormValidationClassNames: {
            // object containing the classnames for the validation messages displayed below the text fields of the signup form
            contact: Constants.DisplayClassname.DISPLAY_NONE,
            email: Constants.DisplayClassname.DISPLAY_NONE,
            firstname: Constants.DisplayClassname.DISPLAY_NONE,
            registerPassword: Constants.DisplayClassname.DISPLAY_NONE
        },
        modalIsOpen: false,//login modal state is closed
        menuIsDroppedDown: false,//Menu in login form is not dropped down
        value: 0,//Initial value for tab container is set to '0'
        signupSuccess: false,//signup status is false
        loginSnackBarIsOpen: false,
        registerSnackBarIsOpen: false,
        signedInUserInfo:[]
        //loggedIn: sessionStorage.getItem("access-token") == null ? false : true,//Logged in status is null if there is no accesstoken in sessionstorage
    
    };

    /**
    * Event handler called when the login button inside the header is clicked to open the login and signup modal
    * @memberof Header
    */
    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            signupSuccess: false,
            //loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        });
    }

    /**
    * Event handler called when the user clicks outside the modal or intends to close the modal 
    * @memberof Header
    */
    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    /**
    * Event handler called when the user tries to navigate to different tabs
    * @memberof Header
    */
    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    /**
    * Event handler called when the contactno text field is changed by the user in Login form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputContactnoChangeHandler = event => {
        let currentLoginFormValues = { ...this.state.loginFormUserValues };
        currentLoginFormValues.contactno = event.target.value;
        this.setState({ loginFormUserValues: currentLoginFormValues });
    };

    /**
    * Event handler called when the password text field is changed by the user in Login form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputLoginPasswordChangeHandler = event => {
        let currentLoginFormValues = { ...this.state.loginFormUserValues };
        currentLoginFormValues.loginPassword = event.target.value;
        this.setState({ loginFormUserValues: currentLoginFormValues });
    };

    /**
   * Event handler called when the firstname text field is changed by the user in Signup form
   * @param event defualt parameter for onChange
   * @memberof Header (Login/Signup modal)
   */
    inputFirstNameChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.firstname = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the lastname text field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputLastNameChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.lastname = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the email text field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputEmailChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.email = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the password text field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputRegisterPasswordChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.registerPassword = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
    * Event handler called when the contact text field is changed by the user in Signup form
    * @param event defualt parameter for onChange
    * @memberof Header (Login/Signup modal)
    */
    inputContactChangeHandler = event => {
        let currentSignupFormValues = { ...this.state.signupFormUserValues };
        currentSignupFormValues.contact = event.target.value;
        this.setState({ signupFormUserValues: currentSignupFormValues });
    };

    /**
   * Event handler called when the user clicks on the login button in Login modal
   * @param event defualt parameter for onClick
   * @memberof Header (Login modal)
   */
    loginSignedupCustomer = () => {

        // clearing the error message; based on the validation of user input values
        this.setState({
            loginErrorMsg: ""
        });

        // finding the class names for the contactno and password validation messages - to be displayed or not
        let contactno_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.loginFormUserValues.contactno,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let loginPassword_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.loginFormUserValues.loginPassword,
            Constants.ValueTypeEnum.FORM_FIELD
        );

        // setting the class names for the contactno and password validation messages - to be displayed or not
        let currentLoginFormValidationClassNames = {
            ...this.state.loginFormValidationClassNames
        };
        currentLoginFormValidationClassNames.contactno = contactno_validation_classname;
        currentLoginFormValidationClassNames.loginPassword = loginPassword_validation_classname;
        this.setState({
            loginFormValidationClassNames: currentLoginFormValidationClassNames,
            loginSnackBarIsOpen:true
        });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4 ) {
                sessionStorage.setItem("logged-in-username",JSON.parse(this.responseText).first_name);
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true,
                    loggedInUserInfo: JSON.parse(this.responseText)
                });

                //that.closeModalHandler();
            }
        });

        xhrLogin.open("POST",  "http://localhost:8080/api/customer/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginFormUserValues.contactno + ":" + this.state.loginFormUserValues.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);


    };

    /**
   * Event handler called when the user clicks on the signup button in Signup modal
   * @param event defualt parameter for onClick
   * @memberof Header (Signup modal)
   */
    signupNewCustomer = () => {

        // clearing the error message; based on the validation of user input values
        this.setState({
            signupErrorMsg: "",
             
        });
        
        // finding the class names for the contactno,email, firstname and password validation messages - to be displayed or not
        let contact_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.contact,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let email_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.email,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let firstname_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.firstname,
            Constants.ValueTypeEnum.FORM_FIELD
        );
        let registerPassword_validation_classname = UtilsUI.findValidationMessageClassname(
            this.state.signupFormUserValues.registerPassword,
            Constants.ValueTypeEnum.FORM_FIELD
        );

        // setting the class names for the contactno,email, firstname and password validation messages - to be displayed or not
        let currentSignupFormValidationClassNames = { ...this.state.signupFormValidationClassNames };
        currentSignupFormValidationClassNames.contact = contact_validation_classname;
        currentSignupFormValidationClassNames.email = email_validation_classname;
        currentSignupFormValidationClassNames.firstname = firstname_validation_classname;
        currentSignupFormValidationClassNames.registerPassword = registerPassword_validation_classname;

        this.setState({
            signupFormValidationClassNames: currentSignupFormValidationClassNames,
            registerSnackBarIsOpen:true,
        });

        /* (this.state.signupFormUserValues.contact.length!==10)
         ? this.setState({ signupErrorMsg:Constants.VALIDATE_CONTACT_ERROR_MSG})
         : this.setState({ signupErrorMsg:null});*/

        let dataSignup = {
            "contact_number": this.state.signupFormUserValues.contact,
            "email_address": this.state.signupFormUserValues.email,
            "first_name": this.state.signupFormUserValues.firstname,
            "last_name": this.state.signupFormUserValues.lastname,
            "password": this.state.signupFormUserValues.registerPassword
        };
        let requestHeaderObj = { "Content-Type": "application/json" };
        
            const requestUrl = "http://localhost:8080/api/customer/signup";
            const that = this;
            
            Utils.makeApiCall(
                requestUrl,
                null,
                dataSignup,
                Constants.ApiRequestTypeEnum.POST,
                requestHeaderObj,
                responseText => {
                    that.setState(
                        {
                            signedInUserInfo: JSON.parse(this.responseText)
                        },
                        function () {
                            that.setState({
                                
                                signupSuccess: true,
                            });
                        }
                    );
                },
                responseText => {
                    that.setState(
                        {
                            signInFailedInfo: JSON.parse(this.responseText)
                        },
                        function () {
                            that.setState({
                                
                                signupFailed: true,
                            });
                        }
                    );
                },
            );
              
    };


    loginSnackBarCloseHandler = (e) => {
        this.setState({ loginSnackBarIsOpen:false });
    }
    registerSnackBarCloseHandler = (e) => {
        this.setState({ registerSnackBarIsOpen:false });
    }
    searchValueChangeHandler = (e) => {
        this.setState({ searchValue: e.target.value });
    }
    
 /**
   * Event handler called when the profile icon inside the header is clicked to toggle the user profile dropdown
   * @memberof Header
   */
  openMenuHandler = () => {
    this.setState({
      showUserProfileDropDown: !this.state.showUserProfileDropDown
    });
  };

  /**
   * Event handler called when the logout menu item is clicked inside the user profile dropdown to log a user out of the application
   * @memberof Header
   */
  logoutClickHandler = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("user-details");
    this.props.history.push({
      pathname: "/"
    });
  };
  

    /**
  * Function called when the component is rendered
  * @memberof Header
  */
    render() {
        const { classes } = this.props;

        // logo to be rendered inside the header
        let logoToRender = null;
        if (this.props.showLink) {
            logoToRender = (
                <div className="fastfood-icon-container">
                    <FastFoodIcon />
                </div>
            );
        }

        // search box to be rendered inside the header
        let searchBoxToRender = null;
        if (this.props.showSearch) {
            searchBoxToRender = (
                <div className="search-icon-container">
                    <div className="search-icon">
                        <SearchIcon />
                    </div>
                    <div className="search-text-input">
                        <Input
                            onChange={this.searchValueChangeHandler}
                            className={classes.searchInput}
                            //onClick={this.UnderLineColourChangeHandler}
                            placeholder="Search by Restaurant Name" id="search-input" fullWidth />
                    </div>
                </div>
            );
        }

        //login button and modal component  to be rendered inside the header
        let loginButtonModalToRender = null;
        if (this.props.showLoginModal) {
            loginButtonModalToRender = (
                <div className="login-button-container">
                    <Button variant="contained" color="default" onClick={this.openModalHandler} >
                        <img src={accountCircle} className="accountCircle-logo" alt="accountCircle" />Login</Button>
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Login"
                        onRequestClose={this.closeModalHandler}
                        style={customStyles}
                    >
                        <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                            <Tab label="Login" />
                            <Tab label="Signup" />
                        </Tabs>

                        {this.state.value === 0 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="contactno">Contact No</InputLabel>
                                    <Input id="contactno" type="text" contactno={this.state.contactno} onChange={this.inputContactnoChangeHandler} />
                                    <FormHelperText className={this.state.loginFormValidationClassNames.contactno}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                    <FormHelperText className={this.state.loginFormValidationClassNames.loginPassword}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.loginSignedupCustomer}>LOGIN</Button>
                            </TabContainer>
                        }

                        {this.state.value === 1 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.firstname}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl >
                                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                    <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.email}>
                                        <span className="red">required</span>
                                    </FormHelperText>

                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                    <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.registerPassword}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                    <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                    <FormHelperText className={this.state.signupFormValidationClassNames.contact}>
                                        <span className="red">required</span>
                                    </FormHelperText>

                                </FormControl>
                                <br /><br />

                                <Button variant="contained" color="primary" onClick={this.signupNewCustomer}>SIGNUP</Button>
                               
                                

                            </TabContainer>
                        }
                    </Modal>
                </div>
            );
            
            // user profile icon to be rendered inside the header
        let profileIconButtonToRender = null;
        if (this.props.showProfile) {
          profileIconButtonToRender = (
            <div className="header-profile-btn-container">
              <Button variant="contained" color="default" onClick={this.openMenuHandler} >
                        <img src={accountCircle} className="accountCircle-logo" alt="accountCircle" />{sessionStorage.getItem("logged-in-username")}</Button>
        
              {this.state.showUserProfileDropDown ? (
                <div className="user-profile-drop-down">
                  {this.props.enableMyAccount ? (
                    <div>
                      <Link to="/profile" className="my-account-dropdown-menu-item">
                        My Account
                      </Link>
                      <hr />
                    </div>
                  ) : null}
                  <div
                    onClick={this.logoutClickHandler}
                    className="logout-dropdown-menu-item"
                  >
                    Logout
                  </div>
                </div>
              ) : null}
            </div>
          );
        }
        
        }

        
        return (
            <MuiThemeProvider>
                <div className="app-header-container">
                    <div className="header-logo-container">{logoToRender}</div>
                    {searchBoxToRender}
                    {loginButtonModalToRender}
                    {profileIconButtonToRender}
                    <Snackbar
                                anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
                                open={this.state.registerSnackBarIsOpen}
                                autoHideDuration={6000}
                                onClose={this.registerSnackBarCloseHandler}
                                ContentProps={{'aria-describedby': 'message-id',}}
                                message={<span id="message-id">Registered successfully! Please login now!</span>}
                    />
                    <Snackbar
                                anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
                                open={this.state.loginSnackBarIsOpen}
                                autoHideDuration={6000}
                                onClose={this.loginSnackBarCloseHandler}
                                ContentProps={{'aria-describedby': 'message-id',}}
                                message={<span id="message-id">Logged in successfully!</span>}
                    />
                </div>
            </MuiThemeProvider>
        );

    }
}







/* <div className= "cardStyle">
     <br />
     <GridList cellHeight={"auto"} className={classes.gridListMain} cols={4}>
         {restaurantInfo.map(restaurant => (

             <GridListTile key={"restaurant" + restaurant.id} cols={restaurant.cols || 1}>
                 <Grid container className={classes.root} >
                     <Grid item>
                     <Card className={classes.card}>
                     <CardActionArea>
                 <CardMedia
                   className={classes.media}
                   image={restaurant.photo_URL}

                  />
                 <CardContent>
                   <Typography gutterBottom variant="h5" component="h2">
                     {restaurant.restaurant_name}
                   </Typography>
                   <br/><br/>
                   <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                       {restaurant.categories}
                   </Typography>
                   <br/><br/>
                   <div id="last-row">
         
                    <Button variant="contained" color="inherit" id="left-button">
                   <Star id="star-icon"/>{restaurant.customer_rating}({restaurant.number_customers_rated})
                   </Button>
                   
                   
                   <Typography gutterBottom variant="body1" color="textSecondary" component="p" id="right-avg-price">
                    {restaurant.average_price}  for two 
                   </Typography>
                     
             
                   </div>
                 </CardContent>
               </CardActionArea>
               </Card>
               </Grid>
               </Grid>
               </GridListTile>
          ))};
          
     </GridList>

 </div>
</div>
)
}
}*/

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);