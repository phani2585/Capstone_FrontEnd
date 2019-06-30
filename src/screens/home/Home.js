import React, { Component } from "react";
import "./Home.css";
//import * as Constants from "../../common/Constants";
import * as Utils from "../../common/Utils";
//import * as UtilsUI from "../../common/UtilsUI";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Header from "../../common/header/Header";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RestaurantCard from "./RestaurantCard";
import restaurantInfo from "../../common/restaurantInfo";
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


// inline styles for Material-UI components


const styles = {
  RestaurantCard: {
    marginBottom: 40,
    margin: '8px',
    shadow: '20px',
    height:600,
    
  },
media: {
    width:450,
    height:200,
  }
}
class Home extends Component {

  constructor() {
    super();

    this.searchImageByDescription = this.searchImageByDescription.bind(this);
  }

  state = {
    isDataLoaded: true,
    imageData: [], // array containing all the images posted by the currently logged-in user
    filteredImageData: [], // array containing all the images filtered using search box
    currentSearchValue: "",
    restaurantInfo:[]
  };


 
/**
   * Function to search an image by its description; called when a value is entered by a user in the search box
   * @param event default parameter on which the event is called
   * @memberof Home
   */
  searchImageByDescription = event => {
    let currImageData = [...this.state.restaurantInfo];
    const searchValue = event.target.value;
    if (!Utils.isEmpty(searchValue)) {
      let searchResults = [];
      for (var image in currImageData) {
        if (
          !Utils.isUndefinedOrNull(currImageData[image].restaurant_name) 
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          searchResults.push(currImageData[image]);
        }
      }
      this.setState({
        filteredImageData: searchResults,
        currentSearchValue: searchValue
      });
    } else {
      this.setState({ currentSearchValue: searchValue });
    }
  };

 /**
   * Function called when the component is rendered
   * @memberof Home
   */
  render() {
    const { classes } = this.props;

    const dataSource = Utils.isUndefinedOrNullOrEmpty(
      this.state.currentSearchValue
    )
      ? this.state.imageData
      : this.state.filteredImageData;

    return  (
      
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
     <GridList cellHeight="auto" className={classes.gridListMain} cols={4}>
         {restaurantInfo.map(restaurant => (

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
)
}
}
      
Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
    