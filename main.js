// Global Scope Dom Environment Variables 
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const poke_container = document.getElementById("poke_container");
const errorElement = document.getElementById("error")
const pokesListElem = document.getElementById("pokeList")



//Defining Axios Defaults
import axios from 'axios';
axios.defaults.baseURL = "http://pokeapi.co/api/v2/";
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

