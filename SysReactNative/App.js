import React from 'react';
import { Text, View, Platform, ScrollView } from 'react-native';
import { Constants } from "expo";
import { createStackNavigator  } from 'react-navigation';
import { StarWarsText  } from './resources/StarWarsText';
import { navOptions } from './resources/NavigationOptions';
import { Styles } from './resources/Styles';
import Touchable from './components/Touchable';
import ListView from './components/ListView';
import LocCal from './components/LocationCollecter';
import OrderTable from './components/OrderTable';
<<<<<<< HEAD
import FlightView from './components/FlightView';
=======
import facade from './data/apiFacade'
>>>>>>> 6aea8c13e96c8f037f76c2acc1b1b6b13156b3d6

class Dashboard extends React.Component {
  static navigationOptions = navOptions;

  render() {
    const { navigate } = this.props.navigation;
    return (
<<<<<<< HEAD
      <View style={Styles.dashboardContainer}>
        <Text style={Styles.largeText}>Hello from newSlytherin</Text>
        <Text style={Styles.smallText}>{StarWarsText}</Text>
        <Touchable onPress={() => navigate('listView', {navigation: navigate})} title="Show Star Wars" />
=======
      <ScrollView style={Styles.dashboardContainer}>
        <Text style={Styles.largeText}>Hello from Slytherin</Text>
        <Text style={Styles.smallText}>Filler text</Text>
        <Touchable onPress={() => navigate('listView')} title="Show Star Wars" />
        <Touchable onPress={() => navigate('location')} title="Show location" />
>>>>>>> 6aea8c13e96c8f037f76c2acc1b1b6b13156b3d6
        <Touchable onPress={() => navigate('orderTable', {test: 'this is a test'})} title="orders" />
      </ScrollView>
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