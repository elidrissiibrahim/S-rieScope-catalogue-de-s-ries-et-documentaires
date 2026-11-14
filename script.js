const section = document.getElementById("filmes");
const chercher = document.getElementById("cherche");
const select = document.getElementById("genrefilter");
const nom = document.getElementById("nom");
const genre = document.getElementById("genre");
const description = document.getElementById("description");
const btnAjouter = document.getElementById("ajouter");
const reset = document.getElementById("reset");
let tabGenres = [];

async function recuperaionData() {
    const data = await fetch("https://api.tvmaze.com/shows?page=0");
    const response = await data.json();

    const movies = response.slice(0, 20);

    ColecteGenre(movies);
    affecherGenres();

    affecher(movies);

    chercher.addEventListener("input", () => {
        filtrer(movies);
    });

    select.addEventListener("change", () => {
        filtrer(movies);
    });
    btnAjouter.addEventListener("click", () => {
        if (nom.value.trim() === "" || genre.value.trim() === "") {
            alert("Veuillez remplir les champs obligatoires");
            return;
        }
        ajouter(movies);
    });

    reset.addEventListener("click", (e) => {
        e.preventDefault();
        chercher.value = "";
        select.value = "";
        affecher(movies);
    });
}

function ColecteGenre(api) {
    for (let i = 0; i < api.length; i++) {
        for (let j = 0; j < api[i].genres.length; j++) {
            if (!tabGenres.includes(api[i].genres[j])) {
                tabGenres.push(api[i].genres[j]);
            }
        }
    }
}

function creerElement(tag, classList = "", content = "", src = null) {
    const element = document.createElement(tag);
    element.classList = classList
    element.textContent = content
    if (tag == "img") {
        element.setAttribute("src", src);
    }
    return element;
}
function filtrer(data) {
    const resultat = data.filter(e =>
        e.name.toLowerCase().includes(chercher.value.toLowerCase()) &&
        (select.value === "" || e.genres.includes(select.value))
    );

    affecher(resultat);
}
function affecherGenres() {
    tabGenres.forEach(genre => {
        const option = document.createElement("option");
        option.classList.add("text-black");
        option.value = genre;
        option.textContent = genre;
        select.append(option);
    });
}
function affecher(movies) {
    section.textContent = "";

    movies.forEach(element => {
        const article = creerElement("article", "border-1 border-white rounded-2xl", "", "");
        const div = creerElement("div", "w-full rounded-t-2xl", "", "");
        const img = creerElement("img", "w-full rounded-t-2xl", "", element.image.medium);
        div.append(img);
        article.append(div);
        const div2 = creerElement("div", "text-white", "", "");
        const h2 = creerElement("h2", "text-white text-xl font-bold m-[10px]", element.name, "");
        const p = creerElement("p", "text-white m-[10px]", "", "", "");
        p.innerHTML = element.summary;
        const divgenres = creerElement("div", "flex gap-4 m-[10px]")
        element.genres.forEach(genre => {
            const pgenre = creerElement("p", "bg-[#292929] rounded-xl pr-[5px] pl-[5px]", genre);

            divgenres.append(pgenre);
        });

        div2.append(h2, divgenres, p);
        article.append(div2);
        section.append(article);
    });
}
function ajouter(api) {

    const genres = genre.value.split(",").map(e => e.trim());

    const newSerie = {
        name: nom.value,
        genres: genres,
        summary: description.value,
        image: {
            medium: "assets/movie.png"
        }
    };

    api.unshift(newSerie);

    affecher(api);

    nom.value = "";
    genre.value = "";
    description.value = "";
}
recuperaionData();