import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from './context/InventoryProvider';
import InventoryInputModel from './InventoryInputModel';

type Props = {
  item: Item;
};

type Item = {
  name: string;
  total: number;
  price: number;
  desc: string;
};

type Props2 = {
  route: {
    params: {
      [x: string]: any;
      name: string;
      total: number;
      price: number;
      desc: string;
    };
  };
};

interface DetailsScreenProps {
  item: Item;
}


const InventoryDetails: React.FC<Props2> = ({ route}: Props2) => {
 const inventory = route.params; 
 console.log(inventory.inventory.name);
 const itemDetails = { "item1": inventory};
 const navigation = useNavigation();
 const {setInventories} = useInventory();
 const [showModal, setShowModal] = useState(false);
 const [isEdit, setIsEdit] = useState(false);

 const deleteInventory = async () => {
    const items = await AsyncStorage.getItem('inventories'); 
    let inventories = [];
    if (items != null) inventories = JSON.parse(items);
    const newInventory = inventories.filter((n: Item) => n.name !==( inventory.inventory.name)); 
    setInventories(newInventory);
    await AsyncStorage.setItem('inventories', JSON.stringify(newInventory));
    navigation.goBack; 
};


const displayDeleteAlert = () => {
  Alert.alert(
    'Are You Sure!',
    'This action will delete your inventory permanently!',
    [
      {
        text: 'Delete',
        onPress:() => deleteInventory,
      },
      {
        text: 'No Thanks',
        onPress: () => console.log('no thanks'),
      },
    ],
    {
      cancelable: true,
    }
  );
};


const getItems = async (): Promise<Item[]> => {
  try {
    const itemsJson = await AsyncStorage.getItem('items');
    if (itemsJson !== null) {
      return JSON.parse(itemsJson);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving items from AsyncStorage:', error);
    return [];
  }
};

const handleUpdate= () => {}
const handleOnClose= () => setShowModal(false);

const openEditModal= () => {
  setIsEdit(true);
  setShowModal(true)
}



 
return (
    <View style={styles.container}>
      <Text style={styles.name}>Name: {inventory.inventory.name}</Text>
      <Text style={styles.total}>Total: {inventory.inventory.total}</Text>
      <Text style={styles.price}>Price: {inventory.inventory.price}</Text>
      <Text style={styles.price}>Desc: {inventory.inventory.desc}</Text>

      <DeleteButton onPress={displayDeleteAlert}></DeleteButton>
    <EditButton  onPress={openEditModal}></EditButton>
        <InventoryInputModel isEdit ={isEdit}  inventory = {inventory} visible={showModal} onClose={handleOnClose} onSubmit={handleUpdate}></InventoryInputModel>
    </View>

    
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#007aff',
    borderRadius: 8,
    margin: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  total: {
    fontSize: 16,
    marginBottom: 4,
    color: '#fff',
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: '#fff',
  },
  desc: {
    fontSize: 14,
    marginTop: 8,
    color: '#fff',
  },
});

export default InventoryDetails;

