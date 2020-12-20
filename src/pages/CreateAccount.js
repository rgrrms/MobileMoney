import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, StyleSheet} from "react-native";
import api from "../services/api";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import { maskCPF } from "../utils/maskCPF";

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!name || !cpf || !pass || !email) {
      alert("Todos os campos são obrigatórios!");
    } else {
      try {
        const res = await api.post(`/createAccount`, {"name": name, "pass": pass, "cpf": cpf, "email": email});
        alert(`Usuário ${name} criado com sucesso!`)
        navigation.navigate('Login');
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  }

  async function handleChange(e) {
    const mask = maskCPF(e)
    setCpf(mask)
  }

  function handleReturn(e) {
    e.preventDefault();
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerCard}>
        <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={e => setName(e)}/>
        <TextInput style={styles.input} placeholder="CPF" value={cpf} minLength={14} maxLength={14} onChangeText={e => handleChange(e)}/>
        <TextInput style={styles.input} placeholder="Senha" value={pass} onChangeText={e => setPass(e)}/>
        <TextInput style={styles.input} placeholder="Email" value={email} keyboardType="email-address" onChangeText={e => setEmail(e)}/>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.text}>Criar</Text>
            <Icon name="account-plus-outline" size={38} color="#34cb79" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReturn}>
            <Text style={styles.text}>Voltar</Text>
            <Icon name="keyboard-return" size={38} color="#34cb79" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    padding: 10
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    fontSize: 22,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5,
    margin: 10,
    borderColor: '#34cb79',
    justifyContent: 'center'
  },
  text: {
    fontSize: 28,
    marginRight: 10,
  }
})

export default CreateAccount;