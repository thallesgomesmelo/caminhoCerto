import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default ({acao}) => (
  <TouchableOpacity
    onPress={acao}
    style={styles.floatButton}
  >
    <AntDesign name="adduser" size={24} color="white" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  floatButton: {
    backgroundColor: '#24cbaf',
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    right: 20,
    bottom: 40,
    elevation: 10 
  }
})