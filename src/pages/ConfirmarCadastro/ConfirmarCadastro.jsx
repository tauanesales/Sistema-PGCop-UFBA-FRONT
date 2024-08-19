import "./styles.css";

const ConfirmarCadastro = () => {
  const logoPgcop = "assets/logoPgcop.png";
  return (
    <div className="container">
      <div className="containerCard gap">
        <img src={logoPgcop} width={130} />
        <div className="box">
          <h1>Cadastro concluído!</h1>
          <p>Verifique seu e-mail para criar uma senha e acessar sua conta.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCadastro;
