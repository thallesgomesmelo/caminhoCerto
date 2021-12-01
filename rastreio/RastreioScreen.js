import React,  {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'

import Constants from 'expo-constants'

import HeaderSubTelas from '../contatosSOS/HeaderSubTelas'
import Texto from './Texto'
import BotaoCustomizado from '../home/BotaoCustomizado'

import * as Speech from 'expo-speech'

const texto1 = 'O rastreio é composto de várias perguntas sobre diferentes fatores de risco.'

const texto2 = 'Sempre que sua resposta apresentar um fator de risco recebera uma orientação em vídeo.'

export default ({navigation, route}) => {
  
  useEffect(() => {
    Speech.speak(texto1)
    Speech.speak(texto2)
  })

  return(
    <View style={styles.container}>
      <HeaderSubTelas
        titulo='RASTREIO'
        acao={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <Texto
          texto={texto1}
        />

        <Texto
          texto={texto2}
          cor='#1c9984'
        />
      </View>
      <View style={styles.botao}>
        <BotaoCustomizado 
          titulo='CONTINUAR'
          acao={() => navigation.navigate('dicas')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  main: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 30
  },
  botao: {
    padding: 30
  }
})