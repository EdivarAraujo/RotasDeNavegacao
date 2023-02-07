import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as C from './styles'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [emailConf, setEmailConf] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { signup } = useAuth()

  //verifca se os tres campos tem infomações, se não pede para preencher todos
  //verifica se o email é diferento do email de confirmação
  //se tiver tudo certo vai fazer o signup
  // se tiver algum problema vai cair no erro, retornando
  // se tiver tudo certo exibe que foi cadsstrado com sucesso e vai para p signin
  const handleSignup = () => {
    if (!email | !emailConf | !senha) {
      setError('Preencha todos os campos')
      return
    } else if (email !== emailConf) {
      setError('Os e-mails não são iguais')
      return
    }
    const res = signup(email, senha)

    if (res) {
      setError(res)
      return
    }

    alert('Usuário cadastrado com sucesso!')
    navigate('/')
  }

  return (
    <C.Container>
      <C.Label>Sistema de Login</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Dijite seu E-mail"
          value={email}
          onChange={e => [setEmail(e.target.value), setError('')]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={e => [setEmailConf(e.target.value), setError('')]}
        />
        <Input
          type="password"
          placeholder="Dijite sua Senha"
          value={senha}
          onChange={e => [setSenha(e.target.value), setError('')]}
        />
        <C.LabelError>{error}</C.LabelError>
        <Button Text="Cadastra-se" onClick={handleSignup} />
        <C.LabelSignin>
          Não tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  )
}

export default Signup
