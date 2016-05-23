
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Navigator
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text:{
    color:'blue',
    fontSize: 30,
    margin: 80
  }
});

class HelloFinder extends Component {
  render() {
    return (
        <Text style={styles.text}>Property Finder</Text>
    );
  }
}

const ROUTES = {
  helloFinder: HelloFinder
};

class PropertyFinderApp extends Component {

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        sceneStyle={styles.container}
        initialRoute={{name: 'helloFinder'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}/>
    );
  }
}

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinderApp);