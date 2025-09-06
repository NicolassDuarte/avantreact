import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";
import { Carousel } from "react-bootstrap";
import globoNeve from '../../assets/globo.png';
import controle from '../../assets/controle.png';
import binoculo from '../../assets/binoculo.png';
import fone from '../../assets/fone.png';
import livro from '../../assets/livro.jpg';
import camera from '../../assets/camera.png';
import { Link } from "react-router-dom";
import "./Home.css"; // vamos criar um css só pra deixar igual ao layout

const Home = () => {
    return (
        <div>
            <NavBar />

            {/* ================= INÍCIO ================= */}
            <section id="inicio" className="section-home hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="text-troca">
                                <h2>Trocas de Objetos</h2>
                                <p>
                                    No EcoTroca, aquilo que você não usa mais pode ser muito valioso para outra pessoa.
                                    Conectamos quem oferece com quem precisa, criando uma rede de trocas simples, intuitiva e segura.
                                </p>
                                <Link to="/produtos" className="btn-objetos">Ver objetos</Link>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <img className="img-fluid img-hero rounded" src="/troca.png" alt="Troca" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= POPULARES ================= */}
            <section id="populares" className="section-home populares">
                <div className="container">
                    <h2 className="text-center mb-4">Populares</h2>

                    <Carousel indicators={true} controls={true} interval={3000}>
                        {/* Slide 1 */}
                        <Carousel.Item>
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <div className="card-popular text-center">
                                        <img className="imgClassItem" src={globoNeve} alt="Globo de Neve" />
                                        <h5>Globo de Neve</h5>
                                        <p>Um clássico item decorativo que pode trazer charme a um novo lar.</p>
                                        <button className="btn-trocar">Trocar</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-popular text-center">
                                        <img className="imgClassItem" src={controle} alt="Controle PS4" />
                                        <h5>Controle PS4</h5>
                                        <p>Perfeito para quem quer renovar ou substituir acessórios de games.</p>
                                        <button className="btn-trocar">Trocar</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-popular text-center">
                                        <img className="imgClassItem" src={binoculo} alt="Binóculos" />
                                        <h5>Binóculos</h5>
                                        <p>Ideal para explorar e observar o mundo de uma nova perspectiva.</p>
                                        <button className="btn-trocar">Trocar</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>

                        {/* Slide 2 */}
                        <Carousel.Item>
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <div className="card-popular text-center">
                                        <img className="imgClassItem" src={fone} alt="Fone de Ouvido" />
                                        <h5>Fone de Ouvido</h5>
                                        <p>Qualidade de som para quem busca praticidade no dia a dia.</p>
                                        <button className="btn-trocar">Trocar</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-popular text-center">
                                        <img className="imgClassItem" src={livro} alt="Livro" />
                                        <h5>Livro</h5>
                                        <p>Histórias que já encantaram alguém e agora podem encantar você.</p>
                                        <button className="btn-trocar">Trocar</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-popular text-center">
                                        <img className="imgClassItem" src={camera} alt="Câmera" />
                                        <h5>Câmera</h5>
                                        <p>Registre momentos especiais com um novo olhar através desta câmera.</p>
                                        <button className="btn-trocar">Trocar</button>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </section>


            {/* ================= COMENTÁRIOS ================= */}
            <section id="comentarios" className="section-home comentarios">
                <div className="container">
                    <h2 className="text-center mb-5">Comentários</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card-comentario d-flex">
                                <img src="/daniela.png" alt="Daniele" className="img-comentario me-3" />
                                <div>
                                    <h5>Daniele Almeida</h5>
                                    <p>Consegui roupas ótimas para minha filha. A experiência foi prática e segura!</p>
                                    <div className="estrelas">★★★★★</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="card-comentario d-flex">
                                <img src="/ricardo.png" alt="Ricardo" className="img-comentario me-3" />
                                <div>
                                    <h5>Ricardo França</h5>
                                    <p>Troquei brinquedos que não eram mais usados e ganhei novos para meus filhos. Excelente!</p>
                                    <div className="estrelas">★★★★★</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SOBRE NÓS ================= */}
            <section id="sobre-nos" className="section-home sobre">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center">
                            <img src="/sobrenos.png" alt="Sobre nós" className="img-fluid img-sobre rounded" />
                        </div>
                        <div className="col-md-6">
                            <h6 className="subtitulo">Sobre nós</h6>
                            <h2>Feito de forma colaborativa</h2>
                            <p>
                                O EcoTroca nasceu para aproximar pessoas. O que sobra na casa de alguém pode ser exatamente
                                o que falta na de outra. Acreditamos em uma economia sustentável, acessível e baseada na confiança.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
