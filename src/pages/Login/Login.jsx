import ButtonSecondary from '@/components/ButtonSecondary';
import Button from '../../components/ButtonPrimary';
import Input from '../../components/Input';
import './styles.css'

const Login = () => {
  const logoPgcomp = "assets/logopgcomp.png";

  return (
    <div className="containerLogin">
      <div className='cardLogin'>
        {/* Logo*/}
        <img src={logoPgcomp} width={130} />

        <h1>Bem vindo de volta ao PGCop</h1>
        <div className="inputs">
          {/* Campo Email */}
          <Input placeholder={"Email"} type={"email"}/>
          {/* Campo Senha */}
          <Input placeholder={"Senha"} type={"password"}/>
          {/* Botão Login */}
          <ButtonSecondary link={'/perfil-aluno'} label={"Entrar"}/>
        </div>

        {/* LInks Cadastro e Recuperação de senha */}
        <div className="links">
          <a
            href="/cadastro-aluno"
            className='text'
          >
            Cadastre-se.
          </a>

          <p className='text'>
            Esqueceu a senha? Clique 
             <a
              href="/esqueci-senha"
              > aqui.</a>
          </p>
        </div>
      </div>
    </div>

  );
}

export default Login;
