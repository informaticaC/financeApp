import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios"

const RegisterScreen = () => {
  const [userData, setuserData] = useState({
    firstname:"",
    username:"",
    phone:"",
    email:"",
    password:"",
    role:""
  })
  
  const navigation = useNavigation();
  

  const handleRegister = () => {
    const url ="http://localhost:8080/api/v1/users";
    axios.post(url, userData)
      .then(res => console.log(res.data))
      .catch(err=> console.log(err))
  };

  const handleInputChange = (key, value) => {
    setuserData({
      ...userData,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="firstname"
        onChangeText={(text) => handleInputChange('firstname', text)}
        value={userData.firstname}
      />
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={(text) => handleInputChange('username', text)}
        value={userData.username}
      />
      <TextInput
        style={styles.input}
        placeholder="phone"
        onChangeText={(text) => handleInputChange('phone', text)}
        value={userData.phone}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(text) => handleInputChange('email', text)}
        value={userData.email}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={(text) => handleInputChange('password', text)}
        value={userData.password}
      />
      <TextInput
        style={styles.input}
        placeholder="role"
        onChangeText={(text) => handleInputChange('role', text)}
        value={userData.role}
      />
     
      <Button title="Registrarse" onPress={handleRegister} />
      <View style={styles.loginOption}>
        <Text>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loginOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'none',
    marginLeft: 5,
  },
});

export default RegisterScreen;
