function Login() {
    const logoPgcomp = "assets/logopgcomp.png";
  
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          width: "350px",
          height: "400px",
          textAlign: "center",
        }}
        className="container"
      >
        {/* Logo*/}
        <img src={logoPgcomp} width={130} />
        {/* Campo Email */}
        <h4>Email de Recuperação de Senha</h4>
        <div style={{ position: "center", marginBottom: "40px" }}>
          <input
            type="email"
            placeholder="Digite seu Email"
            style={{
              width: "90%",
              padding: "12px",
              borderRadius: "5px",
              backgroundColor: "#d3d3d3",
              color: "#333",
              fontSize: "14px",
              border: "1px solid #ccc",
            }}
          />
        </div>
  
        {/* Botão Enviar Recuperação de Senha */}
        <a href="/confirmar-envio-email">
          <button
            style={{ padding: "5px 20px", borderRadius: "5px", fontSize: "16px" }}>
            Enviar Email de Recuperação
          </button>
        </a>
        {/* LInks Cadastro e Recuperação de senha */}
      </div>
    );
  }
  
  export default Login;
  