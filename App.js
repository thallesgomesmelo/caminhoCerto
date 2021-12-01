import React, {useEffect, useRef} from 'react'
import {View} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import HomeScreen from './home/HomeScreen'
import ListaContatosScreen from './contatosSOS/ListaContatosScreen'
import LigarScreen from './ligacao/LigacaoScreen'
import RastreioScreen from './rastreio/RastreioScreen'
import DicasScreen from './dicas/DicasScreen'
import CadastroContatoScreen from './cadastroContato/CadastroContatosScreen'
import RegistroScreen from './registro/RegistroScreen'

import * as Notifications from 'expo-notifications'

const Stack = createNativeStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default () => {
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registrarPushNotification()

    notificationListener.current = Notifications
      .addNotificationReceivedListener((notification) => {
        console.log('Notificação recebida')
        console.log(JSON.stringify(notification))

        alert(notification.request.content.data.msg)
      })

    responseListener.current = Notifications
      .addNotificationResponseReceivedListener((response) => {
        console.log('Notificação respondida ')
        console.log(JSON.stringify(response))
      })
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }) 

  const registrarPushNotification = async () => {
    const {status} = await Notifications.getPermissionsAsync()

    if(status !== 'granted'){
      const {finalStatus} = await Notifications.requestPermissionsAsync()

      if(finalStatus !== 'granted') {
        alert('È necessário a permissão de notificações para saber mais informações.')
        return;
      }
    }

    const data = await Notifications.getExpoPushTokenAsync()
    console.log('Data: ', data)
    console.log('Token: ', data.token)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' screenOptions={{headerShown: false}}>
        <Stack.Screen name='home' component={HomeScreen}/>
        <Stack.Screen name='lista-contatos' component={ListaContatosScreen} />
        <Stack.Screen name='ligacao-sos' component={LigarScreen}
          initialParams={{titulo: 'Ligar para contato SOS'}}
        />
        <Stack.Screen name='rastreio' component={RastreioScreen} />
        <Stack.Screen name='dicas' component={DicasScreen} />
        <Stack.Screen name='cadastroContatos' component={CadastroContatoScreen} />
        <Stack.Screen name='registro' component={RegistroScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}