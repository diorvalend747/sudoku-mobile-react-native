import React from 'react';
import store from './src/store'
import { Provider } from 'react-redux'
import { Home } from './src/pages/Home'
import { Game } from './src/pages/Game'
import { Finish } from './src/pages/Finish'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  const Stack = createStackNavigator()
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: '' }}/>
          <Stack.Screen name="Game" component={Game}/>
          <Stack.Screen name="Finish" component={Finish}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}