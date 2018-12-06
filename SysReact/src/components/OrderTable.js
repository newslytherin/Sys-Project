import React, { useState, useEffect } from "react";
import facade from "../data/apiFacade";

export default function OrderTalble() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(0);

  useEffect(
    async () => {
      console.log(expanded);
      setOrders(await facade.getUserOrders());
    },
    [expanded]
  );

  return (
    <>
      {orders.map(e => (
        <Order order={e} expanded={expanded} setExpanded={setExpanded} />
      ))}
    </>
  );
}

function Order(props) {
  const { order, expanded, setExpanded } = props;

  const {
    airline,
    airplane,
    arrTime,
    cancelInsurance,
    capacity,
    depTime,
    departure,
    destination,
    duration,
    model,
    price
  } = order;

  const parts = destination.split(",");

  const city = parts.length > 1 ? parts[0] : parts[0];
  const code = parts.length > 1 ? parts[1] : parts[0];
  const country = parts.length > 1 ? parts[2] : "";

  if (expanded === order.id) {
    return (
      <OrderExpanded
        order={order}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    );
  } else {
    return (
      <div className="order">
        <img src="http://placebeard.it/210x100" alt="" />
        <div className="minicard">
          <h4>{city}</h4>
          <p>{country}</p>
        </div>
        <div className="info">
          <h5>{airline}</h5>
        </div>
        <div className="info">
          <div className="price">${cancelInsurance}</div>
        </div>
        <div className="info">
          <button className="white" onClick={() => setExpanded(order.id)}>
            View details
          </button>
          {/* <button onClick={() => facade.deleteOrder(e.id)} /> */}
        </div>
      </div>
    );
  }
}

function OrderExpanded(props) {
  const { order, expanded, setExpanded } = props;

  console.log(order);

  const {
    airline,
    airplane,
    arrTime,
    cancelInsurance,
    capacity,
    depTime,
    departure,
    destination,
    duration,
    model,
    price
  } = order;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const parts = destination.split(",");

  const city = parts.length > 1 ? parts[0] : parts[0];
  const code = parts.length > 1 ? parts[1] : parts[0];
  const country = parts.length > 1 ? parts[2] : "";

  return (
    <div className="order-expanded">
      <div className="card">
        <img src="http://placebeard.it/430x205" alt="" />
        <h4>{city}</h4>
        <p>{country}</p>
        <div className="price">${cancelInsurance}</div>
      </div>
      <div className="info">
        <div className="title">Plane details</div>
        <br />
        <p>Airline: {airline}</p>
        <p>Airplane: {airplane}</p>
        <p>
          <span className="stars">
            <i className="fas fa-star green" />
            <i className="fas fa-star green" />
            <i className="fas fa-star green" />
            <i className="fas fa-star green" />
            <i className="fas fa-star" />
          </span>
        </p>
      </div>
      <div className="info">
        <div className="title">Flight time</div>
        <div className="flightbox">
          <i className="fas fa-plane-departure" />
          <p>Departure</p>
          <p className="stops">2 Stops</p>
        </div>
        <p className="m0">{departure}</p>
        <p className="green m0">
          {new Date(depTime).toLocaleDateString("en-US", options)}
        </p>
        <hr />
        <div className="flightbox">
          <i className="fas fa-plane-arrival" />
          <p>Destination</p>
        </div>
        <p className="m0">{destination}</p>
        <p className="green m0">
          {new Date(arrTime).toLocaleDateString("en-US", options)}
        </p>
        {facade.loggedIn() && (
          <button
            onClick={async () => {
              (await facade.deleteOrder(order.id)) && setExpanded(0);
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////
// class OrderTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { updates: 0 };
//   }

//   deleteOrder = async evt => {
//     await facade.deleteOrder(evt.target.id);
//     await this.props.onUpdate();
//     await this.setState({ updates: ++this.state.updates });
//   };

//   render() {
//     return (
//       <>
//         {this.props.orders.map(order => {
//           console.log(order);
//           return (
//             <Order
//               order={order}
//               id={order.id}
//               key={order.id}
//               onUpdate={this.deleteOrder}
//             />
//           );
//         })}
//       </>
//     );
//       render() {
//         return (
//           <>
//             {this.props.orders.map(order => {
//               console.log(order);
//               return (
//                 <Order
//                   order={order}
//                   id={order.id}
//                   key={order.id}
//                   onUpdate={this.deleteOrder}
//                 />
//               );
//             })}
//           </>
//         );
//   }
// }

// function Order(props) {
//   return (
//     <>
//       <div>{`airline: ${props.order.airline}, airplane: ${
//         props.order.airplane
//       }`}</div>
//       <div>{`from: ${props.order.departure}, to ${
//         props.order.destination
//       }`}</div>
//       <div>{`depature: ${props.order.depTime}, arrival ${
//         props.order.arrTime
//       }`}</div>
//       <div>{`attendees: ${props.order.attendees} stk, duration ${
//         props.order.duration
//       } (min)`}</div>
//       <div>{`price: ${props.order.price} kr., cancel insurance: ${
//         props.order.cancelInsurance
//       } kr.`}</div>
//       {/* <button id={props.id} onClick={props.onUpdate}> */}
//       <button id={props.id} onClick={() => facade.deleteOrder(props.id)}>
//         cancel
//       </button>
//       <hr />
//     </>
//   );
// }
