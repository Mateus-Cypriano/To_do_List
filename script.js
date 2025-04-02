
const tarefaInput = document.getElementById("tarefa");
const adicionarBotao = document.getElementById("adicionar");
const listaTarefas = document.getElementById("tarefas");

// Carregar tarefas do localStorage ao iniciar
document.addEventListener("DOMContentLoaded", carregarTarefas);

// Event Listeners
adicionarBotao.addEventListener("click", adicionarTarefa);
tarefaInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        adicionarTarefa();
    }
});

// Funções
function adicionarTarefa() {
    const tarefaTexto = tarefaInput.value;
    if (tarefaTexto.trim() !== "") {
        const novaTarefa = document.createElement("li");
        novaTarefa.innerHTML = 
 `<input class="check" type="checkbox"> ${tarefaTexto}<button class="excluir">Excluir</button>`;

        listaTarefas.appendChild(novaTarefa);
        tarefaInput.value = "";

        // Salvar tarefa no localStorage
        salvarTarefas();
    }
}

listaTarefas.addEventListener("click", function(e) {
    if (e.target.classList.contains("excluir")) {
        e.target.parentElement.remove();
        // Salvar tarefas após exclusão
        salvarTarefas();
    }
});

// Função para salvar tarefas no localStorage
function salvarTarefas() {
    const tarefas = [];
    const itens = listaTarefas.getElementsByTagName("li");
    for (let i = 0; i < itens.length; i++) {
        tarefas.push(itens[i].innerText.replace("Excluir", "").trim());
    }
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para carregar tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefasSalvas.forEach(tarefaTexto => {
        const novaTarefa = document.createElement("li");
        novaTarefa.innerHTML = 
`<input class="check" type="checkbox"> ${tarefaTexto}<button class="excluir">Excluir</button>`;

        listaTarefas.appendChild(novaTarefa);
    });
}


