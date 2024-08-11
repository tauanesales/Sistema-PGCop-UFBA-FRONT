import "./styles.css";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { MdLogout, MdOutlinePeopleAlt } from "react-icons/md";

import { Status } from "@/models/Solicitacao";
import { Aluno, Professor } from "@/models/User";
import { useAlunosQueries } from "@/queries/alunos";
import { useProfessoresQueries } from "@/queries/professores";
import { useSolicitacoesQueries } from "@/queries/solicitacoes";
import { useUserQueries } from "@/queries/user";

import Solicitacoes from "../../components/Solicitacoes/Solicitacoes";
import { Button, Card, Container, Navbar, Stack } from "react-bootstrap";
import { alunosMock }  from "@/models/mockAlunos";

function PerfilOrientador() {
  const containerRef = useRef(null);

  const { signOut, useGetUser } = useUserQueries();

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
      <Navbar className="containerCoordenador bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/perfil-aluno">
                <img src={logoPgcop} alt="Logo" />
              </Navbar.Brand>
              <Stack direction="horizontal" gap={3} className="infoCoordenador">
                    <Stack className="infoCoordenador">
                        <h2>{user?.nome}</h2>
                        <h3>Orientandos: {alunos.length}</h3>
                    </Stack>
                    <Stack className="botoesToolbarAluno" >
                      <MdOutlinePeopleAlt
                        onClick={() => handleSolicitacoesClick()}
                        style={{
                          cursor: "pointer",
                          color: solicitacoes.length > 0 ? "red" : "inherit",
                        }}
                        size={35}
                        title="Solicitações"
                      />
                      {showSolicitacoes && (
                        <div ref={containerRef} className="solicitacoesContainer" >
                          <Solicitacoes
                            solicitacoes={solicitacoes}
                            handleAcceptRequest={handleAcceptRequest}
                            handleRemoveRequest={handleRemoveRequest}
                          />
                        </div>
                      )}
                      <MdLogout
                        onClick={signOut}
                        style={{ cursor: "pointer" }}
                        size={35}
                        title="Sair"
                      />
                    </Stack>
              </Stack>
            </Container>
        </Navbar>

      <h2>
        Lista de Orientandos
      </h2>
      <div className="listaAlunosCoord">
        <Card className="containerOrientandosCoordenador">
            <h3 style={{textAlign: "center"}}>
              Alunos de Mestrado
            </h3>
            {alunosMestrado.map((aluno) => (
              <Card.Body
                key={aluno.id}
                className="cardAluno"
              >
                 <div className="infoAlunos">
                  <Card.Title>{aluno.nome}</Card.Title> 
                  <p>Matrícula: {aluno.matricula}</p>
                  <p>Conclusão prevista em: 
                  {aluno.data_defesa
                    ? format(new Date(aluno.data_defesa), "dd/MM/yyyy")
                    : " -"}</p>
                </div>
                <div style={{display: "flex", gap: "1em"}}>
                  <Button
                    className="bttnCoordenador bttnVerde"
                    onClick={() => handleDoubleClick(aluno.matricula)}
                  >
                    Abrir
                  </Button>
                  <Button
                    className="bttnCoordenador bttnVermelho"
                    onClick={() => {
                      setSelectedAluno(aluno); // Definir o aluno selecionado como o object
                      setShowModal(true);
                    }}
                  >
                    Remover
                  </Button>
                </div>
              </Card.Body>
            ))}
        </Card>

        <Card className="containerOrientandosCoordenador">
          <h3 style={{textAlign: "center"}}>
            Alunos de Doutorado
          </h3>
          {alunosDoutorado.map((aluno) => (
              <Card.Body
                key={aluno.id}
                className="cardAluno"
              >
                <div className="infoAlunos">
                  <Card.Title>{aluno.nome}</Card.Title> 
                  <p>Matrícula: {aluno.matricula}</p>
                  <p>Conclusão prevista em:  
                  {aluno.data_defesa
                    ? format(new Date(aluno.data_defesa), "dd/MM/yyyy")
                    : " -"}</p>
                </div>
                <div style={{display: "flex", gap: "1em"}}>
                  <Button
                    className="bttnCoordenador bttnVerde"
                    onClick={() => handleDoubleClick(aluno.matricula)}
                  >
                    Abrir
                  </Button>
                  <Button
                    className="bttnCoordenador bttnVermelho"
                    onClick={() => {
                      setSelectedAluno(aluno); // Definir o aluno selecionado como o object
                      setShowModal(true);
                    }}
                  >
                    Remover
                  </Button>
                </div>
              </Card.Body>
            ))}
        </Card>
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
    </div>
  );
}

export default PerfilOrientador;
