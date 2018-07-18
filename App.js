import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {AppRegistry, Image, View} from "react-native";
import Icon from "expo/src/Icon";
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
            markers: [
            ],
        };
    }

    onRegionChange = (region) => {
        this.setState({ region });
    };

    // onMapPress = (e) => {
    //     this.setState({
    //         markers: [
    //             ...this.state.markers,
    //             {
    //                 coordinate: e.nativeEvent.coordinate,
    //                 key: `marker_${this.state.markers.length}`,
    //             },
    //         ],
    //     });
    // };

    render() {
        return (
            <View>
                <MapView
                    provider={ PROVIDER_GOOGLE }
                    style={styles.map_container}
                    InitialRegion={this.state.region}
                    onRegionChange={this.onRegionChange}
                    // onPress={this.onMapPress}
                >

                        <MapView.Marker
                            coordinate={this.state.region}
                            // key={1}
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
                    {/*<Image source={require('./imagies/icon/map_marker.png')} style={styles.marker_icon}/>*/}
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
};

export default Map;

AppRegistry.registerComponent('Map', ()=> Map);