import Input from '@/components/Input';
import ButtonSecondary  from '@/components/ButtonSecondary/index.jsx';
import './styles.css'

const EsqueciSenha = () => {
  const logoPgcop = "assets/logoPgcop.png";

  return (
    <div className='containerEsqueciSenha'>
      <div className='containerCard'>
        <img src={logoPgcop} width={130} />
        <h1>Redefinir senha</h1>
        <p>Informe o e-mail cadastrado para redefinir sua senha de acesso.</p>
        <div className='containInput'>
          <Input label={"E-mail:"} type={"email"} margin />
          <ButtonSecondary link={'/confirmar-envio-email'} label={"Entrar"} width={"12em"} />
        </div>
      </div>

    </div>
  );
}

export default EsqueciSenha;
