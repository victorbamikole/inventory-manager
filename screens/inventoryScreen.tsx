import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import FloatingButton from '../components/FloatingBtn';
import InventoryInputModel from '../components/InventoryInputModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InventoryComponent from '../components/Inventory';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from '../components/context/InventoryProvider';

type Item = {
  name: string;
  total: number;
  price: number;
  desc: string;
  
};

type MyProps = {
  item: Item[];
};

type Props = {
  route: {
    params: {
      name: string;
    };
  };
};

const InventoryScreen: React.FC = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const {inventories, setInventories} = useInventory();
  const [showModal, setShowModal] = useState(false);
 const [isEdit, setIsEdit] = useState(false);
  

  const navigateToScreen = (inventory: any) => {
    navigation.navigate('Inventory Detail' as never, {inventory} as never);
  };


  const handleOnSubmit = async (name :string, total :number, price :number, desc: string) => {
    const newItem = {
      name,
      total,
      price,
      desc
    };
    try {
      const jsonValue = JSON.stringify([...inventories, newItem]);
    
      setInventories([...inventories, newItem]);
      await AsyncStorage.setItem('inventories', jsonValue);  
    } catch (e) {
      console.log(e);
    }

  };
 

  const inventoryList = [
    { name: 'Hello', total: 234, price: 0, desc: 'bjsbksjdn' },
  ];

  return (
    <><View style={styles.container}>

<FlatList 
      data={inventories}
      renderItem={({ item }) => (
        <InventoryComponent onPress={() => navigateToScreen(item)} item ={item} />
      )}
      // renderItem={({item}) => (<InventoryComponent items={[item]} onPress={() => navigateToScreen(item) }></InventoryComponent>)}
      // keyExtractor={(item, index) => `${item.name}_${index}`}
      keyExtractor={item => item.name}
    />
      
      {/* <InventoryComponent item={inventories} onPress={() => navigateToScreen(inventories) } /> */}
      <FloatingButton
        onPress={() => setModalVisible(true)} title={''} />
    </View>
    <InventoryInputModel visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit} isEdit={false} inventory={inventories[0]}></InventoryInputModel></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 15
  
  },
  addButton: {
    backgroundColor: '#007aff',

  },
  addButtonLabel: {
    fontSize: 32,
    color: '#fff',
  },
  text: {
    fontSize: 32,
    color:'#007aff' ,
  },
});

export default InventoryScreen;