import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';
import HomeScreen from './screens/home/homescreen'; // Adjust path as needed
import MainComponent from './screens/home/MainComponent'; // Adjust path as needed
import Catch from './screens/catch/catch'; // Adjust path as needed
import Tutorial from './screens/tutorial/tutorial'; // Adjust path as needed

// Initialize Sentry
Sentry.init({
  dsn: 'https://75f8e51156fe13d92f929dbb4ce0a9a3@o4507664027287552.ingest.de.sentry.io/4507673427312720',
  tracesSampleRate: 1.0, // Capture all transactions
  enableNative: true,
  debug: true, // Enable debug mode for additional logs
  enableSpotlight: __DEV__,
  beforeSend(event) {
    return event;
  }
});

// Send a message indicating that Sentry is on
Sentry.captureMessage('Sentry is ON on App.js');

// Setup Navigation
const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    // This will run when the component mounts
    Sentry.captureMessage('App component mounted App.js home');
  }, []);

  const sendTestError = () => {
    try {
      throw new Error('This is a test error');
    } catch (error) {
      Alert.alert('Error', 'Sentry Send it');
      Sentry.captureException(error);
    }
  };

  return (
    <Sentry.ErrorBoundary fallback={({ error, componentStack, resetError }) => (
      <View style={styles.errorContainer}>
        <Text>Something went wrong:</Text>
        <Text>{error.toString()}</Text>
        <Text>{componentStack}</Text>
        <Button title="Try again" onPress={resetError} />
      </View>
    )}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Find location!" component={MainComponent} />
            <Stack.Screen name="Generate code" component={Catch} />
            <Stack.Screen name="Tutorial, how the app works" component={Tutorial} />
          </Stack.Navigator>
          <View style={styles.buttonContainer}>
            <Button title="Send Test Error" onPress={sendTestError} />
          </View>
        </NavigationContainer>
      </SafeAreaView>
    </Sentry.ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
