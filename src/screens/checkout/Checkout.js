import React, { Component } from 'react';
import './Checkout.css';
import * as Utils from "../../common/Utils";
import * as UtilsUI from "../../common/UtilsUI";
import * as Constants from "../../common/Constants";
import Header from '../../common/header/Header';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { withStyles } from "@material-ui/core/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckCircle from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import addressInfo from '../../common/addressInfo';
import stateInfo from '../../common/stateInfo';

// inline styles for Material-UI components
const styles = theme => ({

    root: {
      width: '90%',
    },
    rootTab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    addressIconButton:{
        color:'green',
    },
    imagesGridList: {
        margin: "15px !important"
      },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    paymentroot: {
      display: 'flex',
    },
    paymentformControl: {
      margin: theme.spacing(3),
    },
    paymentgroup: {
      margin: theme.spacing(1, 0),
    },
  });

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
  
  


class Checkout extends Component {
    constructor(){
        super();
        this.baseUrl = "http://localhost:8080/api";
    }
    
    state = {
        activeStepValue : 0,
        steps : ['Delivery','Payment'],
        tabValue :0,
        newAddressTabContainerValues: {
            flatname: "",
            locality: "",
            city: "",
            state: "",
            pincode: "",
        },
        newAddressFormValidationClassNames: {
            // object containing the classnames for the validation messages displayed below the text fields of the newAddress Tab container
            flatname: Constants.DisplayClassname.DISPLAY_NONE,
            locality: Constants.DisplayClassname.DISPLAY_NONE,
            city: Constants.DisplayClassname.DISPLAY_NONE,
            state: Constants.DisplayClassname.DISPLAY_NONE,
            pincode: Constants.DisplayClassname.DISPLAY_NONE
        },
        
    };
    
    handleBackHandler = () => { this.setState({ activeStepValue : this.state.activeStepValue - 1 });}

    handleNextHandler = () => { this.setState({ activeStepValue : this.state.activeStepValue + 1 });}
    
    handleResetHandler = () => { this.setState({ activeStepValue : 0 });}

    /**
    * Event handler called when the user tries to navigate to different tabs
    * @memberof Checkout
    */
   tabChangeHandler = (event, tabValue) => {this.setState({ tabValue });}

    /**
   * Event handler called when the flatname text field is changed by the user in New Address Tab Container
   * @param event defualt parameter for onChange
   * @memberof Checkout (NewAddress TabContainer)
   */
    inputFlatNameChangeHandler = event => {
    let currentNewAddressTabContainerValues = { ...this.state.newAddressTabContainerValues };
    currentNewAddressTabContainerValues.flatname = event.target.value;
    this.setState({ newAddressTabContainerValues: currentNewAddressTabContainerValues });
};

 /**
   * Event handler called when the locality text field is changed by the user in New Address Tab Container
   * @param event defualt parameter for onChange
   * @memberof Checkout (NewAddress TabContainer)
   */
  inputLocalityChangeHandler = event => {
    let currentNewAddressTabContainerValues = { ...this.state.newAddressTabContainerValues };
    currentNewAddressTabContainerValues.locality = event.target.value;
    this.setState({ newAddressTabContainerValues: currentNewAddressTabContainerValues });
};

/**
   * Event handler called when the city text field is changed by the user in New Address Tab Container
   * @param event defualt parameter for onChange
   * @memberof Checkout (NewAddress TabContainer)
   */
  inputCityChangeHandler = event => {
    let currentNewAddressTabContainerValues = { ...this.state.newAddressTabContainerValues };
    currentNewAddressTabContainerValues.city = event.target.value;
    this.setState({ newAddressTabContainerValues: currentNewAddressTabContainerValues });
};

/**
   * Event handler called when the pincode text field is changed by the user in New Address Tab Container
   * @param event defualt parameter for onChange
   * @memberof Checkout (NewAddress TabContainer)
   */
  inputPincodeChangeHandler = event => {
    let currentNewAddressTabContainerValues = { ...this.state.newAddressTabContainerValues };
    currentNewAddressTabContainerValues.pincode = event.target.value;
    this.setState({ newAddressTabContainerValues: currentNewAddressTabContainerValues });
};
    
      
  /*  stepContentHandler = () => {
       if(this.state.activeStepValue === 0) {
        this.setState({ IsDeliveryContentOpen  : true}) ;
       }
       if(this.state.activeStepValue === 1){
        this.setState({ IsPaymentContentOpen  : true}) ;
       }
    }*/
       
            
         
     

   /**
   * Function called when the component is rendered
   * @memberof Details
   */
  render() {
   const { classes } = this.props;

    return (
      <MuiThemeProvider>
        <div className="checkout-main-container">
          <Header
            showLogo={true}
            history={this.props.history}
            showSearchBox={false}
            showLoginModal={false}
            showProfile={true}
            enableMyAccount={false}
          />
          
          <div className={classes.root}>
      <Stepper activeStep={this.state.activeStepValue} orientation="vertical">
        {this.state.steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
        <Typography>
        {this.state.activeStepValue === this.state.steps.length - 1 ?
            (<div>Payment Notes</div>)
            :(<div className={classes.rootTab}>
                <AppBar position="static">
                  <Tabs value={this.state.tabValue} onChange={this.tabChangeHandler}>
                    <Tab label="EXISTING ADDRESS" />
                    <Tab label="NEW ADDRESS" />
                  </Tabs>
                </AppBar>
                {this.state.tabValue === 0 && 
                <TabContainer>
                         {!Utils.isUndefinedOrNull(addressInfo) ? (
                <GridList
                  cellHeight={350}
                  cols={3}
                  className={classes.imagesGridList}
                >
                  {addressInfo.map((address, index) => (
                    <GridListTile
                      className="address-tile"
                      key={"grid" + address.id}
                    >
                     <div className="address-format">
                     {address.flat_building_name},<br/>
                     {address.locality},<br/>
                     {address.city}<br/>
                     {address.state.state_name}<br/>
                     {address.pincode}<br/>
                     </div> 
                     <IconButton
                     key="close"
                     aria-label="Close"
                     onClick={this.addressIconClickHandler}
                     className={classes.addressIconButton}
                     >
                         <CheckCircle/>
                     </IconButton>
                    </GridListTile>
                  ))}
                </GridList>
              ) : null}
              </TabContainer>
            }
                {this.state.tabValue === 1 && 
                <TabContainer>
                    <div className="save-address-form">
                    <br />
                              <FormControl required>
                                    <InputLabel htmlFor="flatname">Flat / Building No.</InputLabel>
                                    <Input id="flatname" type="text" flatname={this.state.flatname} onChange={this.inputFlatNameChangeHandler} />
                                    <FormHelperText className={this.state.newAddressFormValidationClassNames.flatname}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <FormControl required >
                                    <InputLabel htmlFor="locality">Locality</InputLabel>
                                    <Input id="locality" type="text" locality={this.state.locality} onChange={this.inputLocalityChangeHandler} />
                                    <FormHelperText className={this.state.newAddressFormValidationClassNames.locality}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <FormControl required>
                                    <InputLabel htmlFor="city">City</InputLabel>
                                    <Input id="city" type="text" city={this.state.city} onChange={this.inputCityChangeHandler} />
                                    <FormHelperText className={this.state.newAddressFormValidationClassNames.city}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                
                                <FormControl required>
                                    <InputLabel htmlFor="state-dropdown">State</InputLabel>

                                <Select
                                        
                                        input={<Input id="state-dropdown" />}
                                        renderValue={selected => selected}
                                        value={stateInfo.state_name}
                                        //onChange={this.selectedStateChangeHandler}
                                    >
                                        
                                        {stateInfo.map(state => (
                                            <MenuItem key={state.id}>
                                                {state.state_name}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    </FormControl>
                                
                                <FormControl required>
                                    <InputLabel htmlFor="pincode">Pincode</InputLabel>
                                    <Input id="pincode" type="text" pincode={this.state.pincode} onChange={this.inputPincodeChangeHandler} />
                                    <FormHelperText className={this.state.newAddressFormValidationClassNames.pincode}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br />
                                <Button variant="contained" color="secondary" onClick={this.saveCustomerAddress}>SAVE ADDRESS</Button>
                                <br />
                                </div>
                </TabContainer>
                }
                
              </div>)
            }
            </Typography>
              <div className={classes.actionsContainer}>
              <br />
                <div>
                  <Button
                    disabled={this.state.activeStepValue === 0}
                    onClick={this.handleBackHandler}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNextHandler}
                    className={classes.button}
                  >
                    {this.state.activeStepValue === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {this.state.activeStepValue === this.state.steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>View the summary &amp; place your order now! </Typography>
          <Button onClick={this.handleResetHandler} className={classes.button}>
           Change
          </Button>
        </Paper>
      )}
    </div>
              
          </div>
        
          </MuiThemeProvider>
                
       
        )
    }
}

export default withStyles(styles) (Checkout);