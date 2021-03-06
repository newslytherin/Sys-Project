import React from 'react';
import { Text, View, Platform, ScrollView, Image } from 'react-native';
import { Constants } from "expo";
import { createStackNavigator } from 'react-navigation';
import { Styles, COLORS } from './resources/Styles';
import Touchable from './components/Touchable';
import ListView from './components/ListView';
import LocCal from './components/LocationCollecter';
import OrderTable from './components/OrderTable';
import Login from './components/Login'
import FlightView from './components/FlightView';
import facade from './data/apiFacade'

class Dashboard extends React.Component {
    static navigationOptions = {
        title: 'dashboard',
        headerTitleStyle: { color: COLORS.WHITE },
        headerStyle: { backgroundColor: COLORS.MAIN, },
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={Styles.dashboardContainer}>
                <Text style={Styles.largeText}>Hello from Slytherin</Text>
                <ScrollView style={Styles.dashboardContainer}>
                    {/* <Text style={Styles.smallText}>Filler text</Text> */}
                    <Touchable onPress={() => navigate('listView', { des: '' })} title="Show flights" />
                    <Touchable onPress={() => navigate('location')} title="Show location" />
                    <Touchable onPress={() => navigate('orderTable', { des: '' })} title="User page" />
                    <View style={{ alignItems: 'center' }}>
                        <Image style={Styles.logo} source={require('./assets/icon.png')} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const RouteStack = createStackNavigator({
    dashboard: { screen: Dashboard },
    listView: { screen: ListView },
    location: { screen: LocCal },
    orderTable: { screen: OrderTable },
    flightView: { screen: FlightView },
});

export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />