
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry
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

class PropertyFinderApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Property Finder</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinderApp);