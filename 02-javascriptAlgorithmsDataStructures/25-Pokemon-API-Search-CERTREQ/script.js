const pName = document.getElementById("pokemon-name");
const pId = document.getElementById("pokemon-id");
const pWeight = document.getElementById("weight");
const pHeight = document.getElementById("height");
const pImage = document.getElementById("pokemon-img");
const pTypes = document.getElementById("types");
const pHP = document.getElementById("hp");
const pAtt = document.getElementById("attack");
const pDef = document.getElementById("defense");
const pSpAtt = document.getElementById("special-attack");
const pSpDef = document.getElementById("special-defense");
const pSpeed = document.getElementById("speed");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const pokemonTypeColors = {
  "normal": "#A8A878",
  "fire": "#F08030",
  "water": "#6890F0",
  "electric": "#F8D030",
  "grass": "#78C850",
  "ice": "#98D8D8",
  "fighting": "#C03028",
  "poison": "#A040A0",
  "ground": "#E0C068",
  "flying": "#A890F0",
  "psychic": "#F85888",
  "bug": "#A8B820",
  "rock": "#B8A038",
  "ghost": "#705898",
  "dragon": "#7038F8",
  "dark": "#705848",
  "steel": "#B8B8D0",
  "fairy": "#F0B6BC"
};
let pokemonImages = {};
const pokemonRotations = 
  {
  0: "back_default",
  1: "back_female",
  2: "back_shiny",
  3: "back_shiny_female",
  4: "front_default",
  5: "front_female",
  6: "front_shiny",
  7: "front_shiny_female"
};

let rotation = 0;

// Note: Pokémon names should be in lowercase, have special characters removed, and be dash separated. Also, if the Pokémon has either ♀ or ♂ as part of its name, the format is {name-f} or {name-m}, respectively. 

const validateInput = () => {
  clearFields();
  const userinput = searchInput.value;
  // TODO: integers or alphabet up to so many chararacters
  const regex = /^(\d){1,5}$/;
  if (regex.test(userinput)){
    console.log("passed");
    callAPI(userinput);
  }
  else{alert("invalid input")};
  // Make it easier to choose next pokemon
  searchInput.focus();
}

const clearFields = () => {
  rotation = 0;
  pName.innerText = "";
  pId.innerText = "";
  pTypes.innerHTML = "";
}

const callAPI = async (nameorid) => {
try{
  const pokemonResponse = await fetch(`${pokemonUrl}/${nameorid}`)
  const pokemonJSON = await pokemonResponse.json();
  digestPokemon(pokemonJSON);
}  
catch(err){
  console.log(err);
}
}

const rotatePokemon = () => {
  rotation <= 6 ? rotation++ : rotation = 0;
  pImage.src = pokemonImages[pokemonRotations[rotation]];
}

const digestPokemon = (pokemonJSON) => {
  //console.log(pokemonJSON);
  const {_,height,id,name,sprites,stats,types,weight} = pokemonJSON;
  pokemonImages = sprites;
  console.log(pokemonImages);
// NAME
  pName.textContent = name;
// ID
  pId.textContent = id;
// WEIGHT
  pWeight.textContent = weight;
// HEIGHT
  pHeight.textContent = height;

// IMAGE(S)
  pImage.src = rotatePokemon(sprites);
  //console.log(sprites);


// TYPES

  types.forEach((type) => {
    const typeDiv = document.createElement("div");
    typeDiv.textContent = type.type.name.toUpperCase();
    typeDiv.style.backgroundColor = pokemonTypeColors[type.type.name];
    typeDiv.classList.add("pokemon-type");
    pTypes.appendChild(typeDiv);
  })
  // const {hp,attack,defense,specialattack,specialdefense,speed} = stats;

// HP

  pHP.textContent = stats[0]["base_stat"];
// ATT
  pAtt.textContent = stats[1]["base_stat"];

// DEF
  pDef.textContent = stats[2]["base_stat"];

// SPATT
  pSpAtt.textContent = stats[3]["base_stat"];

// SPDEF
  pSpDef.textContent = stats[4]["base_stat"];

// SPD
  pSpeed.textContent = stats[5]["base_stat"];

}

searchBtn.addEventListener("click",validateInput);
pImage.addEventListener("click",rotatePokemon);
