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
