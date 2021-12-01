import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import Constants from 'expo-constants';

import Header from './Header';
import BotaoCustomizado from './BotaoCustomizado';

export default ({navigation, route}) => {
  
  useEffect(() => {
    console.log('Tela home iniciada')
  }, [])

  return (
    <View style={styles.viewMain}>
      <Header/>
      <View style={styles.menu}>
        <BotaoCustomizado 
          titulo="SOS" 
          cor="red" 
          acao={() => navigation.navigate('lista-contatos')} 
        />
        <BotaoCustomizado 
          titulo="Registro" 
          acao={() => navigation.navigate('registro')}
        />
        <BotaoCustomizado 
          titulo="Rastreio" 
          acao={() => navigation.navigate('rastreio')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewMain: {
    marginTop: Constants.statusBarHeight,
    flex: 1, //Aqui fala que esta usando todo o espaço disponivel, usou nos botões tambem
  },
  menu: {
    //Flex esta ocupando 100% da tela disponivel, esta fazendo isso pra separar os botões
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
  },
});
