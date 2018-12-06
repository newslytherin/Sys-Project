import React, { Component } from 'react'
import Touchable from '../components/Touchable'
import { Style } from '../resources/Styles'
import {
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native'
import facade from '../data/apiFacade'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            msg: ''
        }
    }

    didLogin = async () => {
        await facade.login(this.state.email, this.state.password)
        const success = await facade.loggedIn()
        success ? this.props.didLogin(success) : alert("wrong password or username")
    }

    render() {
        return (
            <ScrollView style={Style.dashboardContainer}>
                <Text style={Style.largeText}>
                    Log in
                </Text>
                <TextInput style={Style.textInput} onChangeText={(email) => this.setState({ email })} placeholder='Email' />
                <TextInput style={Style.textInput} onChangeText={(password) => this.setState({ password })} secureTextEntry={true} placeholder='Password' />
                <View style={{ margin: 7 }} />
                <Touchable onPress={this.didLogin} title="Log in" />
            </ScrollView>
        )
    }
}
