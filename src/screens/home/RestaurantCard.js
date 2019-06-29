import React from "react";
import "./RestaurantCard.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Star from "@material-ui/icons/Star";
import inr from "font-awesome-icons/index";
import CardActionArea from "@material-ui/core/CardActionArea";

/**
 * Functional component for displaying an restaurant card
 * @param props properties passed by parent component to child component
 */
const RestaurantCard = function (props) {
    const restaurant = props.restaurant;
    const classes = props.classes;


    return (
        <Card  >
<CardActionArea>
            <CardMedia id="media"
                image={restaurant.photo_URL}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {restaurant.restaurant_name}
                </Typography>
                <br /><br />
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                    {restaurant.categories}
                </Typography>
                <br /><br />
                <div id="last-row">
                    <Button variant="contained" color="inherit" id="left-button">
                        <Star id="star-icon" />{restaurant.customer_rating}({restaurant.number_customers_rated})
                      </Button>
                    <Typography gutterBottom variant="body1" color="textSecondary" component="p" id="right-avg-price">
                        <inr />{restaurant.average_price}  for two
                      </Typography>
                </div>
            </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default RestaurantCard;