import React from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { Style } from '../resources/Styles';

export default (props) => (
    <TouchableOpacity style={Style.button} onPress={props.onPress}>
      <Text style={Style.buttonText}>{props.title}</Text>
    </TouchableOpacity>
)