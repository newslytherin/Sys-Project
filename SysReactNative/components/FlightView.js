import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Location, Permissions } from 'expo';
import facade from '../data/apiFacade';

export default class FlightView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flight: props.navigation.state.params.flight,
            location: null
        }
    }

    componentDidMount() {
        this.changeFormats()
    }

    componentWillMount() {
        this.getLocationAsync();
        facade.sendUserData({
            altitude:this.state.location.coords.altitude,
            latitude:this.state.location.coords.latitude,
            longitude:this.state.location.coords.longitude,
            price:this.state.flight.price,
            airline:this.state.flight.airline,
            departure:this.state.flight.departure,
            destination:this.state.flight.destination,
            model:this.state.flight.model
        });
    }
  
    getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
  
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    };

    static navigationOptions = { 
        title: 'flight info',
        headerTitleStyle: { color: '#000' },
        headerStyle: { backgroundColor: '#fff' },
    }

    formatDate = (date) => {
        const d = new Date( date )
        const days = ['Monday', 'tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
    }

    formatDuration = (duration) => {
        const minutes = duration % 60
        const hours = Math.floor(duration / 60)
        return `${hours} hours and ${minutes} minutes`
    }

    changeFormats = () => {
        const flight = this.state.flight
        flight.depTime = this.formatDate(this.state.flight.depTime)
        flight.arrTime = this.formatDate(this.state.flight.arrTime)
        flight.duration = this.formatDuration(this.state.flight.duration)
        this.setState({flight})
    }

    ValueLabel = (props) => (
        <View style={{margin: 10, padding: 5, borderBottomColor: 'grey', borderBottomWidth: 1}}> 
            <Text style={{fontWeight: 'bold'}}>{props.label}</Text>
            <Text style={{fontSize: 18}}>{props.value}</Text>
        </View>
    )

    render = () => (
            <ScrollView>
                <this.ValueLabel label='airline' value={this.state.flight.airline} />
                <this.ValueLabel label='departure' value={this.state.flight.departure} />
                <this.ValueLabel label='destination' value={this.state.flight.destination} />
                <this.ValueLabel label='departure time' value={this.state.flight.depTime} />
                <this.ValueLabel label='arrival time' value={this.state.flight.arrTime} />
                <this.ValueLabel label='duration' value={this.state.flight.duration} />
                <this.ValueLabel label='price' value={`${this.state.flight.price}.00 kr.`} />
                <this.ValueLabel label='cancel insurance' value={`${this.state.flight.cancelInsurance}.00 kr.`} />
                <this.ValueLabel label='airplane' value={`${this.state.flight.airplane}`} />
                <this.ValueLabel label='model' value={`${this.state.flight.model}`} />
                <this.ValueLabel label='capacity' value={`${this.state.flight.capacity}`} />
            </ScrollView>
    )
}