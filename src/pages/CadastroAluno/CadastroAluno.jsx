import './styles.css'
import Input from '../../components/Input'
import SelectCadastro from '../../components/SelectCadastro'
import Button from '../../components/ButtonPrimary';
const CadastroAluno = () => {
  const logoPgcomp = "assets/logopgcomp.png"; // Logo
  return (
    <form className="containerCadastro" >
      {/* Logo*/}
      <img src={logoPgcomp} width={110} />
      {/* Campo Nome */}
      <Input placeholder={"Nome Completo"} type={"text"}/>
      {/* Campo CPF */}
      <Input placeholder={"CPF"} type={"number"}/>
      {/* Campo Email */}
      <Input placeholder={"Email"} type={"email"}/>
      {/* Campo Telefone */}
      <Input placeholder={"Telefone"} type={"number"}/>
      {/* Campo Matrícula */}
      <Input placeholder={"Matrícula"} type={"text"}/>
      {/* Campo Orientador */}
      <Input placeholder={"Orientador"} type={"text"}/>
      {/* Seleção Titulação */}
        <select
          className="inputCadastro"
          required
        >
          <option value="">Selecione a Titulação do Curso</option>
          <option value="mestrado">Mestrado</option>
          <option value="doutorado">Doutorado</option>
        </select>
      {/* Seleção de data */}
      <SelectCadastro/>

      {/* Campo Criar Senha */}
      <Input placeholder={"Crie sua Senha"} type={"password"}/>
      {/* Campo Confirmar Senha */}
      <Input placeholder={"Confirmar Senha"} type={"password"}/>

      {/* Botão Cadastrar */}
      <Button link={'confirmar-cadastro'} label={"Cadastrar"}/>
    </form>
  );
}

export default CadastroAluno;
