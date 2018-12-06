import React from 'react';
import { Text } from 'react-native';
import Touchable from './Touchable'
import { TextFilterField, SliderFilterField } from './FilterFields'
import { Styles } from '../resources/Styles'

export default function Filters(props) {
    return (props.hide)
        ? <Touchable title='filters' onPress={props.onPress}/>
        : (<>
            <TextFilterField def='departure' value={props.departure} filter='departure' setFilters={props.setFilters}/>
            <TextFilterField def='destination' value={props.destination} filter='destination' setFilters={props.setFilters}/>
            <SliderFilterField def='minimum price' value={props.minPrice} filter='minPrice' setFilters={props.setFilters}/>
            <SliderFilterField def='maximum price' value={props.maxPrice} filter='maxPrice' setFilters={props.setFilters}/>
            <Touchable title='hide' onPress={props.onPress}/>
            <Text style={ Styles.resetFilters } onPress={props.resetFilters}>reset</Text>
        </>)
}