import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import List from './app/list';
import Item from './app/item';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './app/store';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="List" component={List} />
              <Stack.Screen name="Item" component={Item} />
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
