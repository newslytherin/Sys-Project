import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, Slider } from 'react-native';
import { Styles } from '../resources/Styles';
import Touchable from './Touchable';
import Loader from './Loader';

const URL = 'https://stephandjurhuus.com/travel/api/flights/all';

export default class FlatListBasics extends Component {

    static navigationOptions = { 
        title: 'flights',
        headerTitleStyle: { color: '#000' },
        headerStyle: { backgroundColor: '#fff' },
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [], 
            filteredData: [],
            isLoading: true, 
            isError: false,
            text: '',
            filters: {
                toogleView: true,
                departure: '',
                destination: '',
                minPrice: 0,
                maxPrice: 20000,
            }
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
                return res.json()
            });
            let dataArr = [];
            data.forEach(e => {
                dataArr.push(...e);
            });

            //dataArr.reverse()
            const list = await dataArr.map((object, index) => {
                return {
                    key: `${index}`,
                    val: object
                }
            })
            await this.setState({data: list, filteredData: list, isLoading: false});

        } catch (err) {
            console.log(err)
            this.setState({isError: true, isLoading: false});
        } 
    }

    refresh() {
        this.setState({ isLoading: true, isError: false })
        this.getData()
    }

    filter = () => {
        const data = this.state.data
        
        let filteredData = data.filter(item => {
            const departure = item.val.departure
            return departure.includes(this.state.filters.departure)
        })

        filteredData = filteredData.filter(item => {
            const destination = item.val.destination
            return destination.includes(this.state.filters.destination)
        })

        filteredData = filteredData.filter(item => {
            const price = item.val.price
            const min = this.state.filters.minPrice
            const max = this.state.filters.maxPrice
            return price < max && price > min
        })

        this.setState({filteredData})
    }

    setFilters = (filter, value) => {
        const filters = this.state.filters
        filters[filter] = value
        this.setState({filters})
        this.adjustPriceRange(filter)
        console.log(filters)
        this.filter()
    }

    resetFilters = () => {
        const filters = {
            toogleView: false,
            departure: '',
            destination: '',
            minPrice: 0,
            maxPrice: 20000,
        }

        this.setState({filters})
        console.log(filters)
    }

    adjustPriceRange = (filter) => {
        const filters = this.state.filters
        if (filter === 'minPrice' && this.state.filters.minPrice > this.state.filters.maxPrice) filters.maxPrice = this.state.filters.minPrice
        if (filter === 'maxPrice' && this.state.filters.minPrice > this.state.filters.maxPrice) filters.minPrice = this.state.filters.maxPrice
        this.setState(filters)
    }

    toogleFilters = () => {
        const filters = this.state.filters
        filters.toogleView = !filters.toogleView
        this.setState({filters})
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
        <Filters 
            departure={this.state.departure}
            destination={this.state.destination}
            minPrice={this.state.minPrice}
            maxPrice={this.state.maxPrice}
            hide={this.state.filters.toogleView}
            onPress={this.toogleFilters}
            setFilters={this.setFilters}
            resetFilters={this.resetFilters}
        />
        <FlatList 
            data={this.state.filteredData}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigate('flightView', {flight: item.val})}>
                    <ListItem item={item.val}/>
                </TouchableOpacity>
            )}
        />
        <Touchable onPress={() => this.refresh()} title="refresh"/>
      </View>
    );
  }
}

function ListItem(props) {
    return (
        <View style={{padding: 10, margin: 15, backgroundColor: '#fff', borderBottomColor: '#808080', borderBottomWidth: 1 }}>
            <Text style={{color: '#000', fontSize: 12}}>{`departure`}</Text>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>{`${props.item.departure}`}</Text>
            <Text style={{color: '#000', fontSize: 12}}>{`destination`}</Text>
            <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>{`${props.item.destination}`}</Text>
            <Text style={{color: '#000', fontSize: 16, padding: 5}}>{`${props.item.airline} | ${props.item.depTime}`}</Text>
            <Text style={{color: '#000', fontSize: 18, color: '#00ca00', fontWeight: 'bold', textAlign: 'center', margin: 15}}>{`price: ${props.item.price}.00 kr`}</Text>
        </View>
    )
}

function Filters(props) {
    return (props.hide == true)
        ? <Touchable title='filters' onPress={props.onPress}/>
        : (<>
            <TextFilterField def='departure' value={props.departure} filter='departure' setFilters={props.setFilters}/>
            <TextFilterField def='destination' value={props.destination} filter='destination' setFilters={props.setFilters}/>
            <SliderFilterField def='minimum price' value={props.minPrice} filter='minPrice' setFilters={props.setFilters}/>
            <SliderFilterField def='maximum price' value={props.maxPrice} filter='maxPrice' setFilters={props.setFilters}/>
            <Touchable title='hide' onPress={props.onPress}/>
            <Text style={{textAlign: 'center', color: '#00ca00', fontSize: 18, padding: 5}} onPress={props.resetFilters()}>reset</Text>
        </>)
}

function TextFilterField(props) {
    return (
    <>
        <Text style={{ color: '#808080', margin: 15, fontWeight: 'bold' }}>{props.def}</Text>
        <TextInput
            style={{color: '#00ca00', fontSize: 24, height: 40, borderColor: 'transparent', marginLeft: 15, marginRight: 15}}
            onChangeText={(value) => props.setFilters(props.filter, value)}
            value={props.value}
            placeholder='search'
        />
    </>
    )
}

function SliderFilterField(props) {
    return (
        <>
            <Text style={{ color: '#808080', margin: 15, fontWeight: 'bold' }}>{`${props.def} - ${props.value}.00 kr.`}</Text>
            <Slider
                style={{ marginLeft: 15, marginRight: 15}}
                onValueChange={(value) => props.setFilters(props.filter, value)}
                value={props.value}
                minimumValue={0}
                maximumValue={20000}
                step={100}
            />
        </>
    )
}