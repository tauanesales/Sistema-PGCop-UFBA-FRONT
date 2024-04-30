function AtualizarSenha() {
  const logoPgcomp = "assets/logopgcomp.png";

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        width: "350px",
        height: "500px",
        textAlign: "center",
      }}
    >
      {/* Logo*/}
      <img src={logoPgcomp} width={130} />
      <h4>Digite o CPF</h4>
      {/* Campo CPF */}
      <div style={{ position: "relative", marginBottom: "15px" }}>
        <input
          type="number"
          placeholder="CPF"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>
      <h4>Atualizar Senha</h4>
      {/* Campo Nova Senha */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="password"
          placeholder="Nova Senha"
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
      {/* Campo Confirmar Nova Senha */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="password"
          placeholder="Digite Novamente"
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
      <a href="/confirmar-nova-senha">
        <button
          style={{ padding: "5px 5px", borderRadius: "5px", fontSize: "15px" }}>Atualizar Senha
        </button>
      </a>
      {/* LInks Cadastro e Recuperação de senha */}
    </div>
  );
}

export default AtualizarSenha;
