import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Logo from '../assets/logo.png';

export default () => (
  <View style={styles.header}>
    <View style={styles.headerTitulo}>
      <Text style={styles.titulo}>Caminho </Text>
      <Text style={[styles.titulo, styles.tituloCerto]}>Certo</Text>
    </View>
    <Image source={Logo} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  headerTitulo: {
    flexDirection: 'row',
  },
  tituloCerto: {
    color: '#5cc4b6',
  },
  logo: {
    backgroundColor: '#ccffff',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});
