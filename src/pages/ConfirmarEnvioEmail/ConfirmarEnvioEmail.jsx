import ButtonSecondary  from '@/components/ButtonSecondary/index.jsx';
import './styles.css'

const ConfirmarEnvioEmail = () => {
  const logoPgcop = "assets/logoPgcop.png";

  return (
    <div className='containerConfirmarEnvioEmail'>
      <div className='containerCard gap'>
        <img src={logoPgcop} width={130} />
        <h1>Redefinir senha</h1>
        <div>
          <p>Enviamos um link para redefinição de senha para o e-mail informado.</p>
          <p>Por favor, verifique sua caixa de entrada.</p>

        </div>
        
        <ButtonSecondary link={'/'} label={"Voltar"} width={"12em"} />
      </div>
    </div>
  );
}

export default ConfirmarEnvioEmail;
