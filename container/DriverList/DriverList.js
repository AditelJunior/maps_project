import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class DriverList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            selectedItem:'null',
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const {page, seed} = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({loading: true});
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    onPressAction = (rowItem) => {
        console.log('ListItem was selected');
        console.dir(rowItem);
        this.setState({
            selectedItem: rowItem.id.value
        });
    };

    renderRow = (item) => {
        const isSelectedUser = this.state.selectedItem === item.id.value;
        console.log(`Rendered item - ${item.id.value} for ${isSelectedUser}`);
        const viewStyle = isSelectedUser ? styles.selectedButton : styles.normalButton;
        return(
            <TouchableOpacity style={viewStyle} onPress={() => this.onPressAction(item)} underlayColor='#dddddd'>
                <View style={styles.listItemContainer}>
                    <View>
                        <Image source={{ uri: item.picture.large}} style={styles.photo} />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start',}}>
                            {isSelectedUser ?
                                <Text style={styles.selectedText}>{item.name.first} {item.name.last}</Text>
                                : <Text style={styles.text}>{item.name.first} {item.name.last}</Text>
                            }
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start',}}>
                            <Text style={styles.text}>{item.email}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return(
            <FlatList style={styles.container}
                      data={this.state.data}
                      renderItem={({ item }) => (
                          this.renderRow(item)
                      )}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    selectedButton: {
        backgroundColor: 'lightgray',
    },
    normalButton: {
        backgroundColor: 'white',
    },
    listItemContainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    selectedText: {
        marginLeft: 12,
        fontSize: 20,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});