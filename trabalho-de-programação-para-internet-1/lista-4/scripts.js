const pokemonImg = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');

let currentPokemon = null;

function getRandomId() {
    return Math.floor(Math.random() * 250) + 1;
}

async function carregarPokemon() {
    const id = getRandomId();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    // Verifique a URL da imagem no console
    console.log(`URL da imagem: ${imageUrl}`);
    pokemonImg.src = imageUrl;
    pokemonImg.classList.remove('revealed'); // Remove o efeito de silhueta

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Não foi possível carregar o Pokémon');
        
        const data = await response.json();
        console.log('Dados do Pokémon:', data); // Verifique os dados retornados
        currentPokemon = data.name.toLowerCase();

        // Habilita os campos de input
        guessInput.disabled = false;
        submitBtn.disabled = false;
        nextBtn.disabled = true;
        guessInput.value = '';
    } catch (error) {
        console.error('Erro ao carregar Pokémon:', error);
        alert('Erro ao carregar Pokémon. Tente novamente.');
    }
}

submitBtn.addEventListener('click', () => {
    const userGuess = guessInput.value.trim().toLowerCase();
    if (userGuess === currentPokemon) {
        pokemonImg.classList.add('revealed'); // Revela a imagem se estiver certo
    }

    // Desabilita os botões após a tentativa
    guessInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = false; // Habilita o próximo botão
});

nextBtn.addEventListener('click', () => {
    carregarPokemon();
});

// Inicia o primeiro Pokémon
carregarPokemon();
