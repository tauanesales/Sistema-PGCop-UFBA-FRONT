import { useState, useEffect, useRef } from "react";
import * as d3 from "d3"; // Importando D3.js
import "./styles.css";
import { MdEditNote, MdLogout } from 'react-icons/md';
import { AiOutlineEdit , AiOutlineFileExcel } from 'react-icons/ai'; 

const logoPgcop = "/assets/logoPgcop.png";
const flagGreen = "/assets/flagGreen.png";
const flagBlack = "/assets/flagBlack.png";

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
    setAluno(idAluno[0]); // Define o primeiro aluno da lista
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
    }, 86400000); // Atualiza data atual todos os dias
    return () => {
      clearInterval(timer);
    };
  }, []);



  
  useEffect(() => {
    const ultimaTarefa = tarefas.reduce((prev, current) => (prev.prazoMeses > current.prazoMeses) ? prev : current);
    const prazoUltimaTarefa = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + ultimaTarefa.prazoMeses, dataDeInicio.getDate());
  
    // Dimensões container
    const margin = { top: 0, right: 40, bottom: 60, left: 40 };
    const width = 1200 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

      // Construção da escala horizontal e preparação p zoom 
    let currentScale = "mes";
    let timeInterval = d3.timeMonth.every(1);
    let timeFormat = "%b %Y";
  
    const timeScale = d3.scaleTime()
      .domain([dataDeInicio, prazoUltimaTarefa])
      .range([0, width]);
  
    function updateTimeScale(scale) {
      switch (scale) {
        case "ano":
          timeInterval = d3.timeYear.every(1);
          timeFormat = "%Y";
          break;
        case "mes":
          timeInterval = d3.timeMonth.every(1);
          timeFormat = "%b %Y";
          break;
        case "semana":
          timeInterval = d3.timeWeek.every(1);
          timeFormat = "%b %d, %Y";
          break;
        default:
          break;
      }
      const ticks = timeScale.ticks(timeInterval);
  
      svg.selectAll(".date-mark").remove();
      svg.selectAll(".date-text").remove();
  
        // ticks e legenda escala horizontal
      svg.selectAll(".date-mark")
        .data(ticks)
        .enter().append("line")
        .attr("class", "date-mark")
        .attr("x1", d => timeScale(d))
        .attr("y1", height)
        .attr("x2", d => timeScale(d))
        .attr("y2", height + 7)
        .style("stroke", "grey")
        .style("stroke-width", 1);
  
      svg.selectAll(".date-text")
        .data(ticks)
        .enter().append("text")
        .attr("class", "date-text")
        .attr("x", d => timeScale(d))
        .attr("y", height + 20)
        .text(d3.timeFormat(timeFormat))
        .style("fill", "grey")
        .style("font-size", "10px")
        .style("text-anchor", "middle");
    }
  
      // zoom e pan escala horizontal
    const zoom = d3.zoom()
      .scaleExtent([1, 100])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", zoomed);
  
    function zoomed(event) {
      const transform = event.transform;
      const newXScale = transform.rescaleX(timeScale);
  
      svg.selectAll(".date-mark")
        .attr("x1", d => newXScale(d))
        .attr("x2", d => newXScale(d));
      svg.selectAll(".date-text")
        .attr("x", d => newXScale(d));
      svg.selectAll(".tarefa-a-fazer")
        .attr("x", (tarefa, index) => {
          const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + tarefa.prazoMeses, dataDeInicio.getDate());
          return newXScale(prazo) - 10 + (index * 5);
        });
  
      svg.selectAll(".barra-progresso")
        .attr("width", width * transform.k)
        .attr("transform", `translate(${transform.x},0)`);
  
      svg.selectAll(".progresso")
        .attr("width", progressoWidth * transform.k)
        .attr("transform", `translate(${transform.x},0)`);
    }
  
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("cursor", "ew-resize")
      .call(zoom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      // Linha escala horizontal
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", width)
      .attr("y2", height)
      .style("stroke", "grey")
      .style("stroke-width", 1);
  
    updateTimeScale(currentScale);
  
      // Add ícones de tarefa conforme a escala
    svg.selectAll(".tarefa-a-fazer")
      .data(tarefas)
      .enter().append("image")
      .attr("class", "tarefa-a-fazer")
      .attr("cursor", "pointer")
      .attr("x", (tarefa, index) => {
        const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + tarefa.prazoMeses, dataDeInicio.getDate());
        return timeScale(prazo) - 10 + (index * 5);
      })
      .attr("y", height - 60)
      .attr("width", 30)
      .attr("height", 30)
      .attr("xlink:href", (tarefa) => tarefa.feita ? flagGreen : flagBlack)
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
  
      // Barra temporal curso
    svg.append("rect")
      .attr("class", "barra-progresso")
      .attr("x", 0)
      .attr("y", height - 25)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", width)
      .attr("height", 12)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", 0.3);

      // Barra de progresso
    const progresso = svg.append("rect")
      .attr("class", "progresso")
      .attr("x", 0)
      .attr("y", height - 25)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 0)
      .attr("height", 12)
      .style("fill", "#84bf68");
  
    const tempoDecorrido = dataAtual - dataDeInicio;
    const progressoPorcentagem = (tempoDecorrido / (prazoUltimaTarefa - dataDeInicio));
    const progressoWidth = progressoPorcentagem * width;
    progresso.attr("width", progressoWidth);
  
    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, [dataAtual, tarefas]);
  
  

  
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
        <svg ref={svgRef}></svg>
        <div id="tooltip" 
          style={{ display: "none", position: "fixed", backgroundColor: "white", padding: "5px", border: "1px solid black", borderEndEndRadius:"15px" }}>
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
                          value={dataSelecionada || ""} // Garante que o valor seja uma string ou uma string vazia
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