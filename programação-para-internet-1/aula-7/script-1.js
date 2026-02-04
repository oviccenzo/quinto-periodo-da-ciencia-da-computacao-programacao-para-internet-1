// Alteração da imagem ao clicar nos botões
document.getElementById("btn1").onclick = function() {
    document.getElementById("img1").setAttribute("src", "https://www.w3schools.com/js/pic_bulbon.gif");
};

document.getElementById("btn2").onclick = function() {
    document.getElementById("img1").setAttribute("src", "https://www.w3schools.com/js/pic_bulbon.gif");
};

// Alterando a cor do botão ao ser clicado
document.getElementById("btn2").addEventListener("click", function() {
    this.style.backgroundColor = "green";
});

// Mudando a cor de fundo do input1 quando ele ganha foco
document.getElementById("input1").addEventListener("focus", function() {
    this.style.backgroundColor = "yellow";
});

// Mudando a cor de fundo do input1 quando ele perde foco
document.getElementById("input1").addEventListener("blur", function() {
    this.style.backgroundColor = "white";
});

// Atualizando o valor da legenda ao mudar o valor do input range
document.getElementById("input2").addEventListener("change", function() {
    var valor = this.value;
    var msg = `Valor:  ${valor}`;
    document.getElementById("legenda2").innerHTML = msg;

    // Passando o valor do input2 para o input1
    document.getElementById("input1").value = valor;
});