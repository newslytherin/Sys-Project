import React from 'react'
import facade from '../data/apiFacade'

export default class OrderTable extends React.Component {

    static navigationOptions = {
        title: 'informations',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#000' },
    };

    constructor(props) {
        super(props)
        // this.state = { user: { name: facade.getName(), email: facade.getEmail(), gender: facade.getGender() }, orders: [], loadingOrders: true, updateTable: false, updates: 0}
        this.state = {test: props.navigation.state.params.test}
    }

    // deleteOrder = async(evt) => {
    //     await facade.deleteOrder(evt.target.id)
    //     await this.props.onUpdate()
    //     await this.setState({ updates: ++this.state.updates })
    // }

    render() {
        return (
            <>
                {console.log("props", this.props)}
                {console.log("state", this.state.test)}
                {/* {this.props.orders.map((order) => {
                    console.log(order)
                    return <Order order={order} id={order.id} key={order.id} onUpdate={this.deleteOrder} />
                })} */}
            </>
        )
    }
}



function Order(props) {
    return (
        <>
            <div>{`airline: ${props.order.airline}, airplane: ${props.order.airplane}`}</div>
            <div>{`from: ${props.order.departure}, to ${props.order.destination}`}</div>
            <div>{`depature: ${props.order.depTime}, arrival ${props.order.arrTime}`}</div>
            <div>{`attendees: ${props.order.attendees} stk, duration ${props.order.duration} (min)`}</div>
            <div>{`price: ${props.order.price} kr., cancel insurance: ${props.order.cancelInsurance} kr.`}</div>
            {/* <button id={props.id} onClick={props.onUpdate}>cancel</button> */}
            <hr />
        </>
    )
}