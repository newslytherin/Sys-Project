import React from 'react'
import Loader from './Loader'
import Login from './Login'
import { AppRegistry, Text, StyleSheet, ScrollView, View } from 'react-native'
import facade from '../data/apiFacade'
import Touchable from './Touchable';

const URL = "https://stephandjurhuus.com/travel/api/order/id/"

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

    componentDidMount = async () => {
        const isLoggedIn = await facade.loggedIn()
        this.setState({ isLoggedIn })
        if (isLoggedIn) this.getData()
    }

    static navigationOptions = {
        title: 'User page',
        headerTitleStyle: { color: '#000' },
        headerStyle: { backgroundColor: '#fff' },
    };

    getData = async () => {
        try {
            const id = await facade.getId()
            const URI = URL + id;
            const data = await fetch(URI).then(res => res.json());
            this.setState({ data: data, isLoading: false });

        } catch (err) {
            console.log('err:: ' + err)
            this.setState({ isError: true, isLoading: false });
        }
    }

    logOut = () => {
        facade.logout()
        this.setState({ isLoggedIn: false })
    }

    isLoggedIn = (isLoggedIn) => {
        this.setState({ isLoggedIn })
        if (isLoggedIn) this.getData()
        else this.setState({ data: [] })
    }

    render() {
        if (!this.state.isLoggedIn)
            return (<Login didLogin={this.isLoggedIn} />)
        else if (this.state.isLoggedIn && this.state.isLoading)
            return (<Loader />)
        else
            return <OrderList orders={this.state.data} logOut={this.logOut} />
    }
}



function OrderList(props) {
    return (
        <ScrollView>
            {props.orders.map((order) => {
                return (
                    <View key={order.id}>
                        <Text key={order.id + 'a'}>airline: {order.airline}, airplane: {order.airplane}</Text>
                        <Text key={order.id + 'b'}>from: {order.departure}, to {order.destination}</Text>
                        <Text key={order.id + 'c'}>depature: {order.depTime}, arrival {order.arrTime}</Text>
                        <Text key={order.id + 'd'}>attendees: {order.attendees} stk, duration {order.duration} (min)</Text>
                        <Text key={order.id + 'e'}>price: {order.price} kr., cancel insurance: {order.cancelInsurance} kr.</Text>
                    </View>
                )
            })}
            <Touchable onPress={props.logOut} title="Log out" />
        </ScrollView>
    )
}







//     render() {
//         if (!this.state.isLoggedIn) return (<Login didLogin={this.isLoggedIn} />)
//         else if (this.state.isLoggedIn && this.state.isLoading) return (<Loader />)

//         else {
//             return (
//                 <ScrollView>
//                     {this.state.data.map((order) => {
//                         return <Order order={order} id={order.id} key={order.id} />
//                     })}
//                     <Touchable onPress={this.logOut} title="Log out" />
//                 </ScrollView>
//             )
//         }
//     }
// }



// function Order(props) {
//     return (
//         <>
//             <Text>{`airline: ${props.order.airline}, airplane: ${props.order.airplane}`}</Text>
//             <Text>{`from: ${props.order.departure}, to ${props.order.destination}`}</Text>
//             <Text>{`depature: ${props.order.depTime}, arrival ${props.order.arrTime}`}</Text>
//             <Text>{`attendees: ${props.order.attendees} stk, duration ${props.order.duration} (min)`}</Text>
//             <Text>{`price: ${props.order.price} kr., cancel insurance: ${props.order.cancelInsurance} kr.`}</Text>
//         </>
//     )
// }