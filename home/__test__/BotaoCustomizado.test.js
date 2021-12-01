import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import BotaoCustomizado from '../BotaoCustomizado'
import renderer from 'react-test-renderer'
import { exportAllDeclaration } from '@babel/types'

describe('<BotaoCustomizado/>', () => {
    describe('Sucesso', () => {
        test('Ao passar "sos" para o botão customizado, ele eve exibir "SOS"', () => {
           const tree = renderer.create(
               <BotaoCustomizado titulo='sos'/>
           )
            const compomenteTexto = tree.root.findByType(Text)
            expect(compomenteTexto.props.children).toBe('SOS')
        })

        test('Ao passar a cor #aaaaaa, o compomente deve exibir a cor informada', () => {
            const tree = renderer.create(
                <BotaoCustomizado
                    titulo='sos'
                    cor='#aaaaaa'
                />
            )
            const compomenteTouchableOpacaity = tree.root.findByType(TouchableOpacity)
            // expect(compomenteTouchableOpacaity.props.style).toMatchObject([
            //     { 
            //         height: 70,
            //         backgroundColor: '#24cbaf',
            //         alignItems: 'center',
            //         justifyContent: 'center',
            //         borderRadius: 20,
            //         elevation: 3
            //     },
            //     { backgroundColor: '#aaaaaa' },
            //     { width: '100%' }
            // ])
            expect(compomenteTouchableOpacaity.props.style[1]).toMatchObject({ backgroundColor: '#aaaaaa' })
        })
    })
})