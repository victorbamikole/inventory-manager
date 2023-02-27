import React, { useEffect, useState } from "react";
import { View, Text,StyleSheet, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import FloatingButton from "./FloatingBtn";
import CustomButton from "./CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InputModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (name: string, total: number, price: number, desc: string) => void;
    isEdit: Boolean;
    inventory: InventoryValues
  }

  interface InventoryValues {
    name: string;
    total: number;
    price: number;
    desc: string;
  }

  

const InventoryInputModel: React.FC<InputModalProps> = ({visible, onClose, onSubmit, isEdit, inventory}:InputModalProps ) => {
  const [values, setValues] = useState<InventoryValues[]>([]);
  const [name, setName] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");

  useEffect (() => {
    if (isEdit) {
      setName(inventory.name);
      setTotal(inventory.total);
      setPrice(inventory.price);
      setDesc(inventory.desc);
    }
  }, [isEdit])
  
  const handleModalClose = () => {
    Keyboard.dismiss();
  };
    const handleAddPress = () => {
      // Handle the add button press here
    };

    const handleOnChangeText = (text: keyof InventoryValues, valueFor: string) => {
      setValues({ ...values, [text]: valueFor });
    
    };
    
    const handleSubmit = async () => {
      if (!name || !total || !price || !desc) {
        // Display an error message if any of the fields are empty
        alert("Please fill in all fields");
        return;
      }

         // Check if the name already exists in the inventory
    const items = await AsyncStorage.getItem("inventories");
    const parsedItems = items ? JSON.parse(items) : [];
    const nameExists = parsedItems.some((item: InventoryValues) => item.name === name);
    if (nameExists) {
      alert("An item with this name already exists in the inventory");
      return;
    }

      // Check if the description has at least three words
      const descWords = desc.split(" ");
      if (descWords.length < 3) {
        alert("Description must have at least three words");
        return;
      }

      const parsedTotal = (total);
    const parsedPrice = (price);

    if (isNaN(parsedTotal) || isNaN(parsedPrice)) {
      // Display an error message if the total or price fields are not valid numbers
      alert("Please enter valid numbers for Total and Price");
      return;
    }

      const newInventory: InventoryValues = {
        name,
        total,
        price,
        desc,
      };

      setValues([...values, newInventory]);
      // Clear the form fields
    setName("");
    setTotal(0);
    setPrice(0);
    setDesc("");


      if (!name && !total.toString().trim() && !price.toString().trim() && !name.trim()) return onClose();
      onSubmit(name, total, price, desc,);
      onClose();  
    
    };

    const closeModal = () => {
      onClose();  
    }

    return (
        <>
        <StatusBar hidden />
        <Modal visible={visible} animationType="fade">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style = {styles.container}>
            <TextInput
          style={[styles.input, styles.name]}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={[styles.input, styles.total]}
          placeholder="Total"
          onChangeText={(text) => setTotal(parseInt(text))}
          value={total.toString()}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.price]}
          placeholder="Price"
          onChangeText={(text) => setPrice(parseFloat(text))}
          value={price.toString()}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.desc]}
          placeholder="Description"
          onChangeText={(text) => setDesc(text)}
          value={desc}
        />
              
            
            
           <CustomButton title={"OK"} backgroundColor={"#2ecc71"} textColor={"#fff"} onPress={handleSubmit}></CustomButton>
        { name.trim() || total.toString().trim() || price.toString().trim() || desc.trim() ? (<CustomButton title={"Cancel"} backgroundColor={"#2ecc71"} textColor={"#fff"} onPress={closeModal}/>) : null}
        </View>
        </TouchableWithoutFeedback>
             
            <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>

        </Modal></>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal:20,
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
     
    },
    modalBG: {
      flex: 1,
      zIndex: -1,
    },
    addButton: {
      
      backgroundColor: '#007aff',
      
  
    },
    addButtonLabel: {
      fontSize: 32,
      color: '#fff',
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: '#007aff',
      fontSize: 15,
      color: '#007aff',
      },
      name: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
      },
      total: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
      },
      price: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
      },
      desc: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
      },
  });
  
  export default InventoryInputModel;