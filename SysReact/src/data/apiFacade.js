import React from 'react'

const RootUrl = 'http://localhost:8090/Slytherin/api'

class ApiFacade extends React.Component{
    getRootUrl = () => RootUrl
    getFlightsRootUrl = () => `${RootUrl}/flights`
    getAllFlightsUrl = () => `${RootUrl}/flights/all`
    getAddFlightUrl = () => `${RootUrl}/flights/new`
    getEditFlightUrl = () => `${RootUrl}/flights/edit`
    
    getAllFligths = async() => {
        try {
            return fetch(this.getAllFlightsUrl()).then(handleHttpErrors)
        } catch (err) {
            console.log(`err:: ${err}`)
        }
    }

    getAllLocalFligths = async() => {
        try {
            return fetch(this.getFlightsRootUrl()).then(handleHttpErrors)
        } catch (err) {
            console.log(`err:: ${err}`)
        }
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