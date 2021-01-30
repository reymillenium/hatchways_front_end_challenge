import React from "react";
import PropTypes from 'prop-types';

import classes from './NavigationItems.module.scss';

import NavigationItem from "./NavigationItem/NavigationItem";
import sideDrawer from "../SideDrawer/SideDrawer";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/*<NavigationItem href={"/"} exact={true} clicked={props.clicked}>Burger Builder</NavigationItem>*/}
        {/*<NavigationItem href={"/"} exact={true} clicked={props.clicked}>Burger Builder</NavigationItem>*/}

        <NavigationItem href={"/students"} clicked={props.clicked}>Students</NavigationItem>

    </ul>
);

sideDrawer.propTypes = {
    clicked: PropTypes.func
}

export default navigationItems;