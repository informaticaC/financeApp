import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SmsAndroid from 'react-native-sms';

const ForgotPasswordScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    // Genera un OTP aleatorio (puedes implementar tu lógica)
    const otp = generateRandomOtp();

    // Número de teléfono al que se enviará el SMS
    const recipient = phoneNumber;

    // Cuerpo del mensaje SMS
    const message = `Tu OTP es: ${otp}. Por favor, no compartas este código.`;

    // Envía el mensaje SMS
    SmsAndroid.autoSend(
      recipient,
      message,
      (fail) => {
        console.error('Error al enviar SMS:', fail);
      },
      (success) => {
        console.log('SMS enviado con éxito:', success);
        setOtpSent(true); // Marca como verdadero cuando se ha enviado el OTP
      }
    );
  };

  // Función para generar un OTP aleatorio (puedes implementar tu lógica)
  const generateRandomOtp = () => {
    // Genera un número aleatorio de 6 dígitos
    return Math.floor(100000 + Math.random() * 900000).toString();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olvidé mi Contraseña</Text>
      {otpSent ? (
        <>
          <Text style={styles.description}>
            Se ha enviado un OTP (One-Time Password) a tu número de teléfono.
            Por favor, ingrésalo a continuación.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            onChangeText={(text) => setOtp(text)}
            value={otp}
          />
          <Button title="Restablecer Contraseña" onPress={handleResetPassword} />
        </>
      ) : (
        <>
          <Text style={styles.description}>
            Por favor, ingresa tu número de teléfono y te enviaremos un OTP para restablecer tu contraseña.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Número de Teléfono"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
          <Button title="Enviar OTP por SMS" onPress={handleSendOtp} />
        </>
      )}
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
  description: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default ForgotPasswordScreen;
