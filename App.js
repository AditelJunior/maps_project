import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {AppRegistry, View} from "react-native";
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

    onMapPress = (e) => {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: `marker_${this.state.markers.length}`,
                },
            ],
        });
    };

    render() {
        return (
            <View>
                <MapView
                    provider={ PROVIDER_GOOGLE }
                    style={{height: '100%', width: '100%'}}
                    InitialRegion={this.state.region}
                    onRegionChange={this.onRegionChange}
                    onPress={this.onMapPress}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinate}
                            key={marker.key}
                        />
                    ))}
                </MapView>
            </View>
        );
    }

}
export default Map;

AppRegistry.registerComponent('Map', ()=> Map);