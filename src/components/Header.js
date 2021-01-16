import React from 'react';
import { TouchableOpacity } from "react-native";
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import EStyleSheet from 'react-native-extended-stylesheet';

const Header = ({ createOrEdit }) => {
  const navigation = useNavigation();

  async function handleNavigateToCreate() {
    navigation.navigate('CreateOrUpdateItem', { createOrEdit });
  }

  return (
      <TouchableOpacity onPress={handleNavigateToCreate}>
        <Icon style={styles.icon} name="add" size={42} color="#34cb79" />
      </TouchableOpacity>

  );
}

const styles = EStyleSheet.create({
  icon: {
    padding: '0.3rem'
  }
})

export default Header;
