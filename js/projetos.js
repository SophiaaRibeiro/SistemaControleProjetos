let indexEditando = null;

// LOGIN
function login() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById("senha").value;
     
    if(email === "admin@email.com" && senha === "1234") {
        localStorage.setItem("logado", "true");
        window.location.href = "../pages/projetos.html";
    } else {
        alert("Email ou senha incorretos");
    }
}

// LOGOUT
function logout(){
    localStorage.removeItem("logado");
    window.location.href = "../auth/login.html";
}

// MODAL
function abrirModal(){
    document.getElementById("modalProjeto").style.display = "flex";
    limparCampos();
}

function fecharModal(){
    document.getElementById("modalProjeto").style.display = "none";
    limparCampos();
}

function limparCampos(){
    document.getElementById("nomeProjeto").value = "";
    document.getElementById("statusProjeto").value = "andamento";
    document.getElementById("descricaoProjeto").value = "";
    document.getElementById("progressoProjeto").value = "";
}

// SALVAR / EDITAR
function salvarProjeto(){

    let nome = document.getElementById("nomeProjeto").value;
    let status = document.getElementById("statusProjeto").value;
    let descricao = document.getElementById("descricaoProjeto").value;
    let progresso = document.getElementById("progressoProjeto").value;

    if(nome === ""){
        alert("Preencha o nome!");
        return;
    }

    let projetos = JSON.parse(localStorage.getItem("projetos")) || [];

    let projeto = { nome, status, descricao, progresso };

    if(indexEditando !== null){
        projetos[indexEditando] = projeto;
        indexEditando = null;
    } else {
        projetos.push(projeto);
    }

    localStorage.setItem("projetos", JSON.stringify(projetos));

    fecharModal();
    carregarProjetos();
}

// EDITAR
function editarProjeto(index){

    let projetos = JSON.parse(localStorage.getItem("projetos"));

    let projeto = projetos[index];

    document.getElementById("nomeProjeto").value = projeto.nome;
    document.getElementById("statusProjeto").value = projeto.status;
    document.getElementById("descricaoProjeto").value = projeto.descricao;
    document.getElementById("progressoProjeto").value = projeto.progresso;

    indexEditando = index;

    document.getElementById("modalProjeto").style.display = "flex";
}

// EXCLUIR
function excluirProjeto(index){

    let projetos = JSON.parse(localStorage.getItem("projetos"));

    projetos.splice(index, 1);

    localStorage.setItem("projetos", JSON.stringify(projetos));

    carregarProjetos();
}

// FORMATAR STATUS
function formatarStatus(status){
    if(status === "andamento") return "Em andamento";
    if(status === "planejamento") return "Planejamento";
    if(status === "concluido") return "Concluído";
}

// ATUALIZAR PROGRESSO
function atualizarProgresso(index, valor){

    let projetos = JSON.parse(localStorage.getItem("projetos"));

    projetos[index].progresso = valor;

    localStorage.setItem("projetos", JSON.stringify(projetos));

    carregarProjetos();
}

// RENDER
function renderizarProjetos(projetos){

    let lista = document.querySelector(".project-grid");

    lista.innerHTML = "";

    if(projetos.length === 0){
        lista.innerHTML = "<p>Nenhum projeto cadastrado.</p>";
        return;
    }

    projetos.forEach((p, index) => {

        lista.innerHTML += `
        
        <div class="project-card">

            <div class="card-header">
                <h3>${p.nome}</h3>
                <span class="status ${p.status}">${formatarStatus(p.status)}</span>
            </div>

            <p class="desc">${p.descricao}</p>

            <div class="progress-bar">
                <div class="progress" style="width:${p.progresso}%"></div>
            </div>

            <div class="card-footer">
                <input type="range" min="0" max="100" value="${p.progresso}" 
                onchange="atualizarProgresso(${index}, this.value)">
                
                <button onclick="editarProjeto(${index})">Editar</button>
                <button onclick="excluirProjeto(${index})">Excluir</button>
            </div>

        </div>
        
        `;
    });
}

// CARREGAR
function carregarProjetos(){
    let projetos = JSON.parse(localStorage.getItem("projetos")) || [];
    renderizarProjetos(projetos);
}

// FILTRO
function filtrarProjetos(){

    let filtro = document.getElementById("filtroStatus").value;

    let projetos = JSON.parse(localStorage.getItem("projetos")) || [];

    if(filtro !== ""){
        projetos = projetos.filter(p => p.status === filtro);
    }

    renderizarProjetos(projetos);
}

// INIT
window.onload = carregarProjetos;