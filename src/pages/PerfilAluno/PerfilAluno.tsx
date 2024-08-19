import "./styles.css";

import { addMonths, differenceInDays, format } from "date-fns";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Navbar,
  Stack,
} from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { IoIosCheckbox } from "react-icons/io";
import { MdEditNote, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import D3Visualization from "@/components/D3Visualization";
import { Tarefa } from "@/models/Tarefa";
import { Aluno, Curso } from "@/models/User";
import { useTarefasQueries } from "@/queries/tarefas";
import { useUserQueries } from "@/queries/user";

function calculateDifferenceInMonthsAndDays(startDate: Date, endDate: Date) {
  const totalDays = differenceInDays(endDate, startDate);
  let months = 0;
  let days = totalDays;

  while (days >= 30) {
    months += 1;
    days -= 30;
  }

  return { months, days, totalDays };
}

function PerfilAluno() {
  const navigate = useNavigate();
  const { signOut } = useUserQueries();
  const { useGetUser } = useUserQueries();
  const { data: userData } = useGetUser();
  const user = userData as Aluno;
  const logoPgcop = "/assets/logoPgcop.png";
  const { useGetTarefaAluno, useConcluirTarefa } = useTarefasQueries();
  const { data: tarefas = [], refetch } = useGetTarefaAluno();
  const { mutate: concluirTarefa } = useConcluirTarefa();

  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [tarefaReversao, setTarefaReversao] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleCheckboxChange = (tarefa: Tarefa) => {
    if (tarefaEmEdicao === tarefa.id) {
      // Se a tarefa já está em edição, limpar o estado de edição
      setTarefaEmEdicao(null);
    } else {
      const { id, concluida } = tarefa;
      if (concluida) {
        setTarefaReversao(id);
        setShowConfirmDialog(true);
      } else {
        setTarefaEmEdicao(id);
      }
    }
  };

  const confirmarReversao = () => {
    if (tarefaReversao !== null) {
      concluirTarefa(
        { data_conclusao: null, id: tarefaReversao, concluida: false },
        {
          onSuccess: () => {
            refetch();
            setTarefaReversao(null);
            setShowConfirmDialog(false); // Certifica que o modal é fechado após a confirmação
          },
          onError: () => {
            setTarefaReversao(null);
            setShowConfirmDialog(false);
          },
        },
      );
    }
  };

  const cancelarReversao = () => {
    setTarefaReversao(null);
    setShowConfirmDialog(false);
  };

  const salvarDataRealizacao = (tarefa: Tarefa) => {
    concluirTarefa(
      {
        id: tarefa.id,
        concluida: true,
        data_conclusao: dataSelecionada,
      },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
    setTarefaEmEdicao(null); // Limpa o estado de tarefa em edição
    setDataSelecionada(new Date().toISOString().split("T")[0]); // Limpa a data selecionada
  };

  const tarefasAFazer = tarefas.filter((tarefa) => !tarefa.concluida);
  const tarefasFeitas = tarefas.filter((tarefa) => tarefa.concluida);

  // Verifica se a data de ingresso está definida e válida
  const dataIngresso = user?.data_ingresso
    ? new Date(user.data_ingresso)
    : null;

  // Gera automaticamente a dataFinal com base no curso
  const dataFinal = dataIngresso
    ? addMonths(dataIngresso, user.curso === "M" ? 24 : 48)
    : null;

  return (
    <div className="contain">
      <div className="containerGeral">
        {user && (
          <Navbar className="containerAluno bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/perfil-aluno">
                <img src={logoPgcop} alt="Logo" />
              </Navbar.Brand>
              <Stack direction="horizontal" gap={3} className="boxAluno">
                <Stack className="boxInfoAluno">
                  <p className="saudacaoAluno">Olá, aluno(a)!</p>
                  <h3>
                    <span>{user.nome}</span>
                  </h3>
                  <p>
                    <span>Titulação:</span> {Curso[user.curso]}
                  </p>
                  <p>
                    <span>Data de início:</span>{" "}
                    {dataIngresso ? format(dataIngresso, "dd/MM/yyyy") : "-"}
                  </p>
                  <p>
                    <span>Status:</span>{" "}
                    {tarefasAFazer.length > 0 ? "Ativo" : "Concluído"}
                  </p>
                </Stack>
                <Stack className="boxInfoAluno">
                  <h3>
                    <span>Matrícula:</span> {user.matricula}
                  </h3>
                  <p>
                    <span>Orientador(a): </span>
                    {user.orientador?.nome ?? "-"}
                  </p>
                  <p>
                    <span>Defesa prevista:</span>{" "}
                    {dataFinal ? format(dataFinal, "dd/MM/yyyy") : "-"}
                  </p>
                  <p>
                    <span>Lattes:</span>
                    <a
                      href={user.lattes}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.lattes}
                    </a>
                  </p>
                </Stack>
                <Stack className="botoesToolbarAluno">
                  <MdEditNote
                    onClick={() => navigate("/perfil-aluno/editar-dados")}
                    style={{ cursor: "pointer" }}
                    size={35}
                    title="Editar dados"
                  />
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
        )}

        {/* Visualização */}
        <D3Visualization
          dataDeInicio={dataIngresso}
          dataFinal={dataFinal}
          dataAtual={new Date()}
          tarefas={tarefas}
          curso={Curso[user.curso]}
        />

        {/* Div Mouseover */}
        <div
          id="tooltip"
          style={{
            display: "none",
            position: "fixed",
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid black",
            borderEndEndRadius: "15px",
          }}
        ></div>

        <div className="tarefasAluno">
          <Card className="boxTarefas">
            <Card.Body>
              <Card.Title className="titleTarefas">Tarefas a fazer</Card.Title>
              {tarefasAFazer.map((tarefa) => {
                const prazo = new Date(tarefa.data_prazo);
                const { months, days, totalDays } =
                  calculateDifferenceInMonthsAndDays(new Date(), prazo);

                let backgroundColor;
                if (totalDays < 0) {
                  backgroundColor = "#f8bebe"; // Red for overdue tasks
                } else if (totalDays <= 90) {
                  backgroundColor = "#f7c6b3"; // Orange for tasks within 90 days
                } else {
                  backgroundColor = "#f3eab8"; // Yellow for other tasks
                }

                const statusData =
                  totalDays === 0
                    ? "a tarefa vence hoje"
                    : totalDays > 0
                      ? months > 0
                        ? days === 0
                          ? `${months} mes${months > 1 ? "es" : ""} restante${
                              months > 1 ? "s" : ""
                            }`
                          : `${months} mes${months > 1 ? "es" : ""} e ${days} dia${
                              days > 1 ? "s" : ""
                            } restante${months > 1 || days > 1 ? "s" : ""}`
                        : `${days} dia${days > 1 ? "s" : ""} restante${
                            days > 1 ? "s" : ""
                          }`
                      : `${-totalDays} dia${-totalDays > 1 ? "s" : ""} em atraso`;

                return (
                  <Alert
                    style={{ backgroundColor: backgroundColor }}
                    className="cardTarefa"
                    id="task"
                    key={tarefa.id}
                  >
                      <div className="iconeCard">
                        <AiOutlineEdit
                          onClick={() => handleCheckboxChange(tarefa)}
                          style={{ cursor: "pointer" }}
                          size={20}
                          title="Editar"
                        />
                        <h4>{tarefa.nome}</h4>
                      </div>
                      {tarefaEmEdicao === tarefa.id && (
                        <div className="boxDate">
                          <Form.Group className="boxDate">
                            <Form.Label>Data de realização:</Form.Label>
                            <Form.Control
                              size="sm"
                              type="date"
                              className="dateInput"
                              value={dataSelecionada}
                              onChange={(e) =>
                                setDataSelecionada(e.target.value)
                              }
                            />
                            <Button
                              className="saveButton"
                              onClick={() => salvarDataRealizacao(tarefa)}
                            >
                              Salvar
                            </Button>
                          </Form.Group>
                        </div>
                      )}
                  
                      <p>
                        {tarefa.descricao}
                      </p>
                      <p>
                        Data Limite: {format(prazo, "dd/MM/yyyy")} - {statusData}
                      </p>
                  </Alert>
                );
              })}
            </Card.Body>
          </Card>
          <Card className="boxTarefas">
            <Card.Body>
              <Card.Title className="titleTarefas">
                Tarefas concluídas
              </Card.Title>
              {tarefasFeitas.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "70px",
                    fontSize: "25px",
                    fontWeight: "600",
                    color: "lightgrey",
                  }}
                >
                  Ainda não existem tarefas concluídas
                </p>
              ) : (
                tarefasFeitas.map((tarefa) => {
                  const prazo = new Date(tarefa.data_prazo);
                  const realizacao = tarefa.data_conclusao
                    ? new Date(tarefa.data_conclusao)
                    : null;
                  if (realizacao) {
                    realizacao.setDate(realizacao.getDate() + 1);
                  }

                  return (
                    <Alert
                      style={{
                        backgroundColor: "#b5ffbd",
                      }}
                      className="cardTarefa"
                      key={tarefa.id}
                    >
                      <div className="iconeCard">
                        <IoIosCheckbox
                          size={20}
                          onClick={() => handleCheckboxChange(tarefa)}
                          style={{ cursor: "pointer" }}
                        />
                        <h4>{tarefa.nome}</h4>
                      </div>
                      <p>
                        {tarefa.descricao}  
                      </p>
                      <div className="iconeCard">
                        <p>
                          Prazo: {format(prazo, "dd/MM/yyyy")} -
                        </p>
                        <p>
                          Realizada em:{" "}
                          {realizacao ? format(realizacao, "dd/MM/yyyy") : "-"}
                        </p>
                      </div>
                    </Alert>
                  );
                })
              )}
            </Card.Body>
          </Card>
        </div>

        {showConfirmDialog && (
          <div className="confirmDialog">
            <p>Tem certeza que deseja reverter a tarefa para "Tarefas a fazer"?</p>
            <div className="buttonContainer">
              <Button className="bttnCoordenador bttnVermelho" onClick={cancelarReversao}>
                Cancelar
              </Button>
              <Button className="bttnCoordenador bttnVerde" onClick={confirmarReversao}>
                Reverter
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerfilAluno;
