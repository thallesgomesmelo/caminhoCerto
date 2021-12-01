import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

export default ({ titulo, acao }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={acao}>
      <Ionicons name="ios-arrow-back" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerTitulo}>{titulo}</Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#24cbaf',
    padding: 10,
  },
  headerTitulo: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1, //Esta deixando mais responsivel o titulo, fazendo com que ele use todo espaço disponivel
    color: 'white',
  },
})