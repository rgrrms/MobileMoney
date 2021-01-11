import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity,ScrollView, TextInput, SafeAreaView, KeyboardAvoidingView} from "react-native";
import api from "../services/api";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import { maskCPF } from "../utils/maskCPF";
import EStyleSheet from 'react-native-extended-stylesheet';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirmed, setPassConfirmed] = useState('');
  const [email, setEmail] = useState('');
  const [errorCpf, setErrorCpf] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [errorPassConfirmed, setErrorPassConfirmed] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (pass !== passConfirmed) {
      setErrorPassConfirmed('As senhas não coincidem!');
    } else {
      setErrorPassConfirmed('');
    }

    if (pass.length >= 1 && pass.length < 6) {
      setErrorPass('A senha deve possuir no mínimo 6 caracteres!');
    } else {
      setErrorPass('');
    }

    if (cpf.length >= 1 && cpf.length !== 14) {
      setErrorCpf('O CPF deve ter 11 dígitos');
    }  else {
      setErrorCpf('');
    }
  }, [cpf, pass, passConfirmed])

  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!name || !cpf  || !email || !pass || !passConfirmed) {
      alert("Todos os campos são obrigatórios!");
    } else {
      if (cpf.length !== 14) {
        alert("Verifique seu CPF e tente novamente!");
      } else {
        if (pass.length < 6) {
          alert("A senha deve possuir no mínimo 6 caracteres!");
        } else {
          if (pass !== passConfirmed) {
            alert("A senha de confirmação deve ser igual!")
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
      <ScrollView>
        <View style={styles.containerCard}>
          <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={e => setName(e)}/>
          <TextInput style={styles.input} placeholder="CPF" value={cpf} minLength={14} maxLength={14} onChangeText={e => handleChange(e)}/>
          <Text style={styles.error}>{errorCpf}</Text>
          <TextInput style={styles.input} placeholder="Email" value={email} keyboardType="email-address" onChangeText={e => setEmail(e)}/>
          <TextInput style={styles.input} placeholder="Senha" minLength={6} secureTextEntry={true} value={pass} onChangeText={e => setPass(e)}/>
          <Text style={styles.error}>{errorPass}</Text>
          <TextInput style={styles.input} placeholder="Confirmar Senha" minLength={6} secureTextEntry={true} value={passConfirmed} onChangeText={e => setPassConfirmed(e)}/>
          <Text style={styles.error}>{errorPassConfirmed}</Text>
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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    padding: '0.8rem'
  },
  input: {
    borderBottomWidth: 1,
    marginTop: '1rem',
    marginBottom: '0.2rem',
    height: '3rem',
    fontSize: '2rem'
  },
  error: {
    fontSize: '0.85rem',
    color: '#f00'
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1rem'
  },
  button: {
    borderWidth: 1,
    borderRadius: '0.62rem',
    flexDirection: 'row',
    padding: '0.3rem',
    margin: '0.62rem',
    borderColor: '#34cb79',
    justifyContent: 'center'
  },
  text: {
    fontSize: '1.75rem',
    marginRight: '0.62rem',
  }
})

export default CreateAccount;
