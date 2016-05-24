import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ProgressBarAndroid,
  Image
} from 'react-native';

import houseSrc from '../resources/house.png';


const BLUE = '#48BBEC';

//searchInput border is not applying probably because of android issues
//Text Input Border: https://facebook.github.io/react-native/docs/known-issues.html
const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  alignSelf: 'stretch'
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},
	button: {
	  height: 36,
	  flex: 1,
	  flexDirection: 'row',
	  backgroundColor: '#48BBEC',
	  borderColor: '#48BBEC',
	  borderWidth: 1,
	  borderRadius: 8,
	  marginBottom: 10,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	},
	searchInput: {
	  padding: 4,
	  marginRight: 5,
	  flex: 4,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	  borderRadius: 8,
	  color: '#48BBEC'
	},
	image: {
	  width: 217,
	  height: 138
	}
});


export default class SearchPage extends Component {

	constructor(props) {
	  super(props);
	  this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
	  this.onSearchPressed = this.onSearchPressed.bind(this);
	  this.state = {
	    searchString: 'london',
	    isLoading:false
	  };
	}

	onSearchTextChanged(event) {
	  console.log('onSearchTextChanged');
	  this.setState({ searchString: event.nativeEvent.text });
	  console.log(this.state.searchString);
	}

	_executeQuery(query) {
	  console.log(query);
	  this.setState({ isLoading: true });
	  setTimeout(()=>this.setState({ isLoading: false }),3000);
	}
 
	onSearchPressed() {
	  this._executeQuery();
	}

  render() {

  	  var progressBar = this.state.isLoading ?
		    (<View>
		      <ProgressBarAndroid color={BLUE} />
		    </View> ) : (<View/>);



    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>

	     	<View style={styles.flowRight}>
				  <TextInput
				  	onChange={this.onSearchTextChanged}
				    style={styles.searchInput}
				    value={this.state.searchString}
				    placeholder='Search via name or postcode'/>
				  <TouchableHighlight 
				  		onPress={this.onSearchPressed}
				  		style={styles.button}
				      underlayColor='#99d9f4'>
				    <Text style={styles.buttonText}>Go</Text>
				  </TouchableHighlight>
				</View>

				<TouchableHighlight style={styles.button}
				    underlayColor='#99d9f4'>
				  <Text style={styles.buttonText}>Location</Text>
				</TouchableHighlight>

				<Image source={houseSrc} style={styles.image}/>

				{progressBar}

      </View>
    );
  }
}

function borderColor(color){
		return {
			borderWidth:4,
			borderColor:color
		};
	}