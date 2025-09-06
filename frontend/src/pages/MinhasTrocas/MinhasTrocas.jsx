// src/pages/MinhasTrocas.jsx
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./MinhasTrocas.css";
import { Tab, Nav } from "react-bootstrap";

const MinhasTrocas = () => {
    const [activeTab, setActiveTab] = useState("recebidas");

    return (
        <div className="trocas-section">
            <NavBar />
            <div className="bg-page">
                <div className="cardTrocas">
                    <h2 className="titulo-trocas">Minhas Trocas</h2>

                    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Nav variant="tabs" className="nav-custom">
                            <Nav.Item>
                                <Nav.Link eventKey="recebidas">📥 Propostas Recebidas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="enviadas">📤 Propostas Enviadas</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="tab-content-custom">
                            <Tab.Pane eventKey="recebidas">
                                <div className="conteudo-troca">
                                    <h4>Suas propostas recebidas aparecerão aqui</h4>
                                    {/* Aqui futuramente você lista os cards das propostas recebidas */}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="enviadas">
                                <div className="conteudo-troca">
                                    <h4>Suas propostas enviadas aparecerão aqui</h4>
                                    {/* Aqui futuramente você lista os cards das propostas enviadas */}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

export default MinhasTrocas;
