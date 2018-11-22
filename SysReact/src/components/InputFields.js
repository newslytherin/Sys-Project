import React from 'react'
import Date from '../logic/Date'

export function TextField(props) {
    return ( 
        <>
        <label style={{display: 'block'}}>{`${props.title}:`}</label>
        <input 
            type="text" 
            id={props.id}
            value={props.value} 
            onChange={props.onChanged}
            required/>
        </>
    )
}

export function NumberField(props) {
    return (
        <>
        <label style={{display: 'block'}}>{`${props.title}:`}</label>
        <input 
            type="number" min="1"
            id={props.id} 
            value={props.value} 
            onChange={props.onChanged}
            required/>
        </>
    )
}

export function DateField(props) {
    return (
        <>
        <label style={{display: 'block'}}>{`${props.title}:`}</label>
        <input
            type="datetime-local" 
            id={props.id} 
            min={Date()}
            max="2025-01-01T00:00"
            value={props.value} 
            onChange={props.onChanged}
            required/>
        </>
    )
}
