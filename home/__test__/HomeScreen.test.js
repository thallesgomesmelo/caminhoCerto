import React from 'react'
import HomeScreen from '../HomeScreen'
import BotaoCustomizado from '../BotaoCustomizado'
import renderer from 'react-test-renderer'

describe('<HomeScreen/>', () => {
    test('Ao clicar no botão SOS, o app deve navegar para a tela de Lista de contatos', async () =>{
        //Mock
        const navigationMock = {
            navigate : jest.fn()
        }
        const tree = renderer.create(
            <HomeScreen
                navigation={navigationMock}
            />
        )
        const [botaoSOS, botaoRegistro, botaoRastreio] = tree.root.findAllByType(BotaoCustomizado)
        await botaoSOS.props.acao()

        // expect(navigationMock.navigate).toHaveBeenCalled()
        expect(navigationMock.navigate).toHaveBeenCalledTimes(1)
        expect(navigationMock.navigate.mock.call[0][0]).toBe('lista-contatos')
    })
})