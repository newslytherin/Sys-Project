import React, { useState, useEffect } from "react";
import impData from "../data/dummy-data";
import facade from "../data/apiFacade";

function SelectAmount(props) {
  const realMax = props.max < 25 ? props.max : 25;

  return (
    <select
      onChange={e => {
        props.updateAmount(e.target.value);
      }}
    >
      {//make X options where X is the amount of allowed numbers for each page in the table
      Array.from({ length: realMax }, (v, k) => k + 1).map((e, i) => (
        <option selected={Number(e) === props.pageAmount} value={e}>
          {e}
        </option>
      ))}
    </select>
  );
}

function HeadersFromVariableNames(props) {
  const { data, sortBy, updateSortBy } = props;
  const myArr = [];
  for (let varName in data) {
    myArr.push(
      <td
        onClick={
          // set asc to true if its a new varName we are sorting by
          () =>
            updateSortBy(varName, sortBy.name !== varName ? true : !sortBy.asc)
        }
      >
        {varName}
      </td>
    );
  }
  return myArr;
}

function PageButtons(props) {
  const { page, totalPages, updatePage } = props;
  const buttonArray = [];

  const neighbourAmount = 2;
  let btnStartNumber = page - neighbourAmount;

  //prev page
  if (page > 1) {
    buttonArray.push(
      <button onClick={() => updatePage(page - 1)}>{"<"}</button>
    );
  } else {
    buttonArray.push(<button>{"<x"}</button>);
  }

  //start at 1 if page is close to start
  if (page <= neighbourAmount) {
    btnStartNumber = 1;
  }
  //make sure last button is last an avail number
  if (page + neighbourAmount >= totalPages) {
    btnStartNumber = totalPages - neighbourAmount * 2;
  }

  let btnEndNumber = btnStartNumber + 1 + neighbourAmount * 2;

  //   console.log("total", totalPages);
  //   console.log("btnStartNumber", btnStartNumber);
  //   console.log("btnEndStart", btnEndNumber);
  if (totalPages < btnEndNumber - btnStartNumber) {
    btnStartNumber = 1;
    btnEndNumber = totalPages + 1;
  }

  //make buttons wit numbers and give active button className="activeButton"
  for (let i = btnStartNumber; i < btnEndNumber; i++) {
    const activeButton = i === page ? "activeButton" : "";
    buttonArray.push(
      <button disable className={activeButton} onClick={() => updatePage(i)}>
        {i}
      </button>
    );
  }

  //next page
  if (page < totalPages) {
    buttonArray.push(
      <button onClick={() => updatePage(page + 1)}>{">"}</button>
    );
  } else {
    buttonArray.push(<button>{"x>"}</button>);
  }
  return <div className="buttonContainer">{buttonArray}</div>;
}

function RowComponent(props) {
  const {
    airline,
    airplane,
    arrTime,
    cancellationInsurance,
    capacity,
    depTime,
    duration,
    from,
    model,
    price,
    to
  } = props.data;

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
      {(facade.loggedIn())?<td><button id={props.index} onClick={(e) => send(e,props.data)}>Order</button></td>:<td>log in to order trip</td>}
    </>
  );
}

function send(e,data){
  e.preventDefault();
  facade.newOrder(data,facade.getId());
}

const filterArray = (arr, filter) => {
  const filteredArray = arr.filter(flight => {
    for (const key in filter) {
      //FOR STRINGS
      if (typeof filter[key] === "string") {
        if (!flight[key].toLowerCase().includes(filter[key].toLowerCase())) {
          return false;
        }
      }

      //FOR OBJECTS (FROM -> TO)
      if (typeof filter[key] === "object") {
        if (filter[key].from != null) {
          if (filter[key].from >= flight[key]) {
            return false;
          }
        }
        if (filter[key].to != null) {
          if (filter[key].to <= flight[key]) {
            return false;
          }
        }
      }
    }

    return true;
  });
  return filteredArray;
};

const sortArray = (a, b, name) => {
  // console.log("a", a);
  // console.log("b", b);
  // console.log("name", name);
  if (a[name] < b[name]) return -1;
  if (a[name] > b[name]) return 1;
  return 0;
};

async function getAllFlights(arr){
  let f = await facade.getAllFligths();
  await console.log(f);
  await f.forEach(d => {
    arr.push(...d);
  });
}

export default function FilghtsTable() {
  const bigData = [];
  bigData.push(...impData);
  bigData.push(...impData);
  bigData.push(...impData);
  bigData.push(...impData);
  bigData.push(...impData);
  bigData.push(...impData);
  bigData.push(...impData);
  bigData.push(...impData);
  getAllFlights(bigData);

  // console.log("-------------------");

  const [data, setData] = useState(bigData);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(9);
  const [filter, setFilter] = useState({});
  const [sortBy, setSortBy] = useState({ name: "", asc: true });

  const FilteredArray = filterArray(data, filter);

  if (sortBy.asc) {
    FilteredArray.sort((a, b) => sortArray(a, b, sortBy.name));
  } else {
    FilteredArray.sort((b, a) => sortArray(a, b, sortBy.name));
  }

  const totalPages = Math.ceil(FilteredArray.length / pageAmount);
  if (totalPages > 0 && page === 0) setPage(1);
  if (page > totalPages) setPage(totalPages);

  const sortedDataArrayStart = (page - 1) * pageAmount;
  const sortedDataArrayEnd = page * pageAmount;
  const sortedData = FilteredArray.slice(
    sortedDataArrayStart,
    sortedDataArrayEnd
  );
  // console.log(sortedData);

  //   console.log("Current Page", page);
  //   console.log("Elements on page", pageAmount);
  //   console.log("Sorted Data", sortedData);

  const updateAmount = newValue => {
    setPage(1);
    setPageAmount(newValue);
  };

  const updatePage = newValue => {
    setPage(newValue);
  };

  const updateSortBy = (name, asc) => {
    setSortBy({ ...sortBy, name, asc });
  };

  const changeSearchFilter = e => {
    const { name, value } = e.target;
    if (value === "") {
      delete filter[name];
      setFilter(filter);
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  const changeRangeFilter = e => {
    const { name, value } = e.target;

    if (value === "") {
      delete filter[name][e.target.dataset.style];
      setFilter(filter);
    } else {
      setFilter({
        ...filter,
        [name]: { ...filter[name], [e.target.dataset.style]: Number(value) }
      });
    }
  };

  return (
    <div className="content">
      <input
        type="text"
        onChange={changeSearchFilter}
        name="airline"
        placeholder="airline"
      />
      <input
        type="number"
        onChange={changeRangeFilter}
        name="price"
        data-style="from"
        placeholder="from"
      />
      <input
        type="number"
        onChange={changeRangeFilter}
        name="price"
        data-style="to"
        placeholder="to"
      />

      <div>
        <p>Current page: {page}</p>
        <p>Max elements on page: {pageAmount}</p>
        <p>Total Pages: {totalPages}</p>
        <p>Filter Object: {JSON.stringify(filter)}</p>
        <p>Sort by Object: {JSON.stringify(sortBy)}</p>
        <SelectAmount
          updateAmount={updateAmount}
          max={data.length}
          pageAmount={pageAmount}
        />
        <PageButtons
          page={page}
          totalPages={totalPages}
          updatePage={updatePage}
        />
      </div>
      <table>
        <thead>
          <tr>
            <HeadersFromVariableNames
              data={sortedData[0]}
              sortBy={sortBy}
              updateSortBy={updateSortBy}
            />
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <RowComponent data={item} index={index}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
