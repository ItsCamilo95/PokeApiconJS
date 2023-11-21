let pokeList = document.querySelector("#pokeList");
let inputSearchPokemon = document.querySelector("#searchPokemon");
let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
let searchButton = document.querySelector("#searchButton");
let listControl = document.querySelector(".list-control");
let modal = document.querySelector("#modal1");
let namePokemon = document.querySelector("#name-pokemon");
let pokemonImg = document.querySelector("#pokemon-img");
let pokemonStats = document.querySelector("#pokemon-stats");
let pokemonAbilities = document.querySelector("#pokemon-abilities");
let loader = document.querySelector("#loader");


let next = null;
let previous = null;
let pokemonValue = '';

const loadPokemones = (URL) => {
	loader.classList.add('show-loader');
    fetch( URL )
			.then( respuesta => respuesta.json() )
			.then( datos => {
				pokeList.innerHTML='';
				loader.classList.remove('show-loader');

                for (let i = 0; i < datos.results.length; i++) {
					pokeList.innerHTML+= `<li><button onclick="loadInfoPokemon('${datos.results[i].url}')">${datos.results[i].url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/',' - ')}${datos.results[i].name}</button></li>`;
				}
				pokeList.scrollIntoView({behavior:"smooth"});
				previous = datos.previous;
				next = datos.next;
				listControl.innerHTML=`<button class="control-buttons" onclick="previousList('${previous}')">Anterior</button>
				<button class="control-buttons" onclick="nextList('${next}')">Siguiente</button>`;
			})
			.catch(notFound);
}

const searchPokemon = (pokemon) => {
	loader.classList.add('show-loader');
	pokemon = pokemon.toLowerCase();
	listControl.innerHTML="";
	pokeList.innerHTML='';
    fetch( pokeURL+pokemon)
		.then( respuesta => respuesta.json() )
		.then( datos => {
			loader.classList.remove('show-loader');		
			pokeList.innerHTML+= `<li><button onclick="loadInfoPokemon('${pokeURL+pokemon}')" style="text-transform: capitalize;">${datos.id+" - "+datos.name}</button></li>`;
		})
		.catch(notFound);
}

const notFound = () => {
	loader.classList.remove('show-loader');		
	pokeList.innerHTML= '<div style="color: red; text-decoration: underline; text-decoration-color: red;">No encontrado</div>';
}


const loadInfoPokemon = (url) =>{
	fetch(url)
	.then( respuesta => respuesta.json() )
	.then( datos => {
		pokemonImg.src =datos.sprites.other.dream_world.front_default;
		namePokemon.textContent = datos.name;
		document.body.classList.add("modal-static");

		for (let i = 0; i < datos.stats.length; i++) {
			pokemonStats.innerHTML+=`<li>${datos.stats[i].stat.name.replace('-', ' ')} : ${datos.stats[i].base_stat}</li>`
		}
		
		for (let i = 0; i < datos.abilities.length; i++) {
			pokemonAbilities.innerHTML+=`<li>${datos.abilities[i].ability.name.replace('-', ' ')}</li>`
		}

		modal.classList.add('modal-show');
		})
		.catch(notFound);
}

const hideModal = () => {
	document.body.classList.remove("modal-static");
	modal.classList.remove('modal-show');
	pokemonStats.innerHTML='';
	pokemonAbilities.innerHTML='';
	pokemonImg.src="";
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