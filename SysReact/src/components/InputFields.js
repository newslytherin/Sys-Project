import React from "react";
import Date from "../logic/Date";

export function TextField(props) {
  return (
    <>
      <div class="input-container w20">
        <label style={{ display: "block" }}>{`${props.title}:`}</label>
        <input
          type="text"
          id={props.id}
          value={props.value}
          onChange={props.onChanged}
          required
        />
      </div>
    </>
  );
}

export function NumberField(props) {
  return (
    <>
      <div class="input-container w20">
        <label style={{ display: "block" }}>{`${props.title}:`}</label>
        <input
          type="number"
          min="1"
          id={props.id}
          value={props.value}
          onChange={props.onChanged}
          required
        />
      </div>
    </>
  );
}

export function DateField(props) {
  console.log(Date());
  return (
    <>
      <div class="input-container w20">
        <label style={{ display: "block" }}>{`${props.title}:`}</label>
        <input
          type="datetime-local"
          id={props.id}
          min={Date()}
          max="2025-01-01T00:00"
          value={props.value}
          onChange={props.onChanged}
          required
        />
      </div>
    </>
  );
}

export function SelectField(props) {
  return (
    <>
      <div class="input-container w20">
        <label style={{ display: "block" }}>{`${props.title}:`}</label>
        <select
          style={{ display: "block" }}
          onChange={props.onChanged}
          id={props.id}
        >
          {props.data.map(item => {
            if (item.id === props.selected)
              return (
                <option key={item.id} value={item.id} selected>{`${
                  item.city
                }, ${item.name}, ${item.country}`}</option>
              );
            return (
              <option key={item.id} value={item.id}>{`${item.city}, ${
                item.name
              }, ${item.country}`}</option>
            );
          })}
          ;
        </select>
      </div>
    </>
  );
}

export function PasswordField(props) {
  return (
    <>
      <div class="input-container w20">
        <label style={{ display: "block" }}>{`${props.title}:`}</label>
        <input
          type="password"
          id={props.id}
          value={props.value}
          onChange={props.onChanged}
          required
        />
      </div>
    </>
  );
}

export function EmailField(props) {
  return (
    <>
      <div class="input-container w20">
        <label style={{ display: "block" }}>{`${props.title}:`}</label>
        <input
          type="email"
          id={props.id}
          value={props.value}
          onChange={props.onChanged}
          required
        />
      </div>
    </>
  );
}
