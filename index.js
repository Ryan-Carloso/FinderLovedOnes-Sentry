import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';
import App from './App';

// Initialize Sentry
Sentry.init({
  dsn: 'https://add6c119ef5e3ef2158e668866cf5fd1@o4507664027287552.ingest.de.sentry.io/4507669232681040',
  tracesSampleRate: 1.0,
  enableNative: true,
  debug: true,
  enableSpotlight: __DEV__,
  beforeSend(event) {
    return event;
  }
});

// Send a test message
Sentry.captureMessage('Sentry is on in index.js');

// Register the root component
registerRootComponent(App);
