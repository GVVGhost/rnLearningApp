import React from 'react';
import {AuthProvider} from '@contexts/AuthContext.tsx';
import {RootNavigator} from '@navigation/RootNavigator.tsx';
import {AlertNotificationRoot} from 'react-native-alert-notification';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AlertNotificationRoot>
        <RootNavigator />
      </AlertNotificationRoot>
    </AuthProvider>
  );
}

export default App;
