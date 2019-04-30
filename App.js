import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
  createReduxContainer
} from "react-navigation-redux-helpers";
import { Provider, connect } from "react-redux";

import {
  UsersReducer,
  IndexReducer,
  EventReducer
} from "./Screens/Swipe/Reducer";

import Swipe from "./Screens/Swipe/Swipe";

const AppNavigator = createStackNavigator(
  {
    Tinder: { screen: Swipe }
  },
  {
    initialRouteName: "Tinder"
  }
);

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  users: UsersReducer,
  index: IndexReducer,
  event: EventReducer
});

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const root = createReduxContainer(AppNavigator);
const mapStateToProps = state => ({
  state: state.nav
});

/*eslint-disable */
const AppWithNavigationState = connect(mapStateToProps)(root);

const store = createStore(appReducer, applyMiddleware(middleware));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
