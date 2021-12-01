import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Constants from 'expo-constants';

import HeaderSubTelas from './HeaderSubTelas'
import CardContato from './CardContato'
import FloatButton from './FloatButton'
import fotoFilha from '../assets/filha.png'

const listaContatos = [
  { nome: 'LARISSA', tipo: 'FILHA', telefone: '(31) 9 9999 9999' },
  { nome: 'KAMILA', tipo: 'FILHA', telefone: '(31) 9 9999 9999' },
  { nome: 'ANA CLARA', tipo: 'FILHA', telefone: '(31) 9 9999 9999' },
  { nome: 'ANA LUISA', tipo: 'FILHA', telefone: '(31) 9 9999 9999' },
  { nome: 'NATALIA', tipo: 'FILHA', telefone: '(31) 9 9999 9999' },
];
//FlatList esta renderesando a lista pra fazer o app ficar mais peformatico
export default ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <HeaderSubTelas 
        titulo="Contatos SOS" 
        acao={() => navigation.goBack()}
      />
      <FlatList
        data={listaContatos}
        renderItem={({item}) =>
          <TouchableOpacity
            onPress={() => navigation.navigate('ligacao-sos', {contato: item})}
          >
            <CardContato
              foto={fotoFilha}
              tipo={item.tipo}
              nome={item.nome}
              telefone={item.telefone}
            />
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => index}
      />

      <FloatButton 
        acao={() => navigation.navigate('cadastroContatos')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
