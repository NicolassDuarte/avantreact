// MinhasTrocas.jsx - Versão completa
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useAuth } from '../../contexts/AuthContext';
import api from "../../services/api";
import "./MinhasTrocas.css";
import { Tab, Nav, Button, Badge, Modal } from "react-bootstrap";

const MinhasTrocas = () => {
    const [activeTab, setActiveTab] = useState("recebidas");
    const [trocasRecebidas, setTrocasRecebidas] = useState([]);
    const [trocasEnviadas, setTrocasEnviadas] = useState([]);
    const [trocasFinalizadas, setTrocasFinalizadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedTroca, setSelectedTroca] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchTrocas();
        }
    }, [user, activeTab]);

    const fetchTrocas = async () => {
        try {
            setLoading(true);

            if (activeTab === "recebidas") {
                const response = await api.get(`/trocas/receptor/${user.id_usuario}`);
                setTrocasRecebidas(response.data);
            } else if (activeTab === "enviadas") {
                const response = await api.get(`/trocas/ofertante/${user.id_usuario}`);
                setTrocasEnviadas(response.data);
            } else {
                // Busca as trocas finalizadas (aceitas, recusadas, concluídas ou canceladas)
                const [recebidas, enviadas] = await Promise.all([
                    api.get(`/trocas/receptor/${user.id_usuario}`),
                    api.get(`/trocas/ofertante/${user.id_usuario}`)
                ]);

                const todasTrocas = [...recebidas.data, ...enviadas.data];
                const finalizadas = todasTrocas.filter(troca =>
                    troca.status !== "PENDENTE"
                );

                setTrocasFinalizadas(finalizadas);
            }
        } catch (error) {
            console.error("Erro ao buscar trocas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleResponderProposta = async (idTroca, status) => {
        try {
            await api.put(`/trocas/${idTroca}`, { status });
            fetchTrocas(); // Recarregar a lista
        } catch (error) {
            console.error("Erro ao responder proposta:", error);
            alert("Erro ao processar sua resposta. Tente novamente.");
        }
    };

    const handleShowDetails = (troca) => {
        setSelectedTroca(troca);
        setShowDetailModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailModal(false);
        setSelectedTroca(null);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            PENDENTE: { variant: "warning", text: "Pendente" },
            ACEITA: { variant: "success", text: "Aceita" },
            RECUSADA: { variant: "danger", text: "Recusada" },
            CONCLUIDA: { variant: "primary", text: "Concluída" },
            CANCELADA: { variant: "secondary", text: "Cancelada" }
        };

        const config = statusConfig[status] || { variant: "light", text: status };
        return <Badge bg={config.variant}>{config.text}</Badge>;
    };

    // Função para obter a URL da imagem corretamente
    const getImageUrl = (imagemUrl) => {
        if (!imagemUrl || !imagemUrl.length) return "/placeholder-item.png";

        const firstImage = imagemUrl[0];
        if (firstImage.startsWith('http')) {
            return firstImage;
        } else if (firstImage.startsWith('/uploads')) {
            return `http://localhost:3001${firstImage}`;
        } else {
            return firstImage;
        }
    };

    const renderTrocaCard = (troca, isRecebida = false) => (
        <div key={troca.id_troca} className="card-troca mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <img
                        src={getImageUrl(isRecebida ? troca.itemOferecido.imagemUrl : troca.itemDesejado.imagemUrl)}
                        alt={isRecebida ? troca.itemOferecido.titulo : troca.itemDesejado.titulo}
                        className="img-thumbnail me-3"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div>
                        <h5 className="card-title">
                            {isRecebida ? "Item Oferecido" : "Item Desejado"}: {troca.itemDesejado.titulo}
                        </h5>
                        <p className="card-text">
                            <strong>{isRecebida ? "Ofertante" : "Receptor"}:</strong> {isRecebida ? troca.ofertante.nome : troca.receptor.nome}
                        </p>
                        <p className="card-text">
                            <strong>Status:</strong> {getStatusBadge(troca.status)}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                Data: {new Date(troca.criadoEm).toLocaleDateString("pt-BR")}
                            </small>
                        </p>
                    </div>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleShowDetails(troca)}
                    >
                        Detalhes
                    </Button>
                </div>

                {isRecebida && troca.status === "PENDENTE" && (
                    <div className="mt-3">
                        <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleResponderProposta(troca.id_troca, "ACEITA")}
                        >
                            Aceitar
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleResponderProposta(troca.id_troca, "RECUSADA")}
                        >
                            Recusar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="trocas-section">
            <NavBar />
            <div className="bg-page">
                <div className="cardTrocas">
                    <h2 className="titulo-trocas">Minhas Trocas</h2>

                    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Nav variant="tabs" className="nav-custom">
                            <Nav.Item>
                                <Nav.Link eventKey="recebidas">
                                    📥 Propostas Recebidas
                                    {trocasRecebidas.length > 0 &&
                                        <Badge bg="warning" className="ms-2">
                                            {trocasRecebidas.filter(t => t.status === "PENDENTE").length}
                                        </Badge>
                                    }
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="enviadas">📤 Propostas Enviadas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="finalizadas">✅ Trocas Finalizadas</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="tab-content-custom">
                            <Tab.Pane eventKey="recebidas">
                                <div className="conteudo-troca">
                                    {loading ? (
                                        <p>Carregando propostas recebidas...</p>
                                    ) : trocasRecebidas.length === 0 ? (
                                        <p>Nenhuma proposta recebida.</p>
                                    ) : (
                                        trocasRecebidas.map(troca => renderTrocaCard(troca, true))
                                    )}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="enviadas">
                                <div className="conteudo-troca">
                                    {loading ? (
                                        <p>Carregando propostas enviadas...</p>
                                    ) : trocasEnviadas.length === 0 ? (
                                        <p>Nenhuma proposta enviada.</p>
                                    ) : (
                                        trocasEnviadas.map(troca => renderTrocaCard(troca))
                                    )}
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="finalizadas">
                                <div className="conteudo-troca">
                                    {loading ? (
                                        <p>Carregando trocas finalizadas...</p>
                                    ) : trocasFinalizadas.length === 0 ? (
                                        <p>Nenhuma troca finalizada.</p>
                                    ) : (
                                        trocasFinalizadas.map(troca => renderTrocaCard(troca))
                                    )}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>

            {/* Modal de detalhes da troca */}
            <Modal show={showDetailModal} onHide={handleCloseDetails} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes da Troca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTroca && (
                        <div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5>Item Oferecido</h5>
                                    <div className="d-flex">
                                        <img
                                            src={getImageUrl(selectedTroca.itemOferecido.imagemUrl)}
                                            alt={selectedTroca.itemOferecido.titulo}
                                            className="img-thumbnail me-3"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />

                                        <div>
                                            <h6>{selectedTroca.itemOferecido.titulo}</h6>
                                            <p>{selectedTroca.itemOferecido.descricao}</p>
                                            <p><strong>Dono:</strong> {selectedTroca.ofertante.nome}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h5>Item Desejado</h5>
                                    <div className="d-flex">
                                        <img
                                            src={getImageUrl(selectedTroca.itemDesejado.imagemUrl)}
                                            alt={selectedTroca.itemDesejado.titulo}
                                            className="img-thumbnail me-3"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />

                                        <div>
                                            <h6>{selectedTroca.itemDesejado.titulo}</h6>
                                            <p>{selectedTroca.itemDesejado.descricao}</p>
                                            <p><strong>Dono:</strong> {selectedTroca.receptor.nome}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Status:</strong> {getStatusBadge(selectedTroca.status)}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Data da proposta:</strong> {new Date(selectedTroca.criadoEm).toLocaleDateString("pt-BR")}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MinhasTrocas;