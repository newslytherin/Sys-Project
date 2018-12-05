import React from 'react'
import { TextInput, View, Text } from "react-native";

export default class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { test: '', username: 'test', password: '', isLoggedIn: false }
    }

    onChange = (evt) => {
        const { name, value } = evt.nativeEvent;
        console.log("name", name)
        console.log("value", value)
        console.log("evt", evt)
        this.setState({ [name]: value })
    }

    render() {
        return (
            <View>
                <TextInput onChange={this.onChange} name='username' placeholder='username' />
                <TextInput onChange={this.onChange} secureTextEntry={true} name='password' placeholder='password' />
                <Text>state: {this.state.evt}</Text>
            </View>
        )
    }
}