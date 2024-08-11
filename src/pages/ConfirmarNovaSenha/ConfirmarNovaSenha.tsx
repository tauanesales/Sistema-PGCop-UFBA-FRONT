import "./styles.css";

import { useNavigate } from "react-router-dom";

import ButtonSecondary from "@/components/ButtonSecondary";

const ConfirmarNovaSenha = () => {
  const navigate = useNavigate();

  const logoPgcop = "assets/logoPgcop.png";

  const goBack = () => navigate("/");

  return (
    <div className="container">
      <div className="containerCard gap">
        <img src={logoPgcop} width={130} />
        <div className="box">
          <h1>Senha atualizada!</h1>
          <p>Sua senha foi atualizada com sucesso.</p>
        </div>
        <ButtonSecondary
          onClick={goBack}
          label={"Voltar"}
          style={{
            width: "12em",
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmarNovaSenha;
