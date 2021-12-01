import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput,Avatar } from 'react-native-paper'

import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderSubTelas from '../contatosSOS/HeaderSubTelas'
import Foto from './Foto'

export default ({navigation, route}) => {
  const [imagem, setImagem] = useState()
  const [tipo, setTipo] = useState('')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')

  const acaoSalvar = async () => {
    const contato = {
      nome,
      tipo,
      telefone,
      imagem
    }

    try {
      const listaContatos = await AsyncStorage  
                                        .getItem('@contatos')
                                        .then(JSON.parse) || []
      console.log('listaContatos ', listaContatos)
      listaContatos.push(contato)

      await AsyncStorage.setItem('@contatos', JSON.stringify(listaContatos))
      alert('Contato cadastrado com sucesso!')
      navigation.goBack()
    } catch(err) {
      alert('Falha ao tentar cadastrar o contato!')
    }
  }

  return(
    <View style={styles.container}>
      <HeaderSubTelas 
          titulo='Cadastro de contatos'
          acao={() => navigation.goBack()}
      />
      <View style={styles.inputs}>
        {
          imagem 
            ? <Avatar.Image size={124} source={{uri: imagem}} />
            : <Foto setImagem={setImagem} />
        }
                
        <TextInput
          label='INFORME O TIPO'
          mode='outlined'
          placeholder='FILHA'
          onChangeText={text => setTipo(text)}
        />

        <TextInput
          label='INFORME O NOME'
          mode='outlined'
          placeholder='JOÃO DA SILVA'
          onChangeText={text => setNome(text)}
        />

        <TextInput
          label='INFORME O TELEFONE'
          mode='outlined'
          placeholder='(31) 99999-9999'
          keyboardType='phone-pad'
          onChangeText={text => setTelefone(text)}
        />
      </View>
      <Button
        mode='contained'
        onPress={acaoSalvar}
      >
        SALVAR CONTATO
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,

  },
  inputs: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-around'    
  }
})