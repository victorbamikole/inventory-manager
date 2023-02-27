
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState, useContext} from 'react';


type Item = {
    name: string;
    total: number;
    price: number;
    desc: string;
    
  };

  
interface ItemContextType {
    inventories: Item[];
    setInventories: React.Dispatch<React.SetStateAction<Item[]>>;
  findInventory: () => void
}

const initialContext: ItemContextType = {
    inventories: [],
  setInventories: () => {},
  findInventory: () => {}
};

export const InventoryContext = createContext<ItemContextType>(initialContext);

export const InventoryProvider: React.FC = ({children}: any) => {
  const [items, setItems] = useState<Item[]>([]);
  const [inventories, setInventories] = useState<Item[]>([]);


  const findInventory = async() => {

    try {
      
      const jsonValue = await AsyncStorage.getItem('inventories');
      if (jsonValue != null) {
        const parsedValue: Item[] = JSON.parse(jsonValue);

        setInventories(parsedValue);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect (() => {
    AsyncStorage.clear
    findInventory()
  }, []);

  return <InventoryContext.Provider value={{inventories, setInventories, findInventory}}>{children}</InventoryContext.Provider>;
};




export const useInventory = () => useContext(InventoryContext);

export default InventoryProvider;



