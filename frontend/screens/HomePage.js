import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {

  const navigation = useNavigation();
    
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¡Bienvenido a Finanza Personal!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
          // Aquí puedes navegar a la pantalla de inicio de sesión
          
       >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}
          // Aquí puedes navegar a la pantalla de registro
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#007bff', // Color de fondo
      borderRadius: 5, // Bordes redondeados
      padding: 10, // Relleno interno
      marginTop: 10, // Margen superior
      width: '80%', // Ancho del botón
      alignItems: 'center', // Alinear contenido al centro horizontalmente
    },
    buttonText: {
      color: '#fff', // Color del texto
      fontSize: 16, // Tamaño de fuente
      fontWeight: 'bold', // Peso de fuente en negrita
    },
  });




export default HomePage;
