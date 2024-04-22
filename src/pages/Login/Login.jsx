import ButtonSecondary from '@/components/ButtonSecondary';
import Button from '../../components/ButtonPrimary';
import Input from '../../components/Input';
import InputPassword from '@/components/InputPassword';
import './styles.css'

const Login = () => {
  const logoPgcop = "assets/logoPgcop.png";
  const imagemBarra = "assets/salvador.png";
  const gamboa = "assets/gamboa.jpg";

  return (
    <div className="containerLogin">
      <div className='containerCardImg'>
        <div className='cardLogin'>
          {/* Logo*/}
          <img src={logoPgcop} width={130} />

          <h1>Bem vindo de volta ao PGCop</h1>
          <div className="inputs">
            {/* Campo Email */}
            <Input label={"Matrícula"} type={"email"} />
            {/* Campo Senha */}
            <InputPassword label={"Senha"} type={"password"}/>

            <div className='conectado'>
              <input type="checkbox" name="conectado" id="conectado" />
              <label for="conectado">Matenha-me conectado</label>
            </div>

            {/* Botão Login */}
            <ButtonSecondary link={'/perfil-aluno'} label={"Entrar"}/>
          </div>

          {/* LInks Cadastro e Recuperação de senha */}
          <div className="links">
            <a
              href="/cadastro-aluno"
              className='text'
            >
              Cadastre-se
            </a>

            <p className='text'>
              Esqueceu a senha? Clique 
              <a
                href="/esqueci-senha"
                > aqui.</a>
            </p>
          </div>
        </div>
        <img  src={imagemBarra} className='imagemLogin'
        alt="Imagem do Forte de Santa Maria - Salvador/BA"
        />
      </div>
    </div>

  );
}

export default Login;
