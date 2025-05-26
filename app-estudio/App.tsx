import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './components/screens/HomeScreen';
import AddCompromissos from './components/screens/AddAppointment';

type RootStackParamList = {
  Home: undefined;
  AddAppointment: { addAppointment: (newAppointment: any) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" id={undefined}>
        <Stack.Screen name="Home" component={TelaInicial} />
        <Stack.Screen name="AddAppointment" component={AddCompromissos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
