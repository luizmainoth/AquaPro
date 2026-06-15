const API_URL = "http://localhost:8080/atletas";

const form = document.getElementById("form-atleta");
const formTitulo = document.getElementById("form-titulo");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const listaEl = document.getElementById("lista-atletas");
const vazioEl = document.getElementById("vazio");
const contadorEl = document.getElementById("contador");
const mensagemEl = document.getElementById("mensagem");

document.addEventListener("DOMContentLoaded", carregarAtletas);

form.addEventListener("submit", salvarOuAtualizar);
btnCancelar.addEventListener("click", cancelarEdicao);

async function carregarAtletas() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error("Falha ao buscar atletas");

    const atletas = await resposta.json();
    renderizarLista(atletas);
  } catch (erro) {
    mostrarMensagem("Não foi possível carregar os atletas. Verifique se o backend está rodando.", "erro");
  }
}

function renderizarLista(atletas) {
  listaEl.innerHTML = "";
  contadorEl.textContent = atletas.length;

  if (atletas.length === 0) {
    vazioEl.hidden = false;
    return;
  }

  vazioEl.hidden = true;

  atletas.forEach((atleta) => {
    const card = document.createElement("article");
    card.className = "atleta-card";
    card.dataset.estilo = atleta.estilo;

    card.innerHTML = `
      <span class="estilo">${atleta.estilo || "—"}</span>
      <h3>${atleta.nome}</h3>
      <dl>
        <dt>Idade</dt><dd>${atleta.idade ?? "-"} anos</dd>
        <dt>Matrícula</dt><dd>${atleta.matricula ?? "-"}</dd>
        <dt>CPF</dt><dd>${atleta.cpf ?? "-"}</dd>
        <dt>Mensalidade</dt><dd>R$ ${Number(atleta.mensalidade ?? 0).toFixed(2)}</dd>
        <dt>Melhor tempo</dt><dd>${atleta.tempoProva ?? "-"} s</dd>
      </dl>
      <div class="acoes">
        <button class="btn btn-sm btn-edit" data-id="${atleta.id}">Editar</button>
        <button class="btn btn-sm btn-delete" data-id="${atleta.id}">Excluir</button>
      </div>
    `;

    card.querySelector(".btn-edit").addEventListener("click", () => preencherFormularioParaEdicao(atleta));
    card.querySelector(".btn-delete").addEventListener("click", () => excluirAtleta(atleta.id, atleta.nome));

    listaEl.appendChild(card);
  });
}

async function salvarOuAtualizar(evento) {
  evento.preventDefault();

  const id = document.getElementById("atleta-id").value;

  const dados = {
    nome: document.getElementById("nome").value,
    idade: Number(document.getElementById("idade").value),
    cpf: document.getElementById("cpf").value,
    matricula: document.getElementById("matricula").value,
    estilo: document.getElementById("estilo").value,
    mensalidade: Number(document.getElementById("mensalidade").value),
    tempoProva: Number(document.getElementById("tempoProva").value),
  };

  try {
    let resposta;

    if (id) {
      resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    } else {
      resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    }

    if (!resposta.ok) throw new Error("Erro ao salvar atleta");

    mostrarMensagem(id ? "Atleta atualizado com sucesso!" : "Atleta cadastrado com sucesso!", "sucesso");
    cancelarEdicao();
    carregarAtletas();
  } catch (erro) {
    mostrarMensagem("Não foi possível salvar o atleta. Verifique os dados e tente novamente.", "erro");
  }
}

function preencherFormularioParaEdicao(atleta) {
  document.getElementById("atleta-id").value = atleta.id;
  document.getElementById("nome").value = atleta.nome ?? "";
  document.getElementById("idade").value = atleta.idade ?? "";
  document.getElementById("cpf").value = atleta.cpf ?? "";
  document.getElementById("matricula").value = atleta.matricula ?? "";
  document.getElementById("estilo").value = atleta.estilo ?? "";
  document.getElementById("mensalidade").value = atleta.mensalidade ?? "";
  document.getElementById("tempoProva").value = atleta.tempoProva ?? "";

  formTitulo.textContent = "Editar atleta";
  btnSalvar.textContent = "Atualizar atleta";
  btnCancelar.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelarEdicao() {
  form.reset();
  document.getElementById("atleta-id").value = "";
  formTitulo.textContent = "Novo atleta";
  btnSalvar.textContent = "Salvar atleta";
  btnCancelar.hidden = true;
}

async function excluirAtleta(id, nome) {
  const confirmar = confirm(`Tem certeza que deseja excluir "${nome}"?`);
  if (!confirmar) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!resposta.ok) throw new Error("Erro ao excluir");

    mostrarMensagem("Atleta excluído com sucesso!", "sucesso");
    carregarAtletas();
  } catch (erro) {
    mostrarMensagem("Não foi possível excluir o atleta.", "erro");
  }
}

function mostrarMensagem(texto, tipo) {
  mensagemEl.textContent = texto;
  mensagemEl.className = `mensagem ${tipo}`;
  mensagemEl.hidden = false;

  setTimeout(() => {
    mensagemEl.hidden = true;
  }, 4000);
}