import React from 'react';

import JSON from '../data/dummy-data';
const URL = '/api/flights/edit'

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
            let trip = await JSON[0] //await fetch(URL).then(res => res.json())
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
        //console.log(this.state.trip)
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
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    from:
                    <input 
                        type="text" 
                        id="from" 
                        value={this.state.trip.from} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    to:
                    <input 
                        type="text" 
                        id="to" 
                        value={this.state.trip.to} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    departure time:
                    <input 
                        type="text" 
                        id="depTime" 
                        value={this.state.trip.depTime} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    arrival time:
                    <input 
                        type="text" 
                        id="arrTime" 
                        value={this.state.trip.arrTime} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    duration:
                    <input 
                        type="text" 
                        id="duration" 
                        value={this.state.trip.duration} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    price:
                    <input 
                        type="text" 
                        id="price" 
                        value={this.state.trip.price} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    cancellation insurance:
                    <input 
                        type="text" 
                        id="cancellationInsurance" 
                        value={this.state.trip.cancellationInsurance} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    airplane:
                    <input 
                        type="text" 
                        id="airplane" 
                        value={this.state.trip.airplane} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    model:
                    <input 
                        type="text" 
                        id="model" 
                        value={this.state.trip.model} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <label>
                    capacity:
                    <input 
                        type="text" 
                        id="capacity" 
                        value={this.state.trip.capacity} 
                        onChange={this.inputChanged}/>
                </label>
                <br/>
                <button>send</button>
            </form>
        )
    }
}
