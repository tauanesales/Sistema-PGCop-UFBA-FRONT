
function Login() {

    const logoPgcomp = "src/assets/logopgcomp.png"

    const handleCadastroClick = () => {
      // Add código para redirecionar para página de cadastro
    };
    const handleEsqueciSenhaClick = () => {
      // Add código para redirecionar para página de recuperação de senha
    };

    return (
        <div  style={{
            backgroundColor: 'white', 
            borderRadius: '10px',
            padding: '20px',
            width: '350px', 
            height: '400px', 
            textAlign: 'center', 
          }}
          
          className="container">

            {/* Logo*/}
            <img src = {logoPgcomp}  width={130} />
            {/* Campo Email */}
            <div style={{ position: 'center', marginBottom: '20px' }}>
               <input type="email" placeholder="Email" 
                style={{ width: '90%', padding: '12px', borderRadius: '5px',backgroundColor: '#d3d3d3',  color: '#333',  fontSize: '14px', border: '1px solid #ccc' }} />
            </div>
            {/* Campo Senha */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input type="password" placeholder="Senha" 
                style={{ width: '90%', padding: '12px', borderRadius: '5px', backgroundColor: '#d3d3d3',  color: '#333', fontSize: '14px', border: '1px solid #ccc' }} />
            </div>
            {/* Botão Cadastrar */}
            <button style={{padding: '5px 20px', borderRadius: '5px', fontSize: '16px' }}>Cadastrar</button>
            {/* LInks Cadastro e Recuperação de senha */}
            <p style={{ color: 'blue', marginTop: '20px' }}> 
              <a href="/Cadastro" style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', opacity: '0.9' }} onClick={handleCadastroClick}> CADASTRE-SE </a> OU
              <a href="/EsqueciSenha" style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', opacity: '0.9' }} onClick={handleEsqueciSenhaClick}> ESQUECI A SENHA </a>
            </p>

        </div>
      );
}

export default Login
