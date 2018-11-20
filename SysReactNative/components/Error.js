import React from 'react';
import { Text, View } from 'react-native'
import { Styles } from '../resources/Styles';
import Touchable from './Touchable';

export default (props) => (
    <View style={Styles.container}>
        <Text style={Styles.error}>A failed occurred, try refreshing or come back later</Text>
        <Touchable onPress={() => props.refresh} title="refresh" />
    </View>
)