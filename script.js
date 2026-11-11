const section = document.getElementById("filmes");
const chercher = document.getElementById("cherche");

async function recuperaionData() {
    const data = await fetch("https://api.tvmaze.com/shows?page=0");
    const response = await data.json();
    affecher(response);
    chercher.addEventListener("input", () => {
        const movie = chercherName(response);
        console.log(movie);
        affecher(movie);
    })
    Genres.addEventListener("input", () => {
        const movie = chercherGenre(response);
        console.log(movie);
        affecher(movie);
    })
}

function creerElement(tag, classList = "", content = "", src = null) {
    const element = document.createElement(tag);
    element.className = classList
    element.textContent = content
    if (tag == "img") {
        element.setAttribute("src", src);
    }
    return element;
}
function chercherName(data) {
    const newTable = data.filter((e) => e.name.toLowerCase().includes(chercher.value.toLowerCase()));
    return newTable;
}
function chercherGenre(data) {
    const newTable = data.filter((e) => e.Genres.toLowerCase().includes(chercher.value.toLowerCase()));
    return newTable;
}


function affecher(api) {
    section.textContent = "";

    api.forEach(element => {
        const article = creerElement("article", "border-1 border-white rounded-2xl", "", "");
        const div = creerElement("div", "w-full rounded-t-2xl", "", "");
        const img = creerElement("img", "w-full rounded-t-2xl", "", element.image.original);
        div.append(img);
        article.append(div);
        const div2 = creerElement("div", "text-white", "", "");
        const h2 = creerElement("h2", "text-white text-xl", element.name, "");
        const p = creerElement("p", "text-white", element.summary, "", "");

        div2.append(h2);
        element.genres.forEach(genre => {
            const pgenre = creerElement("p","", genre, "");
            div2.append(pgenre);
        })
        div2.append(p);
        article.append(h2, p ,);
        section.append(article);
    });
}
recuperaionData()
{/* <article class=" border-1 border-white rounded-2xl">
    <div>
        <img src="assets/OIP.webp" alt="" class="w-full rounded-t-2xl">
    </div>
    <div class="text-white">
        <h2>Breaking Bad</h2>
        <p>
            Un professeur de chimie mène une double vie.
        </p>
    </div>
</article> */}