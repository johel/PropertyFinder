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

import {urlForQueryAndPage} from './api';
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
	    isLoading:false,
	    message: ''
	  };
	}

	onSearchTextChanged(event) {
	  console.log('onSearchTextChanged');
	  this.setState({ searchString: event.nativeEvent.text });
	  console.log(this.state.searchString);
	}

	_handleResponse(response) {
	  this.setState({ isLoading: false , message: '' });
	  if (response.application_response_code.substr(0, 1) === '1') {
	  	// o objeto passado dentro do push correspondera ao parametro route na renderScene(route, navigator) 
	  	// onde renderScene eh uma propriedade no componente Navigation. Portanto passProps eh apenas uma convencao
	  	this.props.navigator.push({
			  name: 'searchResults',
			  passProps: {listings: response.listings}
			});

	  }else {
	    this.setState({ message: 'Location not recognized; please try again.'});
	  }
	}

	_executeQuery(query) {
	  console.log(query);
	  this.setState({ isLoading: true });
	  fetch(query)
		  .then(response => response.json())
		  .then(json => this._handleResponse(json.response))
		  .catch(error =>
		     this.setState({
		      isLoading: false,
		      message: 'Something bad happened ' + error
		   }));
	}
 
	onSearchPressed() {
		var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
		// this.setState({ message: `query is ${query}`});
	  this._executeQuery(query);
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
				<Text style={styles.description}>{this.state.message}</Text>
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