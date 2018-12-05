import React from 'react'
import Loader from './Loader'
import Login from './Login'
import { AppRegistry, Text, StyleSheet, ScrollView } from 'react-native'
import facade from '../data/apiFacade'

const URL = "https://stephandjurhuus.com/travel/api/order/id/2"

export default class OrderTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            isError: false,
            isLoggedIn: false,
            errorMsg: "good"
        }
    }

    static navigationOptions = {
        title: 'informations',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#000' },
    }

    async getData() {
        try {
            const data = await fetch(URL).then(res => res.json());
            await this.setState({ data: data, isLoading: false });

        } catch (err) {
            console.log('err:: ' + err)
            this.setState({ isError: true, isLoading: false });
        }
    }

    didLogin = (loggedIn) => {
        alert(loggedIn)
        this.setState({isLoggedIn: loggedIn})
    }

    render() {
        if (!this.state.isLoggedIn) return (<Login didLogin={this.didLogin} />)
        // if (!this.state.isLoggedIn) return (<Login onLoginPress={() => this.setState({ isLoggedIn: false })} />)
        else if (this.state.isLoading) {
            this.getData()
            return (
                <Loader />
            )
        }
        else {
            return (
                <ScrollView>
                    {this.state.data.map((order) => {
                        console.log(order)
                        return <Order order={order} id={order.id} key={order.id} />
                    })}
                </ScrollView>
            )
        }
    }
}



function Order(props) {
    return (
        <>
            <Text>{`airline: ${props.order.airline}, airplane: ${props.order.airplane}`}</Text>
            <Text>{`from: ${props.order.departure}, to ${props.order.destination}`}</Text>
            <Text>{`depature: ${props.order.depTime}, arrival ${props.order.arrTime}`}</Text>
            <Text>{`attendees: ${props.order.attendees} stk, duration ${props.order.duration} (min)`}</Text>
            <Text>{`price: ${props.order.price} kr., cancel insurance: ${props.order.cancelInsurance} kr.`}</Text>
        </>
    )
}