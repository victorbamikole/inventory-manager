import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';  
import AsyncStorage from '@react-native-async-storage/async-storage';


interface LoginProps {
  onLoginSuccess: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return undefined;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return undefined;
  };

  const handleChange = (name: keyof LoginFormValues, value: string) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    const userEmail  = {email: values.email};


    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      
      await AsyncStorage.setItem('email', JSON.stringify(userEmail));
      onSubmit(values);
    }
  };

  return (
    <View style={styles.container}>
             <Text style = {styles.text}> Login to Inventory Manager </Text>
      
      <TextInput style={styles.input}
        placeholder="Email"
        value={values.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
      <TextInput style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={values.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
         <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    padding: 10,
  },
  input: {
   width: "90%",
    height: 40,
    margin: 12,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginForm;
