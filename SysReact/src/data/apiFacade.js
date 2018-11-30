import React from 'react'

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
    getUserOrdersUrl = () => `${RootUrl}/order/id/` // <- TO-BE-DONE
    
    newOrder = async (trip,id) => {
        try{
            fetch(this.getOrderTripURL(id),this.makeOptions('POST',false,trip)).then(handleHttpErrors)
        } catch(err){
            console.log(`err:: ${err}`)
        }
    }
    editUser = async (user,id) => {
        try{
            fetch(this.getEditUserUrl(id),this.makeOptions('PUT',false,user)).then(handleHttpErrors)
        } catch(err){
            console.log(`err:: ${err}`)
        }
    }

    getAllFligths = async() => {
        try {
            return await fetch(this.getAllFlightsUrl()).then(handleHttpErrors);
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
                this.setUser(res);
                return res;
            })
    }
    
    setUser = (user) => {
        sessionStorage.setItem('id',user.id);
        sessionStorage.setItem('name',user.userName);
        sessionStorage.setItem('email',user.email);
        sessionStorage.setItem('gender',user.gender);
        sessionStorage.setItem('jwtToken',user.token);
        sessionStorage.setItem('roles',user.roles);
    }
    getId = () => {
        return sessionStorage.getItem('id')
    }
    getEmail = () => {
        return sessionStorage.getItem('email')
    }
    getName = () => {
        return sessionStorage.getItem('name')
    }
    getGender = () => {
        return sessionStorage.getItem('gender')
    }
    getToken = () => {
        return sessionStorage.getItem('jwtToken')
    }
    getRole = () => {
        return sessionStorage.getItem('roles')
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
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("gender");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("roles");
    }

    getUserOrders = () => {
        const options = this.makeOptions("GET", true);
        return fetch(this.getUserOrdersUrl() + this.getId(), options, true)
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
        return Promise.reject({
            status: res.status,
            fullError: res.json()
        })
    }
    return res.json();
}

function _handleHttpErrors(res) {
    try {
        // someting
        return res.json();
    } catch (err) {
        return Promise.reject({
            status: res.status,
            fullError: res.json()
        })
    }
}
