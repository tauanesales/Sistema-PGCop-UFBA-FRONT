function ConfirmarNovaSenha() {
  const logoPgcomp = "assets/logopgcomp.png"; // Img Logo
  const confirmacao = "assets/confirmacao.jpg"; // Img confirmação

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
      className="cadastroAluno"
    >
      {/* Logo*/}
      <img src={logoPgcomp} width={130} />
      <br></br>
      <p></p>
      <a id="date" style={{ fontSize: "17px", fontWeight: 650 }}>
        SENHA ATUALIZADA COM SUCESSO
      </a>
      <br></br>
      <p></p>
      {/* Ícone de confirmação */}
      <img src={confirmacao} width={100} />
      <p></p>

      {/* Botão Voltar a Tela Inicial */}
      {/* Botão Cadastrar */}
      <br />
      <a href="/">
        <button
          style={{ padding: "5px 20px", borderRadius: "5px", fontSize: "16px" }}
        >
          Voltar a Tela Inicial
        </button>
      </a>
    </div>
  );
}

export default ConfirmarNovaSenha;
