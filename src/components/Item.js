import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ dataFinances, createOrEdit }) => {

  const navigation = useNavigation();

  const handleEdit = (id) => {
    console.log(`id ${id}`)
    navigation.navigate('CreateOrUpdateItem', {id, createOrEdit});
  }

  const handleDelete = async (id) => {
    const token = await AsyncStorage.getItem('token')

    api.delete(`/removeBalance/${id}`, {
      headers: {
        "x-access-token": token
      }}).then(r => {
        console.log(r);
    });
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

const styles = StyleSheet.create({
  containerRed: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
    justifyContent: 'space-between'
  },
  containerGreen: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#00ff00',
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
    justifyContent: 'space-between'
  },
  containerCard: {
    justifyContent: 'center'
  },
  day: {
    fontSize: 20,
    marginLeft: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  value: {
    fontWeight: 'bold'
  }
})

export default Item;