import React, { useState } from "react";

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
    <div>
      <label htmlFor={nameCode}>{namePretty}</label>
      <input type="text" id={nameCode} name={nameCode} onChange={onChange} required />
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
    <div>
      <label htmlFor={nameCode}>{namePretty}</label>
      <input type="datetime-local" id={nameCode} name={nameCode} onChange={onChange} required />
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
    <div>
      <label htmlFor={nameCode}>{namePretty}</label>
      <input type="number" id={nameCode} name={nameCode} onChange={onChange} min={min} max={max} pattern="[0-9]" required />
      {errorMsg}
    </div>
  );
};

const InputSelect = props => {
  const { nameCode, namePretty, onChange, options, flight } = props;

  let errorMsg = "";

  if (flight[nameCode] === "") {
    errorMsg = <div>please select an option</div>;
  }
  return (
    <div>
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
                <p>{JSON.stringify(flight)}</p>
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
                <p>{JSON.stringify(flight)}</p>
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
                <p>{JSON.stringify(flight)}</p>
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
              <p>{JSON.stringify(flight)}</p>
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

  //handle simple input change
  const handleInputChange = event => {
    //destrutor event.target
    const { value, name, type, checked } = event.target;

    //get data from either checked or value
    const data = type === "checkbox" ? checked : value;

    //set flight data for desired field
    flight[name] = data;

    //update flight state
    setFlight(flight);
  };

  const createFlight = event => {
    event.preventDefault();
    console.log("OPRET MIG");
  };

  return (
    <>
      <div className="content">
        <p>{JSON.stringify(flight)}</p>
        <hr />
        <form onSubmit={createFlight}>
          {/* <FormProvider onChange={handleInputChange} flight={flight}> */}
          <FormContext.Provider value={handleInputChange}>
            <FlightContext.Provider value={flight}>
              <Input nameCode="duration" namePretty="Duration" />
              <Input nameCode="airline" namePretty="Airline" />
              <Input nameCode="price" namePretty="Price" number min={0} />
              <Input nameCode="cancelInsurance" namePretty="Cancel Insurance" />
              <Input nameCode="airplain" namePretty="Airplain" />
              <Input nameCode="model" namePretty="Model" />
              <Input nameCode="capacity" namePretty="Capacity" number min={1} />
              <hr />
              <Input nameCode="depcity" namePretty="Depature City" options={[1, 2, 3, 4]} />
              <Input nameCode="depairport" namePretty="Depature Airport" options={[1, 2, 3, 4]} />
              <Input nameCode="depcountry" namePretty="Depature Country" options={[1, 2, 3, 4]} />
              <hr />
              <Input nameCode="descity" namePretty="Destination City" options={[1, 2, 3, 4]} />
              <Input nameCode="desairport" namePretty="Destination Airport" options={[1, 2, 3, 4]} />
              <Input nameCode="descountry" namePretty="Destination Country" options={[1, 2, 3, 4]} />
              <hr />
              <Input nameCode="deptime" namePretty="destime" date />

              <button type="submit">qwe</button>
            </FlightContext.Provider>
          </FormContext.Provider>
          {/* </FormProvider> */}
        </form>
      </div>
    </>
  );
}
