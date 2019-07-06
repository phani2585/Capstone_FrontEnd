import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Details.css';
import Header from '../../common/header/Header';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from '@material-ui/core/Button';
import Checkout from '../checkout/Checkout';
import Typography from '@material-ui/core/Typography';
//import this.state.RestaurantByIdData from '../../common/this.state.RestaurantByIdData';

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

import Card from '@material-ui/core/Card';
import Badge from '@material-ui/core/Badge';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

class Details extends Component {

    state = {
        AddSnackBarIsOpen: false,
        RestaurantByIdData: {
            "id": "",
            "restaurant_name": "",
            "photo_URL": "",
            "customer_rating": "",
            "average_price": "",
            "number_customers_rated": "",
            "address": {
                "id": "",
                "flat_building_name": "",
                "locality": "",
                "city": "",
                "pincode": "",
                "state": {
                    "id": "",
                    "state_name": ""
                }

            },
            "categories": []
        }
         
    }

    checkoutHandler = () => {
        ReactDOM.render(<Checkout />, document.getElementById('root'))
        this.props.history.push('/checkout/');
    }
    AddItemHandler = () => {
        this.setState({ AddSnackBarIsOpen: true });

    }
    AddSnackBarCloseHandler = () => {
        this.setState({ AddSnackBarIsOpen: false });
    }

    componentWillMount() {

        let data = null;
        //let id="1dd86f90-a296-11e8-9a3a-720006ceb890";
        
        let xhr = new XMLHttpRequest();
        let that = this;
        let id=this.props.match.params.id;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    RestaurantByIdData: JSON.parse(this.responseText)
                    //RestaurantByIdDataAddress: JSON.parse(this.responseText).address
                });
            }
        });

        xhr.open("GET", this.props.baseUrl + "/restaurant/"+ id);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
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
                            <img className="restaurant-img" src={this.state.RestaurantByIdData.photo_URL} alt="restaurantimage" />
                        </div>
                        <div className="right-details">
                            <div>
                                <Typography variant="headline" component="h3">{this.state.RestaurantByIdData.restaurant_name}</Typography>
                            </div>
                            <div className="locality-div">{this.state.RestaurantByIdData.address.locality}</div>
                            <br />
                            <div>
                                {this.state.RestaurantByIdData.categories.map((category, index) => ((index ? ', ' : '') + category.category_name))}
                            </div>
                            <br />
                            <div className="fa-icon">
                                <div className="fa-fa-star">
                                    <i class="fa fa-star" aria-hidden="true"></i>{this.state.RestaurantByIdData.customer_rating}
                                    <div className="average-rating">AVERAGE RATING BY <br />{this.state.RestaurantByIdData.number_customers_rated} CUSTOMERS</div>
                                </div>
                                <div className="fa-fa-inr">
                                    <i class="fa fa-inr" aria-hidden="true"></i>{this.state.RestaurantByIdData.average_price}
                                    <div className="average-price">AVERAGE COST FOR<br /> TWO PEOPLE</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bottom-container-details">
                        <div className="bottom-left-category-details">
                            <div>
                                {this.state.RestaurantByIdData.categories.map((category, index) => (
                                    <List className="list-category-name" key={category.id}>
                                        <ListItem>
                                            <ListItemText primary={category.category_name} className="list-category-name" />
                                        </ListItem>
                                        <Divider />
                                        {
                                            category.item_list.map((subitem, i) => {
                                                return (<ul key={subitem.id}>
                                                    <div className="item-row">
                                                        <div className="item-row-left">
                                                            <i class="fa fa-circle" color={(subitem.item_type === "VEG") ? red : green} id="facircle" aria-hidden="true"></i>{subitem.item_name}
                                                        </div>
                                                        <div className="item-row-right">
                                                            <i class="fa fa-inr" id="fainr" aria-hidden="true" ></i>{subitem.price}
                                                            <AddIcon className="add-icon" onClick={this.AddItemHandler} />
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
                            <Card >
                                <CardContent>
                                    <div>
                                        <Badge className="badge" badgeContent={4} color="primary">
                                            <ShoppingCart />
                                        </Badge>
                                        <span className="my-cart-header">My Cart</span>
                                    </div>
                                    <div>
                                        <span className="total-amount">TOTAL AMOUNT</span><i id="rupee" class="fa fa-inr" aria-hidden="true" ></i>
                                    </div>
                                    <Button variant="contained" color="inherit" id="blue-btn" onClick={this.checkoutHandler}>Checkout</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>


                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
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
            </MuiThemeProvider >


        )
    }
}

export default Details;