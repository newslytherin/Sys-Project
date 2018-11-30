import React from 'react'
import { TextField, PasswordField, EmailField } from './InputFields'
import facade from '../data/apiFacade'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { user: {}, loggedIn: false, invalidUsername: '', invalidPassword: '' }
    }

    inputChanged = (evt) => {
        const property = evt.target.id
        const value = evt.target.value
        const user = this.state.user
        user[property] = value
        this.setState({user})
        console.log(this.state.user)
    }

    send = () => { 
        (this.state.user.userPass === this.state.user.confirmPassword)
            ? this.validCredentials()
            : this.invalidCredentials()
    }

    validCredentials = async() => {
        this.setState({ invalidPassword: '', invalidUsername: '' })
        const user = this.state.user
        delete user.confirmPassword
        const logUser = await facade.signup(user)
        await console.log(logUser)
        await this.setState({ user: logUser })
        await this.setState({ loggedIn: true })
    }

    invalidCredentials = () => {
        this.setState({notification: 'unmatching passwords'})
        const user = this.state.user
        user.confirmPassword = ''
        this.setState({user})
    }

    render = () => {
        if (this.state.loggedIn) return <div style={{fontSize: 24, textAlign: 'center'}}>{`wellcome ${this.state.user.userName}`}</div>
        return (
            <form onSubmit={this.send} style={{ margin: 25 }}>
            <h2>Signup</h2>

            <TextField title='name'
            id='userName' 
            value={this.state.user.name} 
            onChanged={this.inputChanged}/>

            <p style={{fontSIze: 18, color: '#ff0000'}}>{this.state.invalidUsername}</p>
            <EmailField title='email'
            id='email' 
            value={this.state.user.email} 
            onChanged={this.inputChanged}/>

            <TextField title='gender'
            id='gender' 
            value={this.state.user.gender} 
            onChanged={this.inputChanged}/>

            <PasswordField title='password'
            id='userPass'
            value={this.state.user.password} 
            onChanged={this.inputChanged}/>

            <p style={{fontSIze: 18, color: '#ff0000'}}>{this.state.invalidPassword}</p>
            <PasswordField title='confirm password'
            id='confirmPassword' 
            value={this.state.user.confirmPassword} 
            onChanged={this.inputChanged}/>
        <button>confirm</button>

        </form>
        )
    }
}
