import { Router } from 'react-router-dom'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Perfil from "./pages/Perfil"
import Anuncios from "./pages/Anuncios"
import Home from "./pages/Home"
import Populares from './pages/Populares'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/perfil" element={<Perfil />}/>
          <Route path="/anuncios" element={<Anuncios />}/>
          <Route path="/populares" element={<Populares />}/>
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
