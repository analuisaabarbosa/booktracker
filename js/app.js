// seleção de elementos para alternância de navegação
const navToggle = document.querySelector(".nav-toggle"); // botão de alternância
const links = document.querySelector(".links"); // contêiner dos links de navegação

// alterna a exibição dos links ao clicar no botão
navToggle.addEventListener("click", () => {
  links.classList.toggle("show-links"); // adiciona ou remove a classe "show-links"
});

// CRUD - gerenciamento de livros

// seleção dos elementos do formulário
const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const pages = document.getElementById("pages");
const genre = document.getElementById("genre");
const description = document.getElementById("description");
const bookList = document.querySelector(".book-list");


