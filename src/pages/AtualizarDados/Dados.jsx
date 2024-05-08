import React from 'react';
import './styles.css';
import SelectCadastro from '../../components/SelectCadastro';
import logoPgcop from "assets/logoPgcop.png"; // Logo

function AtualizarDados() {
  return (
    <div className="containerPrincipal">
      <form className="containerCadastro">
        {/* Logo*/}
        <img src={logoPgcop} width={110} />

        {/* Primeira linha */}
        <div className="inputContainer">
          <div className="inputRow">
            <label htmlFor="nome">Nome completo</label>
            <input className="inputCadastro" id="nome" type="text" style={{width:'500px'}}/>
          </div>
          <div className="inputRow">
            <label htmlFor="cpf">CPF</label>
            <input className="inputCadastro" id="cpf" type="number" />
          </div>
        </div>

        {/* Segunda linha */}
        <div className="inputContainer">
          <div className="inputRow">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" className="inputCadastro" style={{width:'500px'}}/>
          </div>
          <div className="inputRow">
            <label htmlFor="telefone">Celular</label>
            <input className="inputCadastro" id="telefone" type="number" required placeholder="(xx) xxxxx-xxxx" />
          </div>
        </div>

        {/* Terceira linha */}
        <div className="inputContainer">
          <div className="inputRow">
            <label htmlFor="nome">Currículo Lattes</label>
            <input className="inputCadastro" id="nome" type="text" style={{width:'500px'}}/>
          </div>
          {/* Lista Cursos */}
          <div className="inputRow">
            <label htmlFor="cpf">Curso</label>
            <select className="inputCadastro" required style={{width:'140px'}}>
              <option value="mestrado">Mestrado</option>
              <option value="doutorado">Doutorado</option>
            </select>
          </div>
          {/* Lista Orientadores */}
          <div className="inputRow">
            <label htmlFor="cpf">Orientador</label>
            <select className="inputCadastro" required style={{width:'150px'}}>
              <option value="doutorado">Outro</option>
              <option value="mestrado">Fred Durão</option>
              <option value="doutorado">Gustavo</option>
              <option value="doutorado">Cláudio</option>
            </select>
          </div>
        </div>

        {/* Quarta linha */}
        <div className="inputData">
          <SelectCadastro />
        </div>

        {/* Quinta linha */}
        <div className="inputContainer">
          <div className="inputRow">
            <label htmlFor="senha">Senha</label>
            <input className="inputSenha" id="senha" type="password" />
          </div>
          <div className="inputRow">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input className="inputSenha" id="confirmarSenha" type="password" />
          </div>
        </div>

      </form>
      <div className="buttonCadastro">
        <button onClick={() => window.location.href = "/confirmar-cadastro"} >Cadastrar</button>
      </div>  
    </div>
  );
}

export default AtualizarDados;