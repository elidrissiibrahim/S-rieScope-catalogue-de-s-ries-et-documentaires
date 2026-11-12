const section = document.getElementById("filmes");
const chercher = document.getElementById("cherche");
const select = document.getElementById("genrefilter");
let tabGenres = [];

async function recuperaionData() {
    const data = await fetch("https://api.tvmaze.com/shows?page=0");
    const response = await data.json();
    affecher(response);

    chercher.addEventListener("input", () => {
        const movie = chercherName(response);
        console.log(movie);
        affecher(movie);
    })

    genre.addEventListener("input", () => {
        const movie = chercherGenre(response);
        console.log(movie);
        affecher(movie);
    })
    ColecteGenre(response);
}

function ColecteGenre(api){
    for(let i = 0 ; i < api.length ; i++){
        for(let j = 0 ; j < api[i].genres.length ; j++)
        {
                if(!tabGenres.includes(api[i].genres[j]))
                {
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
function chercherName(data) {
    const newTable = data.filter((e) => e.name.toLowerCase().includes(chercher.value.toLowerCase()));
    return newTable;
}
function chercherGenre(data) {
    const newTable = data.filter((e) => e.Genres.toLowerCase().includes(chercher.value.toLowerCase()));
    return newTable;
}
function affecherGenres(){
    tabGenres.forEach(genre =>{
        const option = document.createElement("option");
        option.value = genre ;
        option.textContent = genre ;
        select.append(option);
        
    });
}
function affecher(api) {
    section.textContent = "";

    api.forEach(element => {
        const article = creerElement("article", "border-1 border-white rounded-2xl", "", "");
        const div = creerElement("div", "w-full rounded-t-2xl", "", "");
        const img = creerElement("img", "w-full rounded-t-2xl", "", element.image.medium);
        div.append(img);
        article.append(div);
        const div2 = creerElement("div", "text-white", "", "");
        const h2 = creerElement("h2", "text-white text-xl", element.name, "");
        const p = creerElement("p", "text-white", element.summary, "", "");

        element.genres.forEach(genre => {
            const pgenre = creerElement("p","", genre ,"");
            div2.append(pgenre);
        })
        div2.append(h2 , p);
        article.append(div2);
        section.append(article);
    });
}
recuperaionData();
affecherGenres();