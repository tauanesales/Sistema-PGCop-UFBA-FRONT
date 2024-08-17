import "./styles.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonSecondary from "@/components/ButtonSecondary";
import Input from "@/components/Input";
import { useUserQueries } from "@/queries/user";

const EsqueciSenha = () => {
  const logoPgcop = "assets/logoPgcop.png";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { useRequestResetPasswordCode } = useUserQueries();

  const { mutate: requestResetPasswordCode, isPending } =
    useRequestResetPasswordCode();

  const onClickSend = () =>
    requestResetPasswordCode(
      { email },
      {
        onSuccess: () =>
          navigate("/confirmar-envio-email", { state: { email } }),
      },
    );

  return (
    <div className="container">
      <div className="containerCard">
        <img src={logoPgcop} width={130} />
        <h1>Redefinir senha</h1>
        <p>Informe o e-mail cadastrado para redefinir sua senha de acesso.</p>

        <div className="containInput">
          <Input
            label="E-mail:"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ marginBottom: "1.5em" }}
          />
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <ButtonSecondary
              onClick={onClickSend}
              label={isPending ? "Carregando..." : "Enviar"}
              style={{ width: "12em" }}
            />
        </div>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;
