

const Footer = () => {
  return (
    <footer className="container d-flex justify-content-between align-items-center mt-5 py-3 border-top">
      {/* Logo à esquerda */}
      <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />

      {/* Ícones sociais à direita */}
      <div className="d-flex gap-2">
        <button className="btn btn-primary rounded-circle p-2">
          <i className="bi bi-facebook"></i>
        </button>
        <button className="btn btn-danger rounded-circle p-2">
          <i className="bi bi-instagram"></i>
        </button>
        <button className="btn btn-info rounded-circle p-2">
          <i className="bi bi-twitter"></i>
        </button>
      </div>
    </footer>

  )
}

export default Footer
