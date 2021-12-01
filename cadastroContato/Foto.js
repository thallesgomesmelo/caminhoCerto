import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { Camera } from 'expo-camera';

import { ActivityIndicator, Colors } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';

export default ({setImagem}) => {
  const [permissao, setPermissao] = useState(null)
  const [tipo, setTipo] = useState(Camera.Constants.Type.front)
  const camera = useRef()

  useEffect(() => {
    obterPermissaoCamera()
  }, [])

  const obterPermissaoCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    setPermissao(status)
  }

  if(permissao === null)
    return <ActivityIndicator animating={true} color={Colors.blue400} />

  if(permissao !== 'granted')
    return <Text>É necessária a permissão para acesso a camera</Text>

  const reverterCamera = () => {
    if(tipo === Camera.Constants.Type.front)
      setTipo(Camera.Constants.Type.back)
    else  
      setTipo(Camera.Constants.Type.front)
  }

  const tirarFoto = async () => {
    if(camera) {
      const data = await camera.current.takePictureAsync({quality: 0.1, base64: true})
      //console.log('Tamanho da foto é: ', data.base64.length)
      setImagem('data:image/jpg;base64,' + data.base64)
    }
  }

  return (
    <Camera
      style={styles.camera}
      type={tipo}
      ref={camera}
    >
      <View style={styles.botoesCamera}>
        <TouchableOpacity
          onPress={reverterCamera}
        >
          <Ionicons name="ios-camera-reverse" size={46} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={tirarFoto}
        >
          <Ionicons name="ios-camera" size={46} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: 400
  },
  botoesCamera: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end'
  }
})