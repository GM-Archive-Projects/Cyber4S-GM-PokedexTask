// Global Environment Variables

const pokedex = document.getElementById("pokedex");
const mainHeader = document.getElementById("mainHeader");
const controlPanel = document.getElementById("controlPanel");
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const pokemosListButton = document.getElementById("pokemosListButton");
const searchResults = document.getElementById("searchResults");



axios.defaults.baseURL = "http://pokeapi.co/api/v2/";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;



const searchPokemon = async (pokemonIdentifier) => {
    // pokemonIdentifier = search.value;

  try {
    const { data } = await axios.get(`pokemon/${pokemonIdentifier}`)
    console.log("Pokemon Data");
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
    console.log(pokemon)
  } catch (error) {
      console.log("Error Row")
      console.log(error)
      displayError(error);
}}



function displayError(errorData) {
    alert(`Please Check if { ${search.value} } is a Valid ID Or Name`);
    searchResults.innerHTML = `
    <div id="error"> 
        <h2 id="errorHeading"> Error Pokemon: { ${search.value} } Not Found </h2>
    <br>
    <span id="errorText"> Press Error Details For more Error Details <span>
    </div>
    `
    errorButton = document.getElementById("errorButton");
    if (errorButton === null) {
        errorButton = document.createElement("button");
        errorButton.setAttribute("id", "errorButton");
        errorButton.innerHTML = "Error Details";    
        
        controlPanel.appendChild(errorButton);
        errorButton.onclick = () => {
            errorText = document.getElementById("errorText");
            errorText.style.color = "blue";
            errorText.innerHTML = `<br>Failed Sending: ${errorData.config.method.toUpperCase()} Request To ${
                errorData.request.responseURL
            } <br> Error Data: ${(errorData.status, errorData.data)}`;
            // errorText.innerHTML = `${JSON.stringify(errorData)}`;
            errorHeading.style.color = "red";
            errorHeading.innerHTML = "Full Error Details\n\n";
          }} else {
            errorButton.onclick = () => {
                errorText = document.getElementById("errorText");
                errorText.style.color = "green";
              errorText.innerHTML = `<br>Failed Sending: ${errorData.config.method.toUpperCase()} Request To ${
                  errorData.request.responseURL
              } <br> Error Data: ${(errorData.status, errorData.data)}`;
              errorElement.style.display = "block";;
              errorHeading.innerHTML = "Full Error Details\n\n";
      }}


  };


searchButton.onclick = () => {
    if (search.value === ""){
        return alert("You Must Insert Either Pokemon Name or Pokemon ID !");
    }
    searchPokemon(search.value);
}

// function displayError(errorData) {
//   var errorButton = document.getElementById("errorButton");
//   const input = search.value;
//   console.log(`Search Value: ${input}`);
//   console.log("DisplayError Func");
//   console.error(errorData);
  
//   errorElement.style.opacity = "1";
//   errorElement.style.height = "50";
//   errorElement.style.display = "block";
//   console.log("errorButton");
//   console.log(errorButton);
//   if (errorButton === null) {
//       errorButton = document.createElement("button");
//       errorButton.setAttribute("id", "errorButton");
//       errorButton.innerHTML = "Error Details";    
      
//       controlPanel.appendChild(errorButton);
//       errorButton.onclick = () => {
//         errorText.style.color = "blue";
//         errorText.innerHTML = `${JSON.stringify(errorData)}`;
//         errorHeading.innerHTML = "Full Error Details\n\n";
//       }} else if (errorButton != null) {
//         errorButton.onclick = () => {
//           errorText.style.color = "blue";
//           errorText.innerHTML = `${JSON.stringify(errorData)}`;
//           errorHeading.innerHTML = "Full Error Details\n\n";
//   }}



//   if (errorData === "Empty String Error") {
//     alert("Pokemon ID is Empty");
//     errorHeading.innerHTML = "Empty String Error";
//     errorHeading.style.color = "black";

//     errorText.style.color = "green";
//     errorText.innerHTML = "You Must Choose Pokemon ID To Search";
//   } 
//   else {
//     alert(`Please Check if { ${search.value} } is a Valid ID`);
//     errorHeading.innerHTML =
//       "Error Pokemon ID Not Found" +
//       "<br>" +
//       "Press Error Details for more Details";
//     errorText.style.color = "red";
//     errorText.innerHTML = `<br>Failed Sending: ${errorData.config.method.toUpperCase()} Request To ${
//       errorData.request.responseURL
//     } <br> Error Data: ${(errorData.status, errorData.data)}`;
//     errorElement.style.display = "block";
//   };
// }
