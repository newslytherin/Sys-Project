import React from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { Styles } from '../resources/Styles';

export default (props) => (
    <TouchableOpacity style={Styles.button} onPress={props.onPress}>
      <Text style={Styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
)