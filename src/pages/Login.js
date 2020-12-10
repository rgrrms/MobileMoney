import React, { useState } from 'react';
import {Text, View, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image} from "react-native";
import {AntDesign as Icon, MaterialCommunityIcons as IconM} from "@expo/vector-icons";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import {TextInput} from "react-native";

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [pass, setPass] = useState('');

  const navigation = useNavigation();

  async function handleLogin(e) {
    e.preventDefault();
    if (cpf && pass) {
      const response = await api.post("login",{ "cpf": cpf, "pass": pass });
      navigation.navigate('TimeLine', response.data);
    }
  }

  async function handleCreateUser() {
    navigation.navigate('CreateAccount');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../assets/logoMM.png')} />
      <TextInput style={styles.input} placeholder="CPF" placeholderTextColor="#fff" value={cpf} onChangeText={e => setCpf(e)}/>
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#fff" value={pass} secureTextEntry={true}  onChangeText={e => setPass(e)}/>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.text}>Login</Text>
        <Icon style={styles.icon} name="login" size={32} color="#34cb79" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateUser} style={styles.button}>
        <Text style={styles.text}>Criar Conta!</Text>
        <IconM name="account-plus-outline" size={38} color="#34cb79" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192537',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },
  image: {
    marginBottom: 10
  },
  input: {
    fontSize: 28,
    color: '#fff',
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
    width: 210
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5,
    margin: 10,
    borderColor: '#34cb79',
    width: 210,
    justifyContent: 'center'
  },
  text: {
    fontSize: 28,
    color: '#fff',
    marginRight: 10,
  },
  icon: {
    paddingTop: 5
  }
});

export default Login;