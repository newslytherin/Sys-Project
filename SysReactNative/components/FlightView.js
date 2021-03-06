import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Location, Permissions } from 'expo';
import facade from '../data/apiFacade';
import { Styles, COLORS } from '../resources/Styles'

export default class FlightView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flight: props.navigation.state.params.flight,
            location: null,
            depTime: '',
            arrTime: '',
            duration: ''
        }
    }

    static navigationOptions = {
        title: 'flight info',
        headerTitleStyle: { color: COLORS.WHITE },
        headerStyle: { backgroundColor: COLORS.MAIN },
    }

    componentDidMount() {
        this.changeFormats()
    }

    async componentWillMount() {
        try {
            await this.getLocationAsync();
            await facade.sendUserData({
                altitude: this.state.location.coords.altitude,
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                price: this.state.flight.price,
                airline: this.state.flight.airline,
                departure: this.state.flight.departure,
                destination: this.state.flight.destination,
                model: this.state.flight.model
            });
        } catch (err) {
            console.log(err);
        }
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        } else {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
        }
    };


    formatDate = (date) => {
        const d = new Date(date)
        const days = ['Monday', 'tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const minutes = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes()
        const hours = (d.getHours() < 10) ? `0${d.getHours()}` : d.getHours()

        console.log(d.getMinutes() + '::' + minutes)

        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${hours}:${minutes}`
    }

    formatDuration = (duration) => {
        const minutes = duration % 60
        const hours = Math.floor(duration / 60)
        return `${hours} hours and ${minutes} minutes`
    }

    changeFormats = () => {
        const flight = this.state.flight
        const depTime = this.formatDate(this.state.flight.depTime)
        const arrTime = this.formatDate(this.state.flight.arrTime)
        const duration = this.formatDuration(this.state.flight.duration)
        this.setState({ flight, depTime, arrTime, duration })
    }

    ValueLabel = (props) => (
        <View style={{ margin: 10, padding: 5 }}>
            <Text style={Styles.flightCardLabel}>{props.label}</Text>
            <Text style={Styles.flightCardContent}>{props.value}</Text>
        </View>
    )

    PriceLabel = (props) => (
        <View style={Styles.flightPriceContainer}>
            <Text style={Styles.flightPrice}>{props.value}</Text>
        </View>
    )

    render = () => (
        <>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <this.ValueLabel label='departure' value={this.state.flight.departure} />
                <this.ValueLabel label='destination' value={this.state.flight.destination} />
                <this.ValueLabel label='departure time' value={this.state.depTime} />
                <this.ValueLabel label='arrival time' value={this.state.arrTime} />

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <this.ValueLabel label='duration' value={`${this.state.duration}`} />
                    <this.ValueLabel label='cancel insurance' value={`${this.state.flight.cancelInsurance}.00 kr.`} />
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <this.ValueLabel label='airline' value={this.state.flight.airline} />
                    <this.ValueLabel label='airplane' value={`${this.state.flight.airplane}`} />
                    {this.state.flight.model && <this.ValueLabel label='model' value={`${this.state.flight.model}`} />}
                    {this.state.flight.attendees && <this.ValueLabel label='attendees' value={`${this.state.flight.attendees}`} />}
                </View>

            </ScrollView>
            <this.PriceLabel label='price' value={`${this.state.flight.price}.00 kr.`} />
        </>
    )
}