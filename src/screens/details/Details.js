import React , {Component} from 'react';
import Header from '../../common/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { library } from 'npm i --save @fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import './Details.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core';
import Remove from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
library.add(faStar);
library.add(faRupeeSign);
library.add(faCircle);
library.add(faStopCircle);


const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
    },
    
});


class Details extends Component {

    constructor(){
        super(); 
        this.state ={
            open: false,
            vertical: 'top',
            horizontal: 'center',
            restaurantData: '',
            address: '',
            categories: [],
            cartItems: [],
            totalCartItemsValue: 0.0,
            totalCartItems: 0,
            
        }
    }

componentWillMount(){
     let xhr = new XMLHttpRequest();
     let that = this;
     let dataRestaurant = null;
     xhr.addEventListener("readystatechange", function ()  {
         if(this.readyState === 4){
             that.setState({
                 restaurantData: JSON.parse(this.responseText),
                 address: JSON.parse(this.responseText).address,
                 categories: JSON.parse(this.responseText).categories
             })
             
         }
     });

     xhr.open("GET",  this.props.baseUrl + "/restaurant/"+ this.props.match.params.restaurantId);
     xhr.setRequestHeader("Cache-Control", "no-cache");
     xhr.send(dataRestaurant);
}

addMenuItemClickHandler = (item) => {
    let newCartItems = this.state.cartItems;
    let itemAlreadyAdded = false;
    if (newCartItems != null) {
        for (var i = 0; i < newCartItems.length; i++) {
            if (newCartItems[i].id === item.id) {
                item.quantity = item.quantity + 1;
                item.totalPrice = item.quantity * item.price;
                itemAlreadyAdded = true;
                break;
            }
        }
    }
    if (!itemAlreadyAdded) {
        item.quantity = 1;
        item.totalPrice = item.quantity * item.price;
        newCartItems.push(item);
        
    }
    this.setState({ cartItems: newCartItems, open: true});
     if(item.quantity > 1){
         this.setState({cartNotificationMessage:'Item quantity increased by 1!'})
     }else{
         this.setState({ cartNotificationMessage: 'Item added to cart!'})
     }
    this.updateTotalCartItemsValue(true, item.price, item.quantity);
    
};

updateTotalCartItemsValue(isAdded, price, quantity) {
    let newTotalCartItemsValue = this.state.totalCartItemsValue;
    if (isAdded) {
        newTotalCartItemsValue = newTotalCartItemsValue + price;
        
    } else {
        newTotalCartItemsValue = newTotalCartItemsValue - price;
        
    }
    
    if(isAdded && quantity >= 1){
        this.setState({totalCartItems: this.state.totalCartItems + 1});
    }else{
        this.setState({totalCartItems: this.state.totalCartItems - 1});
    }

    this.setState({ totalCartItemsValue: newTotalCartItemsValue });
}


addCartItemClickHandler = (item) => {
    item.quantity = item.quantity + 1;
    item.totalPrice = item.quantity * item.price;
    this.setState({ open: true, cartNotificationMessage: 'Item quantity increased by 1!' });
    this.updateTotalCartItemsValue(true, item.price, item.quantity);
    
};

removeCartItemClickHandler = (item) => {
    let removeCartItems = this.state.cartItems;
    for (var i = 0; i < removeCartItems.length; i++) {
        if (removeCartItems[i].id === item.id) {
            if (item.quantity > 1) {
                item.quantity = item.quantity - 1;
                item.totalPrice = item.quantity * item.price;
            } else {
                removeCartItems.splice(i, 1);
                item.totalPrice = 0;
            }
        }
    }
    this.setState({ cartItems: removeCartItems, open: true, cartNotificationMessage: 'Item quantity decreased by 1!' });
    this.updateTotalCartItemsValue(false, item.price, item.quantity);
};

handleClose = () => {
    this.setState({ open: false });
};


onClickCheckoutButton = state => () => {
    if(this.state.totalCartItems === 0 ){
        this.setState({open: true, cartNotificationMessage: "Please add an item to your cart!"})
        return;
    }
    // if (sessionStorage.getItem("access-token") === null) {
    //     this.setState({open: true, cartNotificationMessage:  "Please login first!"})
    //     return;
    // }

    this.props.history.push({
        pathname: "/checkout",
        state: { cartItems: this.state.cartItems, totalCartItemsValue: this.state.totalCartItemsValue }
    })
};

    render(){
        const { classes } = this.props;
        let restaurantData = this.state.restaurantData

        return(
            <div className="details-container">
                <Header 
                showLogo={true}
                history={this.props.history}
                showSearchBox={false}
                showLoginModal={true}
               
                enableMyAccount={false}/>
                <div className="restaurant-info">
                    <div className="restaurant-image">
                        <span>
                        <img className="restaurant-img" src={restaurantData.photo_URL} alt="featured restaurant" />
                        </span>
                    </div>
                    <div className="restaurant-details">
                        <span>
                        <Typography gutterBottom variant="h4" component="h2">
                          {restaurantData.restaurant_name}
                        </Typography>
                        <Typography variant="h6">
                          {this.state.address.locality}
                        </Typography>
                        <br/>
                       <Typography variant="subtitle1" gutterBottom>
                           {this.state.categories.map((category, index) =>(
                               <span key={"category"+ category.id}>{(index ? ', ' : '') + category.category_name}</span>
                           ))}
                       </Typography>
                        </span>
                        <div className="restaurant-rating-price">
                            <div className="User-rating">
                                <div>
                                    <FontAwesomeIcon icon="star"/> 
                                    <span className="details-rating-price"> {restaurantData.customer_rating}</span>
                                </div>
                                <div>
                                    <Typography variant="caption">
                                        <span>AVERAGE RATING BY</span>
                                        <span className="usersRated"> {restaurantData.number_customers_rated} </span>
                                        <span>CUSTOMER</span>
                                    </Typography>
                                </div>
                            </div>
                            <div className="restaurant-pricing">
                               <div className="details-price">
                                   <FontAwesomeIcon icon="rupee-sign"/>
                                   <span className="details-rating-price">{restaurantData.average_price}</span>
                               </div>
                               <div className="details-price">
                                 <Typography variant="caption"><span>AVERAGE COST FOR TWO PEOPLE</span></Typography>
                               </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="restaurant-menu-items">
                    <div className="menu-items">
                        {this.state.categories.map(category =>(
                            <div key={"categories"+ category.id}>
                              <h3 className="CategoryName">{category.category_name}</h3>
                              <Divider />
                             <br />
                             {category.item_list.map(item => (
                                 <div className="Category-items" key={"item"+item.id}>
                                    <div  className="item">
                                    {item.item_type === 'VEG' ? <FontAwesomeIcon icon="circle" className="veg-item-color"/> : <FontAwesomeIcon icon="circle" className="non-veg-item-color"/>} 
                                    <span>&nbsp;&nbsp;&nbsp; {item.item_name}</span> 
                                    </div>  
                                    <div className="item-price">
                                      <FontAwesomeIcon icon="rupee-sign"/>
                                      <span> {item.price} </span>
                                    </div>
                                    <div className="item-add">
                                      <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={() => this.addMenuItemClickHandler(item)}>
                                        <Add/>
                                        </IconButton>
                                    </div> 
                                 </div>
                             ))}
                            </div>
                        ))}
                    </div>
                    <div className="my-cart">
                       <Card className="card">
                          <CardContent>
                            <div>
                             <Typography gutterBottom variant="h6" component="h4">
                                 <Badge badgeContent={this.state.totalCartItems} color="primary" className="badge" >
                                   <ShoppingCart/>
                                 </Badge>
                                 <span style={{marginLeft:'20px'}}>My Cart</span>
                             </Typography>
                            </div>
                            {this.state.cartItems.map(item => (
                                <div className="Category-items" key={"item"+ item.id}>
                                    <div  className="item added-item">
                                     {item.item_type === 'VEG' ? <FontAwesomeIcon icon={faStopCircle} className="veg-item-color" aria-hidden="true"/> : <FontAwesomeIcon icon={faStopCircle} className="non-veg-item-color"/>} 
                                     
                                    <span>&nbsp;&nbsp;&nbsp; {item.item_name}</span> 
                                    </div>
                                    <div className="added-item">
                                   <span>
                                        <IconButton  
                                               key="close"
                                               aria-label="Close"
                                               color="inherit" 
                                               onClick={() => this.removeCartItemClickHandler(item)}>
                                             <Remove/>
                                        </IconButton>
                                     </span>
                                    <span>{item.quantity}</span>
                                    <span >
                                       <IconButton 
                                              key="close"
                                              aria-label="close"
                                              color="inherit"
                                              onClick={() => this.addCartItemClickHandler(item)}>
                                                  <Add/>
                                              </IconButton>
                                    </span> </div>
                                    <span> 
                                     <FontAwesomeIcon icon="rupee-sign"/> {(item.totalPrice).toFixed(2)}</span> 
                                 </div>
                            ))}
                            <br/>
                            <div>
                                <span  className="item-total">TOTAL AMOUNT</span>
                                <span className="item-rupee"><FontAwesomeIcon icon="rupee-sign"/>  {(this.state.totalCartItemsValue).toFixed(2)}</span>
                            </div>
                            <br/>
                            <Button className="cart-button"  variant="contained" color="primary"
                             onClick={this.onClickCheckoutButton()}>
                              CHECKOUT
                            </Button>
                            <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        
                                        open={this.state.open}
                                        autoHideDuration={1000}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.cartNotificationMessage}</span>}

                                        action={[
                                            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                                              <CloseIcon className={classes.icon} />
                                            </IconButton>,
                                          ]}
                                    />
                          </CardContent>    
                       </Card>    
                    </div>               
                </div>
            
            </div>
        );
    }
}

export default withStyles(styles)(Details);