import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import xLogo from '../assets/x.png';
import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer className="container d-flex justify-content-between align-items-center mt-5 py-3 border-top">
//       {/* Logo à esquerda */}
//       <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />

//       {/* Ícones sociais à direita */}
//       <div className="d-flex gap-2">
//         <button className="btn btn-primary rounded-circle p-2">
//           <i className="bi bi-facebook"></i>
//         </button>
//         <button className="btn btn-danger rounded-circle p-2">
//           <i className="bi bi-instagram"></i>
//         </button>
//         <button className="btn btn-info rounded-circle p-2">
//           <i className="bi bi-twitter"></i>
//         </button>
//       </div>
//     </footer>

//   )
// }

// export default Footer


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container d-flex justify-content-between align-items-center flex-wrap py-3">
        {/* Logo à esquerda */}
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Logo EcoTroca" className="logo-footer me-2" />
          <span className="brand-name"></span>
        </div>

        {/* Ícones sociais à direita */}
        <div className="d-flex gap-3 social-icons">
          <a href="#" className="social-icon">
            <img src={facebook} alt="Facebook" className="icon-img" />
          </a>
          <a href="#" className="social-icon">
            <img src={instagram} alt="Instagram" className="icon-img" />
          </a>
          {/* <a href="#" className="social-icon">
            <img src={twitter} alt="Twitter" className="icon-img" />
          </a> */}
          <a href="#" className="social-icon">
            <img src={xLogo} alt="X" className="icon-img" />
          </a>
        </div>

      </div>

      {/* Linha divisória */}
      <hr />

      {/* Texto abaixo */}
      <div className="text-center py-3 copyright">
        © 2025 EcoTroca. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
