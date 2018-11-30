import React from 'react'

export default function OrderTable(props) {
    return (
        <>
            {props.orders.map((order, index) => (<Order order={order} key={index}/>))}
        </>
    )
}

function Order(props) {
    return (
        <>
            <div>{`from: ${props.order.depature}, to ${props.order.destination}`}</div>
            <div>{`depature: ${props.order.depTime}, arrival ${props.order.arrTime}`}</div>
            <div>{`amount: ${props.order.amount}, price ${props.order.price}`}</div>
            <hr />
        </>
    )
}
