import React, { useState } from 'react';
import {Text, View, TouchableOpacity, SafeAreaView, TextInput} from "react-native";
import {AntDesign as Icon, MaterialCommunityIcons as IconM} from "@expo/vector-icons";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { maskCPF } from "../utils/maskCPF";
import EStyleSheet from 'react-native-extended-stylesheet';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [pass, setPass] = useState('');

  const navigation = useNavigation();
  async function handleLogin(e) {
    e.preventDefault();
    if (cpf && pass) {
      try {
        const response = await api.post("login",{ "cpf": cpf, "pass": pass });
        AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('TimeLine', response.data);
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  }

  async function handleChange(e) {
    const mask = maskCPF(e)
    setCpf(mask)
  }

  async function handleCreateUser() {
    navigation.navigate('CreateAccount');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lineIcon}>
        <Text style={styles.line}/>
        <View style={styles.viewIcon}>
          <Foundation name="dollar" size={28} color="#34CB79" />
        </View>
        <Text style={styles.line}/>
      </View>
      <Text style={styles.titleApp}>MobileMoney</Text>
      <Text style={styles.slogan}>G E R E N C I E   E   C O N Q U I S T E !</Text>
      {/*<Input placeholder="CPF" />*/}
      <TextInput style={styles.input} placeholder="CPF" placeholderTextColor="#fff" value={cpf} minLength={14} maxLength={14} onChangeText={e => handleChange(e)}/>
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

EStyleSheet.build({
  $rem: 16,
});

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192537',
    paddingLeft: '1.2rem',
    paddingRight: '1.2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: '1.75rem',
    color: '#fff',
    margin: '0.62rem',
    borderBottomWidth: 1,
    borderColor: '#fff',
    width: '14rem',
    height: '3rem',
  },
  button: {
    borderWidth: 1,
    borderRadius: '0.62rem',
    flexDirection: 'row',
    padding: '0.3rem',
    margin: '0.62rem',
    borderColor: '#34cb79',
    width: '14rem',
    justifyContent: 'center'
  },
  text: {
    fontSize: '1.75rem',
    color: '#fff',
    marginRight: '0.62rem',
  },
  icon: {
    paddingTop: '0.3rem',
  },
  titleApp: {
    fontFamily: 'Cinzel_700Bold',
    color: '#fff',
    fontSize: '2.3rem'
  },
  slogan: {
    fontFamily: 'JosefinSans_400Regular',
    color: '#34CB79',
    fontSize: '0.9rem',
    marginBottom: '0.8rem',
  },
  line: {
    borderBottomWidth: 2,
    borderColor: '#34CB79',
    width: '7.0rem',
    marginBottom: '0.5rem'
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    borderRadius: '1rem',
    borderWidth: 2,
    borderColor: '#34CB79',
    marginRight: '0.62rem',
    marginLeft: '0.62rem',
  },
  lineIcon: {
    flexDirection: 'row',
  }
});

export default Login;
