
async function getArticlesByDate() {
    const date = document.getElementById("date-input").value;
    var e = document.getElementById("article-subsections");
    var text = e.options[e.selectedIndex].text;
    var numberResults = document.getElementById("number-results").value;
    
    if (numberResults > 100) {
        numberResults = 100;
    } else if (numberResults < 1) {
        numberResults = 1;
    } 

    let url = `https://newsapi.ecn.cl/NewsApi/lasegunda/subseccion/${text}?size=${numberResults}&fechaPublicacion=${date}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        const contenedor = document.getElementById('noticias');
        contenedor.innerHTML = '';

        data.hits.hits.forEach((hit, idx) => {

            const id = hit._id;
            const noticia = hit._source;

            const article = document.createElement('article');
            article.style.margin = "10px";
            article.style.padding = "10px";
            article.style.maxWidth = "600px";
            article.style.borderRadius = "5px"
            article.style.border = "1px solid #ccc";
            article.style.boxShadow = "2px 4px 5px 5px #f1f1f1f6";
        

            const title = document.createElement('h2');
            title.textContent = noticia.titulo;

            const subtitle = document.createElement('p');
            subtitle.textContent = noticia.bajada?.[0]?.texto || '';

            const date = document.createElement('small');
            date.textContent = `Publicado: ${new Date(noticia.fechaPublicacion).toLocaleDateString()}`;

            const author = document.createElement('small');
            author.textContent = ` | Autor: ${noticia.autor}`;

            // Cuerpo de la noticia
            const cuerpo = document.createElement('small');
            cuerpo.textContent = noticia.texto;

            const link = document.createElement('a');
            link.href = `article.html?id=${id}&subsection=${text}&size=${numberResults}&date=${new Date(noticia.fechaPublicacion).toISOString().split("T")[0]}`;
            link.textContent = 'Leer más';
            link.target = '_blank';

            if (noticia.tablas?.tablaMedios?.length > 0) {
                const img = document.createElement('img');
                img.src = noticia.tablas.tablaMedios[0].Url;
                img.alt = 'Imagen';
                img.style.maxWidth = '100%';
                article.appendChild(img);
            }

            article.appendChild(title);
            article.appendChild(subtitle);
            article.appendChild(date);
            article.appendChild(author);
            article.appendChild(document.createElement('br'));
            article.appendChild(link);

            contenedor.appendChild(article);
        });

    } catch (error) {
        console.log("Error:", error);
    }
}

document.getElementById("search-button").onclick = getArticlesByDate;