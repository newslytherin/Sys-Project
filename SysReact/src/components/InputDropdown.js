import React, { useState } from "react";

export default function DanielInput(props) {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(false);

  const options = ["1", "12", "13", "11", "5", "6", "7", "10", "33", "345"];

  const onChange = event => {
    const { value } = event.target;
    setValue(value);
  };

  const Suggestions = props => {
    const { options, value, setValue } = props;

    const filtered = options.filter(item => item.includes(value));

    if (filtered.length > 1) {
      return filtered.map((cur, index) => (
        <div key={index} onClick={() => setValue(cur)}>
          {cur}
        </div>
      ));
    } else {
      return "";
    }
  };
  return (
    <>
      <div className="content">
        <input type="text" onChange={onChange} value={value} />
        <p>Current State: {value}</p>
        {<Suggestions options={options} value={value} setValue={setValue} />}
      </div>
    </>
  );
}
