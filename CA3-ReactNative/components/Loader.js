import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { Styles } from '../resources/Styles';

export default () => (
    <View style={Styles.container}>
        <Text style={Styles.largeText}>loading...</Text>
        <ActivityIndicator size="large" color="#2196F3" />
    </View>
)