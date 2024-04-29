import "./styles.css";

import { useState } from "react";

import { useUserQueries } from "@/queries/user";

import Button from "../../components/Button";
import Input from "../../components/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { useAuthUser } = useUserQueries();

  const { mutate: authenticate } = useAuthUser();

  const handleSignIn = () => authenticate({ username: email, password });

  const disabled = !email || !password;

  return (
    <div className="containerLogin">
      {/* Logo*/}
      <img src="assets/logopgcomp.png" width={130} />
      {/* Campo Email */}
      <div style={{ position: "center", marginBottom: "20px" }}>
        <Input
          placeholder={"Email"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* Campo Senha */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Input
          placeholder={"Senha"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* Botão Login */}
      <Button onClick={handleSignIn} label={"Login"} disabled={disabled} />

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
}

export default Login;
