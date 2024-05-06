const ORIGINAL_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${ORIGINAL_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);  
        console.log(pokemon.name);
        createCard(pokemon);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
    createCard(pokemon);
})


// Anterior y siguiente guardando en localStorage. 

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId -1);
        localStorage.setItem('currentPokeId', newId);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
    })

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        localStorage.setItem('currentPokeId', newId);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
    })


    //Card
    const createCard = (pokemon) => {
        const cardContainer = document.getElementById('card-container');
        const card = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('p');
        const id = document.createElement('p');
        const weight = document.createElement('p');
        const height = document.createElement('p');
    
        // Asignar valores a los elementos
        img.src = pokemon.sprites.front_default;
        img.alt = `Image of ${pokemon.name}`;
        name.textContent = `Name: ${pokemon.name}`;
        id.textContent = `ID: ${pokemon.id}`;
        weight.textContent = `Weight: ${pokemon.weight}`;
        height.textContent = `Height: ${pokemon.height}`;
     
        // Agregar elementos al contenedor
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(id);
        card.appendChild(weight);
        card.appendChild(height);
    
        // Limpiar el contenedor, aunque se refresque la página sigue la tarjeta pero el contenedor queda vacío para ingresar un nuevo ID o nombre. 
        cardContainer.innerHTML = ''; 
    
        // Agregar la tarjeta al contenedor principal
        cardContainer.appendChild(card);
    }
    
