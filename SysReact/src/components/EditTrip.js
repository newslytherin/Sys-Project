import React from 'react';
import apiFacade from '../data/apiFacade'
import { TextField, NumberField, DateField } from './InputFields'

export default class EditTrip extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            trip: {},
            err: ''
        }
        this.getFlight()
    }

    getFlight = async() => {
        const trips = await apiFacade.getAllLocalFligths()
        const trip = await trips[0]
        await this.setState({trip})
    }

    inputChanged = (evt) => {
        const property = evt.target.id
        const value = evt.target.value
        const trip = this.state.trip
        trip[property] = value
        this.changeDepartureTime()
        trip.duration = this.setDuration()
        this.setState({trip})
    }

    changeDepartureTime = () => {
        if (this.state.trip.depTime > this.state.trip.arrTime) {
            const trip = this.state.trip
            trip.arrTime = this.state.trip.depTime
            this.setState({trip})
        }
    }

    setDuration = () => {
        const departure = new Date(this.state.trip.depTime).getTime()
        const arrival = new Date(this.state.trip.arrTime).getTime()
        return ((arrival - departure) / 1000) / 60 // ( x / 1000 ) => miliseconds to seconds ( x / 60 ) => seconds to minutes
    }

    send = async (evt) => {
        evt.preventDefault();
        console.log(this.state.trip)

        /* try {
            const response = await fetch(apiFacade.getEditFlightUrl, this.makeOptions('PUT',this.state.trip))
            const content = await response.json()
            console.log(content)
        } catch (err) {
            this.setState( {err} )
            console.log(`err:: ${err}`)
        } */
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
                <TextField title='airline'
                    id='airline' 
                    value={this.state.trip.airline} 
                    onChanged={this.inputChanged}/>

                <TextField title='departure'
                    id='departure' 
                    value={this.state.trip.departure} 
                    onChanged={this.inputChanged}/>

                <TextField title='destination'
                    id='destination' 
                    value={this.state.trip.destination} 
                    onChanged={this.inputChanged}/>

                <DateField title='arrival time' 
                    id='arrTime' 
                    value={this.state.trip.arrTime} 
                    onChanged={this.inputChanged} />
                    
                <DateField title='departure time' 
                    id='depTime' 
                    value={this.state.trip.depTime} 
                    onChanged={this.inputChanged} />

                <p>{`duration: ${this.state.trip.duration} min.`}</p>

                <NumberField title='price'
                    id='price' 
                    value={this.state.trip.price} 
                    onChanged={this.inputChanged}/>

                <NumberField title='cancel insurance'
                    id='cancelInsurance' 
                    value={this.state.trip.cancelInsurance} 
                    onChanged={this.inputChanged}/>

                <TextField title='airplane'
                    id='airplane' 
                    value={this.state.trip.airplane} 
                    onChanged={this.inputChanged}/>

                <TextField title='model'
                    id='model' 
                    value={this.state.trip.model} 
                    onChanged={this.inputChanged}/>
                
                <NumberField title='capacity'
                    id='capacity' 
                    value={this.state.trip.capacity} 
                    onChanged={this.inputChanged}/>

                <button>send</button>
            </form>
        )
    }
}

// to seperated file
function Error(props) {
    return (
        <div>
            a fail occurred, try to refresh or come back later
            <button onClick={props.refresh}>refresh</button>
        </div>
    )
}

