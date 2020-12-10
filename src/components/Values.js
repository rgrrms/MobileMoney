import React from 'react';
import { Text, View, StyleSheet } from "react-native";

const Values = ({ titleValue, values }) => {
  return (
    <View style={styles.value}>
      <Text style={styles.valueText}>{titleValue}</Text>
      <Text>{values}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  value: {
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    marginBottom: 5,
    width: 120,
    alignItems: 'center'
  },
  valueText: {
    fontWeight: 'bold'
  }
});

export default Values;