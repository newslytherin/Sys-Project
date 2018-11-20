import React, { Component } from "react"
import facade from "./../apiFacade";


export default class User extends Component{
    constructor(props){
        super(props)
        this.state = {username: props.username, roles: props.roles};
    }

    render(){
        if (facade.loggedIn() && this.state.roles.includes('user')) {
            return(
                <div>
                    <h1>Welcome {this.state.username}</h1>
                </div>
            );
        } else {
            return (<h1>You need to be logged in</h1>)
        }
        
    }
}