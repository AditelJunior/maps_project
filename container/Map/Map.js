import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {AppRegistry, Button, Image, Text, TextInput, ToolbarAndroid, View} from "react-native";
import {
    createStackNavigator,
} from 'react-navigation';
import DriverList from "./container/DriverList/DriverList";
// import * as Alert from "react-native";
// import {createStackNavigator} from 'react-navigation';
// import Icon from "expo/src/Icon";



// export default App;


class Map extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
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
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.map_input_view}>
                    {/*<TextInput style={styles.map_input}/>*/}
                    <View>
                        <Image source={'./imagies/icon/images.png'}/>
                    </View>
                    <Button
                        title="To DriversList =>"
                        onPress={() =>
                            navigate('DriverList', { name: 'DriverList' })
                        }
                    />
                </View>
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
                <View style={styles.coordinate_block}>
                    <Text style={styles.coordinate_text}>{this.state.region.latitude}</Text>
                    <Text style={styles.coordinate_text}>{this.state.region.longitude}</Text>
                </View>
            </View>
        );
    }

}

const styles = {
    container: {
        width: '100%',
        height: '100%',
    },
    map_container: {
        flex: 4,
        height: '100%',
        width: '100%'
    },
    map_input_view: {
        flex: 1,
    },
    btn_drivers_list: {
        // flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        // height: '100%'
        // position: 'absolute',
        // top: 0,
    },
    coordinate_block: {
        backgroundColor: 'black',
        // border: 2 'solid' 'red',
        // borderRadius: '20%',
        flex: 1,
    },
    coordinate_text: {
        height: '50%',
        color: 'white',
    }
};

export default Map;

AppRegistry.registerComponent('Map', ()=> Map);