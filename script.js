

async function getArticlesByDate() {
    console.log("Llamado a la api");
    var e = document.getElementById("article-subsections");
    var text = e.options[e.selectedIndex].text;

    const date = document.getElementById("date-input").value;

    console.log(date);

    let url = `https://newsapi.ecn.cl/NewsApi/lasegunda/subseccion/${text}?size=100&fechaPublicacion=${date}`;

    console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(result.hits.hits);
        const contenedor = document.getElementById('noticias');

      data.hits.hits.forEach(hit => {
        const noticia = hit._source;

        const article = document.createElement('article');
        article.style.border = "1px solid #ccc";
        article.style.margin = "10px";
        article.style.padding = "10px";
        article.style.maxWidth = "600px";
        

        const titulo = document.createElement('h2');
        titulo.textContent = noticia.titulo;

        const bajada = document.createElement('p');
        bajada.textContent = noticia.bajada?.[0]?.texto || '';

        const fecha = document.createElement('small');
        fecha.textContent = `Publicado: ${new Date(noticia.fechaPublicacion).toLocaleDateString()}`;

        const autor = document.createElement('small');
        autor.textContent = ` | Autor: ${noticia.autor}`;

        const enlace = document.createElement('a');
        enlace.href = noticia.permalink;
        enlace.textContent = 'Leer más';
        enlace.target = '_blank';

        if (noticia.tablas?.tablaMedios?.length > 0) {
          const img = document.createElement('img');
          img.src = noticia.tablas.tablaMedios[0].Url;
          img.alt = 'Imagen';
          img.style.maxWidth = '100%';
          article.appendChild(img);
        }

        article.appendChild(titulo);
        article.appendChild(bajada);
        article.appendChild(fecha);
        article.appendChild(autor);
        article.appendChild(document.createElement('br'));
        article.appendChild(enlace);

        contenedor.appendChild(article);
      });


    } catch (error) {
        console.log("Error:", error);
    }

}



document.getElementById("search-button").onclick = getArticlesByDate;


