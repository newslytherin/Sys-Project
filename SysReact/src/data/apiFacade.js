import React from 'react'

const RootUrl = 'http://localhost:8090/Slytherin/api'
//const RootUrl = 'https://stephandjurhuus.com/travel/api'

class ApiFacade extends React.Component{
    getRootUrl = () => RootUrl
    getAllAirportsUrl = () => `${RootUrl}/airports`
    getFlightsRootUrl = () => `${RootUrl}/flights`
    getOwnFlightsRootUrl = () => `${RootUrl}/flights/own`
    getAllFlightsUrl = () => `${RootUrl}/flights/all`
    getAddFlightUrl = () => `${RootUrl}/flights/new`
    getEditFlightUrl = () => `${RootUrl}/flights/edit/`

    getUserLoginUrl = () => `${RootUrl}/login`
    getUserSignupUrl = () => `${RootUrl}/user/add`

    getUserOrdersUrl = () => `${RootUrl}/` // <- TO-BE-DONE
    
    getAllFligths = async() => {
        try {
            return fetch(this.getAllFlightsUrl()).then(handleHttpErrors)
        } catch (err) {
            console.log(`err:: ${err}`)
        }
    }

    getAllAirports = async() => {
        try {
            return fetch(this.getAllAirportsUrl()).then(handleHttpErrors)
        } catch (err) {
            console.log(`err:: ${err}`)
        }
    }

    getOwnFligths = async() => {
        try {
            return fetch(this.getOwnFlightsRootUrl()).then(handleHttpErrors)
        } catch (err) {
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
                this.setToken(res.token);
                this.setRole(res.roles);
                return res;
            })
    }
    
    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    setRole = (role) => {
        localStorage.setItem('role', role)
    }
    getRole = () => {
        return localStorage.getItem('role')
    }
    signup = (user) => {
        const options = this.makeOptions("POST", true, user);
        return fetch(this.getUserSignupUrl(), options, true)
            .then(handleHttpErrors)
            .then(res => {
                this.setToken(res.token);
                this.setRole(res.roles);
                return res;
            })
    }
    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }
    logout = () => {
        localStorage.removeItem("jwtToken");
    }
    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    getUserOrders(username) {
        const options = this.makeOptions("GET", true);
        return fetch(`${this.getUserOrdersUrl()} username`, options, true)
            .then(handleHttpErrors)
            .then(res => (res))
    }
}

const facade = new ApiFacade();
export default facade;

function handleHttpErrors(res) {
    if (!res.ok) {
        console.log(res)
        return Promise.reject({
            status: res.status,
            fullError: res.json()
        })
    }
    return res.json();
}