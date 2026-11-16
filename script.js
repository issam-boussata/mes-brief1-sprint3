const API_URL = "https://countries.dev/countries";

// Tous les pays reçus de l'API (rempli une seule fois, au chargement)
let allCountries = [];

// TODO : récupère ici les éléments du DOM dont tu as besoin

/**
 * Récupère tous les pays depuis l'API.
 * - Utilise fetch avec async/await.
 * - Appelée UNE SEULE FOIS, au chargement de la page.
 *
 * @returns {Promise<Array>} Le tableau de tous les pays.
 */
async function fetchCountries() {
  try{
    const res = await fetch(API_URL) ;
    if (res.ok) {
      const data = await res.json() ;
      allCountries = data ;
      displayCountries(allCountries)
      
    }else{
      throw new Error("http error : " + res.status)
    }

  }catch(err){
    console.Error(err.message);
    

  }
}

/**
 * Crée la carte HTML d'un pays, sur le modèle de la maquette :
 * drapeau (avec un texte alternatif utile), nom, capitale, population.
 *
 * @param {Object} country - Un pays tel que renvoyé par l'API.
 * @returns {HTMLElement} La carte, prête à être ajoutée à la grille.
 */
function createCountryCard(country) {
  // TODO
}

/**
 * Affiche une liste de pays dans la grille.
 * - Vide d'abord la grille (sinon les cartes s'accumulent).
 * - Ajoute une carte par pays.
 * - Si la liste est vide, affiche le message « Aucun pays ne correspond ».
 *
 * @param {Array} countries - Les pays à afficher.
 */
function displayCountries(countries) {
  const containner_cartes = document.getElementById("cartes") ;
  containner_cartes.innerHTML = "" ;

  countries.forEach(countrie => {
    // creation des elements
    const countainner_carte = document.createElement("article") ;
    const drapeau_countr = document.createElement("img") ;
    const name_country = document.createElement("h2") ;
    const div_capital = document.createElement("div") ;
    const capital_key = document.createElement("p") ;
    const capital_value = document.createElement("p") ;
    const div_population = document.createElement("div") ;
    const population_key = document.createElement("p") ;
    const population_value = document.createElement("p") ;


    //remplir
    drapeau_countr.src = countrie.flags.png || `images/Drapeau_img.webp` ;
    name_country.textContent = countrie.name ;
    capital_key.textContent = "Capitale" ;
    capital_value.textContent = countrie.capital ;
    population_key.textContent = "Population" ;
    population_value.textContent = countrie.area ;

    //append
    div_capital.append(capital_key , capital_value) ;
    div_population.append(population_key ,population_value) ;
    countainner_carte.append(drapeau_countr , name_country , div_capital , div_population) ;
    containner_cartes.append(countainner_carte) ;


    // style in tailwindcss
    countainner_carte.className = "bg-[#ffffff] border border-[#d9e0e8] rounded-md " ;
    drapeau_countr.className = " w-[100%]" ;
    name_country.className = " m-4 font-bold text-[30px] "
    div_capital.className = "m-4 flex justify-between" ;
    div_population.className = "m-4 flex justify-between" ;
    capital_key.className = "text-[#5B6576] " ;
    capital_value.className = "text-[20px] " ;
    population_key.className = "text-[#5B6576] " ;
    population_value.className = "text-[20px] " ;

  })

}

/**
 * Applique les deux filtres EN MÊME TEMPS sur allCountries :
 * - le continent choisi dans la liste déroulante ;
 * - le texte saisi dans la recherche (majuscules et minuscules ignorées).
 * Puis affiche le résultat avec displayCountries().
 *
 * Aucune requête vers l'API ici !
 */
function filterCountries() {
  const Continent = document.getElementById("Continent").value ;
  const pay = document.getElementById("pay").value ;
  const Countries = allCountries.filter(Countrie => (Countrie.region === Continent || Continent === "" ) && (Countrie.name.toLowerCase().includes(pay.toLowerCase()) || pay === "") ) ;
  displayCountries(Countries)
}
document.getElementById("Continent").addEventListener("change" ,()=>{

  filterCountries()
} 
) ;
document.getElementById("pay").addEventListener("input" ,()=>{

  filterCountries()
} 
) ;

// ------------------------------------------------------------
// BONUS
// ------------------------------------------------------------

/**
 * (Bonus) Trie des pays par population, du plus peuplé au moins peuplé.
 * Attention : ne modifie pas le tableau allCountries d'origine.
 *
 * @param {Array} countries
 * @returns {Array} Un nouveau tableau trié.
 */
function sortByPopulation(countries) {
  // TODO
}

/**
 * (Bonus) Affiche ou masque le message « Chargement des pays… ».
 *
 * @param {boolean} isLoading - true pour l'afficher, false pour le masquer.
 */
function showLoader(isLoading) {
  // TODO
}

/**
 * (Bonus) Affiche un message d'erreur clair quand l'API ne répond pas.
 *
 * @param {string} message
 */
function showError(message) {
  // TODO
}


// ------------------------------------------------------------
// DÉMARRAGE
// ------------------------------------------------------------

/**
 * Point d'entrée de l'application :
 * 1. récupère les pays avec fetchCountries() et les stocke dans allCountries ;
 * 2. affiche les pays du continent sélectionné par défaut ;
 * 3. écoute les changements de continent et la saisie dans la recherche.
 *
 * (Bonus) Gère le chargement et les erreurs avec try...catch.
 */
async function init() {
  fetchCountries() ;
}

init();
