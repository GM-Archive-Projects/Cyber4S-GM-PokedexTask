// Global Environment Variables

const pokedex = document.getElementById("pokedex");
const mainHeader = document.getElementById("mainHeader");
const controlPanel = document.getElementById("controlPanel");
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const pokemosListButton = document.getElementById("pokemosListButton");
const searchResults = document.getElementById("searchResults");
const poke_container = document.getElementById('poke_container');


axios.defaults.baseURL = "http://pokeapi.co/api/v2/";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

const searchPokemon = async (pokemonIdentifier) => {
  // pokemonIdentifier = search.value;

  try {
    const { data } = await axios.get(`pokemon/${pokemonIdentifier}`);
    console.log("Pokemon Data");
    console.log(data);
    console.log(`${data.name} ID ${data.id}`);
    const pokemon = {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      backIMG: data.sprites.back_female
        ? data.sprites.back_female
        : data.sprites.back_default,
      frontIMG: data.sprites.front_female
        ? data.sprites.front_female
        : data.sprites.front_default,
      types: data.types.map((type) => type.type.name),
    };
    console.log(pokemon);
    return pokemon;
  } catch (error) {
    console.log("Error Row");
    console.log(error.response);
    console.log(JSON.stringify(error.response));
    displayError(error.response);
  }
};

function displayError(errorData) {
  alert(`Please Check if { ${search.value} } is a Valid ID Or Name`);
  const errorElement = document.createElement("div");
  errorElement.classList.add("error");
  errorElement.setAttribute("id", "error")



  errorHTML =  `
    <div id="error"> 
        <h2 id="errorHeading"> Error Pokemon: { ${search.value} } Not Found</h2>
        <span id="errorText">
        Failed Sending: ${errorData.config.method.toUpperCase()} Request To ${errorData.request.responseURL} 
        Error Data: ${(errorData.status, errorData.data)};
        <span>
    </div>
    `;
    errorElement.innerHTML = errorHTML;


  searchResults.appendChild(errorElement);

}

const addPokemonCard = async (pokemonIdentifier) => {
    const poke_container = document.createElement("div");
    poke_container.setAttribute("id", "poke_container")
    poke_container.classList.add("poke-container")
    searchResults.appendChild(poke_container);
  const pokemonEl = document.createElement("div");
  

  pokemonEl.classList.add("pokemon");

  const pokemon = await searchPokemon(pokemonIdentifier);

  const poke_types = pokemon.types;
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  
  pokemonEl.style.backgroundColor = color;

  const pokemonHTMLString = ` 
    <div class="img-container">
    <img src="${pokemon.frontIMG}" />
    </div>
    <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
</div>
`;

  // <li class="card" style="backgroundcolor: ${colors(pokemon.type)}>
  //         <img class="card-image" src="${pokemon.frontIMG}"/>
  //         <h3 class="card-title">${pokemon.id}. ${pokemon.name}</h3>
  //         <p class="card-subtitle">Weight: ${pokemon.weight} <br> Height: ${pokemon.height} <br> Type: ${pokemon.type}
  //         </p>
  //     </li>
  //     `


  pokemonEl.innerHTML = pokemonHTMLString;
  poke_container.appendChild(pokemonEl);
  // searchResults.appendChild(poke_container)
};
// Event Listeners

searchButton.onclick = () => {
  searchResults.innerHTML = "";
  if (search.value === "") {
    return alert("You Must Insert Either Pokemon Name or Pokemon ID !");
  }
  addPokemonCard(search.value);
};

// cardIMG = searchResults.querySelector("card-image");
// cardIMG.addEventListener("mouseover", () => {cardIMG.src=`${pokemon.backIMG}`})
