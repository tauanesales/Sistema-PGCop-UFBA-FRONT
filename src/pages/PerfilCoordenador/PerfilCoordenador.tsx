import "./styles.css";

import { useEffect, useRef, useState } from "react";
import { MdGroupAdd, MdLogout, MdOutlineLibraryBooks } from "react-icons/md"; // Importando ícones
import { useNavigate } from "react-router-dom";

import Solicitacoes from "@/components/Solicitacoes/Solicitacoes";
import { Status } from "@/models/Solicitacao";
import { Aluno, Professor } from "@/models/User";
import { useAlunosQueries } from "@/queries/alunos";
import { useProfessoresQueries } from "@/queries/professores";
import { useSolicitacoesQueries } from "@/queries/solicitacoes";
import { useUserQueries } from "@/queries/user";

function PerfilCoordenador() {
  const logoPgcop = "/assets/logoPgcop.png";
  const containerRef = useRef(null);

  const navigate = useNavigate();

  const { signOut, useGetUser } = useUserQueries();

  const { data: userData } = useGetUser();

  const user = userData as Professor;

  const { useGetSolicitacoes, useUpdateSolicitacao } = useSolicitacoesQueries();

  const { data: solicitacoes = [] } = useGetSolicitacoes({
    orientadorId: user.id,
    status: Status.PENDENTE,
  });

  const { mutate: updatedSolicitacao } = useUpdateSolicitacao();

  const handleAcceptRequest = (solicitacaoId: number) =>
    updatedSolicitacao({ solicitacaoId, status: Status.ACEITA });

  const handleRemoveRequest = (solicitacaoId: number) =>
    updatedSolicitacao({ solicitacaoId, status: Status.RECUSADA });

  const alunosData = [
    {
      id: 1,
      nome: "Vini Silva",
      matricula: "2022001",
      titulacao: "Mestrado",
      datafinal: "03/05/2024",
    },
    {
      id: 8,
      nome: "Claudio Silva",
      matricula: "2022001",
      titulacao: "Mestrado",
      datafinal: "03/05/2024",
    },
    {
      id: 9,
      nome: "Savio Silva",
      matricula: "2022001",
      titulacao: "Mestrado",
      datafinal: "03/05/2024",
    },
    {
      id: 10,
      nome: "João Silva",
      matricula: "2022001",
      titulacao: "Mestrado",
      datafinal: "03/05/2024",
    },
    {
      id: 2,
      nome: "Tauane Souza",
      matricula: "2022002",
      titulacao: "Doutorado",
      datafinal: "18/05/2027",
    },
    {
      id: 3,
      nome: "Mario Souza",
      matricula: "2022003",
      titulacao: "Mestrado",
      datafinal: "15/05/2024",
    },
    {
      id: 4,
      nome: "Ana Clara",
      matricula: "2022004",
      titulacao: "Doutorado",
      datafinal: "03/07/2027",
    },
    {
      id: 5,
      nome: "Pedro Henrique",
      matricula: "2022005",
      titulacao: "Mestrado",
      datafinal: "03/012/2025",
    },
    {
      id: 6,
      nome: "Carlos Eduardo",
      matricula: "2022006",
      titulacao: "Doutorado",
      datafinal: "03/05/2026",
    },
    {
      id: 7,
      nome: "Roberta Santos",
      matricula: "2022007",
      titulacao: "Mestrado",
      datafinal: "03/08/2025",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [showSolicitacoes, setShowSolicitacoes] = useState(false);

  useEffect(() => {
    if (solicitacoes.length === 0) {
      setShowSolicitacoes(false);
    }
  }, [solicitacoes.length]);

  const handleDoubleClick = (matricula) => {
    const aluno = alunos.find((aluno) => aluno.matricula === matricula);
    if (aluno) {
      window.open(`/perfil-aluno`);
    }
  };

  const handleDelete = () => {
    updateAluno({ id: selectedAluno!.id, orientador_id: null });
    setShowModal(false);
    setSelectedAluno(null); // Limpar o aluno selecionado após a remoção
  };

  const handleSolicitacoesClick = () => {
    setShowSolicitacoes(!showSolicitacoes);
  };

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

  // Separa os alunos baseados na titulação
  const alunosMestrado = alunos.filter((aluno) => aluno.curso === "M");
  const alunosDoutorado = alunos.filter((aluno) => aluno.curso === "D");

  return (
    <div className="contain">
      <div className="containerCoordenador">
        {/* Logo*/}
        <img src={logoPgcop} alt="Logo" />
        {/* Informações do perfil */}
        <div
          className="infoCoordenador"
          style={{ justifyContent: "space-between", marginRight: "30px" }}
        >
          <div>
            <h2>{user?.nome}</h2>
            <h3>Orientandos: {alunos.length}</h3>
          </div>
          {/* Botões Toolbar */}
          <div>
            <div style={{ marginTop: "-0.3em" }}>
              <MdGroupAdd
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
              <MdOutlineLibraryBooks
                onClick={() => navigate("/tarefas")}
                style={{ cursor: "pointer", marginRight: "45px" }}
                size={35}
                title="Tarefas"
              />
            </div>
            <div>
              <MdLogout
                onClick={signOut}
                style={{ cursor: "pointer", marginRight: "30px" }}
                size={35}
                title="Sair"
              />
            </div>
          </div>
        </div>
      </div>

      <h2
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "10px" }}
      >
        Lista de Orientandos
      </h2>
      {/* Container de Alunos Orientados - Mestrado */}
      <div className="listaAlunos">
        <div className="containerOrientandosCoordenador">
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
                  <strong>{aluno.nome}</strong> Matrícula: {aluno.matricula}{" "}
                  <br />
                  Conclusão prevista em {aluno.datafinal}
                </div>
                <div>
                  <button
                    className="bttn"
                    onClick={() => handleDoubleClick(aluno.matricula)}
                    style={{
                      marginRight: "10px",
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

        {/* Container de Alunos Orientados - Doutorado */}
        <div className="containerOrientandosCoordenador">
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
                  Conclusão prevista em {aluno.datafinal}
                </div>
                <div>
                  <button
                    className="bttn"
                    onClick={() => handleDoubleClick(aluno.matricula)}
                    style={{
                      marginRight: "10px",
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
                      setSelectedAluno(aluno); // Definir o aluno selecionado como o object
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

      {/* Modal de confirmação */}
      {showModal && (
        <div className="confirmationBox">
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <p>Tem certeza que deseja remover esse aluno da sua lista?</p>
            <ul style={{ display: "flex" }}>
              <button
                className="bttn"
                onClick={handleDelete}
                style={{ marginRight: "30px", padding: "10px" }}
              >
                Sim
              </button>
              <button
                className="bttn"
                onClick={() => setShowModal(false)}
                style={{ padding: "10px" }}
              >
                Não
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilCoordenador;
