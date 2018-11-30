import React from 'react'

export default function OrderTable(props) {
    return (
        <>
            {props.orders.map((order, index) => {
                console.log(order.flightDTO)
                return <Order order={order.flightDTO} id={order.id} key={index}/>
            })}
        </>
    )
}

function Order(props) {
    return (
        <>
            <div>{`airline: ${props.order.airline}, airplane: ${props.order.airplane}`}</div>
            <div>{`from: ${props.order.departure}, to ${props.order.destination}`}</div>
            <div>{`depature: ${props.order.depTime}, arrival ${props.order.arrTime}`}</div>
            <div>{`amount: ${props.order.amount} stk, duration ${props.order.duration} (min)`}</div>
            <div>{`price: ${props.order.price}, cancel insurance: ${props.order.cancelInsurance}`}</div>
            <button>cancel</button>
            <hr />
        </>
    )
}

