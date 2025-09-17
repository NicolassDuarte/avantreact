import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './TrocaModal.css';

const TrocaModal = ({ show, onHide, userItens, onPropostaTroca, itemDesejado }) => {
    const [itemSelecionado, setItemSelecionado] = useState(null);

    const handleProposta = () => {
        if (itemSelecionado) {
            onPropostaTroca(itemSelecionado);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Propor Troca</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="troca-info">
                    <h5>Você está propondo uma troca por:</h5>
                    <div className="desejado-card">
                        <img src={itemDesejado.imagemUrl ? `http://localhost:3001${itemDesejado.imagemUrl}` : "/placeholder-item.png"}
                            alt={itemDesejado.titulo} />
                        <div>
                            <h6>{itemDesejado.titulo}</h6>
                            <p>{itemDesejado.descricao}</p>
                        </div>
                    </div>
                </div>

                <hr />

                <h5>Selecione um dos seus itens para troca:</h5>
                <div className="itens-container">
                    {userItens.length > 0 ? (
                        userItens.map(item => (
                            <div
                                key={item.id_item}
                                className={`item-card ${itemSelecionado === item.id_item ? 'selected' : ''}`}
                                onClick={() => setItemSelecionado(item.id_item)}
                            >
                                <img src={item.imagemUrl ? `http://localhost:3001${item.imagemUrl}` : "/placeholder-item.png"}
                                    alt={item.titulo} />
                                <h6>{item.titulo}</h6>
                                <p>{item.descricao.substring(0, 60)}...</p>
                            </div>
                        ))
                    ) : (
                        <p>Você não possui itens disponíveis para troca.</p>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleProposta}
                    disabled={!itemSelecionado}
                >
                    Propor Troca
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TrocaModal;