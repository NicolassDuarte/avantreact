import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from '../components/Footer'


const Home = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <div id="idtroca" className="row align-items-center">
                    <div className="col">
                        <div className="text-troca">
                            <h3>TROCAS DE PRODUTOS</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, atque qui.</p>
                            <button className="objetos">Ver Objetos</button>
                        </div>
                        
                    </div>
                    <div className="col">
                        <img className="imgtroca" src="/troca.png" alt="Imagem de troca" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <img src="/sobrenos.png" alt="Sobre nós" />
                    </div>
                    <div className="col">
                        <div className="text-troca">
                            <h5>sobre nós</h5>
                            <h3>FEITO DE FORMA TRADICIONAL</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, atque qui.</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="container">
                <div id="rowcarrosel" className="row">
                    <div id="carouselExampleDark" className="carousel carousel-dark slide">
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                        </div>

                        <div className="carousel-inner" style={{height: '700px',width:'auto'}}>
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src="/sobrenos.png" className="d-block w-100" alt="Slide 1" />
                                <div className="carousel-caption d-none d-md-block" style={{top:'550px'}}>
                                    <h5>Produto Ilusorio 01</h5>
                                    <p className="texto-carrosel">Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>

                            <div className="carousel-item" data-bs-interval="2000">
                                <img src="/sobrenos.png" className="d-block w-100" alt="Slide 2" />
                                <div className="carousel-caption d-none d-md-block" style={{top:'550px'}}>
                                    <h5>Produto Ilusorio 02</h5>
                                    <p className="texto-carrosel">Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img src="/sobrenos.png" className="d-block w-100" alt="Slide 3" />
                                <div className="carousel-caption d-none d-md-block" style={{top:'550px'}}>
                                    <h5>Produto Ilusorio 03</h5>
                                    <p className="texto-carrosel">Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                     </div>
                </div>
            </div>
            
            <div className="container-md">
                <div className="row">
                    <div className="col">
                        <div className="comment">
                            <div className="comment-center">
                                <img className="img-comment" src="/daniela.png" alt="" />
                                <h3>Daniele Almeida</h3>
                                <p>Ótimo serviço! Encantada <br/>
                                com a qualidade dos produtos.</p>
                                <img src="/estrela.png" alt="" />
                            </div>
                            
                        </div>  
                    </div>
                    <div className="col">
                        <div className="comment">
                            <div className="comment-center">
                                <img className="img-comment" src="/ricardo.png" alt="" />
                                <h3>Ricardo Franco</h3>
                                <p>Não é apenas a troca  excelente, é <br/>
                                o serviço que torna a experiência especial.</p>
                                <img src="/estrela.png" alt="" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
