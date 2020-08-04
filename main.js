const searchResults = document.getElementById("searchResults")
const search = document.getElementById("search")
const searchButon = document.getElementById("searchButon")
const pokemonClassName = document.getElementsByClassName("pokemonName")
const pokemonClassId = document.getElementsByClassName("pokemonId")
const pokemonClassHeight = document.getElementsByClassName("pokemonHeight")
const pokemonClassWeight = document.getElementsByClassName("pokemonWeight")
const pokemonClassImage = document.getElementsByClassName('pokemonImage')
axios.defaults.baseURL = "http://pokeapi.co/api/v2/pokemon/";

var pokemonsDeck = [];

const searchPokemon = async () => {
  const pokemonId = search.value;
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    console.log(data)
    
    const pokemonObject = {
      name: data.name,
      id: pokemonId,
      height: data.height,
      weight: data.weight,
      backIMG: data.sprites.back_female,
      frontIMG: data.sprites.front_female
  };
    console.log(pokemonObject);
} catch (error) {
  console.log(error)
}};




const searchValidation= async () => {
  const input = search.value;
  const { data } = await axios.get("http://pokeapi.co/api/v2/pokemon/");
  const count = data.count;
  error = document.getElementById("error");
  console.log(`Search Value: ${input}`);
  console.log(`Count Of Pokemons: ${count}`);
  if (input != parseInt(input, 10)){
    error.style.opacity = "1";
    error.style.height = "50";
    error.style.color = "red";
    error.style.display = "block";
    error.innerText = "Pokemon ID must be of type Number!";
  } else {
    searchPokemon();
  }
};
