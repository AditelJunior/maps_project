import React, { Component } from "react";
import {
    ScrollView,
    Dimensions,
    View,
    Image,
    Text,
    Platform,
    Button,
    alert,
    TouchableOpacity,
    Modal, TouchableHighlight
} from "react-native";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import DriverList from "../DriverList/DriverList";
// import { StackNavigator } from "react-navigation";
// import Driver from "../../components/Driver/Driver"
const { height } = Dimensions.get("window");

const MAP_HEIGHT = height * 0.75;
const CARD_HEIGHT = height - MAP_HEIGHT - 20;
const CARD_WIDTH = 250;
const ACCENT_COLOUR = "#0098FF";
// const arrowRight = ();
class Map extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Карта',
        headerLeft: <TouchableOpacity
            onPress={() => navigation.navigate("DriverList")}
            style={{padding:20}}>

            <Icon name="ios-menu"
                  size={40}
            />
        </TouchableOpacity>,
        // headerRight: <Icon
        //     name="ios-arrow-round-forward"
        //     size={40}
        //     style={{marginRight: 20}}
        //     // onPress={() => navigate("DriverList")}
        //     />
        headerRight:<TouchableOpacity
            onPress={() => navigation.navigate("DriverList")}
            style={{padding:20}}>

            <Icon name="ios-arrow-round-forward"
                  size={40}
            />
        </TouchableOpacity>
    });


        scrollerRef = null;
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            latitude: null,
            longitude: null,
            error:null,
            // region: {
            //     latitude: 42.875885,
            //     longitude: 74.603703,
            //     latitudeDelta: 0.15,
            //     longitudeDelta: 0.01
            // },
            properties: [
                {
                    id: 1,
                    title: "Test Photo",
                    rating: 5,
                    reviewsCount: 75,
                    imageUrl:
                        "https://data.vb.kg/image/big/2015-06-03_11-48-53_270618_w.jpg",
                    coords: {
                        latitude: 42.848807,
                        longitude: 74.609577
                    }
                },
                {
                    id: 2,
                    title: "Room with a view in Leicester Square",
                    rating: 4,
                    reviewsCount: 139,
                    imageUrl:
                        "https://i.cars.kg/preview/r/bMwTXwH5GHsBR7AtKz71NQ/1080x-/20170403/aa6286874cb4c07411618fa7b5cb1fb3.jpg",
                    coords: {
                        latitude: 42.849531,
                        longitude: 74.612710
                    }
                },
                {
                    id: 3,
                    title: "Something something London",
                    type: "Entire flat",
                    rating: 3,
                    reviewsCount: 12,
                    imageUrl:
                        "http://knews.kg/wp-content/uploads/2017/04/Foto-voditel.jpg",
                    coords: {
                        latitude: 42.842510,
                        longitude: 74.617704
                    }
                },
                {
                    id: 4,
                    title: "A shed in the garden",
                    rating: 2,
                    reviewsCount: 255,
                    imageUrl:
                        "https://img5.lalafo.com/i/posters/original/86/bb/a88b9fc8464e2185221eb0475516.jpeg",
                    coords: {
                        latitude: 42.838610,
                        longitude: 74.622393
                    }
                }
            ],
            selectedProperty: 0
        };
    }

    fetchData = async() => {
        const { params } = this.props.navigation.state;
    };
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    componentDidUpdate(prevProps, prevState) {
        if (
            this.scrollerRef &&
            prevState.selectedProperty !== this.state.selectedProperty
        ) {
            this.scrollerRef.scrollTo({
                x: this.state.selectedProperty * CARD_WIDTH,
                y: 0,
                animated: true
            });
        }
    }
    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             this.setState({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //                 error: null,
    //             });
    //         },
    //         (error) => this.setState({ error: error.message }),
    //         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    //     );
    // }
    componentDidMount() {
        this.fetchData();
    }

    // onRegionChange = (region) => {
    //     this.setState({ region });
    // };

    render() {
        const { params } = this.props.navigation.state;
        const { properties, selectedProperty } = this.state;
        const { navigate } = this.props.navigation;
        return (
            // The marginTop here is used to move the map above where the navigation would be
            <View style={{ flex: 1, marginTop: -60 }}>
                {/*<Button*/}
                    {/*title="Go to DriverList"*/}
                    {/*style={{marginTop: 50}}*/}
                    {/*onPress={() =>*/}
                        {/*navigate('DriverList')*/}
                    {/*}*/}
                {/*/>*/}

                <MapView
                    style={{ flex: 1 }}
                    // InitialRegion={this.state.region}
                    // onRegionChange={this.onRegionChange}
                    region={{latitude: 42.875885,
                        longitude: 74.603703,
                        latitudeDelta: 0.15,
                        longitudeDelta: 0.01}}
                    loadingEnabled
                    showsUserLocation
                >
                    {/*<Icon name='ios-pin' size={40}/>*/}
                    {properties.map((property, index) => (
                        <MapView.Marker
                            key={property.id}
                            coordinate={property.coords}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: selectedProperty === index ? ACCENT_COLOUR : "#FFFFFF",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 15,
                                }}
                            >
                                <Icon
                                    name='ios-car'
                                    size={20}
                                    style={{
                                    color: selectedProperty === index ? "#FFFFFF" : "#000000"
                                }}/>
                            </TouchableOpacity>
                        </MapView.Marker>
                    ))}
                </MapView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{backgroundColor: '#FFF', flexDirection: 'row-reverse', paddingTop: 10, paddingLeft: 20, paddingRight: 20}}>
                        {/*<Text style={{fontSize: 30, fontWeight: 'bold'}}>Заказ</Text>*/}
                        <Icon
                            name='ios-close'
                            size={40}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}
                        />
                    </View>
                    <View style={{marginTop: 22}}>
                        <View>
                        </View>
                        <Button
                            title="Заказать"
                            style={{width: "50%", backgroundColor: '#EC002C'}}
                            onPress={() => navigation.navigate("Driver")}

                        />
                    </View>
                </Modal>
                {/*<Icon name='ios-locate-outline' size={50} />*/}
                {/*<ScrollView*/}
                    {/*horizontal*/}
                    {/*showsHorizontalScrollIndicator={false}*/}
                    {/*snapToInterval={CARD_WIDTH}*/}
                    {/*ref={ref => (this.scrollerRef = ref)}*/}
                    {/*style={{*/}
                        {/*position: "absolute",*/}
                        {/*bottom: 0,*/}
                        {/*left: 0,*/}
                        {/*right: 0,*/}
                        {/*paddingTop: 20,*/}
                        {/*paddingBottom: 50,*/}
                        {/*backgroundColor: "#FFFFFF"*/}
                    {/*}}*/}
                    {/*contentContainerStyle={{*/}
                        {/*paddingRight: 40,*/}
                        {/*paddingLeft: 20*/}
                    {/*}}*/}
                    {/*onMomentumScrollEnd={e => {*/}
                        {/*this.setState({*/}
                            {/*selectedProperty: Math.round(*/}
                                {/*e.nativeEvent.contentOffset.x / CARD_WIDTH*/}
                            {/*)*/}
                        {/*});*/}
                    {/*}}*/}
                {/*>*/}
                    {/*{properties.map((property, index) => (*/}
                        {/*<View*/}
                            {/*key={property.id}*/}
                            {/*style={{ width: CARD_WIDTH, marginHorizontal: 5 }}*/}
                        {/*>*/}
                            {/*<Image*/}
                                {/*style={{*/}
                                    {/*width: CARD_WIDTH,*/}
                                    {/*height: CARD_HEIGHT*/}
                                {/*}}*/}
                                {/*source={{ uri: property.imageUrl }}*/}
                            {/*/>*/}
                            {/*{selectedProperty === index && (*/}
                                {/*<View*/}
                                    {/*style={{*/}
                                        {/*position: "absolute",*/}
                                        {/*top: 0,*/}
                                        {/*left: 0,*/}
                                        {/*height: 4,*/}
                                        {/*width: "100%",*/}
                                        {/*backgroundColor: ACCENT_COLOUR*/}
                                    {/*}}*/}
                                {/*/>*/}
                            {/*)}*/}
                            {/*<View*/}
                                {/*style={{*/}
                                    {/*flexDirection: "row",*/}
                                    {/*alignItems: "center",*/}
                                    {/*paddingTop: 4*/}
                                {/*}}*/}
                            {/*>*/}

                                {/*<View*/}
                                    {/*style={{*/}
                                        {/*backgroundColor: "#555555",*/}
                                        {/*height: 2,*/}
                                        {/*width: 2,*/}
                                        {/*borderRadius: 2,*/}
                                        {/*marginHorizontal: 4*/}
                                    {/*}}*/}
                                {/*/>*/}
                            {/*</View>*/}
                            {/*<Text*/}
                                {/*style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}*/}
                            {/*>*/}
                                {/*{property.title}*/}
                            {/*</Text>*/}
                            {/*/!*<Icon name={'ios-car'} size={10} color='#EC002C'/>*!/*/}
                            {/*<View*/}
                                {/*style={{*/}
                                    {/*flexDirection: "row",*/}
                                    {/*alignItems: "center",*/}
                                    {/*paddingTop: 4*/}
                                {/*}}*/}
                            {/*>*/}
                                {/*{Array(5)*/}
                                    {/*.fill(0)*/}
                                    {/*.map((_, index) => (*/}
                                        {/*<Icon*/}
                                            {/*key={index}*/}
                                            {/*color={ACCENT_COLOUR}*/}
                                            {/*name={*/}
                                                {/*index < property.rating*/}
                                                    {/*? Platform.OS === "ios" ? "ios-star" : "md-star"*/}
                                                    {/*: Platform.OS === "ios"*/}
                                                    {/*? "ios-star-outline"*/}
                                                    {/*: "md-star-outline"*/}
                                            {/*}*/}
                                            {/*size={14}*/}
                                        {/*/>*/}
                                    {/*))}*/}
                                {/*<Text style={{ fontSize: 12, marginLeft: 4 }}>*/}
                                    {/*{property.reviewsCount}*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*))}*/}
                {/*</ScrollView>*/}
            </View>
        );
    }
}
export default Map;