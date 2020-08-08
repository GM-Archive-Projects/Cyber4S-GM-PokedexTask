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
const errorHeading = document.getElementById("errorHeading");
const errorText = document.getElementById("errorText");



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




// function displayError(errorData) {
//   const input = search.value;
//   console.log(`Search Value: ${input}`);
//   console.log("DisplayError Func Next Error Data");
//   console.error(errorData);
//   var errorHeading = document.getElementById("errorHeading");
//   console.log(errorHeading)
//   if ( errorHeading === null) {
//     alert(`Please Check if { ${search.value} } is a Valid ID`);


//   }

// }

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
      errorElement.appendChild(errorButton);
      errorButton.style.display = "block";
      errorButton.onclick = () => {
        errorText.style.color = "blue";
        errorText.innerHTML = `${JSON.stringify(errorData)}`;
        errorHeading.innerHTML = "Full Error Details\n\n";
      }} else if (errorButton != null) {
        errorButton.style.display = "block";
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

//     var errorButton = document.getElementById("errorButton");
//     console.log(errorButton)
//     if (errorButton === null) {
//       errorButton = document.createElement("button");
//       errorButton.setAttribute("id", "errorButton");
//       errorButton.innerHTML = "Error Details";
//       controlPanel.insertBefore(errorButton, errorElement);
//       errorButton.style.display = "block";
//       errorButton.onclick = () => {
//         var textNode = `\n ${JSON.stringify(errorData)}`;
//         errorHeading.innerHTML = "Full Error Details\n\n";
//         errorElement.innerText = textNode;
//         errorElement.style.display = "block";
//       };

//     }
//     if (errorButton != null) {
//       errorButton.innerHTML = "Error Details";
//       errorButton.style.display = "block";
//       errorButton.onclick = () => {
//         var textNode = `\n ${JSON.stringify(errorData)}`;
//         errorHeading.innerHTML = "Full Error Details\n\n";
//         errorElement.innerText = textNode;
//         errorElement.style.display = "block";
//       };
//     } 
//   }
// }
////////////////////////////////////////////////////////////////////////
//     errorElement.style.display = "block";
//     errorElement.appendChild(errorHeading)

// errorElement.innerHTML = `\n ${JSON.stringify(
//   errorData
// )}`;
//controlPanel.insertBefore(errorHeading, errorElement)
// };

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

//console.log(errorButton === null);

// if (errorButton != null) {
//   errorButton.style.display = "block";
//   errorButton.innerHTML = "Error Details";
//   errorButton.onclick = () => {
//     errorElement.style.display = "block";
//     var textNode = `\n ${JSON.stringify(
//       errorData
//     )}`;
//     errorElement.appendChild(errorHeading)
//     errorElement.appendChild(textNode)

// errorElement.innerHTML = `\n ${JSON.stringify(
//   errorData
// )}`;
//controlPanel.insertBefore(errorHeading, errorElement)
// };

// } else if (errorButton === null) {
//   var errorButton = document.createElement("button");
//   errorButton.setAttribute('id', 'errorButton');
//   errorButton.innerHTML = "Error Details";
//   errorButton.onclick = () => {
//     var textNode = `\n ${JSON.stringify(
//       errorData
//     )}`;
//     errorElement.appendChild(errorHeading)
//     errorElement.appendChild(textNode)
//   };
//   console.log(errorButton)
// }

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
