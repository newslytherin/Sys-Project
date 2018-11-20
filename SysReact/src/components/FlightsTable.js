import React, { useState } from "react";
import impData from "../data/dummy-data";

function SelectAmount(props) {
  const realMax = props.max < 10 ? props.max : 10;

  return (
    <select
      onChange={e => {
        props.updateAmount(e.target.value);
      }}
    >
      {Array.from({ length: realMax }, (v, k) => k + 1).map((e, i) => (
        <option value={e}>{e}</option>
      ))}
    </select>
  );
}

function HeadersFromVariableNames(props) {
  const { data } = props;
  const myArr = [];
  for (let varName in data) {
    myArr.push(<td>{varName}</td>);
  }
  return myArr;
}

function RowComponent(props) {
  const { airline, airplane, arrTime, cancellationInsurance, capacity, depTime, duration, from, model, price, to } = props.data;

  //   const myArr = [];
  //   for (let varName in data) {
  //     myArr.push(<td>{data[varName]}</td>);
  //   }
  //   return myArr;

  return (
    <>
      <td>{airline}</td>
      <td>{from}</td>
      <td>{to}</td>
      <td>{depTime}</td>
      <td>{arrTime}</td>
      <td>{duration}</td>
      <td>{price}</td>
      <td>{cancellationInsurance}</td>
      <td>{airplane}</td>
      <td>{model}</td>
      <td>{capacity}</td>
    </>
  );
}

export default function FilghtsTable() {
  const [data, setData] = useState(impData);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(2);

  const totalPages = Math.ceil(data.length / pageAmount);

  const sortedDataArrayStart = (page - 1) * pageAmount;
  const sortedDataArrayEnd = page * pageAmount;
  const sortedData = data.slice(sortedDataArrayStart, sortedDataArrayEnd);

  //   console.log("Current Page", page);
  //   console.log("Elements on page", pageAmount);
  //   console.log("Sorted Data", sortedData);

  const updateAmount = newValue => {
    setPage(1);
    setPageAmount(newValue);
  };

  const buttonArray = [];

  if (page > 1) {
    buttonArray.push(<button onClick={() => setPage(page - 1)}>{"<"}</button>);
  }
  if (page < totalPages) {
    buttonArray.push(<button onClick={() => setPage(page + 1)}>{">"}</button>);
  }

  return (
    <div>
      <div>
        <p>Current page: {page}</p>
        <p>Max elements on page: {pageAmount}</p>
        <p>Total Pages: {totalPages}</p>
        <div>{buttonArray}</div>
        <SelectAmount updateAmount={updateAmount} max={data.length} />
      </div>
      <table>
        <thead>
          <tr>
            <HeadersFromVariableNames data={sortedData[0]} />
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <RowComponent data={item} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
