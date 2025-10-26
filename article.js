import { decodeHTML } from "./decodeHTML.js";

const params = new URLSearchParams(window.location.search);
const articleId = parseInt(params.get("id"), 10);

const articles = JSON.parse(localStorage.getItem("articles") || "[]");
const article = articles.find(a => a.id === articleId);

if (!article) {
  document.body.innerHTML = "<h2 style='text-align:center;color:red;'>Artículo no encontrado</h2>";
} else {
  document.getElementById("article-title").textContent = decodeHTML(article.title);
  document.getElementById("article-subtitle").textContent = decodeHTML(article.subtitle || "");
  document.getElementById("article-author").textContent = article.author ? `Por ${decodeHTML(article.author)}` : "";
  document.getElementById("article-date").textContent = article.date || "";
  document.getElementById("article-body").innerHTML = decodeHTML(article.body || "");
}
