import React from 'react';
import { Text, TextInput, Slider } from 'react-native';
import { Styles } from '../resources/Styles';

export function TextFilterField(props) {
    return (
    <>
        <Text style={ Styles.filterLabel }>{props.def}</Text>
        <TextInput
            style={ Styles.textFilter }
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
            <Text style={ Styles.filterLabel }>{`${props.def} - ${props.value}.00 kr.`}</Text>
            <Slider
                style={ Styles.sliderFilter }
                // onSlidingComplete={(value) => props.setFilters(props.filter, value)}
                onValueChange={(value) => props.setFilters(props.filter, value)}
                value={props.value}
                minimumValue={0}
                maximumValue={20000}
                step={100}
            />
        </>
    )
}
