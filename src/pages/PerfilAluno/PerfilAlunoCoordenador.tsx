import "./styles.css";

import { differenceInDays, format } from "date-fns";

import { Aluno, Curso } from "@/models/User";
import { useProfessoresQueries } from "@/queries/professores";
import { useTarefasQueries } from "@/queries/tarefas";
import { useUserQueries } from "@/queries/user";



function PerfilAlunoCoordenador() {
  const { useGetUser } = useUserQueries();
  const { data: userData } = useGetUser();
  const user = userData as Aluno;

  const logoPgcop = "/assets/logoPgcop.png";

  const { useGetTarefaAluno } = useTarefasQueries();
  const { data: tarefas = [] } = useGetTarefaAluno();

  const { useGetProfessores } = useProfessoresQueries();
  const { data: professores = [] } = useGetProfessores();

  const nomeCoordenador =
    professores.find((professor) => professor.id === user.orientador_id)
      ?.nome ?? "-";

  const tarefasAFazer = tarefas.filter((tarefa) => !tarefa.completada);
  const tarefasFeitas = tarefas.filter((tarefa) => tarefa.completada);

  return (
    <div className="contain">
      <div className="containerAluno">
        {user && (
          <div className="infoAluno">
            <img src={logoPgcop} alt="Logo" />
            <div className="boxInfoAluno">
              <h3>{user.nome}</h3>
              <p>
                <span>Titulação:</span> {Curso[user.curso]}
              </p>
              <p>
                <span>Data de Inicio:</span>{" "}
                {user.data_ingresso
                  ? format(user.data_ingresso, "dd/MM/yyyy")
                  : "-"}
              </p>
              <p>
                <span>Status:</span>{" "}
                {tarefasAFazer.length > 0 ? "Ativo" : "Concluído"}
              </p>
            </div>
            <div className="boxInfoAluno">
              <h3>
                <span>Matrícula:</span> {user.matricula}
              </h3>
              <p>
                <span>Coordenador(a): </span>
                {nomeCoordenador}
              </p>
              <p>
                <span>Término Previsto:</span>{" "}
                {user.data_qualificacao
                  ? format(user.data_qualificacao, "dd/MM/yyyy")
                  : "-"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="tarefasAluno">
        <div className="boxTarefas">
          <h3 style={{ textAlign: "center" }}>TAREFAS A FAZER</h3>
          {tarefasAFazer.map((tarefa) => {
            const prazo = new Date(tarefa.data_prazo);
            const diferencaDias = differenceInDays(prazo, new Date());

            let backgroundColor;
            if (diferencaDias <= 90) {
              backgroundColor = "#ff9999";
            } else if (diferencaDias <= 180) {
              backgroundColor = "#ffb394";
            } else {
              backgroundColor = "#fff2a7";
            }

            const plural = diferencaDias !== 1 ? "s" : "";
            const statusData =
              diferencaDias === 0
                ? "Hoje"
                : diferencaDias > 0
                ? `${diferencaDias} dia${plural} restantes`
                : `A tarefa está atrasada há ${Math.abs(diferencaDias)} dia${plural}`;

            return (
              <div
                id="task"
                key={tarefa.id}
                style={{ backgroundColor: backgroundColor }}
              >
                <label
                  style={{
                    marginLeft: "5px",
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
                  Data Limite: {format(prazo, "dd/MM/yyyy")} - {statusData}
                </label>
              </div>
            );
          })}
        </div>

        <div className="boxTarefas">
          <h3 style={{ textAlign: "center" }}>TAREFAS REALIZADAS</h3>
          {tarefasFeitas.map((tarefa) => {
            return (
              <div
                id="task"
                key={tarefa.id}
                style={{ backgroundColor: "#ADD8E6" }}
              >
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

export default PerfilAlunoCoordenador;
