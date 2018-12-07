import React from "react";
import apiFacade from "../data/apiFacade";
import { TextField, NumberField, DateField, SelectField } from "./InputFields";

export default class EditTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      airports: [],
      err: "",
      isLoadingFlights: true,
      isLoadingAirports: true
    };
    this.getFlight();
  }

  getFlight = async () => {
    const trips = await apiFacade.getOwnFligths();
    const trip = await trips[0];
    await this.setState({ trip, isLoadingFlights: false });
    await this.getAirports();
  };

  getAirports = async () => {
    const airports = await apiFacade.getAllAirports();
    await this.setState({ airports, isLoadingAirports: false });
    await this.initializeAirports();
  };

  inputChanged = evt => {
    const property = evt.target.id;
    const value = evt.target.value;
    const trip = this.state.trip;
    trip[property] = value;
    this.changeDepartureTime();
    trip.duration = this.setDuration();
    trip[property] =
      property === "departure" || property === "destination"
        ? this.setAiport(value)
        : value;
    this.setState({ trip });
    console.log(this.state.trip);
    if (this.state.trip.departure.id === this.state.trip.destination.id)
      console.log("!!");
  };

  changeDepartureTime = () => {
    if (this.state.trip.depTime > this.state.trip.arrTime) {
      const trip = this.state.trip;
      trip.arrTime = this.state.trip.depTime;
      this.setState({ trip });
    }
  };

  setDuration = () => {
    const departure = new Date(this.state.trip.depTime).getTime();
    const arrival = new Date(this.state.trip.arrTime).getTime();
    return (arrival - departure) / 1000 / 60; // ( x / 1000 ) => miliseconds to seconds ( x / 60 ) => seconds to minutes
  };

  initializeAirports = () => {
    const trip = this.state.trip;
    const airports = this.state.airports;

    const dep = this.state.trip.departure;
    const des = this.state.trip.destination;

    trip.departure = airports.filter(
      airport => airport.name === dep.split(", ")[1]
    )[0]; // .city => .name!!! >>> String.spilt(',')[1]
    trip.destination = airports.filter(
      airport => airport.name === des.split(", ")[1]
    )[0];

    this.setState({ trip });
  };

  setAiport = id => {
    const airports = this.state.airports;
    return airports.filter(airport => airport.id === Number(id))[0];
  };

  send = async evt => {
    evt.preventDefault();
    const uri = apiFacade.getEditFlightUrl() + this.state.trip.id;
    const trip = this.state.trip;
    delete trip.id; // deletes the 'id' key from object

    console.log(trip);
    console.log(uri);

    try {
      const response = await fetch(uri, this.makeOptions("PUT", trip));
      const content = await response.json(); //this.handleHttpErrors(response)
      await console.log(content);
    } catch (err) {
      this.setState({ err });
      console.log(`err:: ${err}`);
    }
  };

  handleHttpErrors = res => {
    if (!res.ok) {
      //throw 'error ####'
      return Promise.reject({
        status: res.status,
        fullError: res.json()
      });
    }
    return res.json();
  };

  makeOptions = (method, body) => {
    const opt = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
    };
    if (body) opt.body = JSON.stringify(body);
    return opt;
  };

  refresh = () => {
    this.setState({ err: "" });
  };

  render() {
    if (this.state.isLoadingAirports || this.state.isLoadingFlights)
      return <Loader />;
    if (this.state.err) return <Error refresh={this.refresh} />;
    return (
      <>
      <form onSubmit={this.send} className="main">
        <TextField
          title="airline"
          id="airline"
          value={this.state.trip.airline}
          onChanged={this.inputChanged}
        />
        <SelectField
          title="departure"
          id={"departure"}
          selected={this.state.trip.departure.id}
          data={this.state.airports}
          onChanged={this.inputChanged}
        />

        <SelectField
          title="destination"
          id={"destination"}
          selected={this.state.trip.destination.id}
          data={this.state.airports}
          onChanged={this.inputChanged}
        />

        <DateField
          title="departure time"
          id="depTime"
          value={this.state.trip.depTime}
          onChanged={this.inputChanged}
        />

        <DateField
          title="arrival time"
          id="arrTime"
          value={this.state.trip.arrTime}
          onChanged={this.inputChanged}
        />

        <div>{`duration:`}</div>
        <div>{`${this.state.trip.duration} min.`}</div>
        <hr />

        <NumberField
          title="price"
          id="price"
          value={this.state.trip.price}
          onChanged={this.inputChanged}
        />

        <NumberField
          title="cancel insurance"
          id="cancelInsurance"
          value={this.state.trip.cancelInsurance}
          onChanged={this.inputChanged}
        />

        <TextField
          title="airplane"
          id="airplane"
          value={this.state.trip.airplane}
          onChanged={this.inputChanged}
        />

        <TextField
          title="model"
          id="model"
          value={this.state.trip.model}
          onChanged={this.inputChanged}
        />

        <NumberField
          title="capacity"
          id="capacity"
          value={this.state.trip.capacity}
          onChanged={this.inputChanged}
        />

        <button>send</button>
      </form>
      <button onClick={() => this.props.toggleEdit}>return</button>
      </>
    );
  }
}

// to seperated file
function Error(props) {
  return (
    <>
      a fail occurred, try to refresh or come back later
      <button onClick={props.refresh}>refresh</button>
    </>
  );
}

// to seperated file
function Loader(props) {
  return <div style={{ fontSize: 24, textAlign: "center" }}>loading...</div>;
}
