// Global Environment Variables
const searchResults = document.getElementById("searchResults");
const search = document.getElementById("search");
const searchButon = document.getElementById("searchButon");
const pokemonClassName = document.getElementsByClassName("pokemonName");
const pokemonClassId = document.getElementsByClassName("pokemonId");
const pokemonClassHeight = document.getElementsByClassName("pokemonHeight");
const pokemonClassWeight = document.getElementsByClassName("pokemonWeight");
const pokemonClassImage = document.getElementsByClassName("pokemonImage");
const addPokemonButton = document.getElementById("addPokemon");
const controlPanel = document.getElementById("controlPanel");
const errorElement = document.getElementById("error");

// defaults
axios.defaults.baseURL = "http://pokeapi.co/api/v2/pokemon";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

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
  // errorButton.style.display = "none";
  // errorHeading.style.display = "none";
  if (pokemonId < 1) {
    return displayError("EmptyString");
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
      // backIMG: data.sprites.back_female,
      // frontIMG: data.sprites.front_female,
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
  const input = search.value;
  console.log(`Search Value: ${input}`);
  console.log("DisplayError Func");
  console.error(errorData);
  var errorHeading = document.getElementById("errorHeading");

  errorElement.style.opacity = "1";
  errorElement.style.height = "50";
  if (errorData === "EmptyString"){
    alert("Pokemon ID is Empty")
    errorHeading.innerHTML = "Empty String Error"
    errorElement.style.color = "green";
    errorElement.innerText = "You Must Choose Pokemon ID To Search";
    errorElement.style.display = "block";
  } else if(errorData) {
    alert (`Please Check if { ${ search.value } } is a Valid ID`);
    errorHeading.innerHTML = "Pokemon ID Not Found Error --> Press Error Details for more Details"
    errorElement.style.color = "red";
    errorElement.innerText = `\n\nFailed Sending: ${errorData.config.method.toUpperCase()} Request To ${ errorData.request.responseURL }\n
    \n Error Data: ${errorData.status, errorData.data}\n`
    errorElement.style.display = "block";
    
    var errorButton = document.getElementById("errorButton");

  }

  // console.log("errorData.data")
  // console.error(errorData.data);
  // console.log("errorData.status");
  // console.error(errorData.status);
  // var shortErrorText = document.createTextNode(`\n\nFailed Sending: ${errorData.config.method.toUpperCase()} Request To 
  // ${ errorData.request.responseURL } \n Error Data: ${errorData.status} ${errorData.data}\n`)
  // errorElement.appendChild(shortErrorText)
  
  // errorElement.innerText = `\n\nFailed Sending: ${errorData.config.method.toUpperCase()} Request To ${
  //   errorData.request.responseURL
  // } \n Error Data: ${errorData.status} ${errorData.data}\n`
  // alert (`Please Check if { ${
  //   search.value
  // } } is a Valid ID`);

  // errorElement.style.display = "block";
  // var errorButton = document.getElementById("errorButton");
  // var errorHeading = document.createElement('h2');
  // errorHeading.setAttribute('id', 'errorHeading');
  // errorHeading.innerHTML = "This is Error Data";



  console.log(errorButton === null);

  if (errorButton != null) {
    errorButton.style.display = "block";
    errorButton.innerHTML = "Error Details";
    errorButton.onclick = () => {
      errorElement.style.display = "block";
      var textNode = `\n ${JSON.stringify(
        errorData
      )}`;
      errorElement.appendChild(errorHeading)
      errorElement.appendChild(textNode)

      // errorElement.innerHTML = `\n ${JSON.stringify(
      //   errorData
      // )}`;
      //controlPanel.insertBefore(errorHeading, errorElement)
    };



    
  } else if (errorButton === null) {
    var errorButton = document.createElement("button");
    errorButton.setAttribute('id', 'errorButton');
    errorButton.innerHTML = "Error Details";
    errorButton.onclick = () => {
      var textNode = `\n ${JSON.stringify(
        errorData
      )}`;
      errorElement.appendChild(errorHeading)
      errorElement.appendChild(textNode)
    };
    console.log(errorButton)
  }
}
    
//   } else if (errorButton === null) {
//     var errorButton = document.createElement("button");
//     errorButton.setAttribute('id', 'errorButton');
//     errorButton.innerHTML = "Error Details";
//     errorButton.onclick = () => {
//       errorElement.style.display = "block";
//       errorElement.innerText = `\n ${JSON.stringify(
//         errorData
//       )}`;
//       controlPanel.insertBefore(errorHeading, errorElement)
//     };
//     controlPanel.insertBefore(errorButton, errorElement);
//     console.log(errorButton)
//   }

// }
