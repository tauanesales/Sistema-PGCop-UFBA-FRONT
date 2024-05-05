
import React, { useState } from 'react';
import './styles.css';
import SelectCadastro from '../../components/SelectCadastro';

const CadastroAluno = () => {
  const logoPgcop = "assets/logoPgcop.png"; // Logo

  const [tipoCadastro, setTipoCadastro] = useState('aluno');
  

  const handleTipoCadastroChange = (tipo) => {
    setTipoCadastro(tipo);
  };

  const renderFormulario = () => {
    if (tipoCadastro === 'aluno') {
      return (
        <> 
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
            <input id="email" type="email" className="inputCadastro" style={{width:'285px'}}/>
          </div>
          <div className="inputRow">
            <label htmlFor="matricula">Matrícula</label>
            <input className="inputCadastro" id="matricula" type="text" />
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
            <input className="inputCadastro" id="nome" type="text" style={{width:'400px'}}/>
          </div>
          {/*Lista Cursos*/}
          <div className="inputRow">
          <label htmlFor="cpf">Curso</label>
            <select className="inputCadastro" required style={{width:'140px'}}>
              <option value="mestrado">Mestrado</option>
              <option value="doutorado">Doutorado</option>
            </select>
          </div>
          {/*Lista Orientadores*/}
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
        {/* Quarta linha*/}
        {/*data*/}
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
        </>
      );
    } else if (tipoCadastro === 'professor') {
      return (
        <>
          
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
            <input id="email" type="email" className="inputCadastro" style={{width:'285px'}}/>
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
            <input className="inputCadastro" id="nome" type="text" style={{width:'400px'}}/>
          </div>
          {/*Lista Cursos*/}
          <div className="inputRow">
          <label htmlFor="cpf">Função</label>
            <select className="inputCadastro" required style={{width:'140px'}}>
              <option value="mestrado">Orientador</option>
              <option value="doutorado">Coordenador</option>
            </select>
          </div>
        </div>
        {/* Quarta linha*/}

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
        </>
      );
    }
  };

  return (
    <div className="containerPrincipal">
      <form className="containerCadastro">
        {/* Logo*/}
        <img src={logoPgcop} width={110} />
        
        {/* Botões radiais */}
        <div style={{marginBottom:'10px', marginTop:'15px', fontSize:"18px"}}> Tipo de cadastro: 
          <input style={{marginLeft:'10px', marginRight:'3px'}}
            type="radio"
            id="aluno"
            name="tipoCadastro"
            value="aluno"
            checked={tipoCadastro === 'aluno'}
            onChange={() => handleTipoCadastroChange('aluno')}
          />
          <label htmlFor="aluno" style={{marginRight:'15px'}}>Aluno</label>
          <input style={{marginRight:'3px'}}
            type="radio"
            id="professor"
            name="tipoCadastro"
            value="professor"
            checked={tipoCadastro === 'professor'}
            onChange={() => handleTipoCadastroChange('professor')}
          />
          <label style={{marginRight:'380px'}} htmlFor="professor">Professor</label>
        </div>
        
        {/* Renderiza o formulário de acordo com o cadastro selecionado */}
        {renderFormulario()}
        
        {/* Botão Cadastrar */}
        <div className="buttonCadastro">
          <button onClick={() => window.location.href = "/confirmar-cadastro"} >Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroAluno;