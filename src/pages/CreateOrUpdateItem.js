import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
import { RadioButton } from 'react-native-paper';
import {useNavigation, useRoute} from "@react-navigation/native";
import api from "../services/api";
import {MaterialCommunityIcons as Icon, FontAwesome as IconF} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { maskData, maskAmount } from "../utils/maskCPF";

const CreateOrUpdateItem = () => {
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [checked, setChecked] = React.useState('expense');

  const route = useRoute();

  const routeParams = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (routeParams.createOrEdit !== 'create') {
        try {
          api.get(`/oneFinance/${routeParams.id}`, {
            headers: {
              "x-access-token": token
            }}).then(response => {
            response.data.map(item => {
              setCategory(item.category);
              setDescription(item.description);
              setAmount(String(item.value));
              setDate(`${item.day}/${item.month}/${item.year}`);
              setChecked(item.type === '+' ? 'revenue' : 'expense');
            });
          });
        } catch (e) {
          alert(e.response.data.message)
        }
      }
    })
  }, [])

  async function handleCreateItem(e) {
    e.preventDefault();
    const token = await AsyncStorage.getItem('token')
    if (!category || !description || !amount || !date || !checked) {
      alert("Todos os campos são obrigatórios!");
    }
    else {
      let amountNumber = amount.split(' ')[1];
      amountNumber = amountNumber.replace('.','');
      amountNumber = Number(amountNumber.replace(',','.'));
      if (routeParams.createOrEdit === 'create') {
        try {
          await api.post(`/createBalance`, {
            "description": description,
            "value": amount,
            "valueInNumber": amountNumber,
            "category": category,
            "year": date.split('/')[2],
            "month": date.split('/')[1],
            "day": date.split('/')[0],
            "yearMonth": `${date.split('/')[2]}-${date.split('/')[1]}`,
            "yearMonthDay": `${date.split('/')[2]}-${date.split('/')[1]}-${date.split('/', 1)}`,
            "type": checked === 'expense' ? '-' : '+'
          }, {
            headers: {
              "x-access-token": token
            }
          }).then(response => {
            alert("Dados salvos com sucesso!");
            navigation.navigate('TimeLine');
          });
        } catch (e) {
          alert(e.response.data.message)
        }
      }
      else {
        try {
          await api.put(`/updateBalance/${routeParams.id}`, {
            "description": description,
            "value": amount,
            "valueInNumber": amountNumber,
            "category": category,
            "year": date.split('/')[2],
            "month": date.split('/')[1],
            "day": date.split('/')[0],
            "yearMonth": `${date.split('/')[2]}-${date.split('/')[1]}`,
            "yearMonthDay": `${date.split('/')[2]}-${date.split('/')[1]}-${date.split('/', 1)}`,
            "type": checked === 'expense' ? '-' : '+'
          }, {
            headers: {
              "x-access-token": token
            }
          }).then(response => {
            alert("Dados salvos com sucesso!");
            navigation.navigate('TimeLine');
          });
        } catch (e) {
          alert(e.response.data.message)
        }
      }
    }
  }

  function handleChangeData(value) {
    const mask = maskData(value);
    setDate(mask);
  }

  function handleChangeAmount(value) {
    const mask = maskAmount(value);
    setAmount(mask);
  }

  function handleReturn(e) {
    e.preventDefault();
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Categoria" maxLength={15} value={category} onChangeText={e => setCategory(e)}/>
        <TextInput style={styles.input} placeholder="Descrição" maxLength={40} value={description} onChangeText={e => setDescription(e)}/>
        <TextInput style={styles.input} placeholder="Valor" maxLength={15} value={amount} onChangeText={e => handleChangeAmount(e)}/>
        <TextInput style={styles.input} placeholder="Data(DD/MM/AAAA)" minLength={10} maxLength={10} value={date} onChangeText={e => handleChangeData(e)}/>
        <View style={styles.row}>
          <View style={styles.row}>
            <RadioButton
              value="expense"
              status={ checked === 'expense' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('expense')}
            />
            <Text style={styles.textRadio}>Despesa</Text>
          </View>
          <View style={styles.row}>
            <RadioButton
              value="revenue"
              status={ checked === 'revenue' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('revenue')}
            />
            <Text style={styles.textRadio}>Receita</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleCreateItem}>
            <Text style={styles.text}>Salvar</Text>
            <IconF name="save" size={38} color="#34cb79" />
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
    padding: 10
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textRadio: {
    marginTop: 8
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

export default CreateOrUpdateItem;