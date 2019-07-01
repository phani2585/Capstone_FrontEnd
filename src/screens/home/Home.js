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
    backgroundColor: theme.palette.background.paper

  },
});

class Home extends Component {

  constructor() {
    super();
    this.searchRestaurantByRestaurantName = this.searchRestaurantByRestaurantName.bind(this);
  }
  state = {
    isRestaurantDataLoaded: false,
    restaurantData: [], // array containing all the restaurants info available
    //isDataLoaded: true,
    filteredRestaurantData: [], // array containing all the restaurants info filtered using search box
    currentSearchValue: "",
  };

  /**
   * Function to search a restaurant by its name; called when a value is entered by a user in the search box
   * @param event default parameter on which the event is called
   * @memberof Home
   */
  searchRestaurantByRestaurantName = event => {
    let currRestaurantData = [...this.state.restaurantData];
    const searchValue = event.target.value;
    if (!Utils.isEmpty(searchValue)) {
      let searchResults = [];
      for (var restaurant in currRestaurantData) {
        if (
          !Utils.isUndefinedOrNull(currRestaurantData[restaurant].restaurant_name)
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          searchResults.push(currRestaurantData[restaurant]);
        }
      }
      this.setState({
        filteredRestaurantData: searchResults,
        currentSearchValue: searchValue
      });
    } else {
      this.setState({ currentSearchValue: searchValue });
    }
  };

  /**
   * Function called before the render method
   * @memberof Home
   */
  componentDidMount() {
    this.getAllRestaurantData();
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
            showLink={true}
            showSearch={true}
            searchImageByDescription={this.searchImageByDescription}
            showLoginModal={true}
            showProfile={true}
            enableMyAccount={true}
          /></div>
        <div >
          <br />
          <div className={classes.root}>
            <GridList cellHeight={400} className={classes.gridListMain} cols={4}>
              {this.state.restaurantData.map(restaurant => (
                <GridListTile key={"restaurant" + restaurant.id} cols={restaurant.cols || 1}>
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
