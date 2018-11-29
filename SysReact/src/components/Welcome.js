import React, {Component} from 'react';
import facade from "./../data/apiFacade";
import { Route, Redirect } from 'react-router'

export default class Welcome extends Component{
    constructor(props) {
        super(props);
        this.state = { loggedIn: props.loggedIn, userinfo:{roles:props.roles}, signUp: false }
    }
    logout = () => {
        facade.logout();
        this.props.changeLoggedIn();
        this.setState({loggedIn:!this.state.loggedIn});
        this.props.setname('');
    }
    login = async (user, pass) => {
        let userinfo = await facade.login(user,pass);
        this.setState({userinfo});    
        this.props.changeLoggedIn();
        this.props.setname(user);
    }
    render() {
        return (
            <div>
                {!this.state.loggedIn ? (<LogIn login={this.login} />) :
                 (<div> <LoggedIn roles={this.state.userinfo.roles} /> <button onClick={this.logout}>Logout</button> </div>)}
            </div>
        );
    }
}

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
    }
    login = (evt) => {
        evt.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }
    onChange = (evt) => {
        this.setState({[evt.target.id]: evt.target.value})
    }
    render() {
        if (this.state.signUp) return <Route exact path="/" render={() => <Redirect to="signup/"/>}/>
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.login} onChange={this.onChange} >
                    <input type="text" placeholder="User Name" id="username" />
                    <input type="password" placeholder="Password" id="password" />
                    <button>Login</button>
                </form>
                <br/><p onClick={() => this.setState({signUp: true})}>create acount</p>
            </div>
        );
    }
}

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state= {dataFromServer: "Fetching!!"};
    }
    componentDidMount(){
        if(facade.getRole().includes('admin')){
            console.log('I am admin')
        } else {
            console.log('I am user')
        }
    }
    render() {
        return (
            <div>
                <h2>Data Received from server</h2>
                <h3>{this.state.dataFromServer}</h3>
            </div>
        );
    }
}
