import React from 'react'
import facade from '../data/apiFacade'

export default class OrderTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = { updates: 0 }
    }

    deleteOrder = async(evt) => {
        await facade.deleteOrder(evt.target.id)
        await this.props.onUpdate()
        await this.setState({ updates: ++this.state.updates })
    }

    render() {
        return (
            <>
                {this.props.orders.map((order) => {
                    console.log(order)
                    return <Order order={order} id={order.id} key={order.id} onUpdate={this.deleteOrder}/>
                })}
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
            <button id={props.id} onClick={props.onUpdate}>cancel</button>
            <hr />
        </>
    )
}

