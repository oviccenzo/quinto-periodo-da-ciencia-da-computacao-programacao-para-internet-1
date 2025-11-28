// Carregar dados do data.json
fetch('data.json')
  .then(res => res.json())
  .then(dados => {
    inicializarExtensoes(dados);
  });

let lista = [];
let filtroAtual = 'all';

function inicializarExtensoes(dados) {
  lista = dados;
  renderizarExtensoes();
  configurarFiltros();
}

function renderizarExtensoes() {
  const container = document.getElementById('lista-extensoes');
  container.innerHTML = '';

  let filtrados = lista.filter(ext => {
    if (filtroAtual === 'active') return ext.active;
    if (filtroAtual === 'inactive') return !ext.active;
    return true;
  });

  filtrados.forEach(extensao => {
    const card = document.createElement('div');
    card.className = `card ${extensao.active ? 'ativa' : ''}`;
    
    card.innerHTML = `
      <h3>${extensao.name}</h3>
      <p>${extensao.description}</p>
      <div class="botoes-card">
        <button onclick="removerExtensao('${extensao.id}')">Remove</button>
        <div class="toggle" onclick="alternarEstado('${extensao.id}')"></div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function alternarEstado(id) {
  const ext = lista.find(e => e.id === id);
  if (ext) {
    ext.active = !ext.active;
    renderizarExtensoes();
  }
}

function removerExtensao(id) {
  lista = lista.filter(e => e.id !== id);
  renderizarExtensoes();
}

function configurarFiltros() {
  document.querySelectorAll('[data-filtro]').forEach(botao => {
    botao.addEventListener('click', () => {
      document.querySelectorAll('[data-filtro]').forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');
      filtroAtual = botao.getAttribute('data-filtro');
      renderizarExtensoes();
    });
  });
}