import React from 'react'
import Loader from './Loader';
import { AppRegistry, Text, StyleSheet } from 'react-native';
import facade from '../data/apiFacade'

const URL = "https://stephandjurhuus.com/travel/api/order/id/2"

export default class OrderTable extends React.Component {

    static navigationOptions = {
        title: 'informations',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#000' },
    };

    constructor(props) {
        super(props)
        // this.state = { user: { name: facade.getName(), email: facade.getEmail(), gender: facade.getGender() }, orders: [], loadingOrders: true, updateTable: false, updates: 0}
        this.state = {
            data: [], 
            isLoading: true, 
            isError: false
        }
        this.getData();
    }

    async getData() {
        try {
            const data = await fetch(URL).then(res => res.json());
            // console.log("data", data)
            // const list = await data.map((object, index) => {
            //     return {
                    
            //     }
            // })
            await this.setState({data: data, isLoading: false});

        } catch (err) {
            console.log('err:: ' + err)
            this.setState({isError: true, isLoading: false});
        } 
    }
    render() {
        if (this.state.isLoading) return (<Loader />)
        else{
            return (
                <>
                    {this.state.data.map((order) => {
                        console.log(order)
                        return <Order order={order} id={order.id} key={order.id} onUpdate={this.deleteOrder} />
                    })}
                </>
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