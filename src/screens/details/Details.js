import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import Header from '../../common/header/Header';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from '@material-ui/core/Button';
import Checkout from '../checkout/Checkout';
import Typography from '@material-ui/core/Typography';
import restaurantDetails from '../../common/restaurantDetails';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { red } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


class Details extends Component {

    state ={
        AddSnackBarIsOpen:false,
    }
            
    checkoutHandler = () => {
        ReactDOM.render(<Checkout/>,document.getElementById('root'))
        this.props.history.push('/checkout/');
      }
      AddItemHandler = () => {
        this.setState({ AddSnackBarIsOpen:true });
        
      }
      AddSnackBarCloseHandler = () => {
        this.setState({ AddSnackBarIsOpen:false });
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
              <div className="left-details">
                  <img className="restaurant-img" src={restaurantDetails.photo_URL} alt="restaurantimage" />
                  </div>
              <div className="right-details">
                        <div>
                            <Typography variant="headline" component="h3">{restaurantDetails.restaurant_name}</Typography>
                        </div>
                        <div className="locality-div">{restaurantDetails.address.locality}</div>
                        <br />
                        <div>
                        {restaurantDetails.categories.map((category, index) => ( (index ? ', ': '') + category.category_name ))}
                        </div>
                        <br />
                        <div className="fa-icon">
                            <div className="fa-fa-star">
                                <i class="fa fa-star" aria-hidden="true"></i>{restaurantDetails.customer_rating}
                                <div className="average-rating">AVERAGE RATING BY <br />{restaurantDetails.number_customers_rated} CUSTOMERS</div>
                            </div>
                            <div className="fa-fa-inr">
                                <i class="fa fa-inr" aria-hidden="true"></i>{restaurantDetails.average_price}
                                <div className="average-price">AVERAGE COST FOR<br /> TWO PEOPLE</div>
                            </div>
                        </div>   
                </div>
                
           </div>
           <div className = "bottom-container-details">
                     <div className="bottom-left-category-details">
                         <div>
                         {restaurantDetails.categories.map((category, index) => (
                             <List className= "list-category-name" key = {category.id}>
                             <ListItem>
                             <ListItemText primary={category.category_name} className="list-category-name" />
                             </ListItem>
                             <Divider />
                             {
                                category.item_list.map((subitem, i) => {
                    return ( <ul  key = {subitem.id}>
                                    <div className="item-row">
                                        <div className="item-row-left">
                                           <i class="fa fa-circle" color={(subitem.item_type ==="VEG") ? red : green } id="facircle" aria-hidden="true"></i>{subitem.item_name} 
                                        </div>
                                        <div className="item-row-right">
                                           <i class="fa fa-inr" id = "fainr" aria-hidden="true" ></i>{subitem.price}
                                           <AddIcon className="add-icon"  onClick={this.AddItemHandler}/>
                                        </div>
                                    </div>
                                </ul>
                                )
                             })
                               }
                            </List>
                           ))
                           }
                        </div>
                     </div>
                     <div className="bottom-right-cart-details">
                    
                    
                    
                     </div>

              
          </div>
           <Button variant="contained" color="inherit" id="blue-btn" onClick={this.checkoutHandler}>Checkout</Button>
           
          
          </div>
          <Snackbar 
          anchorOrigin={{ vertical: 'bottom',horizontal: 'left',}}
          className="snackbar"
          open={this.state.AddSnackBarIsOpen}
          onClose={this.AddSnackBarCloseHandler}
          ContentProps={{ 'aria-describedby': 'message-id', }}
          message={<span id="message-id">Item added to cart!</span>}
          action={[
              <IconButton
                 key="close"
                 aria-label="Close"
                 color="inherit"
                 onClick={this.AddSnackBarCloseHandler}
               >
              <CloseIcon />
            </IconButton>,
          ]}
        />
          </MuiThemeProvider>
                
       
        )
    }
}

export default Details;