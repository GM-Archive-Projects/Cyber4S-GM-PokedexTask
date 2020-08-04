// defaults
axios.defaults.baseURL = "http://pokeapi.co/api/v2/pokemon/";
axios.defaults.validateStatus = status => status >= 200 && status < 300;

function getPokemon(pokemonId) {
  axios.get(`/${pokemonId}`).then(function(response){
    console.log(response.data);
    })
    .catch(function(error){
      console.log(error.response.data);
      console.log(error.response.status);
    })}
    getPokemon(999)

/* 
function getResource(resource) {
    return axios.get("/" + resource).then(r => r.data);
}

function postResource(resource, resourceData) {
    return axios.post("/" + resource, resourceData).then(r => r.data);
}

(async function main() {
  const resources = await getResources();
  console.log(resources);
  
  if (resources.length > 0) {
    const resource = await getResource(resources[0]);
    console.log(resource);
  }

  const testResource = { x: 5, y: 7 };
  const response = await postResource("test", testResource);
  console.log(response);
})();
 
 */