// seleção de elementos para alternância de navegação
const navToggle = document.querySelector(".nav-toggle"); // botão de alternância
const links = document.querySelector(".links"); // contêiner dos links de navegação

// alterna a exibição dos links ao clicar no botão
navToggle.addEventListener("click", () => {
  links.classList.toggle("show-links"); // adiciona ou remove a classe "show-links"
});

// CRUD - gerenciamento de livros

// adicionando um livro
const form = document.querySelector(".book-form");
const alert = document.querySelector(".alert");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value;
  const description = document.getElementById("description").value;

  const book = { title, author, pages, genre, year, description };

  const books = JSON.parse(localStorage.getItem("books")) || [];

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));

  form.reset();

  displayAlert("Livro adicionado com sucesso", "success");
});

// função para aparecer o alerta ao usuário
function displayAlert(text, action) {
  alert.textContent = text; // define o texto do alerta
  alert.classList.add(`alert-${action}`); // aplica estilo ao alerta
  setTimeout(function () {
    alert.textContent = ""; // remove o texto após 1 segundo
    alert.classList.remove(`alert-${action}`); // remove o estilo
  }, 2000);
}
