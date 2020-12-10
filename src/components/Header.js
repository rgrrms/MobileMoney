import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView} from "react-native";
import Constants from "expo-constants";
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

const Header = ({stateButton, tokenParams, createOrEdit}) => {
  const navigation = useNavigation();

  function handleNavigateToCreate() {
    navigation.navigate('CreateOrUpdateItem', {tokenParams, createOrEdit});
  }

  return (
    <View style={styles.container}>
      <Image style={styles.title} source={require('../assets/logoMM.png')} />
      {stateButton == false &&
      <TouchableOpacity onPress={handleNavigateToCreate} disabled={stateButton}>
        <Icon style={styles.icon} name="add" size={32} color="#34cb79" />
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#192537',
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 65,
  },
  title: {
    height: 40,
    resizeMode: 'cover',
  },
  icon: {
    padding: 5
  }
})

export default Header;