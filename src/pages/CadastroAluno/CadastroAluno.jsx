import './styles.css'
import InputCadastro from '../../components/InputCadastro'
import SelectCadastro from '../../components/SelectCadastro'
import Button from '../../components/Button';
const CadastroAluno = () => {
  const logoPgcomp = "assets/logopgcomp.png"; // Logo
  return (
    <form className="containerCadastro" >
      {/* Logo*/}
      <img src={logoPgcomp} width={110} />
      {/* Campo Nome */}
      <InputCadastro placeholder={"Nome Completo"} type={"text"}/>
      {/* Campo CPF */}
      <InputCadastro placeholder={"CPF"} type={"number"}/>
      {/* Campo Email */}
      <InputCadastro placeholder={"Email"} type={"email"}/>
      {/* Campo Telefone */}
      <InputCadastro placeholder={"Telefone"} type={"number"}/>
      {/* Campo Matrícula */}
      <InputCadastro placeholder={"Matrícula"} type={"text"}/>
      {/* Campo Orientador */}
      <InputCadastro placeholder={"Orientador"} type={"text"}/>
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
      <InputCadastro placeholder={"Crie sua Senha"} type={"password"}/>
      {/* Campo Confirmar Senha */}
      <InputCadastro placeholder={"Confirmar Senha"} type={"password"}/>

      {/* Botão Cadastrar */}
      <Button link={'confirmar-cadastro'} label={"Cadastrar"}/>
    </form>
  );
}

export default CadastroAluno;
