import React, {useEffect} from 'react';
import {AuthProvider} from '@contexts/AuthContext.tsx';
import {RootNavigator} from '@navigation/RootNavigator.tsx';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  useEffect(() => {
    console.log('Mode: ', Config.ENV);
  }, []);
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

export default App;
