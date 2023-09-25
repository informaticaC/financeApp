import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import axios from "axios"

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigation = useNavigation();

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleLogin = () => {
    // lógica de inicio de sesión
    const url ="http://localhost:8080/api/v1/users/login"
    const { email, password } = formData;
    axios.post(url, {email, password})
     .then(res => console.log(res.data))
     .catch (err => console.log(err));
    console.log('Email:', email);
    console.log('Contraseña:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        onChangeText={(text) => handleInputChange('email', text)}
        value={formData.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={(text) => handleInputChange('password', text)}
        value={formData.password}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      </TouchableOpacity>
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <View style={styles.registerOption}>
        <Text>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerLink}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialLoginButtons}>
        <TouchableOpacity style={styles.socialLoginButton} onPress={() => alert('Iniciar sesión con Google')}>
          <View style={styles.socialLoginOption}>
            <Text style={styles.socialLoginText}>Continuar con </Text>
            <Icon name="google" size={20} style={styles.socialLoginIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton} onPress={() => alert('Iniciar sesión con Facebook')}>
          <View style={styles.socialLoginOption}>
            <Text style={styles.socialLoginText}>Continuar con </Text>
            <Icon name="facebook" size={20} style={styles.socialLoginIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton} onPress={() => alert('Iniciar sesión con Apple')}>
          <View style={styles.socialLoginOption}>
            <Text style={styles.socialLoginText}>Continuar con </Text>
            <Icon name="apple" size={20} style={styles.socialLoginIcon} />
          </View>
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
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'none',
    marginBottom: 20,
  },
  registerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: 'blue',
    textDecorationLine: 'none',
    marginLeft: 5,
  },
  socialLoginButtons: {
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
  },
  socialLoginButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  socialLoginText: {
    color: 'blue',
    textDecorationLine: 'none',
  },
  socialLoginOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialLoginIcon: {
    marginRight: 10,
  },
  socialLoginText: {
    fontSize: 18, 
  },
});

export default LoginScreen;
