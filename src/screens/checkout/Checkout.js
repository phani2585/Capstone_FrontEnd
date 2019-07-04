import React, { Component } from 'react';
import './Checkout.css';
import Header from '../../common/header/Header';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import Button from '@material-ui/core/Button';


class Checkout extends Component {
    constructor(){
        super();
        this.baseUrl = "http://localhost:8080/api";
    }
    
    

   /**
   * Function called when the component is rendered
   * @memberof Details
   */
  render() {
   // const { classes } = this.props;

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
          <div className="checkout-body-container">
              This is Checkout page
              
          </div>
          </div>
          </MuiThemeProvider>
                
       
        )
    }
}

export default Checkout;