import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./Perfil.css";
import { RiContactsFill } from "react-icons/ri";
import { IoLogoDropbox } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidHelpCircle } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

// Bootstrap
import { Modal, Button } from "react-bootstrap";

const Perfil = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    const handleConfirmLogout = () => {
        setShowModal(false);
        navigate("/"); // Redireciona para a página inicial
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="profile-section">
            <NavBar />
            <div className="bg-page">
                <div className="cardProfile">
                    <CgProfile className="cgprofile" />
                    <ul className="profile-itens">
                        <li><RiContactsFill /> Dados pessoais</li>
                        {/* <li><FaHandshakeAngle /> Minhas trocas</li> */}
                        <li onClick={() => navigate("/minhas-trocas")} style={{ cursor: "pointer" }}>
                            <FaHandshakeAngle /> Minhas trocas
                        </li>
                        <li><FaHeart /> Lista de desejos</li>
                        <li><IoLogoDropbox /> Meus Itens</li>
                        <li><RiLockPasswordFill /> Alterar senha</li>
                        <li><BiSolidHelpCircle /> Ajuda</li>
                        <li onClick={handleLogoutClick} style={{ cursor: "pointer" }}>
                            <IoExitOutline /> Sair
                        </li>
                    </ul>
                </div>
            </div>

            {/* Modal de confirmação */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar saída</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você realmente deseja sair?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmLogout}>
                        Sim, sair
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Perfil;
