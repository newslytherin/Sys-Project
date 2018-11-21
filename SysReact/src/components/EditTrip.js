import React from 'react';
import json from '../data/dummy-data';
const URL = 'http://localhost:8090/Slytherin/api/flights/all'

export default class EditTrip extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            trip: {
                airline: '',
                departure: '',
                destination: '',
                depTime: '',
                arrTime: '',
                duration: '',
                price: '',
                cancelInsurance: '',
                airplane: '',
                model: '',
                capacity: ''
            },
            err: ''
        }
        this.fetchTrip();
    }

    getDate = () => {
        const date = new Date()
        const mm = date.getMinutes()
        const hh = date.getHours()
        const DD = date.getDate()
        const MM = date.getMonth() + 1 // january is 0
        const YYYY = date.getFullYear()
    
        if(DD < 10) DD = '0' + DD
        if(MM < 10) MM = '0' + MM;
        return `${YYYY}-${MM}-${DD}T${hh}:${mm}`
    }

    fetchTrip = async () => {
        try {
            const trips = await fetch(URL).then(res => res.json()) //await json[0]
            const trip = await trips[0]
            await this.setState({ trip })
        } catch (err) {
            console.log(`err:: ${err}`)
        }
    }

    inputChanged = (evt) => {
        const property = evt.target.id
        const value = evt.target.value
        let trip = this.state.trip
        trip[property] = value
        this.setState({trip})
    }

    send = async (evt) => {
        evt.preventDefault();
        console.log(this.state.trip)

        try {
            const response = await fetch(URL, this.makeOptions('PUT',this.state.trip))
            const content = await response.json()
            console.log(content)
        } catch (err) {
            this.setState( {err} )
            console.log(`err:: ${err}`)
        }
    }

    makeOptions = (method, body) => {
        const opt =  {
          method: method,
          headers: {
            'Accept': 'application/json',
            "Content-type": "application/json"
          }
        }
        if(body) opt.body = JSON.stringify(body);
        return opt;
    }

    refresh = () => {
        this.setState({err: ''})
    }

    render() {
        if (this.state.err) return <Error refresh={this.refresh}/>
        return (
            <form onSubmit={this.send}>
                <label>
                    airline:
                    <input 
                        type="text" 
                        id="airline" 
                        value={this.state.trip.airline} 
                        onChange={this.inputChanged}
                        required>
                    </input>
                </label>
                <br/>
                <label>
                    departure:
                    <input 
                        type="text" 
                        id="departure" 
                        value={this.state.trip.departure} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    destination:
                    <input 
                        type="text" 
                        id="destination" 
                        value={this.state.trip.destination} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    departure time:
                    <input 
                        type="datetime-local"
                        id="depTime" 
                        min={this.getDate()} 
                        max="2025-01-01T00:00"
                        value={this.state.trip.depTime} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    arrival time:
                    <input 
                        type="datetime-local" 
                        id="arrTime" 
                        min={this.getDate()} 
                        max="2025-01-01T00:00"
                        value={this.state.trip.arrTime} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    duration:
                    <input 
                        type="number" min="0"
                        id="duration" 
                        value={this.state.trip.duration} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    price:
                    <input 
                        type="number" min="0" 
                        id="price" 
                        value={this.state.trip.price} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    cancel insurance:
                    <input 
                        type="number" min="0" 
                        id="cancelInsurance" 
                        value={this.state.trip.cancelInsurance} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    airplane:
                    <input 
                        type="text" 
                        id="airplane" 
                        value={this.state.trip.airplane} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                model:
                <input 
                    type="text"
                    id="model" 
                    value={this.state.trip.model} 
                    onChange={this.inputChanged}
                    required/>
                </label>
                <br/>
                <label>
                    capacity:
                    <input 
                        type="number" min="1"
                        id="capacity" 
                        value={this.state.trip.capacity} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <button>send</button>
            </form>
        )
    }
}

function Error(props) {
    return (
        <div>
            a fail occurred, try to refresh or come back later
            <button onClick={props.refresh}>refresh</button>
        </div>
    )
}