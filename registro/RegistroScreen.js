import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Constants from 'expo-constants'

import QRCode from 'react-native-qrcode-svg'

export default () => {
  return(
    <View style={styles.container}>
      <Text>Tela de Registro</Text>
      <QRCode 
        value='Teste'
        size={200}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
})