
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
  },
  container: {
    flex: 1
  }
});

// PropertyFinderApp extends React.Component, the basic building block of the React UI.
class HelloWorld extends React.Component {
  // rendering below
  render() {
    // JavaScript syntax extension, which mixes HTML directly into javascript code
    return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
  }
}

// below constructs a navigation controller, and applies a style and sets the inital route to the HelloWorld component.
class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: HelloWorld,
        }} />

      );
  }
}

// AppRegistry defines the entry point to the application and provides the root component.
React.AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });
