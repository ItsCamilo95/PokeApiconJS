let pokeList = document.querySelector("#pokeList");
let inputSearchPokemon = document.querySelector("#searchPokemon");
let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
let searchButton = document.querySelector("#searchButton");
let listControl = document.querySelector(".list-control");
let next = null;
let previous = null;
let pokemonValue = '';

const loadPokemones = (URL) => {
    fetch( URL )
			.then( respuesta => respuesta.json() )
			.then( datos => {
				pokeList.innerHTML='';
                for (let i = 0; i < datos.results.length; i++) {
					pokeList.innerHTML+= `<li><button>${datos.results[i].url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/',' - ')}${datos.results[i].name}</button></li>`;
				}
				pokeList.scrollIntoView({behavior:"smooth"});
				previous = datos.previous;
				next = datos.next;
				listControl.innerHTML=`<button class="control-buttons" onclick="previousList('${previous}')">Anterior</button>
				<button class="control-buttons" onclick="nextList('${next}')">Siguiente</button>`;
				
				//pokeURL = datos.next;
				//si el usuario retrocede, usar previus, si adelanta, usar next, y listo.
			});
}

const searchPokemon = (pokemon) => {
	listControl.innerHTML="";
    fetch( pokeURL+pokemon)
		.then( respuesta => respuesta.json() )
		.then( datos => {
			pokeList.innerHTML='';
			pokeList.innerHTML+= `<li><button style="text-transform: capitalize;">${datos.id+" - "+datos.name}</button></li>`;
		})
		.catch(notFound);
}

const notFound = () => {
	pokeList.innerHTML= '<div style="color: red;">No encontrado</div>';
}

inputSearchPokemon.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		const pokemonValue = inputSearchPokemon.value;
		if (pokemonValue !== '') {
			searchPokemon(pokemonValue);
		} else {
			loadPokemones(pokeURL);
		}
	}
});

searchButton.addEventListener('click', (event) => {
	const pokemonValue = inputSearchPokemon.value;
	if (pokemonValue !== '') {
	searchPokemon(pokemonValue);
	} else {
	loadPokemones(pokeURL);
	}
});

function nextList (url) {
	if(url !== 'null'){
		loadPokemones(url)
	}
}

function previousList (url) {
	if(url !== 'null'){
		loadPokemones(url)
	}
}