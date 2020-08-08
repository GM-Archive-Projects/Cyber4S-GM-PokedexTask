// Global Environment Variables

const pokedex = document.getElementById("pokedex");
const mainHeader = document.getElementById("mainHeader");
const controlPanel = document.getElementById("controlPanel");
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const pokemosListButton = document.getElementById("pokemosListButton");
const searchResults = document.getElementById("searchResults");

// // defaults
// axios.defaults.baseURL = "http://pokeapi.co/api/v2/pokemon";
// axios.defaults.validateStatus = (status) => status >= 200 && status < 300;
const promises = [];
const baseURL = `http://pokeapi.co/api/v2/`;





const getPokemon = async pokemonIdentifier => {
  pokemonIdentifier = search.value;
  console.log("search Value: ", search.value);

  var url = baseURL + 'pokemon/' + pokemonIdentifier;
  console.log("URL", url);

  console.log("Get Pokemon");
  return fetch(url).then( res => {
    return res.json();
  })
  .catch( error => {
    console.log("====Error In Get Pokemon====")
    console.log(error);
    console.error(error);
    throw error.response;
  });

};


function displayError(errorData) {
  var errorButton = document.getElementById("errorButton");
  const input = search.value;
  console.log(`Search Value: ${input}`);
  console.log("DisplayError Func");
  console.error(errorData);

  errorElement.style.opacity = "1";
  errorElement.style.height = "50";
  errorElement.style.display = "block";
  console.log("errorButton");
  console.log(errorButton);
  if (errorButton === null) {
      errorButton = document.createElement("button");
      errorButton.setAttribute("id", "errorButton");
      errorButton.innerHTML = "Error Details";    
      
      controlPanel.appendChild(errorButton);
      errorButton.onclick = () => {
        errorText.style.color = "blue";
        errorText.innerHTML = `${JSON.stringify(errorData)}`;
        errorHeading.innerHTML = "Full Error Details\n\n";
      }} else {
        errorButton.onclick = () => {
          errorText.style.color = "blue";
          errorText.innerHTML = `${JSON.stringify(errorData)}`;
          errorHeading.innerHTML = "Full Error Details\n\n";
  }}

  if (input === "") {
    alert("Pokemon ID is Empty");
    errorHeading.innerHTML = "Empty String Error";
    errorHeading.style.color = "black";

    errorText.style.color = "green";
    errorText.innerHTML = "You Must Choose Pokemon ID To Search";
  }


  else {
    alert(`Please Check if { ${search.value} } is a Valid ID`);
    errorHeading.innerHTML =
      "Error Pokemon ID Not Found" +
      "<br>" +
      "Press Error Details for more Details";
    errorText.style.color = "red";
    errorText.innerHTML = `<br>Failed Sending: ${errorData.config.method.toUpperCase()} Request To ${
      errorData.request.responseURL
    } <br> Error Data: ${(errorData.status, errorData.data)}`;
    errorElement.style.display = "block";
  };
}





const fetchPokemon = async (pokemonIdentifier) => {
  console.log("Fetch Pokemon");
  fetch(url + pokemonIdentifier).then( res => {
    return res.json();
  })
  .then( data => {
    console.log("Pokemon Data")
    console.log(data);
    console.log(`${data.name} ID ${data.id}`)
    const pokemon = {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      backIMG : (data.sprites.back_female) ? data.sprites.back_female:data.sprites.back_default,
      frontIMG: (data.sprites.front_female) ? data.sprites.front_female:data.sprites.front_default,
      type: data.types.map( type => type.type.name).join(", ")
    };
    
    console.log(pokemon);
    })
  };


// setTimeout(fetchPokemon(11), 20000);
// setTimeout(fetchPokemon(12), 30,000);



// const searchPokemon = async () => {
//   const pokemonId = search.value;
//   errorElement.style.display = "none";
//   if (pokemonId < 1) {
//     return displayError("Empty String Error");
//   }
//   try {
//     const { data } = await getPokemon(pokemonId);

/** 
function getPokemon(pokemonId) {
  console.log("GetPokemon Func");
  return axios
    .get(`/${pokemonId}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("===Error===");
      console.log(
        error.response.config.method,
        error.response.request.responseURL,
        error.response.data,
        error.response.status
      );
      // displayError(errorString)
      throw error.response;
    });
}

const searchPokemon = async () => {
  const pokemonId = search.value;
  errorElement.style.display = "none";
  if (pokemonId < 1) {
    return displayError("Empty String Error");
  }
  try {
    const { data } = await getPokemon(pokemonId);

    console.log("Pokemon Data");
    console.log(data);
    const {
      back_female,
      front_female,
      back_default,
      front_default,
    } = data.sprites;

    const pokemonObject = {
      name: data.name,
      id: pokemonId,
      height: data.height,
      weight: data.weight,
    };

    if (back_female == null) {
      console.log("There is no Back Female Image looking for Default Image");
      if (back_default != null) {
        console.log("default back image found");
        pokemonObject.backIMG = back_default;
      } else {
        console.log("No Pokemon Back Image");
      }
    }
    if (front_female == null) {
      console.log("There is no Front Female Image looking for Default Image");
      if (front_default != null) {
        console.log("default front image found");
        pokemonObject.frontIMG = front_default;
      } else {
        console.log("No Pokemon Front Image");
      }
    }

    if (front_female != null) {
      pokemonObject.frontIMG = front_female;
    }
    if (back_female != null) {
      pokemonObject.backIMG = back_female;
    }

    console.log(`${pokemonObject.name} Pokemon Object`);
    console.log(pokemonObject);
  } catch (error) {
    displayError(error);
  }
};


function displayError(errorData) {
  var errorButton = document.getElementById("errorButton");
  const input = search.value;
  console.log(`Search Value: ${input}`);
  console.log("DisplayError Func");
  console.error(errorData);
  
  errorElement.style.opacity = "1";
  errorElement.style.height = "50";
  errorElement.style.display = "block";
  console.log("errorButton");
  console.log(errorButton);
  if (errorButton === null) {
      errorButton = document.createElement("button");
      errorButton.setAttribute("id", "errorButton");
      errorButton.innerHTML = "Error Details";    
      
      controlPanel.appendChild(errorButton);
      errorButton.onclick = () => {
        errorText.style.color = "blue";
        errorText.innerHTML = `${JSON.stringify(errorData)}`;
        errorHeading.innerHTML = "Full Error Details\n\n";
      }} else if (errorButton != null) {
        errorButton.onclick = () => {
          errorText.style.color = "blue";
          errorText.innerHTML = `${JSON.stringify(errorData)}`;
          errorHeading.innerHTML = "Full Error Details\n\n";
  }}



  if (errorData === "Empty String Error") {
    alert("Pokemon ID is Empty");
    errorHeading.innerHTML = "Empty String Error";
    errorHeading.style.color = "black";

    errorText.style.color = "green";
    errorText.innerHTML = "You Must Choose Pokemon ID To Search";
  } 
  else {
    alert(`Please Check if { ${search.value} } is a Valid ID`);
    errorHeading.innerHTML =
      "Error Pokemon ID Not Found" +
      "<br>" +
      "Press Error Details for more Details";
    errorText.style.color = "red";
    errorText.innerHTML = `<br>Failed Sending: ${errorData.config.method.toUpperCase()} Request To ${
      errorData.request.responseURL
    } <br> Error Data: ${(errorData.status, errorData.data)}`;
    errorElement.style.display = "block";
  };
}

*/















// const pokedex = document.getElementById("pokedex");
// const mainHeader = document.getElementById("mainHeader");
// const controlPanel = document.getElementById("controlPanel");
// const search = document.getElementById("search");
// const searchButton = document.getElementById("searchButton");
// const pokemosListButton = document.getElementById("pokemosListButton");
// const searchResults = document.getElementById("searchResults");
// const xhr = new XMLHttpRequest();
// xhr.open('GET', `http://pokeapi.co/api/v2/pokemon/`);
// const get2Pokemon 
