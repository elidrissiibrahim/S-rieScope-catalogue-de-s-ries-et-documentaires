import { affecher } from "./ui/cards.js";
import { recuperaionData } from "./services/serieService.js"

const section = document.getElementById("filmes");
const chercher = document.getElementById("cherche");
const select = document.getElementById("genrefilter");
const nom = document.getElementById("nom");
const genre = document.getElementById("genre");
const description = document.getElementById("description");
const btnAjouter = document.getElementById("ajouter");
const reset = document.getElementById("reset");

async function data(){
    const data = await recuperaionData();
    affecher(data , section);
}
data();