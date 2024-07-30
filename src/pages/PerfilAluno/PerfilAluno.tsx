import "./styles.css";

import { differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineFileExcel } from "react-icons/ai";
import { MdEditNote, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import D3Visualization from "@/components/D3Visualization";
import { Tarefa } from "@/models/Tarefa";
import { Aluno, Curso } from "@/models/User";
import { useProfessoresQueries } from "@/queries/professores";
import { useTarefasQueries } from "@/queries/tarefas";
import { useUserQueries } from "@/queries/user";
import  {Stack, Row, Col, Container, Navbar, Card, Alert, Button, Form} from "react-bootstrap";

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
  const { useGetTarefaAluno, useUpdateTarefa } = useTarefasQueries();
  const { data: tarefas = [], refetch } = useGetTarefaAluno();
  const { mutate: updateTarefa } = useUpdateTarefa();
  const { useGetProfessores } = useProfessoresQueries();
  const { data: professores = [] } = useGetProfessores();
  const nomeOrientador =
    professores.find((professor) => professor.id === user.orientador_id)
      ?.nome ?? "-";
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    console.log(user)
  }
  , [user])

  const handleCheckboxChange = (tarefa: Tarefa) => {
    const { id, completada } = tarefa;
    if (completada) {
      updateTarefa(
        { ...tarefa, id, completada: 0, data_conclusao: null },
        {
          onSuccess: () => {
            refetch();
          },
        },
      );
    } else {
      setTarefaEmEdicao(id);
    }
  };

  const salvarDataRealizacao = (tarefa: Tarefa) => {
    updateTarefa(
      {
        ...tarefa,
        completada: 1,
        data_conclusao: format(new Date(dataSelecionada), "dd/MM/yyyy"),
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

  const tarefasAFazer = tarefas.filter((tarefa) => !tarefa.completada);
  const tarefasFeitas = tarefas.filter((tarefa) => tarefa.completada);

  return (
    <div className="contain" >
        {user && (
          <Navbar className="containerAluno bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/perfil-aluno">
                <img src={logoPgcop} alt="Logo" />
              </Navbar.Brand>
              <Stack direction="horizontal" gap={3} className="boxAluno">
                    <Stack className="boxInfoAluno">
                      <h3><span>{user.nome}</span></h3>
                      <p>
                        <span>Titulação:</span> {Curso[user.curso]}
                      </p>
                      <p>
                        <span>Data de início:</span>{" "}
                          {user.data_ingresso
                            ? format(new Date(user.data_ingresso), "dd/MM/yyyy")
                            : "-"}
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
                        {nomeOrientador}
                      </p>
                      <p>
                        <span>Defesa prevista:</span>{" "}
                        {user.data_qualificacao
                          ? format(new Date(user.data_qualificacao), "dd/MM/yyyy")
                          : "-"}
                      </p>
                      <p>
                        <span>Lattes:</span>
                        <a href={user.lattes} target="_blank" rel="noopener noreferrer">
                          {user.lattes}
                        </a>
                      </p>
                    </Stack>
                    <Stack className="botoesToolbarAluno">
                      <MdEditNote
                      onClick={() => navigate("/perfil-aluno/editar-dados")}
                      style={{ cursor: "pointer"}}
                      size={35}
                      title="Editar dados"
                      />
                      <MdLogout
                        onClick={signOut}
                        style={{ cursor: "pointer"}}
                        size={35}
                        title="Sair"
                      />
                    </Stack>

              </Stack>
            </Container>
          </Navbar>
        )}
        

      {/* Visualização */}
      {user.data_qualificacao && (
        <D3Visualization
          dataDeInicio={new Date(user.data_ingresso)}
          dataFinal={new Date(user.data_qualificacao)}
          dataAtual={new Date()}
          tarefas={tarefas}
        />
      )}

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
                const { months, days, totalDays } = calculateDifferenceInMonthsAndDays(
                  new Date(),
                  prazo
                );

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
                      ? `${months} mês${months > 1 ? "es" : ""} restante${
                          months > 1 ? "s" : ""
                        }`
                      : `${months} mês${months > 1 ? "es" : ""} e ${days} dia${
                          days > 1 ? "s" : ""
                        } restante${months > 1 || days > 1 ? "s" : ""}`
                    : `${days} dia${days > 1 ? "s" : ""} restante${
                        days > 1 ? "s" : ""
                      }`
                  : `${-totalDays} dia${-totalDays > 1 ? "s" : ""} em atraso`;

                return (
                  <Alert style={{backgroundColor: backgroundColor, color: "black"}} id="task"
                    key={tarefa.id}>
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
                        <Form.Group className="boxDate">
                          <Form.Label>Data de realização:</Form.Label>
                          <Form.Control
                            size="sm"   
                            type="date" 
                            className="dateInput" 
                            value={dataSelecionada}
                            onChange={(e) => setDataSelecionada(e.target.value)}/>
                          <Button variant="primary" className="bttnSalvar" onClick={() => salvarDataRealizacao(tarefa)}>Salvar</Button>
                        </Form.Group>
                      )}
                      <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                        {tarefa.descricao}
                      </label>
                      <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                        Data Limite: {format(prazo, "dd/MM/yyyy")} - {statusData}
                      </label>

                  </Alert>
                );
              })}
          </Card.Body>
        </Card>
        <Card className="boxTarefas">
          <Card.Body>
            <Card.Title className="titleTarefas">Tarefas concluídas</Card.Title>
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
                      <br />
                      <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                        {tarefa.descricao}
                        <br />
                      </label>
                      <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                        Realizada em:{" "}
                        {tarefa.data_conclusao
                          ? format(new Date(tarefa.data_conclusao), "dd/MM/yyyy")
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
  );
}

export default PerfilAluno;
