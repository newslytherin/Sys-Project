import React, { useState, useEffect } from "react";
import guyWithHat from "../img/guy-with-hat.png";

export default function Home() {
  return (
    <>
      <div className="landing">
        <p>Lotem ipsum dolor sit amet, consectetur adipiscing elit lacus.</p>
      </div>
      <div className="home-popup">
        <div className="container">
          <div className="box">
            <img src={guyWithHat} alt="guy in sweet tox" />
          </div>
          <div className="box">
            <h2 className="grey1">Lorem ipsum dolor</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
            </p>
            <div className="bar" />
          </div>
        </div>
      </div>
      {/* <h3>List of popular trips</h3>
      <div className="search-container">
        <input className="searchbar" type="text" placeholder="Search place" />
        <button className="searchbutton">
          <i className="fas fa-search" />
        </button>
      </div>
      <div className="searchwords">
        <div>
          <button>Journey</button>
          <button className="grey3">Travelers</button>
          <button className="grey3">Guide</button>
        </div>
        <div>
          <button className="transgrey">Mazury</button>
          <button className="transgrey">Cracow</button>
          <button className="transgrey">Zakopane</button>
        </div>
      </div>
      <div className="container">
        <div className="cardcontainer">
          <div className="card">
            <img src="http://placebeard.it/430x205" alt="" />
            <h4>Poznan</h4>
            <p>Wielkopolskie</p>
            <button className="white">view offers</button>
          </div>
          <div className="card">
            <img src="http://placebeard.it/430x205" alt="" />
            <h4>Poznan</h4>
            <p>Wielkopolskie</p>
            <button>view offers</button>
          </div>
          <div className="card">
            <img src="http://placebeard.it/430x205" alt="" />
            <h4>Poznan</h4>
            <p>Wielkopolskie</p>
            <button className="white">view offers</button>
          </div>
          <div className="card">
            <img src="http://placebeard.it/430x205" alt="" />
            <h4>Poznan</h4>
            <p>Wielkopolskie</p>
            <button class="white">view offers</button>
          </div>
          <div className="card">
            <img src="http://placebeard.it/430x205" alt="" />
            <h4>Poznan</h4>
            <p>Wielkopolskie</p>
            <button class="white">view offers</button>
          </div>
        </div>
      </div> */}
      <div className="signup-banner">
        <h2>Enjoy your journey</h2>
        <button className="white">sign up</button>
        <p>
          You can also sign up on our
          <a href="#">newsletter</a>
        </p>
      </div>
    </>
  );
}
