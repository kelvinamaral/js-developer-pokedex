const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
// Load Status
const pokemon_status_load = document.getElementById('pokemon_status_load')
const loadStatusButton = document.getElementsByClassName('loadStatusButton')

// -------------

// Get references to all elements with the "clickableDiv" class
var divElements = document.querySelectorAll(".clickableDiv");

// Add a click event listener to each div element
divElements.forEach(function(divElement) {
    divElement.addEventListener("click", function() {
        // Code to execute when a div is clicked
        console.log('Olá!');
    });
});
// -------------


const maxRecords = 151
const limit = 5
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}" onclick="handlePokemonClick('${pokemon.name}')">
        <div class="loadStatusButton">
            <div class="number"><span>#${pokemon.number}</span></div>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    </li>`;
}

// Define the function to handle the click event
function handlePokemonClick(pokemonName) {
    // You can now perform actions based on the clicked Pokémon's name
    console.log(`Clicked on Pokémon: ${pokemonName}`);
    // Add more code here to load additional information or perform other actions
    
}


// Load Pokémon Itens List

const offsetStatus = 0
limitStatus = 1

function loadPokemonItens(offsetStatus, limitStatus) {
    pokeApi.getPokemons(offsetStatus, limitStatus).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

// Load Pokémon Status

function loadpokemonsStatus(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToStatus).join('')
        pokemon_status_load.innerHTML += newHtml
    })
}

loadpokemonsStatus(offsetStatus, limitStatus)

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Ínicio função

function convertPokemonToStatus(pokemon) {
    return `
            <div>   
    <div class="uppper_buttons_icons">
    <span class="arrow_button"><i class="fa-solid fa-arrow-left"></i></span>
    <span class="heart_button"><i class="fa-regular fa-heart"></i></span>
</div>

<h1 class="pokemon_name_title">${pokemon.name}</h1>

<div class="number_big">
    <span class="number_b">#${pokemon.number}</span>
</div>

<div class="types_status">
${pokemon.types.map((type) => `<li class="types_status grass_status ${type}">${type}</li>`).join('')}
</div>
<!-- Imagem -->
<div class="imagem_status_pokemon"><img src="${pokemon.photo}"
alt="${pokemon.name}"></div>
<div class="pokemon_status">
    <div class="menu">
        <!-- Links para as diferentes informações -->
        <a href="#about" class="menu_item active">About</a>
        <a href="#baseStats" class="menu_item">Base Stats</a>
        <a href="#evolution" class="menu_item">Evolution </a>
        <a href="#moves" class="menu_item">Moves</a>
        <!-- Adicione mais links conforme necessário -->
    </div>

        <ol>
            <ul class="table">
                <span class="data">Species</span>
                <span class="high_light">Seed</span>
            </ul>
            <ul class="table">
                <span class="data">Height</span>
                <span class="high_light">2'3,6 (0,70 cm)</span>
            </ul>
            <ul class="table">
                <span class="data">Weight</span>
                <span class="high_light">15.2 lbs(6,9 kg)</span>
            </ul>
            <ul class="table">
                <span class="data">Abilities</span>
                <span class="high_light">Overgrow, Chlorophyl</span>
            </ul class="table">
            <ul class="table">
                <span class="data">Species</span>
                <span class="high_light">Seed</span>
            </ul>
            <ul class="semi-title">
                <span >Breeding</span>
            </ul>
            <ul class="table">
                <span class="data">Gender</span>
                <span>
                    <span class="high_light"><i class="fa-solid fa-mars"></i> 87,5</span> <span class="high_light"> <i class="fa-solid fa-venus"></i> 12,5%</span>
                </span>
            </ul>

            <ul class="table">
                <span class="data">Egg Groups</span>
                <span class="high_light">Monster</span>
            </ul>

            <ul class="table">
                <span class="data">Egg Cycle</span>
                <span class="high_light">Grass</span>
            </ul>
        </ol>
</div> </div> 
    `
}

