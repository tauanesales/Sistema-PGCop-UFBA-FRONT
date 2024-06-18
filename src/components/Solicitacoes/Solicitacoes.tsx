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
      <h2>Solicitações</h2>
      <ul>
        {solicitacoes.map((solicitacao, index) => (
          <li key={index}>
            <div>
              <strong>{solicitacao.nome_aluno}</strong>
              <br />
              {/* {solicitacao.titulacao} */}
            </div>
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
