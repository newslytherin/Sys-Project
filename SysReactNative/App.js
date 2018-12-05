import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Constants } from "expo";
import { createStackNavigator  } from 'react-navigation';
import { StarWarsText  } from './resources/StarWarsText';
import { navOptions } from './resources/NavigationOptions';
import { Styles } from './resources/Styles';
import Touchable from './components/Touchable';
import ListView from './components/ListView';
import OrderTable from './components/OrderTable';
import FlightView from './components/FlightView';

class Dashboard extends React.Component {
  static navigationOptions = navOptions;

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.dashboardContainer}>
        <Text style={Styles.largeText}>Hello from newSlytherin</Text>
        <Text style={Styles.smallText}>{StarWarsText}</Text>
        <Touchable onPress={() => navigate('listView', {navigation: navigate})} title="Show Star Wars" />
        <Touchable onPress={() => navigate('orderTable', {test: 'this is a test'})} title="orders" />
      </View>
    )
  }
}

const RouteStack = createStackNavigator({
  dashboard: { screen: Dashboard },
  listView: { screen: ListView },
  orderTable: { screen: OrderTable },
  flightView: { screen: FlightView },
});

export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />