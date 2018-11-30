import React, { Component } from "react"
import facade from "./../data/apiFacade";
import OrderTable from './OrderTable'

export default class User extends Component{
    constructor(props){
        super(props)
    }

    arr = [
        {depature: '2134', destination: '9876', depTime: '12:00', arrTime: '14:30', amount: '6', price: '1.500', id: 1},
        {depature: '6803', destination: 'jhga', depTime: '13:00', arrTime: '13:30', amount: '4', price: '26.500', id: 2},
        {depature: 'jhga', destination: '9876', depTime: '14:00', arrTime: '15:30', amount: '6', price: '5.500', id: 3},
        {depature: '6bs9', destination: '6bs9', depTime: '16:00', arrTime: '13:30', amount: '2', price: '2.500', id: 4},
        {depature: 'k8sk', destination: '9876', depTime: '11:00', arrTime: '18:30', amount: '1', price: '6.500', id: 5}
    ]

    render(){
        if (facade.loggedIn() && facade.getRole().includes('user')) {
            return(
                <div>
                    <h1>Welcome {facade.getName()}</h1>
                    <OrderTable orders={this.arr/*facade.getUserOrders(this.state.username)*/}/>
                </div>
            );
        } else {
            return (<h1>You need to be logged in</h1>)
        }
        
    }
}
