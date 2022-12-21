import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSession } from '~/hooks';
import { RootStackParamList } from '~/types';

import LinkingConfiguration from './LinkingConfiguration';
import { defaultScreenOptions } from './Options';

// being lazy is not always bad...
const getSignIn = () => require('~/screens/Authentication/SignIn').default;
const getSignUp = () => require('~/screens/Authentication/SignUp').default;
const getProfile = () => require('~/screens/Profile').default;

export default function Navigation() {
  const session = useSession();

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator isAuthenticated={!!session.data} />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        /*
        Main mode */
        <Stack.Group screenOptions={defaultScreenOptions}>
          <Stack.Screen name="Profile" getComponent={getProfile} />
        </Stack.Group>
      ) : (
        /*
        Authentication flow */
        <Stack.Group screenOptions={defaultScreenOptions}>
          <Stack.Screen name="SignIn" getComponent={getSignIn} />
          <Stack.Screen name="SignUp" getComponent={getSignUp} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
