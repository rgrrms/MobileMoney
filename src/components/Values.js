import React from 'react';
import { Text, View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

const Values = ({ titleValue, values }) => {
  return (
    <View style={styles.value}>
      <Text style={styles.valueText}>{titleValue}</Text>
      <Text>{values}</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  value: {
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    padding: '0.2rem',
    marginBottom: '0.2rem',
    width: '7rem',
    alignItems: 'center'
  },
  valueText: {
    fontWeight: 'bold',
  }
});

export default Values;
