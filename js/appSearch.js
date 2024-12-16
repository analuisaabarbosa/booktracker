// seleção de elementos para alternância de navegação
const navToggle = document.querySelector(".nav-toggle"); // botão de alternância
const links = document.querySelector(".links"); // contêiner dos links de navegação

// alterna a exibição dos links ao clicar no botão
navToggle.addEventListener("click", () => {
  links.classList.toggle("show-links"); // adiciona ou remove a classe "show-links"
});

// CRUD
document.addEventListener("DOMContentLoaded", function () {
  const alert = document.querySelector(".alert");
  const form = document.querySelector(".book-form");
  const searchForm = document.getElementById("search-form");
  const searchQuery = document.getElementById("search-query");
  const searchGenre = document.getElementById("search-genre");
  const bookList = document.getElementById("book-list");
  const clearBtn = document.querySelector(".clear-btn");

  // carrega livros do localStorage
  function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
  }

  function displayBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    if (books.length === 0) {
      bookList.innerHTML = displayAlert("Nenhum livro na lista", "danger");
    } else {
      books.forEach((book, index) => {
        const bookItem = document.createElement("li");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `
                  <h3>${book.title}</h3>
                  <p><strong>Autor:</strong> ${book.author}</p>
                  <p><strong>Ano de Publicação:</strong> ${book.year}</p>
                  <p><strong>Páginas:</strong> ${book.pages}</p>
                  <p><strong>Gênero:</strong> ${book.genre}</p>
                  <p><strong>Descrição:</strong> ${book.description}</p>
                  <button class="edit-btn" data-index="${index}">Editar</button>
                  <button class="delete-btn" data-index="${index}">Deletar</button>
              `;

        const editBtn = bookItem.querySelector(".edit-btn");
        const deleteBtn = bookItem.querySelector(".delete-btn");

        editBtn.addEventListener("click", function () {
          // Ação de edição (exemplo: você pode preencher um formulário para editar os dados)
          const bookToEdit = books[index];
          document.getElementById("title").value = bookToEdit.title;
          document.getElementById("author").value = bookToEdit.author;
          document.getElementById("year").value = bookToEdit.year;
          document.getElementById("pages").value = bookToEdit.pages;
          document.getElementById("genre").value = bookToEdit.genre;
          document.getElementById("description").value = bookToEdit.description;

          const submitBtn = document.querySelector(".submit-btn");
          submitBtn.textContent = "Salvar Alterações";

          form.onsubmit = function (e) {
            e.preventDefault();
            books[index] = {
              title: document.getElementById("title").value,
              author: document.getElementById("author").value,
              year: document.getElementById("year").value,
              pages: document.getElementById("pages").value,
              description: document.getElementById("description").value,
            };
            localStorage.setItem("books", JSON.stringify(books));
            form.reset();
            displayBooks();

            submitBtn.textContent = "Adicionar Livro";
            form.onsubmit = addBookHandler;

            displayAlert("Livro atualizado com sucesso", "success");
          };
        });

        deleteBtn.addEventListener("click", function () {
          // Confirmação de deleção
          const confirmed = confirm(
            "Você tem certeza que deseja excluir este livro?"
          );

          if (confirmed) {
            // Deletando o livro
            books.splice(index, 1); // Remove o livro do array

            // Se a lista de livros ficar vazia, remove o localStorage
            if (books.length === 0) {
              localStorage.removeItem("books"); // Remove o 'books' do localStorage
            } else {
              localStorage.setItem("books", JSON.stringify(books)); // Atualiza o localStorage com o array sem o livro
            }

            // Limpa a visualização da lista de livros
            const bookList = document.getElementById("book-list");
            bookList.innerHTML = "";

            // Atualiza a visualização com a lista de livros
            displayBooks();

            // Exibe o alerta de sucesso
            displayAlert("Livro deletado com sucesso", "success");

            // Verifica se a lista de livros está vazia
            if (books.length === 0) {
              // Exibe alerta de lista vazia
              displayAlert("Nenhum livro na lista", "danger");
            }
          }
        });

        bookList.appendChild(bookItem);
      });
    }
  }

  document.getElementById("search-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const books = JSON.parse(localStorage.getItem("books")) || [];
    // se a lista de livros estiver vazia
    if (books.length === 0) {
      displayAlert("Nenhum livro na lista", "danger");
    } else {
      // se houver livros na lista, exibe os livros
      displayBooks();
    }
  });

  // Filtra livros com base no formulário
  function searchBooks(e) {
    e.preventDefault();
    const query = searchQuery.value.toLowerCase();
    const genre = searchGenre.value;
    const books = getBooks();

    const filteredBooks = books.filter((book) => {
      const matchesQuery =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      const matchesGenre = genre ? book.genre === genre : true;
      return matchesQuery && matchesGenre;
    });

    displayBooks(filteredBooks);
  }

  // limpa a lista
  clearBtn.addEventListener("click", function () {
    if (bookList.innerHTML.trim() === "") {
      // se a lista estiver vazia
      displayAlert("A lista já está vazia", "danger");
    } else {
      // se houver livros, limpa a lista e reseta o formulário
      bookList.innerHTML = "";
      searchForm.reset();
      localStorage.removeItem("books");
      displayAlert("Lista limpa com sucesso", "success");
    }
  });

  // função para aparecer o alerta ao usuário
  function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 2000);
  }

  searchForm.addEventListener("submit", searchBooks);
});
