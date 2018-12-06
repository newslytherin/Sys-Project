import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { Style } from '../resources/Styles';

export default () => (
    <View style={Style.container}>
        <Text style={Style.largeText}>loading...</Text>
        <ActivityIndicator size="large" color="#00ca00" />
    </View>
)