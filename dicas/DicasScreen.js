import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, Alert} from 'react-native'

import Constants from 'expo-constants'

import {getDicas} from './DicasAPI'

import HeaderSubTelas from '../contatosSOS/HeaderSubTelas'
import BotaoCustomizado from '../home/BotaoCustomizado' 
import * as Speech from 'expo-speech'

export default ({navigation, route}) => {
  const [indice, setIndice] = useState(0) //Metodo que retorna duas coisas, 1 variavel e 2 Metodo que altera o valor da variavel
  const [dicas, setDicas] = useState([])

  let dica

  if(dicas.length > 0 && indice < dicas.length) {
    dica = dicas[indice]
  } else if(dicas.length > 0 && indice >= dicas.length) {
    Alert.alert(
      'Dicas',
      'Não temos mais dicas para hoje. Deseja retornar para a tela inicial?',
      [
        {text: 'Não', onPress: () => setIndice(0)},
        {text: 'Sim', onPress: () => navigation.popToTop()}
      ]
    )
    dica = {}
  } else {
    dica = {}
  }

  useEffect(() => {
    carregarDicas()
  }, [])

  useEffect(() => {
    if(dicas.length > 0 && dicas.length > indice)
      Speech.speak(dicas[indice].textoDica)
  }, [dicas, indice])

  const carregarDicas = async () => {
    try {
      const resultado = await getDicas()
      setDicas(resultado)
    } catch(err) {
      alert('Falha ao tentar obter as dicas. Motivo: ' + err.message)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderSubTelas 
        titulo={`DICAS ${indice + 1} de ${dicas.length}`} 
        acao={() => navigation.goBack()} 
      />
      <View style={styles.main}>
        <Image 
          source={{uri: dica.imagemDica}}
          style={styles.imagem}
        />
        <Text style={styles.textoDica}>
        {dica.textoDica}
        </Text>
        <View style={styles.botoes}>
          <BotaoCustomizado
            titulo='SIM'
            width='40%'
            acao={() => setIndice(indice + 1)}
          />
          <BotaoCustomizado
            titulo='NÃO'
            width='40%'
            acao={() => setIndice(indice + 1)}
          />
        </View>
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
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-around'
  },
  imagem: {
    width: 300,
    height: 250
  },
  textoDica: {
    fontSize: 18,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})