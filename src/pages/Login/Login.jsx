import "./styles.css";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../contexts/auth";

function Login() {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div className="containerLogin">
      {/* Logo*/}
      <img src="assets/logopgcomp.png" width={130} />
      {/* Campo Email */}
      <div style={{ position: "center", marginBottom: "20px" }}>
        <Input placeholder={"Email"} type={"email"} />
      </div>
      {/* Campo Senha */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Input placeholder={"Senha"} type={"password"} />
      </div>
      {/* Botão Login */}
      <Button link={"/perfil-aluno"} label={"Login"} />

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
};

export default Login;
