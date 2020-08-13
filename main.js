// Global Scope Dom Environment Variables
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const poke_container = document.getElementById("poke_container");
const errorElement = document.getElementById("error");
const pokesListElem = document.getElementById("pokeList");

//Defining Axios Defaults
import axios from "axios";
axios.defaults.baseURL = "http://pokeapi.co/api/v2/";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

// Mapping Pokemon Coloes By Types
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

// Search Pokemon Function Send API Request To Get Pokemon and Add Contruct Pokemon Object
// pokemonIdentifier = User Search Value
const searchPokemon = async (pokemonIdentifier) => {    

  try {
    const { data } = await axios.get(`pokemon/${pokemonIdentifier}`);
    console.log("Pokemon Data", data);
    console.log(`${data.name} ID ${data.id}`);

    // Pokemon  Object Constructing
    const pokemon = {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      backIMG: data.sprites.back_female
        ? data.sprites.back_female
        : data.sprites.back_default
        ? data.sprites.back_default
        : "images/pokeball.png",
      frontIMG: data.sprites.front_female
        ? data.sprites.front_female
        : data.sprites.front_default
        ? data.sprites.front_default
        : "images/pokeball.png",
      types: data.types.map((type) => type.type.name),
    };
    console.log("Pokemon Object Created: ", pokemon);

    return pokemon;
  } catch (error) {
    // If The Get Request is Failed Send To An Error Function
    displayError(error.response);
  }
};


// If An Error Has Occured This function will be displayed
function displayError(errorData) {
  errorElement.innerHTML = ""
alert(`Please Check if { ${search.value} } is a Valid ID Or Name`);
errorElement.innerHTML ="";
errorHTML = `
      <h2 id="errorHeading"> Error Pokemon: { ${search.value} } Not Found</h2>
      <span id="errorText">
      Failed Sending: ${errorData.config.method.toUpperCase()} Request To ${
  errorData.request.responseURL
} 
      Error Data: ${(errorData.status, errorData.data)};
      <span>
  `;
errorElement.innerHTML = errorHTML;
errorElement.style.display = "block";
}


// Add Pokemon Function To Add The Pokemon To The HTML

const addPokemonCard = async (pokemonIdentifier) => {
  errorElement.style.display = "none";
  let poke_container = document.createElement("div")
  poke_container.classList.add("poke-container");

pokesListElem.appendChild(poke_container);
const pokemonEl = document.createElement("div");

pokemonEl.classList.add("pokemon");

const pokemon = await searchPokemon(pokemonIdentifier);

const poke_types = pokemon.types;
const type = main_types.find((type) => poke_types.indexOf(type) > -1);
const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
const color = colors[type];


pokemonEl.style.backgroundColor = color;
let pokeTypeList = `<h5>Pokemon Types</h5><ul id="pokeTypes">`
poke_types.forEach(type => {
    pokeTypeList += `
    <li class="pokeType${poke_types.indexOf(type) + 1}">${type}</li>
    `
})
pokeTypeList += "</ul>"

var pokemonHTMLString = ` 
  <div class="img-container">
  <img src="${pokemon.frontIMG}" />
  </div>
  <div class="info">
  <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
  <h3 class="name">${name}</h3>
  ${pokeTypeList}
  </div>
  `;
  pokemonEl.innerHTML = pokemonHTMLString;
  poke_container.appendChild(pokemonEl);

const imgElement = poke_container.querySelector("img");
imgElement.addEventListener(
  "mouseover",
  () => (imgElement.src = `${pokemon.backIMG}`)
);
imgElement.addEventListener(
  "mouseleave",
  () => (imgElement.src = `${pokemon.frontIMG}`)
);


pokesListElem.appendChild(poke_container)
console.log("Pokemon Appended")
    
let typeArray = pokemon.types;
console.log("Pokemon TYPES", typeArray)

typeArray.forEach(type => {

    const li = pokemonEl.getElementsByClassName(`pokeType${poke_types.indexOf(type) + 1}`)
    li[0].onclick = () => pokeList(event.target.innerHTML);
  })
}


// Pokemon List Function To Get All Pokemons List from This Type
const pokeList = async (typeName )=>{
    
  console.log(typeName);
  const { data } = await axios.get(`http://pokeapi.co/api/v2/type/${typeName}`);
  const dataArray = data.pokemon.map(pokemonObject => pokemonObject.pokemon.name);
  const listPoks = pokesListElem.childNodes;
  for (let i = listPoks.length -1; i >= 0; i--) {
      console.log(listPoks[i])
      pokesListElem.removeChild(listPoks[i]);
  }

  dataArray.forEach(pok => {
      addPokemonCard(pok)
  })
  search.value = typeName;
}

// 
searchButton.onclick = () => {
  if (searchResults.firstElementChild.firstElementChild != null) {
      console.log(searchResults.firstElementChild)
      searchResults.removeChild(pokesListElem.firstElementChild)
      console.log("removed")
  }
if (search.value === "") {
  return alert("You Must Insert Either Pokemon Name or Pokemon ID !");
}
addPokemonCard(search.value);
};


