//Aula sobre fetch API
const base_url = 'https://pokeapi.co/api/v2/';

//Elemento da DOM
const nome = document.getElementById("nome");
const numero = document.getElementById("numero");
const input = document.getElementById("input_nome");
const button = document.getElementById("enviar");
const imagem = document.getElementById("sprite");

button.addEventListener("click", function () {
    const name_pk = input.value;
    const url = `${base_url}/pokemon/${name_pk}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const data_nome = data.name;
            const data_numero = data.id;
            const sprite = data.sprites.front_default;

            nome.innerHTML = data_nome.charAt(0).toUpperCase() +
                data_nome.slice(1);
            numero.innerHTML = data_numero;
            imagem.setAttribute("src", sprite);
        });
    input.value = '';
})
