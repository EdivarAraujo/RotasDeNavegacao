import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as C from './styles'

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Signin = () => {
  const { signin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  //verifica se email e senha estãom preenchids se não vai setar para prencher os campos
  const handleLogin = () => {
    if (!email | !senha) {
      setError('Preencha todos os campos')
      return
    }
    // ja se estiver tudo preencido verifica se email e senhas estão corretos , se tiver algum problema pra no erro, se não vai para a home
    const res = signin(email, senha)

    if (res) {
      setError(res)
      return
    }
    navigate('/home')
  }

  return (
    <C.Container>
      <C.Label>Sistema de login</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Dijite seu E-mail"
          value={email}
          onChange={e => [setEmail(e.target.value), setError('')]}
        />
        <Input
          type="password"
          placeholder="Dijite sua Senha"
          value={senha}
          onChange={e => [setSenha(e.target.value), setError('')]}
        />
        <C.LabelError>{error}</C.LabelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  )
}

export default Signin
