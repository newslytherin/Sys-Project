import React from 'react'
import { TextField, PasswordField, EmailField } from './InputFields'
import facade from '../data/apiFacade'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { user: {}, notification: '' }
    }

    inputChanged = (evt) => {
        const property = evt.target.id
        const value = evt.target.value
        const user = this.state.user
        this.state.user[property] = value
        this.setState({user})
        console.log(this.state.user)
    }

    send = () => { 
        (this.state.user.password == this.state.user.confirmPassword)
            ? this.validCredentials()
            : this.invalidCredentials()
    }

    validCredentials = () => {
        this.setState({notification: ''})
        const user = this.state.user
        delete user.confirmPassword
        facade.signup(user)
    }

    invalidCredentials = () => {
        this.setState({notification: 'unmatching passwords'})
        const user = this.state.user
        user.confirmPassword = ''
        this.setState({user})
    }

    render = () => (
        <form onSubmit={this.send} style={{ margin: 25 }}>
            <h2>Signup</h2>

            <TextField title='name'
            id='name' 
            value={this.state.user.name} 
            onChanged={this.inputChanged}/>

            <EmailField title='email'
            id='email' 
            value={this.state.user.email} 
            onChanged={this.inputChanged}/>

            <TextField title='gender'
            id='gender' 
            value={this.state.user.gender} 
            onChanged={this.inputChanged}/>

            <PasswordField title='password'
            id='password' 
            value={this.state.user.password} 
            onChanged={this.inputChanged}/>

            <PasswordField title='confirm password'
            id='confirmPassword' 
            value={this.state.user.confirmPassword} 
            onChanged={this.inputChanged}/>
            <p style={{color: '#ff0000'}}>{this.state.notification}</p>
        <button>confirm</button>

        </form>
    )
}