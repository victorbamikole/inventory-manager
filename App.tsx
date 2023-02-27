import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/loginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InventoryScreen from './screens/inventoryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryDetail from './components/InventoryDetails';
import { InventoryProvider } from './components/context/InventoryProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userEmail, setUserEmail] = useState({ email: ''});
  // AsyncStorage.clear();
  const findUser = async () => {
    const result = await AsyncStorage.getItem('email');
    if (result != null){
      setUserEmail(JSON.parse(result));
      let data = JSON.parse(result);
      let price = data["email"];
      console.log(price);
    }
   
    console.log(result);
    console.log(userEmail);
  };

  useEffect (() => {
   findUser()
   //AsyncStorage.clear();
  }, []);

  type Item = {
    name: string;
    total: number;
    price: number;
    desc: string;
  };

  const RenderDetaiScreen = (props: any) => <InventoryDetail {...props}/>;

  if(!userEmail.email) return <Login onSubmit={findUser} />
  return    (
  <NavigationContainer> 
    <InventoryProvider>
    <Stack.Navigator> 
    <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
    <Stack.Screen name="Inventory Detail" component={RenderDetaiScreen} />
    </Stack.Navigator>
    </InventoryProvider>
    </NavigationContainer>
    );
  

  function handleLoginSuccess(): void {

    //throw new Error('Function not implemented.');  <Login onSubmit={handleLoginSuccess} /> <InventoryScreen />
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
    //alignItems: 'center',
    //justifyContent: 'center',  <Login onSubmit={handleLoginSuccess} />
  },
});
