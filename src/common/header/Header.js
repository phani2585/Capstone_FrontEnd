import React, { Component } from 'react';
import './Header.css';
import '../../screens/home/Home';
import Button from '@material-ui/core/Button';
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
//import fastfood from '../../assets/icon/fastfood.svg';
//import { withStyles } from "@material-ui/core/styles";
//import Input from '@material-ui/core/Input';
//import TextField from '@material-ui/core/TextField';
//import IconButton from "@material-ui/core/IconButton";
//import InputAdornment from "@material-ui/core/InputAdornment";
//import search from '../../assets/icon/search.svg';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
//import { InputBase } from '@material-ui/core';
//import restaurantInfo from '../../common/restaurantInfo';
//import Grid from '@material-ui/core/Grid';
//import GridList from '@material-ui/core/GridList';
//import GridListTile from '@material-ui/core/GridListTile';
//import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
//import CardContent from '@material-ui/core/CardContent';
//import Avatar from '@material-ui/core/Avatar';
//import Star from '@material-ui/icons/Star';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardMedia from '@material-ui/core/CardMedia';
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
const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    card: {
        maxwidth: 460,
        margin: '8px',
        shadow: '20px',
        height: 550
    },
    media: {
        width: 460,
        height: 200,
    },
    button: {
        margin: theme.spacing.unit,
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
});

/**
 * Class component for the header
 * @class Header
 * @extends {Component}
 */
class Header extends Component {

    constructor() {
        super();
        /*
        this.openModalHandler = this.openModalHandler.bind(this);
        this.closeModalHandler =this.closeModalHandler.bind(this);
        this.tabChangeHandler =this.tabChangeHandler.bind(this);
        will ve to test this line's use n add rest of Handlers */

        this.state = {
            modalIsOpen: false,
            menuIsDroppedDown: false,
            value: 0,
            dispWhiteUnderLine: "dispWhiteUnderLine",
            contactnoRequired: "dispNone",
            contactno: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            restaurantInfo: []
        }
    }
    /*dispUnderLineHandler =() => {
        this.setState({
            dispWhiteUnderLine:"dispWhiteUnderLine"
        });
    }*/

    /**
   * Event handler called when the upload button inside the header is clicked to open the upload image modal
   * @memberof Header
   */
    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contactnoRequired: "dispNone",
            contactno: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            signupSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }



    /**
   * Function called before the render method
   * @memberof Header
   */
  /*
  componentDidMount() {
    this.getUserInformation();
  }*/

  /**
   * Function to get all the information about the currently logged-in user
   * @memberof Header
   */
  /*
   getUserInformation = () => {
    if (
      !Utils.isUndefinedOrNullOrEmpty(sessionStorage.getItem("access-token"))
    ) {
      const requestUrl =
        "https://api.instagram.com/v1/users/self/?access_token=" +
        sessionStorage.getItem("access-token");
      const that = this;
      Utils.makeApiCall(
        requestUrl,
        null,
        null,
        Constants.ApiRequestTypeEnum.GET,
        null,
        responseText => {
          const userDetails = { ...this.state.currentUserDetails };
          userDetails.profileImage = JSON.parse(
            responseText
          ).data.profile_picture;
          userDetails.username = JSON.parse(responseText).data.username;
          that.setState({
            currentUserDetails: userDetails
          });
          sessionStorage.setItem(
            "user-details",
            JSON.parse(responseText).data.username
          );
        },
        () => {}
      );
    }
  };*/

    /*loginClickHandler = () => {
        this.state.contactno === "" ? this.setState({ contactnoRequired: "dispBlock" }) : this.setState({ contactnoRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }*/

    inputContactnoChangeHandler = (e) => {
        this.setState({ contactno: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    /*signupClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    registrationSuccess: true
                });
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }*/

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });


    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

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
                            onChange={this.props.searchImageByDescription.bind(this)}
                            className={classes.searchInput}
                            //onClick={this.dispUnderLineHandler}
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
                                    <FormHelperText className={this.state.contactnoRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                    <FormHelperText className={this.state.loginPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                            </TabContainer>
                        }

                        {this.state.value === 1 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                    <FormHelperText className={this.state.firstnameRequired}>
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
                                    <FormHelperText className={this.state.emailRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                    <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                    <FormHelperText className={this.state.registerPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                    <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                    <FormHelperText className={this.state.contactRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />

                                <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                            </TabContainer>
                        }
                    </Modal>
                </div>
            );
        }

        // user profile icon to be rendered inside the header
        /*let profileIconButtonToRender = null;
        if (this.props.showProfile) {
          profileIconButtonToRender = (
            <div className="header-profile-btn-container">
              <IconButton
                key="close"
                aria-label="Close"
                onClick={this.profileIconClickHandler}
                className={classes.profileIconButton}
              >
                <img
                  src={this.state.currentUserDetails.profileImage}
                  className="user-profile-image"
                  alt=""
                />
              </IconButton>
        
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
        {profileIconButtonToRender} to be placed in Muitheme provider if required
        */
        return (
            <MuiThemeProvider>
                <div className="app-header-container">
                    <div className="header-logo-container">{logoToRender}</div>
                    {searchBoxToRender}
                    {loginButtonModalToRender}
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