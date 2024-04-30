function ConfirmarNovaSenha() {
  const logoPgcomp = "assets/logopgcomp.png"; // Img Logo
  const confirmacao = "assets/confirmacao.jpg"; // Img confirmação

  return (
    <div className="cadastroAluno" style={{ width: "350px",height: "400px",textAlign: "center",}}>
      {/* Logo*/}
      <img src={logoPgcomp} width={150} />
      <br></br>
      <p></p>
      <a id="date" style={{ fontSize: "17px", fontWeight: 650 }}>
        SENHA ATUALIZADA COM SUCESSO
      </a>
      <br></br>
      {/* Ícone de confirmação */}
      <img src={confirmacao} width={90} />
      
      {/* Botão Voltar a Tela Inicial */}
      <br />
      <a href="/perfil-aluno">
        <button
          style={{borderRadius: "5px", fontSize: "15px", width:"200px" }} >Voltar a Tela Inicial
        </button>
      </a>
    </div>
  );
}

export default ConfirmarNovaSenha;
