import NavBar from "../components/NavBar/NavBar"

const Perfil = () => {
  return (
    <div>
      <NavBar />
      <h1>Perfil do usuario</h1>
      <div className="card">
        <img src="perfilp.png" alt="Ver perfil" />
        <ul className="profile-itens">
          <li>Meus dados pessoais</li>
          <li>Minhas trocas</li>
          <li>Lista de desejos</li>
          <li>Meus Itens</li>
          <li>Alterar senha</li>
          <li>Ajuda</li>
          <li>Sair</li>
        </ul>
      </div>
    </div>
  )
};

export default Perfil;
