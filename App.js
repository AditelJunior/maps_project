import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {AppRegistry, View} from "react-native";
// import * as Alert from "react-native";
// import {createStackNavigator} from 'react-navigation';
// import Icon from "expo/src/Icon";
// import RetroMapStyles from './MapStyles/RetroMapStyles.json'

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 42.875902,
                longitude: 74.602020,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            // markers: [
            // ],
        };
    }

    onRegionChange = (region) => {
        this.setState({ region });
    };

    // onMapPress = () => {
    //     Alert.alert('Ты нажал на карту')
    // };

    render() {
        return (
            <View>
                {/*<View style={styles.map_input_view}>*/}
                    {/*<TextInput style={styles.map_input}/>*/}
                {/*</View>*/}
                <MapView
                    provider={ PROVIDER_GOOGLE }
                    style={styles.map_container}
                    InitialRegion={this.state.region}
                    onRegionChange={this.onRegionChange}
                    // onPress={this.onMapPress}
                >
                    <MapView.Marker
                        coordinate={this.state.region}
                        key={1}
                    />
                    {/*<Icon name="map-marker"*/}
                          {/*style={{*/}
                              {/*zIndex: 3,*/}
                              {/*position: 'absolute',*/}
                              {/*marginTop: -37,*/}
                              {/*marginLeft: -11,*/}
                              {/*left: '50%',*/}
                              {/*top: '50%'}}*/}
                          {/*size={40}*/}
                          {/*color="#f00" />*/}
                </MapView>
            </View>
        );
    }

}

const styles = {
    map_container: {
        height: '100%',
        width: '100%'
    },
    map_input_view: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        height: '20%'
    },
    map_input: {
        // flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        height: '100%'
        // position: 'absolute',
        // top: 0,
    }
};

export default Map;

AppRegistry.registerComponent('Map', ()=> Map);