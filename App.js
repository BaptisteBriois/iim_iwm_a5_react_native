import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './containers/Home'
import InfoScreen from './containers/Info'
import reducer from './redux/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Info: InfoScreen
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const NavigatorContainer = createAppContainer(AppNavigator);

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          <NavigatorContainer/>
        </View>
      </Provider>
    );
  }
}
