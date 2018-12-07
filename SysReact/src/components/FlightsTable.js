import React, { useState, useEffect } from "react";
import impData from "../data/dummy-data";
import facade from "../data/apiFacade";

function SelectAmount(props) {
  const realMax = props.max < 10 ? props.max : 10;

  return (
    <select
      onChange={e => {
        props.updateAmount(e.target.value);
      }}
    >
      {//make X options where X is the amount of allowed numbers for each page in the table
      Array.from({ length: realMax }, (v, k) => k + 1).map((e, i) => (
        <option key={e} selected={Number(e) === props.pageAmount} value={e}>
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
      <button className="trans" onClick={() => updatePage(page - 1)}>
        <i className="fas fa-angle-double-left" />
      </button>
    );
  } else {
    buttonArray.push(<button className="invis" />);
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
    const activeButton = i === page ? "active" : "";
    buttonArray.push(
      <button disable className={activeButton} onClick={() => updatePage(i)}>
        {i}
      </button>
    );
  }

  //next page
  if (page < totalPages) {
    buttonArray.push(
      <button className="trans" onClick={() => updatePage(page + 1)}>
        <i className="fas fa-angle-double-right" />
      </button>
    );
  } else {
    buttonArray.push(<button className="invis" />);
  }

  return <div className="pagination">{buttonArray}</div>;
}

function Trip(props) {
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
  } = props.data;

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
        <div className="price">${price}</div>
      </div>
      <div className="info">
        <div className="title">Plane details</div>
        <br />
        <p>Airline: {airline}</p>
        <p>Airplane: {airplane}</p>
        <p>Model: {model}</p>
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
          <button onClick={e => send(e, props.data)}>Book Now</button>
        )}
      </div>
    </div>
  );
}

function send(e, data) {
  e.preventDefault();
  facade.newOrder(data, facade.getId());
  alert("Trip to " + data.destination + " now ordered");
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

async function getAllFlights(arr) {
  let f = await facade.getAllFligths();
  await f.forEach(d => {
    arr.push(...d);
  });
}
async function getFlightsFrommDB() {
  let f = await facade.getAllFligths();

  return f[0].concat(f[1]);
}

export default function FilghtsTable() {
  const bigData = [];
  //getAllFlights(bigData);

  // console.log("-------------------");

  const [data, setData] = useState(bigData);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(5);
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

  useEffect(async () => {
    const arr = await getFlightsFrommDB();
    setData(arr);
  }, []);
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
    <div className="main">
      {/* <p>Current page: {page}</p>
      <p>Max elements on page: {pageAmount}</p>
      <p>Total Pages: {totalPages}</p>
      <p>Filter Object: {JSON.stringify(filter)}</p>
      <p>Sort by Object: {JSON.stringify(sortBy)}</p> */}
      <div className="filterbar" style={{ flexWrap: "wrap" }}>
        <div className="filter">
          <label>Where are you flying from?</label>
          <input
            type="text"
            onChange={changeSearchFilter}
            placeholder="Departure"
            name="departure"
          />
          <i
            className="fas fa-plane-departure"
            style={{ fontSize: 16, marginBottom: 4 }}
          />
        </div>
        <div className="filter">
          <label>Where you want to go?</label>
          <input
            type="text"
            onChange={changeSearchFilter}
            placeholder="Destination"
            name="destination"
          />
          <i
            className="fas fa-plane-arrival"
            style={{ fontSize: 16, marginBottom: 4 }}
          />
        </div>
        <div className="filter">
          <label>Date?</label>
          <input
            type="date"
            placeholder="Date"
            onChange={changeSearchFilter}
            name="depTime"
          />
          <i className="fas fa-calendar-plus" />
        </div>
        {/* <div className="filter">
          <label>Price from</label>
          <input
            type="number"
            onChange={changeRangeFilter}
            name="price"
            data-style="from"
            placeholder="Starting Price"
          />
          <i className="fas fa-dollar-sign" />
        </div> */}
        <div className="filter">
          <label>Price to</label>
          <input
            type="number"
            onChange={changeRangeFilter}
            name="price"
            data-style="to"
            placeholder="Max Price"
          />
          <i className="fas fa-dollar-sign" />
        </div>
        <div className="filter">
          <label>Sort</label>
          <select
            name="sort"
            id=""
            onChange={e => updateSortBy(e.target.value, true)}
          >
            <option value="price">price</option>
            <option value="destination">destination</option>
            <option value="depTime">date</option>
          </select>
          <i className="fas fa-sort" />
        </div>
        <div className="filter right">
          <label>Trips shown</label>
          <SelectAmount
            updateAmount={updateAmount}
            max={data.length}
            pageAmount={pageAmount}
          />
          <i className="fas fa-sort-numeric-down" />
        </div>
      </div>
      {sortedData.map((item, i) => (
        <Trip key={i} data={item} />
      ))}

      <PageButtons
        page={page}
        totalPages={totalPages}
        updatePage={updatePage}
      />
    </div>
  );
}
