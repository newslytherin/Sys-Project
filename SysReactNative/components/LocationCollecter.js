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
                {/* <MapView.Marker
                    coordinate={{latitude: 0, longitude: 0}}
                    title="The center of the map"
                    description={''}
                    pinColor='green'
                /> */}
                <MapView.Marker
                    coordinate={{latitude: 51.4700223, longitude: -0.4542954999999438}}
                    title="Heathrow Airport"
                    description={'London, LHR, England'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 49.0096906, longitude: 2.547924500000022}}
                    title="Charles de Gaulle Airport"
                    description={'Paris, CDG, Frankrig'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 52.3076865, longitude: 4.767424099999971}}
                    title="Amsterdam Airport"
                    description={'Amsterdam, AMS, Holland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 50.0379326, longitude: 8.562151800000038}}
                    title="Frankfurt Airport"
                    description={'Frankfurt, FRA, Tyskland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 40.9829888, longitude: 28.810442500000022}}
                    title="Istanbul Ataturk Airport"
                    description={'Istanbul, IST, Tyrkiet'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 40.4839361, longitude: -3.5679514999999355}}
                    title="Madrid-Barajas Airport"
                    description={'Madrid, MAD, Spanien'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 41.297445, longitude: 2.083294099999989}}
                    title="Barcelona–El Prat Airport"
                    description={'Barcelona, BCN, Spanien'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 51.1536621, longitude: -0.18206290000000536}}
                    title="Gatwick Airport"
                    description={'London, LGW, England'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 48.3536621, longitude: 11.775027899999941}}
                    title="Munich International Airport"
                    description={'München, MUC, Tyskland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 41.7998868, longitude: 12.246238400000038}}
                    title="Leonardo da Vinci International Airport"
                    description={'Rom, FCO, Italien'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 55.973648, longitude: 37.412503}}
                    title="Sheremetyevo International Airport"
                    description={'Moskva, SVO, Rusland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 48.7262433, longitude: 2.365247199999999}}
                    title="Orly Airport"
                    description={'Paris, ORY, Frankrig'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 55.410307, longitude: 37.902451}}
                    title="Domodedovo Moscow Airport"
                    description={'Moskva, DME, Rusland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 53.42644809999999, longitude: -6.249909800000069}}
                    title="Dublin Airport"
                    description={'Dublin, DUB, Irland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 47.458217, longitude: 8.555476}}
                    title="Zurich Airport"
                    description={'Zürich, ZRH, Schwiez'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 55.6180236, longitude: 12.650762799999939}}
                    title="Copenhagen Airport"
                    description={'København, CPH, Danmark'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 39.5517407, longitude: 2.736164899999949}}
                    title="Palma de Mallorca Airport"
                    description={'Palma de Mallorca, PMI, Spanien'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 53.358803, longitude: -2.27273}}
                    title="Manchester Airport"
                    description={'Manchester, MAN, England'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 60.19755, longitude: 11.100415}}
                    title="Oslo Airport"
                    description={'Oslo, OSL, Norge'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 38.7755936, longitude: -9.135366699999963}}
                    title="Lisbon Portela Airport"
                    description={'Lissabon, LIS, Portugal'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 59.649762, longitude: 17.923781}}
                    title="Stockholm Arlanda Airport"
                    description={'Stockholm, ARN, Sverige'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 51.8860181, longitude: 0.23886609999999564}}
                    title="Stansted Airport"
                    description={'London, STN, England'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 50.900999, longitude: 4.485574400000019}}
                    title="Brussels Airport"
                    description={'Bruxelles, BRU, Belgien'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 51.287615, longitude: 6.766791}}
                    title="Düsseldorf Airport"
                    description={'Düsseldorf, DUS, Tyskland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 48.11997, longitude: 16.56324}}
                    title="Vienna Airport"
                    description={'Wien, VIE, Østrig'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 45.630063, longitude: 8.725531}}
                    title="Malpensa Airport"
                    description={'Milano, MXP, Italien'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 37.9356467, longitude: 23.948415599999976}}
                    title="Athens International Airport"
                    description={'Athen, ATH, Grækenland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 52.558833, longitude: 13.288437}}
                    title="Berlin Tegel Airport"
                    description={'Berlin, TXL, Tyskland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 60.321042, longitude: 24.95286}}
                    title="Helsinki Airport"
                    description={'Helsinki, HEL, Finland'}
                    pinColor="blue"
                />
                <MapView.Marker
                    coordinate={{latitude: 36.679114, longitude: -4.494509}}
                    title="Malaga airport"
                    description={'Málaga, AGP, Spanien'}
                    pinColor="blue"
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