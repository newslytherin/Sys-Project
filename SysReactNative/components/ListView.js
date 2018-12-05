import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Styles } from '../resources/Styles';
import Touchable from './Touchable';
import Loader from './Loader';

const URL = 'https://stephandjurhuus.com/travel/api/flights/all';

export default class FlatListBasics extends Component {

    static navigationOptions = { 
        title: 'flights',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#000' },
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [], 
            isLoading: true, 
            isError: false,
            text: ''
        }
        this.getData();
    }

    handleHttpErrors(res) {
        if (!res.ok) {
            return Promise.reject({
                status: res.status,
                fullError: res.json()
            })
        }
        return res.json();
    }

    getAllFligths = async() => {
        try {
            return await fetch(URL).then(handleHttpErrors);
        } catch (err) {
            console.log(err)
        }
    }

    async getData() {
        try {
            console.log('in getData()');
            const data = await fetch(URL)
            .then(res => {
                console.log('in first then');
                console.log(res);
                return res.json()
            });
            console.log(data);
            let dataArr = [];
            data.forEach(e => {
                dataArr.push(...e);
            });
            const list = await dataArr.map((object, index) => {
                return {
                    key: `${index}`,
                    val: object
                }
            })
            await this.setState({data: list, isLoading: false});

        } catch (err) {
            console.log(err)
            this.setState({isError: true, isLoading: false});
        } 
    }

    refresh() {
        this.setState({ isLoading: true, isError: false })
        this.getData()
    }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) return (<Loader />)
    else if (this.state.isError) return (
        <View style={Styles.container}>
            <Text style={Styles.error}>An error occurred, try refreshing or come back later</Text>
            <Touchable onPress={() => navigate('listView')} title="refresh" />
        </View>
    )
    else return (
      <View style={Styles.container}>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
        />
        <Text style={{color: '#fff'}}>{this.state.text}</Text>
        <FlatList 
            data={this.state.data}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigate('flightView', {flight: item.val})}>
                    <ListItem item={item.val}/>
                </TouchableOpacity>
            )}
        />
        <Touchable onPress={() => this.refresh()} title="refresh" />
      </View>
    );
  }
}

function ListItem(props) {
    return (
        <View style={{margin: 10}}>
            <Text style={{color: '#fff'}}>{`departure: ${props.item.departure}`}</Text>
            <Text style={{color: '#fff'}}>{`destination: ${props.item.destination}`}</Text>
            <Text style={{color: '#fff', fontSize: 18}}>{`price: ${props.item.price}.00 kr`}</Text>
        </View>
    )
}