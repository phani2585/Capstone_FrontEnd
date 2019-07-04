import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import Header from '../../common/header/Header';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from '@material-ui/core/Button';
import Checkout from '../checkout/Checkout';


class Details extends Component {
            
    checkoutHandler = () => {
        ReactDOM.render(<Checkout/>,document.getElementById('root'))
        this.props.history.push('/checkout/');
      }

   /**
   * Function called when the component is rendered
   * @memberof Details
   */
  render() {
   // const { classes } = this.props;

    return (
      <MuiThemeProvider>
        <div className="details-main-container">
          <Header
            showLogo={true}
            history={this.props.history}
            showSearchBox={false}
            showLoginModal={true}
            showProfile={false}
            enableMyAccount={false}
          />
          <div className="details-body-container">
              This is Details page
              
          </div>
          <Button variant="contained" color="inherit" id="blue-btn" onClick={this.checkoutHandler}>Checkout</Button>
          </div>
          </MuiThemeProvider>
                
       
        )
    }
}

export default Details;