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
      <div style={{ position: "center", marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Email"
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
      {/* Campo Senha */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="password"
          placeholder="Senha"
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
      {/* Botão Login */}
      <a href="/perfil-aluno">
        <button
          style={{ padding: "5px 20px", borderRadius: "5px", fontSize: "16px" }}
        >
          Login
        </button>
      </a>
      {/* LInks Cadastro e Recuperação de senha */}
      <p style={{ color: "blue", marginTop: "20px" }}>
        <a
          href="/cadastro-aluno"
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
            opacity: "0.9",
          }}
        >
          {" "}
          CADASTRE-SE{" "}
        </a>{" "}
        OU
        <a
          href="/esqueci-senha"
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
            opacity: "0.9",
          }}
        >
          {" "}
          ESQUECI A SENHA{" "}
        </a>
      </p>
    </div>
  );
}

export default Login;
