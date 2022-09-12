const pokeName = document.querySelector(".pokemon-name");
const pokeNumber = document.querySelector(".pokemon-number");
const pokeImg = document.querySelector(".pokemon-img");

const form = document.querySelector(".form");
const input = document.querySelector("#input-search");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");

let searchId = 1;

//Gets PokeAPI data and returns JSON
const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

	if (APIResponse.status == 200) {
		const data = await APIResponse.json();
		return data;
	}
};

//Gets info from .json() PokeAPI and insert them into HTML elements
const renderPokemon = async (pokemon) => {
	pokeName.innerHTML = "Loading...";
	pokeNumber.innerHTML = "";

	const data = await fetchPokemon(pokemon);
	if (data) {
		pokeName.innerHTML = data.name;
		pokeNumber.innerHTML = data.id;

		const gif = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
		const img = data.sprites.front_default;

		//Check if there is a gif or not
		if (gif) {
			pokeImg.src = gif;
			pokeImg.style.display = "block";
		} else if (img) {
			pokeImg.src = img;
			pokeImg.style.display = "block";
		} else {
			pokeImg.style.display = "none";
		}
	} else {
		pokeName.innerHTML = "Not found";
		pokeNumber.innerHTML = "?";
		pokeImg.style.display = "none";
	}

	input.value = "";
	searchId = data.id;
};

form.addEventListener("submit", (event) => {
	event.preventDefault();

	let treatedInput = input.value.trim().toLowerCase();

	renderPokemon(treatedInput);
});

nextBtn.addEventListener("click", () => {
	searchId++;
	renderPokemon(searchId);
});

prevBtn.addEventListener("click", () => {
	if (searchId > 1) {
		searchId--;
		renderPokemon(searchId);
	}
});

renderPokemon(searchId);

