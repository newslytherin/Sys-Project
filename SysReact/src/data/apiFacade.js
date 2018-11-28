import React from 'react'

const RootUrl = 'http://localhost:8090/Slytherin/api'
//const RootUrl = 'https://2c51ed2a.ngrok.io/Slytherin/api'


class ApiFacade extends React.Component{
    getRootUrl = () => RootUrl
    getAllAirportsUrl = () => `${RootUrl}/airports`
    getFlightsRootUrl = () => `${RootUrl}/flights`
    getOwnFlightsRootUrl = () => `${RootUrl}/flights/own`
    getAllFlightsUrl = () => `${RootUrl}/flights/all`
    getAddFlightUrl = () => `${RootUrl}/flights/new`
    getEditFlightUrl = () => `${RootUrl}/flights/edit/`
    
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

    fetchDataUser = () => {
        const options = this.makeOptions("GET", true); //True add's the token
        return fetch(this.getUserInfoUrl, options).then(handleHttpErrors);
    }
    fetchDataAdmin = () => {
        const options = this.makeOptions("GET", true); //True add's the token
        return fetch(this.getAdminInfoUrl, options).then(handleHttpErrors);
    }
    login = (user, pass) => {
        const options = this.makeOptions("POST", true, {
            username: user,
            password: pass
        });
        return fetch(this.getUserLoginUrl, options, true)
            .then(handleHttpErrors)
            .then(res => {
                this.setToken(res.token);
                return res;
            })
    }
    
    signup = (user) => {
        user.roles = ['user']
        console.log(user)
        return user
        /*const options = this.makeOptions("POST", true, user);
        return fetch(this.getUserSignupUrl, options, true)
            .then(handleHttpErrors)
            .then(res => {
                this.setToken(res.token);
                return res;
            })*/
    }
    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    getToken = () => {
        return localStorage.getItem('jwtToken')
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