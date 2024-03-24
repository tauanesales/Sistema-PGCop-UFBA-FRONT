function CadastroProfessor(){

    const logoPgcomp = "assets/logopgcomp.png" // Logo


    return (
        <div  style={{
            backgroundColor: 'white', 
            borderRadius: '10px',
            padding: '20px',
            width: '350px', 
            height: '580px', 
            textAlign: 'center', 
          }}
          
          className="cadastroAluno">

            {/* Logo*/}
            <img src = {logoPgcomp}  width={110} style={{marginBottom:'-15px'}}/>
            <h5></h5>
            <a id='date'style={{ fontSize: '20px'}} >Cadastro Professor</a>
            {/* Campo Nome */}
            <div style={{ position: 'center',  marginTop: '15px', marginBottom: '15px' }}>
               <input type="text" placeholder="Nome Completo" 
                style={{ width: '90%', padding: '8px', borderRadius: '5px',backgroundColor: '#d3d3d3',  color: '#333',  fontSize: '14px', border: '1px solid #ccc' }} 
                required />
            </div>
            {/* Campo CPF */}
            <div style={{ position: 'relative', marginBottom: '15px' }}>
                <input type="number" placeholder="CPF" 
                    style={{ width: '90%', padding: '8px', borderRadius: '5px', backgroundColor: '#d3d3d3',  color: '#333', fontSize: '14px', border: '1px solid #ccc' }} 
                    required />
            </div>
            {/* Campo Email */}
            <div style={{ marginBottom: '15px' }}>
                <input type="email" placeholder="Email" 
                    style={{ width: '90%', padding: '8px', borderRadius: '5px', backgroundColor: '#d3d3d3',  color: '#333',  fontSize: '14px', border: '1px solid #ccc' }} 
                    equired />
                    </div>
            {/* Campo Telefone */}
            <div style={{ marginBottom: '15px' }}>
                <input type= 'number' placeholder="Telefone" 
                    style={{ width: '90%', padding: '10px', borderRadius: '5px', backgroundColor: '#d3d3d3',  color: '#333', fontSize: '14px', border: '1px solid #ccc' }} 
                    required />
            </div>

            {/* Seleção Perfil */}
            <div style={{ marginBottom: '15px' }}>
                <select 
                    style={{ width: '95%', padding: '8px', borderRadius: '5px', backgroundColor: '#d3d3d3', color: '#333', fontSize: '14px', border: '1px solid #ccc' }}
                    required
                >
                    <option value="">Selecione o Perfil de Usuário</option>
                    <option value="mestrado">Orientador</option>
                    <option value="doutorado">Coordenador</option>
                </select>
            </div>
        
            {/* Campo Criar Senha */}
            <div style={{ marginBottom: '15px' }}>
                <input type="password" placeholder="Crie sua Senha" 
                    style={{ width: '90%', padding: '8px', borderRadius: '5px', backgroundColor: '#d3d3d3',  color: '#333', fontSize: '14px', border: '1px solid #ccc' }}
            required />
            </div>
            {/* Campo Confirmar Senha */}
            <div style={{ marginBottom: '25px' }}>
                <input type="password" placeholder="Confirmar Senha" 
                    style={{ width: '90%', padding: '8px', borderRadius: '5px', backgroundColor: '#d3d3d3',  color: '#333', fontSize: '14px', border: '1px solid #ccc' }}
            required />
            </div>


            {/* Botão Cadastrar */}
            <button style={{padding: '5px 20px', borderRadius: '5px', fontSize: '16px' }}>Cadastrar</button>
        </div>
      );

}

export default CadastroProfessor
