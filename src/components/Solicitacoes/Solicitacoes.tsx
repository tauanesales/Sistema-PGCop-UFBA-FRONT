import "./style.css";

import { Solicitacao } from "@/models/Solicitacao";

type Props = {
  solicitacoes: Solicitacao[];
  handleAcceptRequest: (id: number) => void;
  handleRemoveRequest: (id: number) => void;
};

function Solicitacoes({
  solicitacoes,
  handleAcceptRequest,
  handleRemoveRequest,
}: Props) {
  return (
    <div className="solicitacoes-container">
      <h2 style={{ marginLeft: "10px" }}>Solicitações</h2>
      <ul className="containerSolicitacoes">
        {solicitacoes.map((solicitacao, index) => (
          <li key={index}>
            <p>{solicitacao.nome_aluno}</p>
            <div>
              <button onClick={() => handleAcceptRequest(solicitacao.id)}>
                Aceitar
              </button>
              <button onClick={() => handleRemoveRequest(solicitacao.id)}>
                Recusar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Solicitacoes;
