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
    console.log("Pokemon Data");
    console.log(data);
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
    console.log("Pokemon", pokemon);

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
