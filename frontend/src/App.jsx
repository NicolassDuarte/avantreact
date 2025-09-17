import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from "./pages/Login/Login"
import Cadastro from "./pages/Cadastro/Cadastro"
import Perfil from "./pages/Perfil/Perfil"
import Home from "./pages/Home/Home"
import Populares from './pages/Populares'
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto"
import Item from "./pages/Item/Item"
import Produtos from "./pages/Produtos/Produtos";
import MinhasTrocas from "./pages/MinhasTrocas/MinhasTrocas";
import DadosPessoais from "./pages/DadosPessoais/DadosPessoais";
import EditarDados from "./pages/EditarDados/EditarDados";
import MeusItens from "./pages/MeusItens/MeusItens";
import EditarItem from './pages/EditarItem/EditarItem';
import 'bootstrap/dist/css/bootstrap.min.css'

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Componente para rotas públicas (apenas para não autenticados)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/cadastro" element={
            <PublicRoute>
              <Cadastro />
            </PublicRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } />
          <Route path="/populares" element={<Populares />} />
          <Route path="/cadastro-produto" element={
            <ProtectedRoute>
              <CadastroProduto />
            </ProtectedRoute>
          } />
          <Route path="/item" element={<Item />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/minhas-trocas" element={
            <ProtectedRoute>
              <MinhasTrocas />
            </ProtectedRoute>
          } />
          <Route path="/dados-pessoais" element={
            <ProtectedRoute>
              <DadosPessoais />
            </ProtectedRoute>
          } />
          <Route path="/editar-dados" element={
            <ProtectedRoute>
              <EditarDados />
            </ProtectedRoute>
          } />
          <Route path="/meus-itens" element={
            <ProtectedRoute>
              <MeusItens />
            </ProtectedRoute>
          } />

          <Route path="/editar-item/:id" element={
            <ProtectedRoute>
              <EditarItem />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;