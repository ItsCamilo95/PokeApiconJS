let pokeContainer = document.querySelector("#pokeContainer");
let searchPokemon = document.querySelector("#searchPokemon");
let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
let pokeArray = [];

const pokeApi = () => {
    console.log("El contenido está cargando")
    fetch( pokeURL )
			.then( respuesta => respuesta.json() )
			.then( datos => {
                console.log("Ya cargó papi");
				pokeArray = datos.results
				console.log(pokeArray);
				console.log(datos)
				pokeURL = datos.next;
				//si el usuario retrocede, usar previus, si adelanta, usar next, y listo.
			});
}

searchPokemon.addEventListener('keyup', (event) => {
	if(event.key = 'enter'){
		pokeApi();
	}
});

pokeApi();