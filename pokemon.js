let pokeContainer = document.querySelector("#pokeContainer");
let inputSearchPokemon = document.querySelector("#searchPokemon");
let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
let pokeArray = [];
let pokemonValue = '';
let searchButton = document.querySelector("#searchButton");
const loadPokemones = () => {
    console.log("El contenido está cargando")
    fetch( pokeURL )
			.then( respuesta => respuesta.json() )
			.then( datos => {
                console.log("Ya cargó papi");
				pokeArray = datos.results
				console.log(pokeArray);
				//pokeURL = datos.next;
				//si el usuario retrocede, usar previus, si adelanta, usar next, y listo.
			});
}

const searchPokemon = (pokemon) => {
	console.log("El contenido está cargando")
    fetch( pokeURL+pokemon )
			.then( respuesta => respuesta.json() )
			.then( datos => {
                console.log("Ya cargó papi");
				console.log(datos.srp);
			});
}

inputSearchPokemon.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
	const pokemonValue = inputSearchPokemon.value;
	if (pokemonValue !== '') {
		searchPokemon(pokemonValue);
	} else {
		loadPokemones();
	}
	}
});

searchButton.addEventListener('click', (event) => {
	const pokemonValue = inputSearchPokemon.value;
	if (pokemonValue !== '') {
	searchPokemon(pokemonValue);
	} else {
	loadPokemones();
	}
});


