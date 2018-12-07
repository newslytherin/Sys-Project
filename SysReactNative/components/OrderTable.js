import React from 'react'
import Loader from './Loader'
import Login from './Login'
import { Text, ScrollView, View, FlatList, TouchableOpacity } from 'react-native'
import facade from '../data/apiFacade'
import Touchable from './Touchable'
import { Styles, COLORS } from '../resources/Styles'


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
        headerTitleStyle: {  color: COLORS.WHITE },
        headerStyle: { backgroundColor: COLORS.MAIN },
    };

    getData = async () => {
        try {
            const id = await facade.getId()
            const URI = URL + id;
            const data = await fetch(URI).then(res => res.json());
            const list = await data.map((object, index) => {
                return {
                    key: `${index}`,
                    val: object
                }
            })
            this.setState({ data: list, isLoading: false });

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

    formatDate = (date) => {
        const d = new Date(date)
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const minutes = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes()
        const hours = (d.getHours() < 10) ? `0${d.getHours()}` : d.getHours()
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${hours}:${minutes}`
    }

    render() {
        const { navigate } = this.props.navigation;
        if (!this.state.isLoggedIn)
            return (<Login didLogin={this.isLoggedIn} />)
        else if (this.state.isLoggedIn && this.state.isLoading)
            return (<Loader />)
        else {
            return (
                <View style={Styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigate('flightView', { flight: item.val })}>
                                <ListItem item={item.val} departure={this.formatDate(item.val.depTime)} />
                            </TouchableOpacity>
                        )}
                    />
                    <Touchable onPress={this.logOut} title="Log out" />
                    {/* <OrderList orders={this.state.data} logOut={props.logOut} /> */}
                </View>
            )
        }
    }
}

function ListItem(props) {
    return (
        <View style={Styles.flightCardContainer}>
            <Text style={Styles.flightCardTitle}>{props.item.airline}</Text>
            <Text style={Styles.flightCardSubTitle}>{props.departure}</Text>
            <Text style={Styles.flightCardLabel}>{`departure`}</Text>
            <Text style={Styles.flightCardContent}>{`${props.item.departure}`}</Text>
            <Text style={Styles.flightCardLabel}>{`destination`}</Text>
            <Text style={Styles.flightCardContent}>{`${props.item.destination}`}</Text>
            <Text style={Styles.flightCardPrice}>{`${props.item.price}.00 kr`}</Text>
        </View>
    )
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