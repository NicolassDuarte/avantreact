import { Router } from 'react-router-dom'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import Cadastro from "./pages/Cadastro/Cadastro"
import Perfil from "./pages/Perfil/Perfil"
import Anuncios from "./pages/Anuncios"
import Home from "./pages/Home/Home"
import Populares from './pages/Populares'
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto"
import Item from "./pages/Item/Item"
import Produtos from "./pages/Produtos/Produtos";
import MinhasTrocas from "./pages/MinhasTrocas/MinhasTrocas";
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        {/* <Route path="/anuncios" element={<Anuncios />} /> */}
        <Route path="/populares" element={<Populares />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/minhas-trocas" element={<MinhasTrocas />} />
      </Routes>
    </BrowserRouter>
    // {/* <Sessionnav/>
    // <section className='card-troca'></section>
    // <section className='card-sobre'></section>
    // <section className='card-rotation'></section>
    // <section className='card-comentarios'></section>
    // <Footer/> */}

  )
}

export default App;
