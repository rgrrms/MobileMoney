import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Header = ({ createOrEdit }) => {
  const navigation = useNavigation();

  async function handleNavigateToCreate() {
    navigation.navigate('CreateOrUpdateItem', { createOrEdit });
  }

  return (
      <TouchableOpacity onPress={handleNavigateToCreate}>
        <Icon style={styles.icon} name="add" size={32} color="#34cb79" />
      </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 5
  }
})

export default Header;