'use strict';

var React = require('react-native');

var SearchResults = require('./SearchResults');
// destructuring assignment, lets you extract multiple object properties and assign them to variables. can directly refer to StyleSheet rather than React.StyleSheet
var {
  // css
  StyleSheet,
  Text,
  // forms
  TextInput,
  View,
  // button
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
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
    // makes width of button filled out on screen
    alignSelf: 'stretch',
    // makes text centered
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    // size of the input
    flex: 4,
    fontSize: 15,
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

// adding utility function:
function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};
// adding component
class SearchPage extends Component {
  // creating a state variable setting searchString variable to london
    constructor(props) {
      super(props);
      this.state = {
        searchString: 'london',
        // keeps track of whether a query is in progress
        isLoading: false,
        message: ''
      };
    }
    // Web API function which is an asynchromous response returned with a promise with success path paring the JSON and supplying it to a method
    // eventhandler so that the input text changes when you delete it, rather than being placed forever (without this method)
    // takes value from events text property and updates the component state
    onSearchTextChanged(event) {
      console.log('onSearchTextChanged');
      this.setState({ searchString: event.nativeEvent.text });
      console.log(this.state.searchString);
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
      this._executeQuery(query);
    }
      // clears isLoading, and logs number of properties found if the query was successful
    _handleResponse(response) {
      this.setState({ isLoading: false , message: '' });
      if (response.application_response_code.substr(0, 1) === '1') {
        this.props.navigator.push({
          title: 'Results',
          // navigates to SearchResults component and passes in the listings from the API request
          component: SearchResults,
          passProps: {listings: response.listings}
        });
      } else {
        this.setState({ message: 'Location not recognized; please try again.'});
      }
    }
  render() {
    // tenary if statement that either adds an activity indicator or an empty view depending on the component's isLoading state
    var spinner = this.state.isLoading ?
    ( <ActivityIndicatorIOS
        hidden='true'
        size='large' /> ) :
    ( <View/>);
    return (
      // one container, with two text labels
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode, or your location!
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            // implementing the change event
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name or postcode'/>
          <TouchableHighlight style={styles.button}
          // color of button once tapped
            underlayColor='99d9f4'>

              <Text style={styles.buttonText}
              onPress={this.onSearchPressed.bind(this)}>

              Go</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
      <Image source={{uri: 'http://www.misskatecuttables.com/uploads/shopping_cart/9295/large_cute-house.png'}}
        style={styles.image} />
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
      );
  }
}

// exporting SearchPage class, which permits its use in other files.
module.exports = SearchPage;

