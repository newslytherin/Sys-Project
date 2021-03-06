import React from 'react'
import { AsyncStorage } from "react-native"

// const RootUrl = 'http://localhost:8090/Slytherin/api'
const RootUrl = 'https://stephandjurhuus.com/travel/api'

class ApiFacade extends React.Component {
    getRootUrl = () => RootUrl
    getAllAirportsUrl = () => `${RootUrl}/airports`
    getFlightsRootUrl = () => `${RootUrl}/flights`
    getOwnFlightsRootUrl = () => `${RootUrl}/flights/own`
    getAllFlightsUrl = () => `${RootUrl}/flights/all`
    getAddFlightUrl = () => `${RootUrl}/flights/new`
    getEditFlightUrl = () => `${RootUrl}/flights/edit/`
    getOrderTripUrl = (id) => `${RootUrl}/user/add/${id}`
    getUserLoginUrl = () => `${RootUrl}/login`
    getUserSignupUrl = () => `${RootUrl}/user/add`
    getEditUserUrl = (id) => `${RootUrl}/user/edit/${id}`
    getUserOrdersUrl = () => `${RootUrl}/order/id/`
    getUserDeleteOrderUrl = () => `${RootUrl}/order/delete/`
    getUserDataUrl = () => `${RootUrl}/userdata`

    newOrder = async (trip, id) => {
        try {
            fetch(this.getOrderTripUrl(id), this.makeOptions('PUT', false, trip)).then(handleHttpErrors)
        } catch (err) {
            console.log(err)
        }
    }

    login = async (email, pass) => {
        const options = this.makeOptions("POST", true, {
            email: email,
            password: pass
        });
        return fetch(this.getUserLoginUrl(), options, true)
            .then(handleHttpErrors)
            .then(res => {
                this.setUser(res);
                return res;
            }).catch(function (error) {
                alert("failed to login " + error)
            });
    }

    setUser = (user) => {
        const id = user.id.toString()
        AsyncStorage.setItem('id', id)
            .catch(function (error) {
                alert("err1 " + error)
            });
        AsyncStorage.setItem('name', user.userName)
            .catch(function (error) {
                alert("err2 " + error)
            });
        AsyncStorage.setItem('email', user.email)
            .catch(function (error) {
                alert("err3 " + error)
            });
        AsyncStorage.setItem('gender', user.gender)
            .catch(function (error) {
                alert("err4 " + error)
            });
        AsyncStorage.setItem('jwtToken', user.token)
            .catch(function (error) {
                alert("err5 " + error)
            });
    }
    getId = async () => {
        const id = await AsyncStorage.getItem('id')
            .catch(function (error) {
                alert("not found in storage")
            });
        return parseFloat(id)
    }
    getEmail = () => {
        return AsyncStorage.getItem('email')
            .catch(function (error) {
                alert("not found in storage")
            });
    }
    getName = () => {
        return AsyncStorage.getItem('name')
            .catch(function (error) {
                alert("not found in storage")
            });
    }
    getGender = () => {
        return AsyncStorage.getItem('gender')
            .catch(function (error) {
                alert("not found in storage")
            });
    }
    getToken = () => {
        return AsyncStorage.getItem('jwtToken')
            .catch(function (error) {
                alert("not found in storage")
            });
    }
    signup = (user) => {
        const options = this.makeOptions("POST", true, user);
        return fetch(this.getUserSignupUrl(), options, true)
            .then(res => handleHttpErrors(res))
    }

    loggedIn = async () => {
        const token = await this.getToken()
        return token != null;
    }
    logout = () => {
        AsyncStorage.removeItem("id")
            .catch(function (error) {
                alert("error " + error)
            });
        AsyncStorage.removeItem("email")
            .catch(function (error) {
                alert("error " + error)
            });
        AsyncStorage.removeItem("name")
            .catch(function (error) {
                alert("error " + error)
            });
        AsyncStorage.removeItem("gender")
            .catch(function (error) {
                alert("error " + error)
            });
        AsyncStorage.removeItem("jwtToken")
            .catch(function (error) {
                alert("error " + error)
            });
    }

    sendUserData = async (userdata) => {
        
            fetch(this.getUserDataUrl(), this.makeOptions('POST', false, userdata))
            .catch(function (error) {
                console.log("userdata", userdata)
                console.log(error)
                alert("error " + error)
            });
        
    }

    getUserOrders = async () => {
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
        console.log("body", opts)
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


