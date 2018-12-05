import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class App extends Component {
    state = {
        mapRegion: { latitude: 55.7701401, longitude: 12.5118887, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        locationResult: null,
        location: {coords: { latitude: 55.7701401, longitude: 12.5118887}},
    };

    componentDidMount() {
        this.getLocationAsync();
    }

    handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location, });
    };

    render() {
        return (
            <MapView
                style={{ flex:1 }}
                initialRegion={{
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                // region={this.state.mapRegion}
                // onRegionChange={this._handleMapRegionChange}
            >
                <MapView.Marker
                    coordinate={this.state.location.coords}
                    title="Your location"
                    description={`You are here: ${this.state.location.coords.latitude}, ${this.state.location.coords.longitude}`}
            />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});