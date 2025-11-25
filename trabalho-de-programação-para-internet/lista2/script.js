const produtos = [
    { id: 1, nome: "Camiseta", preco: 49.90, imagem: "https://picsum.photos/id/20/100" },
    { id: 2, nome: "Boné", preco: 29.90, imagem: "https://picsum.photos/id/21/100" },
    { id: 3, nome: "Tênis", preco: 199.90, imagem: "https://picsum.photos/id/22/100" },
    { id: 4, nome: "Calça", preco: 89.90, imagem: "https://picsum.photos/id/23/100" },
    { id: 5, nome: "Jaqueta", preco: 149.90, imagem: "https://picsum.photos/id/24/100" },
    { id: 6, nome: "Mochila", preco: 79.90, imagem: "https://picsum.photos/id/25/100" }
];

const carrinho = {};

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalCompra = document.getElementById("totalCompra");
    itensCarrinho.innerHTML = "";
    let total = 0;

    for (let id in carrinho) {
        const item = carrinho[id];
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const div = document.createElement("div");
        div.className = "carrinho-item";
        div.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
            <span class="quantidade">
                <button onclick="alterarQuantidade(${id}, -1)">-</button>
                ${item.quantidade}
                <button onclick="alterarQuantidade(${id}, 1)">+</button>
            </span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        `;
        itensCarrinho.appendChild(div);
    }

    totalCompra.textContent = total.toFixed(2);
}

function alterarQuantidade(id, delta) {
    if (carrinho[id]) {
        carrinho[id].quantidade += delta;
        if (carrinho[id].quantidade <= 0) {
            delete carrinho[id];
        }
        atualizarCarrinho();
    }
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (carrinho[id]) {
        carrinho[id].quantidade++;
    } else {
        carrinho[id] = { ...produto, quantidade: 1 };
    }
    atualizarCarrinho();
}

function renderizarProdutos() {
    const lista = document.getElementById("listaProdutos");
    produtos.forEach(p => {
        const div = document.createElement("div");
        div.className = "produto";
        div.innerHTML = `
            <img src="${p.imagem}" alt="${p.nome}" onerror="this.src='https://picsum.photos/100'">
            <h4>${p.nome}</h4>
            <p>R$ ${p.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho</button>
        `;
        lista.appendChild(div);
    });
}

renderizarProdutos();