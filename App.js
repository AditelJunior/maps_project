import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import DriverList from "./container/DriverList/DriverList";
import Map from "./container/Map/Map";
import Driver from "./components/Driver/Driver"

const App = createStackNavigator({
    Map: { screen: Map },
    DriverList: { screen: DriverList },
    Driver: {screen: Driver}
});


export default App;
