
'use strict';

// this loads react native module, and assigns it to React variable.
var React = require('react-native');


// adding css to index page.
var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

// PropertyFinderApp extends React.Component, the basic building block of the React UI.
class PropertyFinderApp extends React.Component {
  // rendering below
  render() {
    return React.createElement(React.Text, {style: styles.text}, "Hello World!");
  }
}

// AppRegistry defines the entry point to the application and provides the root component.
React.AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });
