import { useState } from "react"; //Lib p/ delimitar tarefas
import "./styles.css"
import Button from "../../components/Button";

function PerfilAluno() {
  const logoPgcomp = "assets/logopgcomp.png"; // Logo

  // A fazer: Att p/ tarefas adicionadas pelo Coordenador
  // A fazer: Alterar Listagem por ID para listagem por prazo mais próximo
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Qualificacao", prazo: "dd/mm/yyyy", feita: false }, //prazo: (data de inicio + 2y) - data atual
    { id: 2, descricao: "Artigo", prazo: "dd/mm/yyyy", feita: false },
    { id: 3, descricao: "Defesa", prazo: "dd/mm/yyyy", feita: false },
    { id: 4, descricao: "Artigo", prazo: "dd/mm/yyyy", feita: false },
    { id: 5, descricao: "Defesa", prazo: "dd/mm/yyyy", feita: false },
    { id: 6, descricao: "Artigo", prazo: "dd/mm/yyyy", feita: false },
    { id: 7, descricao: "Defesa", prazo: "dd/mm/yyyy", feita: false },
  ]);

  // A fazer: Add cores conforme a proximidade do prazo (escala de cor amarelo/laranja/vermelho)
  const handleCheckboxChange = (id) => {
    const updatedTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, feita: !tarefa.feita };
      }
      return tarefa;
    });
    setTarefas(updatedTarefas);
  };

  const tarefasAFazer = tarefas.filter((tarefa) => !tarefa.feita);
  const tarefasFeitas = tarefas.filter((tarefa) => tarefa.feita);

  return (
    <div className="contain">
      <div className="container">
        {/* Logo*/}
          <img src={logoPgcomp}  />
          {/* Informações do perfil */}
          <div className="infoAluno">
            <div className="boxInfoAluno">
              <h3>José Silva José Silva</h3>
              <p><span>Titulação:</span> Mestrado/Doutorado</p>
              <p><span>Data de Inicio:</span> dd/mm/aaaa</p>
              <p><span>Status:</span> Ativo</p>
            </div>
            <div className="boxInfoAluno">
              <h3><span>Matrícula:</span> xxxxxxxxx</h3>
              <p><span>Orientador(a): </span>Augusto Carlos</p>
              <p><span>Data de Término:</span> dd/mm/aaaa</p>
            </div>
      </div>

        <div className="botoesToolbar">
          {/* Botão Atualizar Dados */}
          <Button link={'/atualizar-senha'} label={"Atualizar dados"}/>
          {/* Botão Sair */}
          <Button link={'/'} label={"Sair"}/>

        </div>
      </div>

      {/* Enquadramento Containers Quadro de Tarefa */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around", // Posição container
          width: "1200px",
        }}
      >
        {/* Container 2 - Quadro de Tarefas A fazer */}
        <div
          style={{
            height: "480px",
            width: "38%",
            backgroundColor: "white",
            borderRadius: "10px",
            overflowY: "auto", //Barra de rolagem
          }}
        >
          {/* Conteúdo do segundo container */}
          <h3 style={{ textAlign: "center" }}>TAREFAS A FAZER</h3>
          {tarefasAFazer.map((tarefa) => (
            <div
              id="task"
              key={tarefa.id}
              style={{
                width: "80%",
                margin: "10px 0",
                backgroundColor: "#FFA500",
                marginLeft: "auto",
                marginRight: "auto",
                border: "1px solid grey",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={tarefa.feita}
                onChange={() => handleCheckboxChange(tarefa.id)}
              />
              <label
                style={{
                  marginLeft: "5px",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
                {tarefa.descricao}
              </label>
              <br></br>
              <label style={{ marginLeft: "30px", fontSize: "14px" }}>
                Data Limite: {tarefa.prazo}
              </label>
            </div>
          ))}
        </div>

        {/* Container 3 - Quadro de Tarefas Feito **/}
        <div
          style={{
            height: "480px",
            width: "38%",
            backgroundColor: "white",
            borderRadius: "10px",
            overflowY: "auto", //Barra de rolagem
          }}
        >
          {/* Conteúdo do terceiro container */}
          <h3 style={{ textAlign: "center" }}>TAREFAS FEITAS</h3>
          {tarefasFeitas.map((tarefa) => (
            <div
              id="task"
              key={tarefa.id}
              style={{
                width: "80%",
                margin: "10px 0",
                backgroundColor: "#00BFFF",
                marginLeft: "auto",
                marginRight: "auto",
                border: "1px solid grey",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={tarefa.feita}
                onChange={() => handleCheckboxChange(tarefa.id)}
              />
              <label
                style={{
                  marginLeft: "5px",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
                {tarefa.descricao}
              </label>
              <br></br>
              <label style={{ marginLeft: "30px", fontSize: "14px" }}>
                Data Limite: {tarefa.prazo}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerfilAluno;
