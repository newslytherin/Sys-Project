import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput, Slider } from 'react-native';
import { Styles } from '../resources/Styles';

export function TextFilterField(props) {
    return (
    <>
        <Text style={{ color: '#808080', margin: 15, fontWeight: 'bold' }}>{props.def}</Text>
        <TextInput
            style={{color: '#00ca00', fontSize: 24, height: 40, borderColor: 'transparent', marginLeft: 15, marginRight: 15}}
            onChangeText={(value) => props.setFilters(props.filter, value)}
            value={props.value}
            placeholder='search'
        />
    </>
    )
}

export function SliderFilterField(props) {
    return (
        <>
            <Text style={{ color: '#808080', margin: 15, fontWeight: 'bold' }}>{`${props.def} - ${props.value}.00 kr.`}</Text>
            <Slider
                style={{ marginLeft: 15, marginRight: 15}}
                onValueChange={(value) => props.setFilters(props.filter, value)}
                value={props.value}
                minimumValue={0}
                maximumValue={20000}
                step={100}
            />
        </>
    )
}
