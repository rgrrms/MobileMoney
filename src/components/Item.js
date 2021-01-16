import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EStyleSheet from 'react-native-extended-stylesheet';

const Item = ({ dataFinances, createOrEdit, functionReloadDeleted }) => {

  const navigation = useNavigation();

  const handleEdit = (id) => {
    navigation.navigate('CreateOrUpdateItem', {id, createOrEdit});
  }

  const handleDelete = async (id) => {
    const token = await AsyncStorage.getItem('token')
    try {
      api.delete(`/removeBalance/${id}`, {
        headers: {
          "x-access-token": token
        }}).then(r => {
        alert(r.data.message);
        functionReloadDeleted();
      });
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <View style={dataFinances.type === '+' ? styles.containerGreen : styles.containerRed} key={dataFinances._id}>
      <View style={styles.containerCard}>
        <Text style={styles.day}>{dataFinances.day}</Text>
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{dataFinances.category}</Text>
        <Text style={styles.description}>{dataFinances.description}</Text>
      </View>
      <View style={styles.containerCard}>
        <Text style={styles.value}>{dataFinances.value}</Text>
      </View>
      <View style={styles.containerCard}>
        <TouchableOpacity onPress={() => handleEdit(dataFinances._id)}>
          <Icon name="edit" size={32} color="#34cb79" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerCard}>
        <TouchableOpacity  onPress={() => handleDelete(dataFinances._id)}>
          <Icon name="delete" size={32} color="#34cb79" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  containerRed: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: '0.62rem',
    marginBottom: '0.3rem',
    padding: '0.3rem',
    justifyContent: 'space-between'
  },
  containerGreen: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#00ff00',
    borderRadius: '0.62rem',
    marginBottom: '0.3rem',
    padding: '0.3rem',
    justifyContent: 'space-between'
  },
  containerInfo: {
    maxWidth: '5rem'
  },
  containerCard: {
    justifyContent: 'center',
  },
  day: {
    fontSize: '1.5rem',
    marginLeft: '0.2rem',
    marginRight: '0.2rem',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  value: {
    fontWeight: 'bold'
  }
})

export default Item;
