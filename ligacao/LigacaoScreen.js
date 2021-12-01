import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import Constants from 'expo-constants'

import HeaderSubTelas from '../contatosSOS/HeaderSubTelas'
import BotaoCustomizado from '../home/BotaoCustomizado'

import { FontAwesome5 } from '@expo/vector-icons';

import * as Linking from 'expo-linking';

export default ({navigation, route}) => {
  const {titulo, contato} = route.params
  const [localizacao, setLocalizacao] = useState()

  
  useEffect(() => {
    console.log('UseEffect executou')
    obterLocalizacao()
  }, [])

  const obterLocalizacao = async () => {
    try{
      console.log('Executou obterLocalizacao')
      const {status} = await Location.requestForegroundPermissionsAsync()
      console.log(status)
      if(status !== 'granted') {
        alert('Você precisa habilitar o serviço de localização do seu celular')
      } else {
        const data = await Location.getCurrentPositionAsync()

        console.log('Latitude:', data.coords.latitude)
        console.log('Longitude:', data.coords.longitude)
        console.log('Heading:', data.coords.heading)
        console.log('Speed:', data.coords.speed)

        setLocalizacao({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        })
      }
    }catch(err) {
      console.log('Erro:', err.message)
    }
  }

  const enviarLocalizacao = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync()

    if(status != 'granted') {
      alert('Você precisa habilitar o serviço de localização do seu celular')
    } else {
      const data = await Location.getCurrentPositionAsync()

      const msg = `${contato.nome} preciso da sua ajuda URGENTE. Estou neste local https://www.google.com.br/maps/@${data.coords.latitude},${data.coords.longitude},15z`

      Linking.openURL(`whatsapp://send?text=${msg}&phone=+55${contato.telefone}`)
    }

  }

  return(
    <View style={styles.viewMain}>
      <HeaderSubTelas
        titulo={`${contato.tipo} ${contato.nome}`}
        acao={() => navigation.goBack()}
      />
      <View style={styles.mapa}>
        <MapView 
          style={styles.mapaView} 
          initialRegion={localizacao}
        >
          {
            localizacao &&  
              <Marker 
                coordinate={localizacao}
                title='Você está aqui!'
                description='Tente ligar para o contato SOS, ou enviar sua localização.'
              >
                <FontAwesome5 name="car-side" size={32} color="black" />
              </Marker>
          }
        </MapView>
      </View>
      <View style={styles.botoes}>
        <BotaoCustomizado 
          titulo={`Discar ${contato.telefone}`}
          cor='red'
          acao={() => Linking.openURL(`tel:${contato.telefone}`)}
        />
        <BotaoCustomizado 
          titulo='ENVIAR LOCALIZAÇÃO'
          acao={enviarLocalizacao}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  mapa: {
    flex: 1
  },
  mapaView: {
    width: '100%',
    height: '100%',
  },
  botoes: {
    padding: 10,
    height: 220,
    justifyContent: 'space-evenly'
  }
})