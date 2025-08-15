import NavBar from "../components/NavBar/NavBar"
import "./Perfil.css"
import { RiContactsFill } from "react-icons/ri";
import { IoLogoDropbox } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidHelpCircle } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";


const Perfil = () => {

return (

    <div className="profile-section">
        <NavBar />
        <div className="bg-page">
            <div className="cardProfile">
            <CgProfile className="cgprofile" />
                <ul className="profile-itens">
                    <li><RiContactsFill /> Dados pessoais</li>
                    <li><FaHandshakeAngle /> Minhas trocas</li>
                    <li><FaHeart /> Lista de desejos</li>
                    <li><IoLogoDropbox /> Meus Itens</li>
                    <li><RiLockPasswordFill /> Alterar senha</li>
                    <li><BiSolidHelpCircle /> Ajuda</li>
                    <li><IoExitOutline /> Sair</li>
                </ul>
            </div>
        </div>
    </div>
 )

};



export default Perfil;
