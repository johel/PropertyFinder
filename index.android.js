
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Navigator
} from 'react-native';

import SearchPage from './src/SearchPage';
import SearchResults from './src/SearchResults';

const ROUTES = {
  searchPage: SearchPage,
  searchResults: SearchResults
};

class PropertyFinderApp extends Component {

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component {...route.passProps} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'searchPage'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}/>
    );
  }
}

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinderApp);