
const tarefaInput = document.getElementById("tarefa");
const adicionarBotao = document.getElementById("adicionar");
const listaTarefas = document.getElementById("tarefas");

// Carregar tarefas do localStorage ao iniciar
//document.addEventListener("DOMContentLoaded", carregarTarefas);
window.onload = carregarTarefas;

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
        const tarefaId = Date.now(); //Cria um ID unico.
        novaTarefa.innerHTML = 
 `<input class="check" type="checkbox" data-id="${tarefaId}"> 
 <span>${tarefaTexto}</span><button class="excluir" data-id="${tarefaId}">Excluir</button>`;
        novaTarefa.dataset.id = tarefaId; // Adiciona o ID como um dataset

        listaTarefas.appendChild(novaTarefa);
        tarefaInput.value = "";

        //Adiciona um ouvinte de eventos para checkbox
        const checkbox = novaTarefa.querySelector('.check');
        checkbox.addEventListener('change', function() {
            salvarStatusTarefa(tarefaId, this.checked); //chama função quando o status muda
        });

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
    const listaItens = listaTarefas.querySelectorAll('li'); 
    
    listaItens.forEach(item => {
        const checkbox = item.querySelector('.check');
        tarefas.push({
            id: parseInt(item.dataset.id), //recupera o ID da tarefa
            texto: item.textContent.replace('Excluir', '').trim(), 
            checked: checkbox.checked
        });

    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para carregar tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

    if (tarefasSalvas && tarefasSalvas.length > 0) {
        tarefasSalvas.forEach(tarefa => {
            const novaTarefa = document.createElement("li");
            novaTarefa.innerHTML = `
                <input class="check" type="checkbox" data-id="${tarefa.id}" ${tarefa.checked ? 'checked' : ''}>
                <span class="${tarefa.checked ? 'tarefa-concluida' : ''}">${tarefa.texto}</span><button class="excluir" data-id="${tarefa.id}">Excluir</button>
            `;
            novaTarefa.dataset.id = tarefa.id;

            listaTarefas.appendChild(novaTarefa);

            const checkbox = novaTarefa.querySelector('.check');
            checkbox.addEventListener('change', function() {
                salvarStatusTarefa(tarefa.id, this.checked);
            });
        });
    }

}

    function salvarStatusTarefa(id, checked) {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
        const tarefaIndex = tarefasSalvas.findIndex(tarefa => tarefa.id === id);
        const listItem = document.querySelector(`li[data-id="${id}"]`);

        if (tarefaIndex !== -1 && listItem) {
            tarefasSalvas[tarefaIndex].checked = checked;
            localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas)); 

            const textoTarefa = listItem.querySelector('span'); 
            if(textoTarefa) {
                if(checked) {
                    textoTarefa.classList.add('tarefa-concluida');
                } else {
                    textoTarefa.classList.remove('tarefa-concluida');
                }
            }
        }
    }

    



