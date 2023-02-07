import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import useAuth from '../hooks/useAuth'
//so acessa a tela de home se estiver logando na aplicação, se tiver logado vai retornar o item que foi passado, se não vai para a tela de login
const Private = ({ Item }) => {
  const { signed } = useAuth()

  return signed > 0 ? <Item /> : <Signin />
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

export default RoutesApp
