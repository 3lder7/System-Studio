import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaInicial from './components/screens/HomeScreen';
import AddCompromissos from './components/screens/AddAppointment';
import AgendaScreen from './components/screens/Schedule';
import ClientesScreen from './components/screens/Clients';
import PagamentosScreen from './components/screens/Payments';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Home: undefined;
  AddAppointment: { addAppointment: (newAppointment: any) => void };
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={TelaInicial} options={{ headerShown: false }} />
      <Stack.Screen name="AddAppointment" component={AddCompromissos} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any;
            switch (route.name) {
              case 'Principal': iconName = 'calendar'; break;
              case 'Agenda': iconName = 'list'; break;
              case 'Clientes': iconName = 'people'; break;
              case 'Pagamentos': iconName = 'card'; break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2A6B7C',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Principal" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Agenda" component={AgendaScreen} />
        <Tab.Screen name="Clientes" component={ClientesScreen} />
        <Tab.Screen name="Pagamentos" component={PagamentosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

