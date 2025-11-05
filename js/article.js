import { api } from "./client.js";
import { decodeHTML } from "./decodeHTML.js";

const params = new URLSearchParams(window.location.search);

const size = parseInt(params.get("size"), 10);
const date = params.get("date");
const subsection = params.get("subsection");

const articleId = parseInt(params.get("id"), 10);
let url = `https://newsapi.ecn.cl/NewsApi/lasegunda/subseccion/${subsection}?size=${size}&fechaPublicacion=${date}`;
const articlesData = await api(url);

const articleDataLength = articlesData.hits.hits.length;


if (articleDataLength == 0) {
    document.body.innerHTML = "<h2 style='text-align:center;color:red;'>Artículo no encontrado</h2>";
} else {
    const articleData = articlesData.hits.hits.find(item => item._id === articleId.toString());
    const article = articleData._source;

    document.getElementById("article-title").textContent = decodeHTML(article.titulo);
    document.getElementById("article-subtitle").textContent = decodeHTML(article.bajada?.[0]?.texto || '');
    document.getElementById("article-author").textContent = article.autor ? `Por ${decodeHTML(article.autor)}` : "";
    document.getElementById("article-date").textContent = `${new Date(article.fechaPublicacion).toLocaleDateString()}` || "";
    document.getElementById("article-body").innerHTML = decodeHTML(article.texto || "");
}


document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = "./";
  });
});