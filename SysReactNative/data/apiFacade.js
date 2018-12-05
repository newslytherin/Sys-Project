import React from 'react'
import { AsyncStorage } from "react-native"

// const RootUrl = 'http://localhost:8090/Slytherin/api'
const RootUrl = 'https://stephandjurhuus.com/travel/api'

class ApiFacade extends React.Component{
    getRootUrl = () => RootUrl
    getAllAirportsUrl = () => `${RootUrl}/airports`
    getFlightsRootUrl = () => `${RootUrl}/flights`
    getOwnFlightsRootUrl = () => `${RootUrl}/flights/own`
    getAllFlightsUrl = () => `${RootUrl}/flights/all`
    getAddFlightUrl = () => `${RootUrl}/flights/new`
    getEditFlightUrl = () => `${RootUrl}/flights/edit/`
    getOrderTripURL = (id) => `${RootUrl}/user/add/${id}`
    getUserLoginUrl = () => `${RootUrl}/login`
    getUserSignupUrl = () => `${RootUrl}/user/add`
    getEditUserUrl = (id) => `${RootUrl}/user/edit/${id}`
    getUserOrdersUrl = () => `${RootUrl}/order/id/`
    getUserDeleteOrderUrl = () => `${RootUrl}/order/delete/`
    
    newOrder = async (trip,id) => {
        try{
            fetch(this.getOrderTripURL(id),this.makeOptions('PUT',false,trip)).then(handleHttpErrors)
        } catch(err){
            console.log(`err:: ${err}`)
        }
    }

    login = (email, pass) => {
        const options = this.makeOptions("POST", true, {
            email: email,
            password: pass
        });
        return fetch(this.getUserLoginUrl(), options, true)
            .then(handleHttpErrors)
            .then(res => {
                this.setUser(res);
                return res;
            })
    }
    
    setUser = (user) => {
        AsyncStorage.setItem('id',user.id);
        AsyncStorage.setItem('name',user.userName);
        AsyncStorage.setItem('email',user.email);
        AsyncStorage.setItem('gender',user.gender);
        AsyncStorage.setItem('jwtToken',user.token);
        AsyncStorage.setItem('roles',user.roles);
    }
    getId = () => {
        return AsyncStorage.getItem('id')
    }
    getEmail = () => {
        return AsyncStorage.getItem('email')
    }
    getName = () => {
        return AsyncStorage.getItem('name')
    }
    getGender = () => {
        return AsyncStorage.getItem('gender')
    }
    getToken = () => {
        return AsyncStorage.getItem('jwtToken')
    }
    getRole = () => {
        return AsyncStorage.getItem('roles')
    }
    signup = (user) => {
        const options = this.makeOptions("POST", true, user);
        return fetch(this.getUserSignupUrl(), options, true)
            .then(res => handleHttpErrors(res))
    }

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }
    logout = () => {
        AsyncStorage.removeItem("id");
        AsyncStorage.removeItem("email");
        AsyncStorage.removeItem("name");
        AsyncStorage.removeItem("gender");
        AsyncStorage.removeItem("jwtToken");
        AsyncStorage.removeItem("roles");
    }

    getUserOrders = () => {
        const options = this.makeOptions("GET", false);
        return fetch(this.getUserOrdersUrl() + 1, options, true)
            .then(res => handleHttpErrors(res))
    }

    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
}

const facade = new ApiFacade();
export default facade;

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({
            status: res.status,
            fullError: res.json()
        })
    }
    return res.json();
}


