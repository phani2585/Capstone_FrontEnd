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
import addressInfo from '../../common/addressInfo';

// inline styles for Material-UI components
const styles = theme => ({

    root: {
      width: '90%',
    },
    rootTab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
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
        tabValue :0
        
    };
    
    handleBackHandler = () => { this.setState({ activeStepValue : this.state.activeStepValue - 1 });}

    handleNextHandler = () => { this.setState({ activeStepValue : this.state.activeStepValue + 1 });}
    
    handleResetHandler = () => { this.setState({ activeStepValue : 0 });}

    /**
    * Event handler called when the user tries to navigate to different tabs
    * @memberof Checkout
    */
   tabChangeHandler = (event, value) => {this.setState({ value });}


    
      
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
                    </GridListTile>
                  ))}
                </GridList>
              ) : null}
              </TabContainer>}
                {this.state.tabValue === 1 && <TabContainer>NEW ADDRESS</TabContainer>}
                
              </div>)
            }
            </Typography>
              <div className={classes.actionsContainer}>
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