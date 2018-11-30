import React, { Component } from "react"
import facade from "./../data/apiFacade";
import OrderTable from './OrderTable'

export default class User extends Component{
    constructor(props){
        super(props)
        this.state = {user:{name:facade.getName(),email:facade.getEmail(),gender:facade.getGender()}}
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
                    <div>
                        <p>Username: {this.state.user.name}</p>
                        <p>Email: {this.state.user.email}</p>
                        <p>Gender: {this.state.user.gender}</p>
                    </div>
                    <div>
                        <hr/>
                        <form onSubmit={this.send}>
                            <label>Username</label>
                            <input id="name" type="text" value={this.state.user.name} onChange={this.inputChanged}/>
                            <hr/>
                            <label>Email</label>
                            <input id="email" type="text" value={this.state.user.email} onChange={this.inputChanged}/>
                            <hr/>
                            <label>Gender</label>
                            <input id="gender" type="text" value={this.state.user.gender} onChange={this.inputChanged}/>
                            <hr/>
                            <button >Save changes</button>
                        </form>
                        <hr/>
                    </div>
                    <div>
                        <OrderTable orders={this.arr/*facade.getUserOrders(this.state.username)*/}/>
                        </div>
                </div>
            );
        } else {
            return (<h1>You need to be logged in</h1>)
        }
        
    }

    send = (e) => {
        e.preventDefault();
        console.log('IS WORKING!!!!!!!!!!!!');
        console.log(this.state.user);
        sessionStorage.setItem('name',this.state.user.name);
        sessionStorage.setItem('email',this.state.user.email);
        sessionStorage.setItem('gender',this.state.user.gender);
        facade.editUser(this.state.user,facade.getId());
    }

    inputChanged = (e) => {
        const property = e.target.id
        const value = e.target.value
        const user = this.state.user
        user[property] = value
        this.setState({user})
        console.log(this.state.user)
    }
}
