import "./styles.css";

import ButtonSecondary from "@/components/ButtonSecondary";
import Input from "@/components/Input";

const EsqueciSenha = () => {
  const logoPgcop = "assets/logoPgcop.png";

  return (
    <div className="container">
      <div className="containerCard">
        <img src={logoPgcop} width={130} />
        <h1>Redefinir senha</h1>
        <p>Informe o e-mail cadastrado para redefinir sua senha de acesso.</p>

        <div className="containInput">
          <Input
            label={"E-mail:"}
            type={"email"}
            style={{ marginBottom: ".5em" }}
          />
          <ButtonSecondary
            link={"/confirmar-envio-email"}
            label={"Enviar"}
            style={{ width: "12em" }}
          />
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;
