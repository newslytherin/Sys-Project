import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import facade from '../data/apiFacade';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'user1@mail.dk',
            password: 'test',
            msg: ''
        }
    }

    didLogin = async () => {
        const user = await facade.login(this.state.email, this.state.password)
        const success = await facade.loggedIn()
        success ? this.props.didLogin(success) : alert("wrong password or username")
    }

    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Login
                </Text>
                <TextInput onChangeText={(email) => this.setState({ email })} placeholder='Email' />
                <TextInput onChangeText={(password) => this.setState({ password })} secureTextEntry={true} placeholder='Password' />
                <View style={{ margin: 7 }} />
                <Text>name: {this.state.email}</Text>
                <Text>pass: {this.state.password}</Text>
                <Text>msg: {this.state.msg}</Text>
                <Button
                    onPress={this.didLogin}
                    title="Submit"
                />
            </ScrollView>
        )
    }
}















// import React from 'react'
// import { TextInput, View, Text } from "react-native";

// export default class login extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { test: '', username: 'test', password: '', isLoggedIn: false }
//     }

//     onChange = (evt) => {
//         const { name, value } = evt.nativeEvent;
//         console.log("name", name)
//         console.log("value", value)
//         console.log("evt", evt)
//         this.setState({ [name]: value })
//     }

//     render() {
//         return (
//             <View>
//                 <TextInput onChange={this.onChange} name='username' placeholder='username' />
//                 <TextInput onChange={this.onChange} secureTextEntry={true} name='password' placeholder='password' />
//                 <Text>name: {this.state.username}</Text>
//                 <Text>pass: {this.state.password}</Text>
//             </View>
//         )
//     }
// }