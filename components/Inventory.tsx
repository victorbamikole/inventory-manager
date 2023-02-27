import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Item = {
  name: string;
  total: number;
  price: number;
  desc: string;
  
};

type MyProps = {
  item: Item[];
onPress: (item: any) => void;

};
const InventoryComponent = ({ item, onPress }: MyProps) => {
  // const renderItem: ListRenderItem<Item> = ({ item }) => {
    interface Item {
      name: string;
      total: number;
      price: number;
      desc: string;
    }
    
  
    const {name , total, price, desc } = item;
    
    return (
      <TouchableOpacity onPress={onPress}> 
      <View style = {styles.container}>
        <Text style = {styles.name}>{name}</Text>
      <Text style = {styles.text} >{total}</Text>
      <Text style = {styles.text}>{price}</Text>
      <Text style = {styles.text}>{desc}</Text>
    
      </View>
      </TouchableOpacity>
    );
  };

  // return (
  //   <FlatList 
  //     data={item}
  //     renderItem={renderItem}
  //     keyExtractor={(item, index) => `${item.name}_${index}`}
  //   />
  // );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007aff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,

  },
  item: {
    backgroundColor: '#007aff',
    padding: 20,
    marginVertical: 8,

    
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  text: {

    fontSize: 16,
    color: '#fff',
  },
});

export default InventoryComponent;

