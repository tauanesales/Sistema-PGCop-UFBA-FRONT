import { useState, useEffect } from "react"; // Lib atualizar ano

function CadastroAluno() {
  const logoPgcomp = "assets/logopgcomp.png"; // Logo
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear()); //Função Atualizar ano
  useEffect(() => {
    setAnoAtual(new Date().getFullYear());
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        width: "350px",
        height: "650px",
        textAlign: "center",
      }}
      className="cadastroAluno"
    >
      {/* Logo*/}
      <img src={logoPgcomp} width={110} />
      {/* Campo Nome */}
      <div style={{ position: "center", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Nome Completo"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>
      {/* Campo CPF */}
      <div style={{ position: "relative", marginBottom: "15px" }}>
        <input
          type="number"
          placeholder="CPF"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>
      {/* Campo Email */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="email"
          placeholder="Email"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>
      {/* Campo Telefone */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="number"
          placeholder="Telefone"
          style={{
            width: "90%",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>
      {/* Campo Matrícula */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Matrícula"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>
      {/* Campo Orientador */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Orientador"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>

      {/* Seleção Titulação */}
      <div style={{ marginBottom: "5px" }}>
        <select
          style={{
            width: "95%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        >
          <option value="">Selecione a Titulação do Curso</option>
          <option value="mestrado">Mestrado</option>
          <option value="doutorado">Doutorado</option>
        </select>
      </div>
      <a id="date">Data de Ingresso</a>
      {/* Seleção de data */}
      <div style={{ marginBottom: "15px" }}>
        <select
          style={{
            width: "30%",
            padding: "6px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
            marginRight: "5px",
          }}
          required
        >
          <option value="">Dia</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          style={{
            width: "30%",
            padding: "6px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
            marginRight: "5px",
          }}
          required
        >
          <option value="">Mês</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          style={{
            width: "30%",
            padding: "6px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        >
          <option value="">Ano</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={anoAtual - i} value={anoAtual - i}>
              {anoAtual - i}
            </option>
          ))}
        </select>
      </div>

      {/* Campo Criar Senha */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="password"
          placeholder="Crie sua Senha"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>
      {/* Campo Confirmar Senha */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="password"
          placeholder="Confirmar Senha"
          style={{
            width: "90%",
            padding: "8px",
            borderRadius: "5px",
            backgroundColor: "#d3d3d3",
            color: "#333",
            fontSize: "14px",
            border: "1px solid #ccc",
          }}
          required
        />
      </div>

      {/* Botão Cadastrar */}
      <a href="confirmar-cadastro">
        <button
          style={{ padding: "5px 20px", borderRadius: "5px", fontSize: "18px" }}
        >
          Cadastrar
        </button>
      </a>
    </div>
  );
}

export default CadastroAluno;
