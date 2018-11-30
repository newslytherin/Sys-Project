import React, { Component } from "react"
import facade from "./../data/apiFacade";
import OrderTable from './OrderTable'

export default class User extends Component{
    constructor(props){
        super(props)
        this.state = {user:{name:facade.getName(),email:facade.getEmail(),gender:facade.getGender()}, orders: [], loadingOrders: true}
        this.getOrders()
    }

    getOrders = async() => {
        const orders = await facade.getUserOrders();
        await this.setState({orders, loadingOrders: false})
        console.log(this.state.orders)
    }

    render(){
        if (facade.loggedIn() && facade.getRole().includes('user')) {
            return(
                <div style={{margin: 25}}>
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
                        {(this.state.loadingOrders) 
                            ? <div style={{fontSize: 24, textAlign: 'center'}}>loading...</div>
                            : <OrderTable orders={this.state.orders}/>
                        }
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
