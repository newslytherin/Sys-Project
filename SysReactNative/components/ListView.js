import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Styles } from '../resources/Styles';
import Touchable from './Touchable';
import Loader from './Loader';

const URL = 'https://stephandjurhuus.com/travel/api/flights';

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

    async getData() {
        try {
            const data = await fetch(URL).then(res => res.json());
            const list = await data.map((object, index) => {
                return {
                    key: `${index}`,
                    val: object
                }
            })
            await this.setState({data: list, isLoading: false});

        } catch (err) {
            console.log('err:: ' + err)
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
            <Text style={Styles.error}>A failed occurred, try refreshing or come back later</Text>
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