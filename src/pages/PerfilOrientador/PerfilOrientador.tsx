import "./styles.css";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import {
  MdLogout,
  MdOutlineLibraryAdd,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Status } from "@/models/Solicitacao";
import { TarefaBase } from "@/models/TarefaBase";
import { Aluno, Professor } from "@/models/User";
import { useAlunosQueries } from "@/queries/alunos";
import { useProfessoresQueries } from "@/queries/professores";
import { useSolicitacoesQueries } from "@/queries/solicitacoes";
import { useTarefasBaseQueries } from "@/queries/tarefasBase";
import { useUserQueries } from "@/queries/user";

import Solicitacoes from "../../components/Solicitacoes/Solicitacoes";

function PerfilOrientador() {
  const containerRef = useRef(null);

  const { signOut, useGetUser } = useUserQueries();

  const navigate = useNavigate();

  const { useCreateTarefa } = useTarefasBaseQueries();

  const { mutate: createTarefa } = useCreateTarefa();

  const { data: userData } = useGetUser();

  const user = userData as Professor;

  const logoPgcop = "/assets/logoPgcop.png";

  const { useGetSolicitacoes, useUpdateSolicitacao } = useSolicitacoesQueries();

  const { data: solicitacoes = [] } = useGetSolicitacoes({
    orientadorId: user.id,
    status: Status.PENDENTE,
  });

  const { mutate: updatedSolicitacao } = useUpdateSolicitacao();

  const { useGetAlunosOrientador } = useProfessoresQueries();

  const { data: alunos = [] } = useGetAlunosOrientador();

  const { useRemoverOrientador } = useAlunosQueries();

  const { mutate: removerOrientador } = useRemoverOrientador();

  const [showModal, setShowModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno>();
  const [showSolicitacoes, setShowSolicitacoes] = useState(false);

  /* Const Add Tarefas*/
  const [showAddModal, setShowAddModal] = useState(false);
  const [novaTarefaNome, setNovaTarefaNome] = useState("");
  const [novaTarefaPrazo, setNovaTarefaPrazo] = useState(0);
  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState("");
  const [novaTarefaTitulacao, setNovaTarefaTitulacao] =
    useState<TarefaBase["curso"]>("M");

  useEffect(() => {
    if (solicitacoes.length === 0) {
      setShowSolicitacoes(false);
    }
  }, [solicitacoes.length]);

  const handleDoubleClick = (matricula) => {
    const aluno = alunos.find((aluno) => aluno.matricula === matricula);
    if (aluno) {
      navigate(`/perfil-aluno-orientador`);
    }
  };

  const handleDelete = () => {
    removerOrientador(selectedAluno!.id);
    setShowModal(false);
  };

  const handleSolicitacoesClick = () => {
    setShowSolicitacoes(!showSolicitacoes);
  };

  const handleAcceptRequest = (solicitacaoId: number) =>
    updatedSolicitacao({ solicitacaoId, status: Status.ACEITA });

  const handleRemoveRequest = (solicitacaoId: number) =>
    updatedSolicitacao({ solicitacaoId, status: Status.RECUSADA });

  const handleAddTarefa = () => {
    const newTarefa = {
      nome: novaTarefaNome,
      prazo_em_meses: novaTarefaPrazo,
      descricao: novaTarefaDescricao,
      curso: novaTarefaTitulacao,
    };
    createTarefa(newTarefa, {
      onSuccess: () => {
        setShowAddModal(false);
        setNovaTarefaNome("");
        setNovaTarefaPrazo(0);
        setNovaTarefaDescricao("");
        setNovaTarefaTitulacao("M");
      },
    });
  };

  const alunosMestrado = alunos.filter((aluno) => aluno.curso === "M");
  const alunosDoutorado = alunos.filter((aluno) => aluno.curso === "D");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSolicitacoes(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className="contain">
      <div className="containerOrientador">
        <img src={logoPgcop} />
        <div
          className="infoOrientador"
          style={{ justifyContent: "space-between", marginRight: "30px" }}
        >
          <div>
            <h2>{user?.nome}</h2>
            <h3>Orientandos: {alunos.length}</h3>
          </div>
          <div className="botoesToolbar">
            <div style={{ marginTop: "-0.3em" }}>
              <MdOutlinePeopleAlt
                onClick={handleSolicitacoesClick}
                style={{
                  marginRight: "40px",
                  cursor: "pointer",
                  color: solicitacoes.length > 0 ? "red" : "inherit",
                }}
                size={35}
                title="Solicitações"
              />
              {showSolicitacoes && (
                <div ref={containerRef} className="solicitacoesContainer">
                  <Solicitacoes
                    solicitacoes={solicitacoes}
                    handleAcceptRequest={handleAcceptRequest}
                    handleRemoveRequest={handleRemoveRequest}
                  />
                </div>
              )}
            </div>
            <div>
              {/* Botão Adicionar Tarefa */}
              <MdOutlineLibraryAdd
                onClick={() => setShowAddModal(true)}
                style={{ cursor: "pointer", marginRight: "40px" }}
                size={35}
                title="Adicionar Tarefa"
              />
            </div>
            <div>
              <MdLogout
                onClick={signOut}
                style={{ marginRight: "40px", cursor: "pointer" }}
                size={35}
                title="Sair"
              />
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Lista de Orientandos
      </h2>
      <div className="listaAlunos">
        <div className="containerOrientadorOrientandos">
          <ul>
            <h3
              style={{
                marginLeft: "20px",
                marginBottom: "10px",
                padding: "5px",
              }}
            >
              Alunos de Mestrado
            </h3>
            {alunosMestrado.map((aluno) => (
              <li
                style={{ cursor: "pointer", padding: "7px 20px" }}
                key={aluno.id}
                onDoubleClick={() => handleDoubleClick(aluno.matricula)}
              >
                <div>
                  <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula}
                  <br />
                  Conclusão prevista em{" "}
                  {aluno.data_defesa
                    ? format(new Date(aluno.data_defesa), "dd/MM/yyyy")
                    : "-"}
                </div>
                <div>
                  <button
                    className="bttn"
                    onClick={() => handleDoubleClick(aluno.matricula)}
                    style={{
                      marginRight: "10px",
                      marginLeft: "12em",
                      height: "30px",
                      borderRadius: "5px",
                      width: "95px",
                      fontSize: "13px",
                    }}
                  >
                    Abrir
                  </button>
                  <button
                    className="bttn"
                    onClick={() => {
                      setSelectedAluno(aluno);
                      setShowModal(true);
                    }}
                    style={{
                      marginRight: "10px",
                      marginLeft: "12em",
                      height: "30px",
                      borderRadius: "5px",
                      width: "95px",
                      fontSize: "13px",
                    }}
                  >
                    + Tarefa
                  </button>
                  <button
                    className="bttn"
                    onClick={() => {
                      setSelectedAluno(aluno);
                      setShowModal(true);
                    }}
                    style={{
                      marginRight: "10px",
                      height: "30px",
                      borderRadius: "5px",
                      width: "95px",
                      fontSize: "13px",
                    }}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="containerOrientadorOrientandos">
          <ul>
            <h3
              style={{
                marginLeft: "20px",
                marginBottom: "10px",
                padding: "5px",
              }}
            >
              Alunos de Doutorado
            </h3>
            {alunosDoutorado.map((aluno) => (
              <li
                style={{ cursor: "pointer", padding: "7px 20px" }}
                key={aluno.id}
                onDoubleClick={() => handleDoubleClick(aluno.matricula)}
              >
                <div>
                  <strong>{aluno.nome}</strong> Matrícula: {aluno.matricula}{" "}
                  <br />
                  Conclusão prevista em{" "}
                  {aluno.data_defesa
                    ? format(new Date(aluno.data_defesa), "dd/MM/yyyy")
                    : "-"}
                </div>
                <div>
                  <button
                    className="bttn"
                    onClick={() => handleDoubleClick(aluno.matricula)}
                    style={{
                      marginRight: "10px",
                      marginLeft: "12em",
                      height: "30px",
                      borderRadius: "5px",
                      width: "95px",
                      fontSize: "13px",
                    }}
                  >
                    Abrir
                  </button>
                  <button
                    className="bttn"
                    onClick={() => {
                      setSelectedAluno(aluno);
                      setShowModal(true);
                    }}
                    style={{
                      marginRight: "10px",
                      marginLeft: "12em",
                      height: "30px",
                      borderRadius: "5px",
                      width: "95px",
                      fontSize: "13px",
                    }}
                  >
                    + Tarefa
                  </button>
                  <button
                    className="bttn"
                    onClick={() => {
                      setSelectedAluno(aluno);
                      setShowModal(true);
                    }}
                    style={{
                      marginRight: "10px",
                      height: "30px",
                      borderRadius: "5px",
                      width: "95px",
                      fontSize: "13px",
                    }}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showModal && (
        <div className="confirmationBox">
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "8px",
              height: "100px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <p>Tem certeza que deseja remover esse aluno da sua lista?</p>
            <ul style={{ display: "flex" }}>
              <button
                className="bttn"
                onClick={handleDelete}
                style={{ marginRight: "30px", padding: "1px" }}
              >
                Sim
              </button>
              <button
                className="bttn"
                onClick={() => setShowModal(false)}
                style={{ padding: "1px" }}
              >
                Não
              </button>
            </ul>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Tarefa*/}
      {showAddModal && (
        <div className="confirmationBox">
          <div className="modalTarefas" style={{ backgroundColor: "#fff" }}>
            <p style={{ fontWeight: "bold", marginBottom: "2vh" }}>
              Adicionar Nova Tarefa
            </p>
            <label>Nome da Tarefa</label>
            <input
              className="inputContainer"
              type="text"
              value={novaTarefaNome}
              onChange={(e) => setNovaTarefaNome(e.target.value)}
              placeholder="Nome da tarefa"
              style={{
                marginBottom: "10px",
                height: "7%",
                width: "100%",
                padding: "8px",
              }}
            />
            <label>Descrição</label>
            <textarea
              className="inputContainer"
              value={novaTarefaDescricao}
              onChange={(e) => setNovaTarefaDescricao(e.target.value)}
              placeholder="Descrição"
              style={{
                marginBottom: "10px",
                height: "30%",
                width: "100%",
                padding: "8px",
              }}
            />
            <label>Curso</label>
            <select
              className="inputContainer"
              value={novaTarefaTitulacao}
              onChange={(e) =>
                setNovaTarefaTitulacao(e.target.value as TarefaBase["curso"])
              }
              style={{
                marginBottom: "10px",
                height: "7%",
                width: "20%",
                padding: "8px",
              }}
            >
              <option value="M">Mestrado</option>
              <option value="D">Doutorado</option>
            </select>
            <label>Prazo em meses</label>
            <input
              className="inputContainer"
              type="number"
              value={novaTarefaPrazo}
              onChange={(e) => setNovaTarefaPrazo(Number(e.target.value))}
              placeholder="Prazo em meses"
              style={{
                marginBottom: "10px",
                height: "7%",
                width: "10%",
                padding: "8px",
              }}
            />
            <ul style={{ display: "flex" }}>
              <button
                className="bttn"
                onClick={() => setShowAddModal(false)}
                style={{ padding: "1px" }}
              >
                Cancelar
              </button>
              <button
                className="bttn"
                onClick={handleAddTarefa}
                style={{ marginLeft: "5vh", padding: "1px" }}
              >
                Adicionar
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilOrientador;
