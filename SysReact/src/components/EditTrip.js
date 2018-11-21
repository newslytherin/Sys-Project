import React from 'react';

import json from '../data/dummy-data';
const URL = '/api/flights/edit'


var today = new Date();
var m = today.getMinutes()
var hh = today.getHours()
var dd = today.getDate()
var mm = today.getMonth() + 1 //January is 0!
var yyyy = today.getFullYear()

if(dd < 10) dd = '0'+ dd
if(mm < 10) mm = '0'+mm

today = `${yyyy}-${mm}-${dd}T${hh}:${m}`

export default class EditTrip extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            trip: {
                airline: '',
                from: '',
                to: '',
                depTime: '',
                arrTime: '',
                duration: '',
                price: '',
                cancellationInsurance: '',
                airplane: '',
                model: '',
                capacity: '',
            },
            err: ''
        }
        this.fetchTrip();
    }

    fetchTrip = async () => {
        try {
            let trip = await json[0] //await fetch(URL).then(res => res.json())
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

        const response = await fetch(URL, this.makeOptions('PUT',this.state.trip))
        const content = await response.json()
        console.log(content)
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

    render() {
        return (
            <form onSubmit={this.send}>
                <label>
                    airline:
                    <input 
                        type="text" 
                        id="airline" 
                        value={this.state.trip.airline} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    from:
                    <input 
                        type="text" 
                        id="from" 
                        value={this.state.trip.from} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    to:
                    <input 
                        type="text" 
                        id="to" 
                        value={this.state.trip.to} 
                        onChange={this.inputChanged}
                        required/>
                </label>
                <br/>
                <label>
                    departure time:
                    <input 
                        type="datetime-local"
                        id="depTime" 
                        min={today} 
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
                        min={today} 
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
                    cancellation insurance:
                    <input 
                        type="number" min="0" 
                        id="cancellationInsurance" 
                        value={this.state.trip.cancellationInsurance} 
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

