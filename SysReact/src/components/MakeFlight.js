import React, { useState, useEffect } from "react";
import facade from "../data/apiFacade";

const FormContext = React.createContext();
const FlightContext = React.createContext();

// class FormProvider extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//     this.state = {
//       onChange: props.onChange,
//       flight: props.flight
//     };
//   }
//   render() {
//     return (
//       <>
//         <FormContext.Provider value={this.state}>
//           {this.props.children}
//         </FormContext.Provider>
//       </>
//     );
//   }
// }

const InputText = props => {
  const { nameCode, namePretty, onChange, flight } = props;

  let errorMsg = "";

  if (flight[nameCode] === "") {
    errorMsg = <div>please fill out the input</div>;
  }

  return (
    <div className="input-container w25">
      <label htmlFor={nameCode}>{namePretty}</label>
      <input
        type="text"
        id={nameCode}
        name={nameCode}
        onChange={onChange}
        required
      />
      {errorMsg}
    </div>
  );
};

const InputDate = props => {
  const { nameCode, namePretty, onChange, flight } = props;

  let errorMsg = "";

  if (flight[nameCode] === "") {
    errorMsg = <div>please put in a date</div>;
  }

  return (
    <div className="input-container w50">
      <label htmlFor={nameCode}>{namePretty}</label>
      <input
        type="datetime-local"
        id={nameCode}
        name={nameCode}
        onChange={onChange}
        required
      />
      {errorMsg}
    </div>
  );
};

const InputNumber = props => {
  const { nameCode, namePretty, onChange, flight, min, max } = props;

  let errorMsg = "";

  if (flight[nameCode] === "") {
    errorMsg = <div>please put in a valid number</div>;
  }

  return (
    <div className="input-container w25">
      <label htmlFor={nameCode}>{namePretty}</label>
      <input
        type="number"
        id={nameCode}
        name={nameCode}
        onChange={onChange}
        min={min}
        max={max}
        pattern="[0-9]"
        required
      />
      {errorMsg}
    </div>
  );
};

const InputSelect = props => {
  const { nameCode, namePretty, onChange, options, flight } = props;

  //   let errorMsg = "";

  //   if (flight[nameCode] === "") {
  //     errorMsg = <div>please select an option</div>;
  //   }
  return (
    <div className="input-container w25">
      <label htmlFor={nameCode}>{namePretty}</label>
      <select id={nameCode} name={nameCode} onChange={onChange} required>
        <option defaultValue hidden>
          Select
        </option>
        {options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

const Input = props => {
  if (Array.isArray(props.options)) {
    return (
      <FormContext.Consumer>
        {onChange => (
          <FlightContext.Consumer>
            {flight => (
              <>
                <InputSelect {...props} onChange={onChange} flight={flight} />
              </>
            )}
          </FlightContext.Consumer>
        )}
      </FormContext.Consumer>
    );
  }
  if (props.number) {
    return (
      <FormContext.Consumer>
        {onChange => (
          <FlightContext.Consumer>
            {flight => (
              <>
                <InputNumber {...props} onChange={onChange} flight={flight} />
              </>
            )}
          </FlightContext.Consumer>
        )}
      </FormContext.Consumer>
    );
  }
  if (props.date) {
    return (
      <FormContext.Consumer>
        {onChange => (
          <FlightContext.Consumer>
            {flight => (
              <>
                <InputDate {...props} onChange={onChange} flight={flight} />
              </>
            )}
          </FlightContext.Consumer>
        )}
      </FormContext.Consumer>
    );
  }
  return (
    <FormContext.Consumer>
      {onChange => (
        <FlightContext.Consumer>
          {flight => (
            <>
              <InputText {...props} onChange={onChange} flight={flight} />
            </>
          )}
        </FlightContext.Consumer>
      )}
    </FormContext.Consumer>
  );
};

export default function MakeFlight() {
  //create flight state
  const [flight, setFlight] = useState({});
  const [airport, setAirport] = useState([]);

  useEffect(async () => {
    const arr = await facade.getAllAirports();
    const newArr = arr.map(e => e.name);
    setAirport(newArr);
  }, []);

  //handle simple input change
  const handleInputChange = event => {
    //destrutor event.target
    const { value, name, type, checked } = event.target;

    //get data from either checked or value
    const data = type === "checkbox" ? checked : value;

    //set flight data for desired field
    flight[name] = data;

    if (flight.depTime && flight.arrTime) {
      const d1 = new Date(flight.depTime);
      const d2 = new Date(flight.arrTime);

      flight.duration = (d2.getTime() - d1.getTime()) / 1000 / 60;
    }

    //update flight state
    setFlight(flight);
  };

  const createFlight = event => {
    event.preventDefault();
    console.log(flight);
    facade.addFlight(flight);
  };

  return (
    <>
      <div className="main">
        <h2>Make Flight</h2>
        <hr />
        {/* {JSON.stringify(flight)} */}
        <form onSubmit={createFlight} className="grid">
          {/* <FormProvider onChange={handleInputChange} flight={flight}> */}
          <FormContext.Provider value={handleInputChange}>
            <FlightContext.Provider value={flight}>
              <Input
                nameCode="departure"
                namePretty="Departure"
                options={airport}
              />
              <Input
                nameCode="destination"
                namePretty="Destination"
                options={airport}
              />
              <Input nameCode="price" namePretty="Price" number min={0} />
              <Input
                nameCode="cancelInsurance"
                namePretty="Cancel Insurance"
                number
              />
              <Input nameCode="depTime" namePretty="Departure time" date />
              <Input nameCode="arrTime" namePretty="Arrival Time" date />
              <Input nameCode="airline" namePretty="Airline" />
              <Input nameCode="airplane" namePretty="Airplane" />
              <Input nameCode="model" namePretty="Model" />
              <Input nameCode="capacity" namePretty="Capacity" number min={1} />
              <div className="input-container w100">
                <button type="submit" className="center">
                  create
                </button>
              </div>
            </FlightContext.Provider>
          </FormContext.Provider>
          {/* </FormProvider> */}
        </form>
      </div>
    </>
  );
}
