function creerElement(tag, classList = "", content = "", src = null) {
    const element = document.createElement(tag);
    element.classList = classList
    element.textContent = content
    if (tag == "img") {
        element.setAttribute("src", src);
    }
    return element;
}

export function affecher(movies , section) {
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