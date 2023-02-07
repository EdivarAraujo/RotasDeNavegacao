import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()

  //toda vez que for carregado a aplicação, vou verificar o localstorage, userToken, users_db
  //depois verifica se tem um token ou algum usuario, verificando se o usuario tem o mesmo email do que o token, se for o mesmo  vai setar para o setUser o ususario do banco
  useEffect(() => {
    const userToken = localStorage.getItem('user_token')
    const usersStorage = localStorage.getItem('users_db')

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        user => user.email === JSON.parse(userToken).email
      )
      if (hasUser) setUser(hasUser[0])
    }
  }, [])

  //função de signin - recebeno um email e senha, verifica se é o mesmo email, e senha , gerando um token para poder ter um controle, setando no localStorage com o userToken, pasando como stringfi o email e o token

  const signin = (email, password) => {
    //recebe os usuarios do bancos
    const usersStorage = JSON.parse(localStorage.getItem('users_db'))
    //faz um filto se ja existe algum email cadastrado com o que está esta entrando
    const hasUser = usersStorage?.filter(user => user.email === email)

    //se tiver usuario
    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2)
        localStorage.setItem('user_tokes', JSON.stringify({ email, token }))
        //seta para o user o email e senha
        setUser({ email, password })
        return
      } else {
        return 'E-mail ou senha incorretos'
      }
    } else {
      return 'Usuario não cadastrado'
    }
  }

  //função de cadastrar usuario

  const signup = (email, password) => {
    //verifica se tem um emnail como que esta tentando cadastrar,
    //caso tenha usario cadastrado vai retonar para o usuario que ja tem uma conta com esse email
    const usersStorage = JSON.parse(localStorage.getItem('users_db'))
    const hasUser = usersStorage?.filter(user => user.email === email)

    if (hasUser?.length) {
      return 'Já tem uma conta com esta E-mail'
    }
    let newUser

    //se ja tivr usucario no banco, so vai concatenar inserindo um novo item, pega todoa o usuario e coloca um novo, se for o primeiro vai ser um newuser
    if (usersStorage) {
      newUser = [...usersStorage, { email, password }]
    } else {
      newUser = [{ email, password }]
    }
    //seta o usuario cadastrado nouser db
    localStorage.setItem('users_db', JSON.stringify(newUser))

    return
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('users_token')
  }

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
