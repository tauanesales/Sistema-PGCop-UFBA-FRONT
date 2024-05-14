import { useState, useEffect, useRef } from "react";
import * as d3 from "d3"; // Importando D3.js
import "./styles.css";
import { MdEditNote, MdLogout } from 'react-icons/md';
import { AiOutlineEdit , AiOutlineFileExcel } from 'react-icons/ai'; 

const logoPgcop = "/assets/logoPgcop.png";

function PerfilAluno() {

  // Definição das tarefas
  const [tarefas, setTarefas] = useState([
    { id: 1, nome: "Qualificacao", prazoMeses: 24, descricao: "Apresentação e defesa do projeto de pesquisa.", feita: false },
    { id: 2, nome: "Artigo", prazoMeses: 24, descricao: "Elaborar e submeter um artigo científico.", feita: false },
    { id: 3, nome: "Estágio", prazoMeses: 18, descricao: "Concluir o estágio obrigatório.", feita: false },
    { id: 4, nome: "Defesa", prazoMeses: 24, descricao: "", feita: false },
    { id: 5, nome: "Exame de Proficiência em Língua Estrangeira", prazoMeses: 16, descricao: "Aprovação em exame de proficiência em língua estrangeira.", feita: false },
    { id: 6, nome: "Carga Horária Básica", prazoMeses: 15, descricao: "Cumprir a carga horária mínima de disciplinas obrigatórias.", feita: false },
  ]);

  const idAluno = [
    { id: 1, nome: 'João Silva', matricula: '2022001', titulacao: 'Mestrado', datainicio: '2024-0-01', orientador:'Frederico Durão' },
  ];
  
    // Definindo as datas de início e atual
    const dataDeInicio = new Date("2023-03-01");
    const [dataAtual, setDataAtual] = useState(new Date());
    const [aluno, setAluno] = useState(null); // Estado para armazenar os dados do aluno
    const svgRef = useRef();
  

  // Atualiza o estado do aluno assim que o componente é montado
  useEffect(() => {
    setAluno(idAluno[0]); // Defina o primeiro aluno da lista
  }, []);

  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);

  const handleCheckboxChange = (id) => {
    const updatedTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        if (tarefa.feita) {
          return { ...tarefa, feita: false, dataRealizacao: null };
        } else {
          setTarefaEmEdicao(id);
          return tarefa;
        }
      }
      return tarefa;
    });
    setTarefas(updatedTarefas);
  };

  const salvarDataRealizacao = (id) => {
    const updatedTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, feita: true, dataRealizacao: dataSelecionada };
      }
      return tarefa;
    });
    setTarefas(updatedTarefas);
    setTarefaEmEdicao(null); // Limpa o estado de tarefa em edição
    setDataSelecionada(null); // Limpa a data selecionada
  };

  const tarefasOrdenadas = [...tarefas].sort((a, b) => {
    const prazoA = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + a.prazoMeses, dataDeInicio.getDate());
    const prazoB = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + b.prazoMeses, dataDeInicio.getDate());
    return prazoA - prazoB;
  });

  const tarefasAFazer = tarefasOrdenadas.filter((tarefa) => !tarefa.feita);
  const tarefasFeitas = tarefasOrdenadas.filter((tarefa) => tarefa.feita);

  useEffect(() => {
    const timer = setInterval(() => {
      setDataAtual(new Date());
    }, 86400000); // Atualiza a data atual todos os dias
    return () => {
      clearInterval(timer);
    };
  }, []);
  

  useEffect(() => {
    // prazo das tarefas
    const ultimaTarefa = tarefas.reduce((prev, current) => (prev.prazoMeses > current.prazoMeses) ? prev : current);
    const prazoUltimaTarefa = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + ultimaTarefa.prazoMeses, dataDeInicio.getDate());
  
    const margin = { top: 20, right: 40, bottom: 60, left: 40 };
    const width = 900 - margin.left - margin.right;
    const height = 50 - margin.top - margin.bottom;
  
    // área de desenho
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

    // Adicionando icones de tarefas
    svg.selectAll(".tarefa-a-fazer")
      .data(tarefasAFazer)
      .enter().append("rect")
      .attr("class", "tarefa-a-fazer")
      .attr("x", (tarefa, index) => {
        const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + tarefa.prazoMeses, dataDeInicio.getDate());
        const xPosition = (prazo - dataDeInicio) / (prazoUltimaTarefa - dataDeInicio) * width - 10;
        return xPosition - 1  -index * 15; // Ajuste horizontal para evitar oclusão
      })
      .attr("y", height)
      .attr("width", 10)
      .attr("height", 20)
      .attr("fill", "red")
        .on("mouseover", function(event, d) {
          const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + d.prazoMeses, dataDeInicio.getDate());
          const tooltip = d3.select("#tooltip");
          tooltip
            .style("display", "block")
            .html(`<strong>${d.nome}</strong><br>Data Limite: ${prazo.toLocaleDateString()}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 60) + "px")
            .style("position", "absolute");
        })
        .on("mouseout", function() {
          d3.select("#tooltip").style("display", "none");
        });
    


    // barra de tempo
    svg.append("rect")
      .attr("class", "barra-progresso")
      .attr("x", 0)
      .attr("y", height + 25) // Ajuste vertical para colocar abaixo dos quadrados
      .attr("width", width) // Largura 
      .attr("height", 10)
      .style("fill", "none") // Cor de preenchimento 
      .style("stroke", "black") // Cor da borda
      .style("stroke-width", 0.3); // Largura da borda
      
    // Barra de progresso
    svg.append("rect")
      .attr("class", "progresso")
      .attr("x", 0)
      .attr("y", height + 25) 
      .attr("width", 0) 
      .attr("height", 10)
      .style("fill", "green"); 
  
    // Adiciona data de início e data de fim
    const dataInicioText = d3.timeFormat("%d/%m/%Y")(dataDeInicio);
    const dataFimText = d3.timeFormat("%d/%m/%Y")(prazoUltimaTarefa);
    svg.append("text")
      .attr("x", 0)
      .attr("y", height + 50) 
      .text(dataInicioText)
      .style("font-size", "10px");
  
    svg.append("text")
      .attr("x", width -30)
      .attr("y", height + 50) 
      .text(dataFimText)
      .style("font-size", "10px");
  
    // Atualizando a barra de progresso
    const progresso = svg.select(".progresso");
  
    // Atualização contínua do progresso com base no tempo decorrido
    const timer = setInterval(() => {
      const tempoDecorrido = dataAtual - dataDeInicio;
      const progressoPorcentagem = (tempoDecorrido / (prazoUltimaTarefa - dataDeInicio));
      const progressoWidth = progressoPorcentagem * width;
      progresso.attr("width", progressoWidth);
    }, 1000);
  
    // Atualizando o estado da data atual
    const dataInicial = new Date(dataDeInicio);
    const tempoDecorridoInicial = dataAtual - dataInicial;
    const progressoInicial = (tempoDecorridoInicial / (prazoUltimaTarefa - dataInicial)) * width;
    progresso.attr("width", progressoInicial);
  
    const dataInicialSeconds = dataInicial.getSeconds();
    const msUntilNextSecond = 1000 - dataInicialSeconds * 1000;
  
    setTimeout(() => {
      setDataAtual(new Date());
    }, msUntilNextSecond);
  
    return () => clearInterval(timer);
  }, [tarefas]);



  
  
  return (
    <div className="contain">
      <div className="containerAluno">
        <div className="infoAluno">
          <img src={logoPgcop} alt="Logo" />
          {aluno && ( // Verifica se o aluno foi carregado
            <div className="boxInfoAluno">
              <h3>{aluno.nome}</h3>
              <p><span>Titulação:</span> {aluno.titulacao}</p>
              <p><span>Data de Inicio:</span> {aluno.datainicio}</p>
              <p><span>Status:</span> Ativo</p>
            </div>
          )}
          <div className="boxInfoAluno">
            <h3><span>Matrícula:</span> {aluno && aluno.matricula}</h3>
            <p><span>Orientador(a): </span>{aluno && aluno.orientador}</p>
            <p><span>Término Previsto:</span> {new Date(dataDeInicio.getFullYear() + 3, dataDeInicio.getMonth(), dataDeInicio.getDate()).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="botoesToolbar">
          <MdEditNote onClick={() => window.location.href = "/perfil-aluno/atualizar-dados"} 
            style={{ cursor: 'pointer', marginRight:"40px" }} 
            size={35} 
            title="Atualizar dados" 
          />
          <MdLogout onClick={() => window.location.href = "/"} 
            style={{ cursor: 'pointer', marginRight:"40px" }} 
            size={35} 
            title="Sair" 
          />
        </div>
      </div>

      {/* visualização */}
      <div className="vis">
        <svg ref={svgRef}></svg>
        <div id="tooltip" 
          style={{ display: "none", position: "fixed", backgroundColor: "white", padding: "5px", border: "1px solid black", borderEndEndRadius:"15px" }}>
        </div>
      </div>


      <div className="tarefasAluno" >
        <div className="boxTarefas" >
          <h3 style={{ textAlign: "center" }}>TAREFAS A FAZER</h3>
          {tarefasAFazer.map((tarefa) => {
            const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + tarefa.prazoMeses, dataDeInicio.getDate());
            const diasRestantes = Math.ceil((prazo - dataAtual) / (1000 * 60 * 60 * 24));
            let backgroundColor;
            if (diasRestantes <= 90) {
              backgroundColor = "#ff9999"; 
            } else if (diasRestantes <= 180) {
              backgroundColor = "#ffb394";
            } else {
              backgroundColor = "#fff2a7";
            }

            return (
              <div id="task" key={tarefa.id} style={{ backgroundColor: backgroundColor,}}>
                <AiOutlineEdit // Marcador icone
                  onClick={() => handleCheckboxChange(tarefa.id)}
                  style={{ cursor: 'pointer', marginLeft: '5px', marginRight: "10px" }}
                  size={20}  
                  title="Editar"
                />
                <label style={{marginLeft: "5px",fontSize: "18px",fontWeight: "500",}}>
                  {tarefa.nome}
                </label>
                {tarefaEmEdicao === tarefa.id && (
                  <>
                    <br />
                    <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                      Data de realização:
                      <input
                        type="date"
                        value={dataSelecionada}
                        onChange={(e) => setDataSelecionada(e.target.value)}
                        style={{ marginLeft: "25px" }}
                      />
                      <button onClick={() => salvarDataRealizacao(tarefa.id)} 
                      style={{marginLeft:"25px",width:'70px', height:'25px', borderRadius: '5px', fontSize: "13px"}}>Salvar</button>
                    </label>
                  </>
                )}
                <br></br>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  {tarefa.descricao}<br></br>
                </label>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  Data Limite: {prazo.toLocaleDateString()} - {diasRestantes} dias restantes
                </label>
              </div>
            );
          })}
        </div>

        <div className="boxTarefas">
          <h3 style={{ textAlign: "center" }}>TAREFAS REALIZADAS</h3>
          {tarefasFeitas.map((tarefa) => {
            const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + tarefa.prazoMeses, dataDeInicio.getDate());
            return (
              <div id="task" key={tarefa.id}style={{backgroundColor: "#ADD8E6",}}>
                <AiOutlineFileExcel // Marcador icone
                  onClick={() => handleCheckboxChange(tarefa.id)}
                  style={{ cursor: 'pointer' , marginLeft: "5px"  }}
                  size={20} 
                  title="Desfazer"
                />
                <label style={{marginLeft: "15px",fontSize: "18px",fontWeight: "500",}}>
                  {tarefa.nome}
                </label>
                <br></br>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  {tarefa.descricao}<br></br>
                </label>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                    Realizada em: {new Date(tarefa.dataRealizacao).toLocaleDateString()}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PerfilAluno;