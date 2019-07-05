import React, { Component } from "react";
import "./Home.css";
import * as Constants from "../../common/Constants";
import * as Utils from "../../common/Utils";
//import * as UtilsUI from "../../common/UtilsUI";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Header from "../../common/header/Header";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RestaurantCard from "./RestaurantCard";
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


// inline styles for Material-UI components
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
    width: '100%'
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
        margin: "15px !important"
    },
});

class Home extends Component {

 /* constructor() {
    super();
    //this.searchRestaurantByRestaurantName = this.searchRestaurantByRestaurantName.bind(this);
    //this.getRestaurantByRestaurantName = this.getRestaurantByRestaurantName.bind(this);
  }*/
  state = {
    //isRestaurantDataLoaded: false,
    restaurantData: [], // array containing all the restaurants info available
    //restaurantDataByName:[],
    //isDataLoaded: true,
    //filteredRestaurantData: [],// array containing all the restaurants info filtered using search box
    restaurant_name: "",
    loggedIn: sessionStorage.getItem("access-token") == null ? false : true,//Logged in status is null if there is no accesstoken in sessionstorage
  };

  /**
   * Function called before the render method
   * @memberof Home
   */
  componentDidMount() {
    this.getAllRestaurantData();
    this.getRestaurantByRestaurantName();
  }

/**
  * Function to get all the restaurant data on the home page
  * @memberof Home
  */
 getAllRestaurantData = () => {
  const requestUrl = this.props.baseUrl + "/restaurant";
  const that = this;
  Utils.makeApiCall(
    requestUrl,
    null,
    null,
    Constants.ApiRequestTypeEnum.GET,
    null,
    responseText => {
      that.setState(
        {
          restaurantData: JSON.parse(responseText).restaurants
        },
        function () {
          that.setState({
            isRestaurantDataLoaded: true
          });
        }
      );
    },
    () => { }
  );
};

 /** 
 * Function to get restaurant info by restaurant name; called when a value is entered by a user in the search box
 * @param event default parameter on which the event is called
 * @memberof Home
 */
/*CHECK this API n complete search Box implemetation*/
 getRestaurantByRestaurantName = () => {
   //this.setState({ searchValue : event.target.value });
  
  let requestparamsObj =  {"restaurant_name":"Lion Heart"};
  const requestUrl = "http://localhost:8080/api/restaurant/name/"+this.state.restaurant_name;
  const that = this;
  Utils.makeApiCall(
      requestUrl,
      requestparamsObj,
      null,
      Constants.ApiRequestTypeEnum.GET,
      null,
      responseText => {
          that.setState(
              {
                  restaurantDataByName: JSON.parse(responseText).restaurants
              },
              function () {
                  that.setState({
                      isRestaurantDataLoaded: true
                  });
              }
          );
      },
      () => { }
  );
};
  
restaurantClickHandler = (restaurantId) => {
  this.props.history.push('/restaurant/' + restaurantId);
}

  /**
   * Function called when the component is rendered
   * @memberof Home
   */
  render() {
    const { classes } = this.props;

    /* const dataSource = Utils.isUndefinedOrNullOrEmpty(
       this.state.currentSearchValue
     )
       ? this.state.restaurantData
       : this.state.filteredRestaurantData;*/

    return (

      <div>
        <div>
          <Header
            //baseUrl={this.props.baseUrl}
            history={this.props.history}
            showLogo={true}
            showSearchBox={true}
            //searchRestaurantByRestaurantName={this.searchRestaurantByRestaurantName}
            showLoginModal={true}
            enableMyAccount={true}
          />
          <div className="restaurants-main-container">
            <GridList cellHeight ={400} className={classes.gridListMain} cols={4}>
              {this.state.restaurantData.map(restaurant => (
                <GridListTile key={"restaurant" + restaurant.id} onClick={() => this.restaurantClickHandler(restaurant.id)} >
                  <Grid container className={classes.root} >
                    <Grid item>
                      <RestaurantCard
                        restaurant={restaurant}
                      />
                    </Grid>
                  </Grid>
                </GridListTile>
              ))};
            </GridList>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
