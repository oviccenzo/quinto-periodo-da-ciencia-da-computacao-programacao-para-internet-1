const base_url = 'https://pokeapi.co/api/v2/pokemon/';

const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const card = document.getElementById("pokemonCard");

const nameField = document.getElementById("pokemonName");
const numberField = document.getElementById("pokemonNumber");
const sprite = document.getElementById("pokemonSprite");
const height = document.getElementById("pokemonHeight");
const weight = document.getElementById("pokemonWeight");
const types = document.getElementById("pokemonTypes");

button.addEventListener("click", function(){
    const nameOrId = input.value.toLowerCase().trim();
    if(!nameOrId){
        alert("Digite um nome ou numero valido.");
        return;
    }

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    card.classList.add("hidden");

    fetch(`${base_url}${nameOrId}`)
        .then(response => {
            if(!response.ok) throw new Error("pokemon nao encontrado!");
            return response.json();
        })
        .then(data => {
            nameField.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            numberField.textContent = `${data.id}`;
            sprite.setAttribute("src", data.sprites.front_default);
            height.textContent = `${data.height / 10} m`;
            weight.textContent = `${data.weight / 10} kg`;
            types.textContent = data.types.map(t => t.type.name).join(", ");

            card.classList.remove("hidden");
        })
        .catch(() => {
            error.classList.remove("hidden");
        })
        .finally(() =>{
            loading.classList.add("hidden");
        });
        input.value = "";
});
