import './styles.css'

const ConfirmarEnvioEmail = () => {
  const logoPgcop = "assets/logoPgcop.png";
  const confirmacao = "assets/confirmacao.jpg";

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
      <img src={logoPgcop} width={130} />
      <br></br>
      <p></p>
      <a id="date" style={{ fontSize: "17px", fontWeight: 650 }}>
        EMAIL ENVIADO
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
          style={{ padding: "5px 10px", borderRadius: "5px", fontSize: "16px" }}>
          Voltar a Tela Inicial
        </button>
      </a>
    </div>
  );
}

export default ConfirmarEnvioEmail;
