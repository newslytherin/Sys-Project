import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, Slider } from 'react-native';
import { Styles, COLORS } from '../resources/Styles';
import Touchable from './Touchable';
import Loader from './Loader';
import Filters from './Filters'

const URL = 'https://stephandjurhuus.com/travel/api/flights/all';

export default class FlatListBasics extends Component {

    static navigationOptions = { 
        title: 'flights',
        headerTitleStyle: { color: COLORS.WHITE },
        headerStyle: { backgroundColor: COLORS.MAIN },
        headerTintStyle: COLORS.WHITE
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

    formatDate = (date) => {
        const d = new Date( date )
        const days = ['Monday', 'tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const minutes = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes()
        const hours = (d.getHours() < 10) ? `0${d.getHours()}` : d.getHours()
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${hours}:${minutes}`
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
                    <ListItem item={item.val} departure={this.formatDate(item.val.depTime)}/>
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
        <View style={ Styles.flightCardContainer }>
            <Text style={ Styles.flightCardTitle }>{props.item.airline}</Text>
            <Text style={ Styles.flightCardSubTitle }>{props.departure}</Text>
            <Text style={ Styles.flightCardLabel }>{`departure`}</Text>
            <Text style={ Styles.flightCardContent }>{`${props.item.departure}`}</Text>
            <Text style={ Styles.flightCardLabel }>{`destination`}</Text>
            <Text style={ Styles.flightCardContent }>{`${props.item.destination}`}</Text>
            <Text style={ Styles.flightCardPrice }>{`${props.item.price}.00 kr`}</Text>
        </View>
    )
}

