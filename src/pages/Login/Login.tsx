import "./styles.css";

import { useState } from "react";

import ButtonSecondary from "@/components/ButtonSecondary";
import InputPassword from "@/components/InputPassword";
import { useUserQueries } from "@/queries/user";

import Input from "../../components/Input";

const Login = () => {
  const logoPgcop = "assets/logoPgcop.png";
  const imagemBarra = "assets/salvador.png";
  const gamboa = "assets/gamboa.jpg";
  const farol = "assets/farol.jpg";
  const pelourinho = "assets/pelourinho.jpg";
  const barra = "assets/barra.jpg";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { useAuthUser } = useUserQueries();

  const { mutate: authenticate } = useAuthUser();

  const handleSignIn = () => authenticate({ username: email, password });

  const disabled = !email || !password;

  return (
    <div className="containerLogin">
      <div className="containerCardImagem">
        <div className="cardLogin">
          {/* Logo*/}
          <img src={logoPgcop} width={130} />

          <h1>Bem vindo de volta ao PGCop</h1>
          <div className="inputs">
            {/* Campo Email */}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Campo Senha */}
            <InputPassword
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="conectado">
              <input type="checkbox" name="conectado" id="conectado" />
              <label htmlFor="conectado">Matenha-me conectado</label>
            </div>

            {/* Botão Login */}
            <ButtonSecondary
              disabled={disabled}
              onClick={handleSignIn}
              label={"Entrar"}
            />
          </div>

          {/* Links Cadastro e Recuperação de senha */}
          <div className="links">
            <a href="/cadastro-aluno" className="text">
              Cadastre-se
            </a>

            <p className="text">
              Esqueceu a senha? Clique
              <a href="/esqueci-senha"> aqui.</a>
            </p>
          </div>
        </div>
        <img
          src={imagemBarra}
          className="imagemLogin"
          alt="Imagem do Forte de Santa Maria - Salvador/BA"
        />
      </div>
    </div>
  );
};

export default Login;
