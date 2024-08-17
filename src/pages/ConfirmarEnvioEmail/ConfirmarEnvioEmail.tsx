
import "./styles.css";

import { useState } from "react";
import PinInput from "react-pin-input";
import { useLocation, useNavigate } from "react-router-dom";

import ButtonSecondary from "@/components/ButtonSecondary";
import { useUserQueries } from "@/queries/user";

const ConfirmarEnvioEmail = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { email } = location.state || {};

  const { useCheckResetPasswordToken } = useUserQueries();

  const { mutate: checkResetPasswordToken, isPending } =
    useCheckResetPasswordToken();

  const logoPgcop = "assets/logoPgcop.png";

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (pin.length === 6) {
      handleCheckResetPasswordToken(pin);
      setError("");
    } else {
      setError("O PIN deve ter 6 dígitos.");
    }
  };

  const handleCheckResetPasswordToken = (token: string) =>
    checkResetPasswordToken(
      { email, token },
      {
        onSuccess: () =>
          navigate("/atualizar-senha", {
            state: { ...location.state, token },
          }),
      },
    );

  return (
    <div className="container">
      <div className="containerCard gap">
        <img src={logoPgcop} width={115} alt="Logo Pgcop" />
        <h1>Redefinir senha</h1>
        <div>
          <p>Enviamos um Código de confirmação para o e-mail informado.</p>
          <p>
            Por favor, verifique sua caixa de entrada e cole o Código no campo
            abaixo.
          </p>
        </div>
        <div className="pin-input-container">
          <PinInput
            length={6}
            initialValue=""
            onChange={setPin}
            type="custom"
            inputMode="number"
            style={{ padding: "10px" }}
            inputStyle={{
              borderColor: "gray",
              borderRadius: "8px",
              borderWidth: "2px",
              transition: "border-color 0.3s, border-width 0.3s",
            }}
            inputFocusStyle={{
              borderColor: "black",
              borderWidth: "3px",
            }}
            onComplete={handleCheckResetPasswordToken}
            autoSelect={true}
          />
          {error && <p className="error">{error}</p>}
        </div>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <ButtonSecondary
          onClick={handleNext}
          label={isPending ? "Carregando..." : "Continuar"}
          style={{ width: "12em", justifyContent: "center" }}
        />
        </div>

      </div>
    </div>
  );
};

export default ConfirmarEnvioEmail;
