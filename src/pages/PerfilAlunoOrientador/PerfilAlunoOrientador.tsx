import "./styles.css";

import { differenceInDays, format } from "date-fns";
import { useState } from "react";
import { Alert, Button, Card, Container, Navbar, Stack } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineFileExcel } from "react-icons/ai";
import { MdArrowBack, MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import D3Visualization from "@/components/D3Visualization";
import { Aluno, Curso } from "@/models/User";
import { useProfessoresQueries } from "@/queries/professores";
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

function PerfilAlunoOrientador() {
  const { signOut } = useUserQueries();

  const navigate = useNavigate();
  const location = useLocation();
  const aluno = location.state as Aluno;
  const logoPgcop = "/assets/logoPgcop.png";

  const { useGetTarefaAluno } = useTarefasQueries();
  const { data: tarefas = [] } = useGetTarefaAluno();

  const { useGetProfessores } = useProfessoresQueries();
  const { data: professores = [] } = useGetProfessores();

  const nomeOrientador =
    professores.find((professor) => professor.id === aluno.orientador_id)
      ?.nome ?? "-";

  const tarefasAFazer = tarefas.filter((tarefa) => !tarefa.completada);
  const tarefasFeitas = tarefas.filter((tarefa) => tarefa.completada);

  return (
    <div className="contain">
      <div className="containerGeral">
        <Navbar className="containerAluno bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/perfil-aluno">
              <img src={logoPgcop} alt="Logo" />
            </Navbar.Brand>
            <Stack direction="horizontal" gap={3} className="boxAluno">
              <Stack className="boxInfoAluno">
                <h3>
                  <span>{aluno.nome}</span>
                </h3>
                <p>
                  <span>Titulação:</span> {Curso[aluno.curso]}
                </p>
                <p>
                  <span>Data de início:</span>{" "}
                  {aluno.data_ingresso
                    ? format(new Date(aluno.data_ingresso), "dd/MM/yyyy")
                    : "-"}
                </p>
                <p>
                  <span>Status:</span>{" "}
                  {tarefasAFazer.length > 0 ? "Ativo" : "Concluído"}
                </p>
              </Stack>
              <Stack className="boxInfoAluno">
                <h3>
                  <span>Matrícula:</span> {aluno.matricula}
                </h3>
                <p>
                  <span>Orientador(a): </span>
                  {nomeOrientador}
                </p>
                <p>
                  <span>Término Previsto:</span>{" "}
                  {aluno.data_qualificacao
                    ? format(new Date(aluno.data_qualificacao), "dd/MM/yyyy")
                    : "-"}
                </p>
              </Stack>
              <Stack className="botoesToolbarAluno">
                {/* Botão retornar */}
                <MdArrowBack
                  onClick={() => navigate(-1)}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                  size={35}
                  title="Voltar"
                />
              </Stack>
            </Stack>
          </Container>
        </Navbar>

        {/* Visualização */}
        {aluno.data_qualificacao && (
          <D3Visualization
            dataDeInicio={new Date(aluno.data_ingresso)}
            dataFinal={new Date(aluno.data_qualificacao)}
            dataAtual={new Date()}
            tarefas={tarefas}
          />
        )}

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
                  backgroundColor = "#f8bebe"; // Vermelho para tarefas vencidas
                } else if (totalDays <= 90) {
                  backgroundColor = "#f7c6b3"; // Laranja para tarefas dentro de 90 dias
                } else {
                  backgroundColor = "#f3eab8"; // Amarelo para outras tarefas
                }

                const statusData =
                  totalDays === 0
                    ? "a tarefa vence hoje"
                    : totalDays > 0
                      ? months > 0
                        ? days === 0
                          ? `${months} mês${months > 1 ? "es" : ""} restante${months > 1 ? "s" : ""}`
                          : `${months} mês${months > 1 ? "es" : ""} e ${days} dia${days > 1 ? "s" : ""} restante${months > 1 || days > 1 ? "s" : ""}`
                        : `${days} dia${days > 1 ? "s" : ""} restante${days > 1 ? "s" : ""}`
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
                        style={{ cursor: "pointer" }}
                        size={20}
                        title="Editar"
                      />
                      <h4>{tarefa.nome}</h4>
                    </div>
                    <p>{tarefa.descricao}</p>
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
              <Card.Text>
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
                    return (
                      <div
                        id="task"
                        key={tarefa.id}
                        style={{ backgroundColor: "#b2e6ad" }}
                      >
                        <AiOutlineFileExcel
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
                        <br />
                        <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                          {tarefa.descricao}
                        </label>
                        <br />
                        <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                          Realizada em:{" "}
                          {tarefa.data_conclusao
                            ? format(
                                new Date(tarefa.data_conclusao),
                                "dd/MM/yyyy",
                              )
                            : "-"}
                        </label>
                      </div>
                    );
                  })
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PerfilAlunoOrientador;
