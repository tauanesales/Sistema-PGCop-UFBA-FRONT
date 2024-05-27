import "./styles.css";

import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineFileExcel } from "react-icons/ai";
import { MdEditNote, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Tarefa } from "@/models/Tarefa";
import { useTarefasQueries } from "@/queries/tarefas";
import { useUserQueries } from "@/queries/user";

function PerfilAluno() {
  const navigate = useNavigate();

  const { signOut } = useUserQueries();

  const logoPgcop = "/assets/logoPgcop.png";

  const dataDeInicio = new Date("2023-03-01"); // Data de Início do aluno

  const [dataAtual, setDataAtual] = useState(new Date()); // Data atual

  const { useGetTarefaAluno, useUpdateTarefa } = useTarefasQueries();

  const { data: tarefas = [] } = useGetTarefaAluno();

  const { mutate: updateTarefa } = useUpdateTarefa();

  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);

  const handleCheckboxChange = (tarefa: Tarefa) => {
    const { id, completada } = tarefa;

    if (completada) {
      updateTarefa({ ...tarefa, id, completada: 0, data_conclusao: null });
    } else {
      setTarefaEmEdicao(id);
    }
  };

  const salvarDataRealizacao = (tarefa: Tarefa) => {
    updateTarefa({
      ...tarefa,
      completada: 1,
      data_conclusao: dataSelecionada,
    });

    setTarefaEmEdicao(null); // Limpa o estado de tarefa em edição
    setDataSelecionada(null); // Limpa a data selecionada
  };

  const tarefasOrdenadas = [...tarefas].sort((a, b) => {
    const prazoA = new Date(
      dataDeInicio.getFullYear(),
      dataDeInicio.getMonth() + a.prazoMeses,
      dataDeInicio.getDate(),
    );
    const prazoB = new Date(
      dataDeInicio.getFullYear(),
      dataDeInicio.getMonth() + b.prazoMeses,
      dataDeInicio.getDate(),
    );
    return prazoA - prazoB;
  });

  const tarefasAFazer = tarefasOrdenadas.filter((tarefa) => !tarefa.completada);
  const tarefasFeitas = tarefasOrdenadas.filter((tarefa) => tarefa.completada);

  useEffect(() => {
    const timer = setInterval(() => {
      setDataAtual(new Date());
    }, 86400000); // Atualiza a data atual todos os dias
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="contain">
      <div className="containerAluno">
        <div className="infoAluno">
          <img src={logoPgcop} alt="Logo" />
          <div className="boxInfoAluno">
            <h3>José Silva José Silva</h3>
            <p>
              <span>Titulação:</span> Mestrado/Doutorado
            </p>
            <p>
              <span>Data de Inicio:</span> {dataDeInicio.toLocaleDateString()}
            </p>
            <p>
              <span>Status:</span> Ativo
            </p>
          </div>
          <div className="boxInfoAluno">
            <h3>
              <span>Matrícula:</span> xxxxxxxxx
            </h3>
            <p>
              <span>Orientador(a): </span>Augusto Carlos
            </p>
            <p>
              <span>Término Previsto:</span>{" "}
              {new Date(
                dataDeInicio.getFullYear() + 3,
                dataDeInicio.getMonth(),
                dataDeInicio.getDate(),
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="botoesToolbar">
          <MdEditNote
            onClick={() => navigate("/perfil-aluno/atualizar-dados")}
            style={{ cursor: "pointer", marginRight: "40px" }}
            size={35}
            title="Atualizar dados"
          />
          <MdLogout
            onClick={signOut}
            style={{ cursor: "pointer", marginRight: "40px" }}
            size={35}
            title="Sair"
          />
        </div>
      </div>

      <div className="tarefasAluno">
        <div className="boxTarefas">
          <h3 style={{ textAlign: "center" }}>TAREFAS A FAZER</h3>
          {tarefasAFazer.map((tarefa) => {
            const prazo = new Date(
              dataDeInicio.getFullYear(),
              dataDeInicio.getMonth() + tarefa.prazoMeses,
              dataDeInicio.getDate(),
            );
            const diasRestantes = Math.ceil(
              (prazo - dataAtual) / (1000 * 60 * 60 * 24),
            );
            let backgroundColor;
            if (diasRestantes <= 90) {
              backgroundColor = "#ff9999";
            } else if (diasRestantes <= 180) {
              backgroundColor = "#ffb394";
            } else {
              backgroundColor = "#fff2a7";
            }

            return (
              <div
                id="task"
                key={tarefa.id}
                style={{ backgroundColor: backgroundColor }}
              >
                <AiOutlineEdit // Marcador icone
                  onClick={() => handleCheckboxChange(tarefa)}
                  style={{
                    cursor: "pointer",
                    marginLeft: "5px",
                    marginRight: "10px",
                  }}
                  size={20}
                  title="Editar"
                />
                <label
                  style={{
                    marginLeft: "5px",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
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
                      <button
                        onClick={() => salvarDataRealizacao(tarefa)}
                        style={{
                          marginLeft: "25px",
                          width: "70px",
                          height: "25px",
                          borderRadius: "5px",
                          fontSize: "13px",
                        }}
                      >
                        Salvar
                      </button>
                    </label>
                  </>
                )}
                <br></br>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  {tarefa.descricao}
                  <br></br>
                </label>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  Data Limite: {prazo.toLocaleDateString()} - {diasRestantes}{" "}
                  dias restantes
                </label>
              </div>
            );
          })}
        </div>

        <div className="boxTarefas">
          <h3 style={{ textAlign: "center" }}>TAREFAS REALIZADAS</h3>
          {tarefasFeitas.map((tarefa) => {
            const prazo = new Date(
              dataDeInicio.getFullYear(),
              dataDeInicio.getMonth() + tarefa.prazoMeses,
              dataDeInicio.getDate(),
            );
            return (
              <div
                id="task"
                key={tarefa.id}
                style={{ backgroundColor: "#ADD8E6" }}
              >
                <AiOutlineFileExcel // Marcador icone
                  onClick={() => handleCheckboxChange(tarefa)}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  size={20}
                  title="Desfazer"
                />
                <label
                  style={{
                    marginLeft: "15px",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  {tarefa.nome}
                </label>
                <br></br>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  {tarefa.descricao}
                  <br></br>
                </label>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  Realizada em:{" "}
                  {tarefa.data_conclusao
                    ? new Date(tarefa.data_conclusao).toLocaleDateString()
                    : "-"}
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
