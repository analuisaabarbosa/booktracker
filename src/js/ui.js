import { loadLibrary } from './storage.js';
import { addBookToLibrary } from './storage.js';

export function createBookInSearch(book) {
    const card = document.createElement('div');
    card.classList.add('search-result');

    const bookCover = document.createElement('img');
    bookCover.src = book.imageLinks?.thumbnail || 'https://via.placeholder.com/100x150?text=No+Cover';
    bookCover.alt = book.title || 'Sem título';

    const info = document.createElement('div');
    info.classList.add('search-result-info');

    const title = document.createElement('h4');
    title.classList.add('search-result-title');
    title.textContent = book.title || 'Sem título';

    const author = document.createElement('p');
    author.classList.add('search-result-author');
    author.textContent = (book.authors && book.authors.join(', ')) || 'Autor desconhecido';

    const description = document.createElement('p');
    description.classList.add('search-result-description');
    description.textContent = book.description || 'Sem descrição disponível';

    const genre = document.createElement('span');
    genre.classList.add('search-result-genre');
    genre.textContent = (book.categories && book.categories[0]) || 'Gênero desconhecido';

    const plusIcon = document.createElement('img');
    plusIcon.src = './src/assets/icons/plus-solid-full.svg';
    plusIcon.alt = 'Adicionar';

    const addBtnSearch = document.createElement('button');
    addBtnSearch.classList.add('add-result-btn');
    addBtnSearch.appendChild(plusIcon);

    addBtnSearch.addEventListener('click', () => {
        const addedBook = addBookToLibrary(book);
        if (addedBook) {
            renderLibrary();
            addBookModal.close();
            searchResults.innerHTML = '';
            searchInput.value = '';
        }
    })

    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(description);
    info.appendChild(genre);

    card.appendChild(bookCover);
    card.appendChild(info);
    card.appendChild(addBtnSearch);

    return card;
}

export function renderLibrary(view = 'grid') {
    const library = loadLibrary();
    const container = document.getElementById('booksContainer');
    const emptyState = document.getElementById('emptyState');
    container.querySelectorAll(`li:not(#emptyState)`).forEach(li => li.remove());
    if (library.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');
    if (view === 'grid') {
        container.classList.add('books-grid');
        container.classList.remove('books-list');
    } else {
        container.classList.add('books-list');
        container.classList.remove('books-grid');
    }
    library.forEach(book => {
        const li = document.createElement('li');
        li.classList.add('book-card');
        li.innerHTML = `
            <div class="book-cover-container"> 
                <img src="${book.thumbnail}" alt="${book.title}" class="book-cover"  />
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="book-author">${book.authors.join(', ')}</p>
                <p class="book-description">${book.description || ''}</p>
                <span class="book-genre">${book.categories[0]}</span>
                <div class="book-actions">
                    <button class="btn-read" onclick="toggleReadStatus(${book.id})">
                        <img src="./src/assets/icons/check-solid-full.svg" />
                        Marcar como lido
                    </button>
                    <button class="btn-edit" onclick="editBook(${book.id})">
                        <img src="./src/assets/icons/pen-to-square-solid-full.svg" />
                        Editar
                    </button >
                    <button class="btn-delete" onclick="confirmDeleteBook(${book.id})">
                        <img src="./src/assets/icons/trash-solid-full.svg" />
                        Deletar
                    </button>
                </div >
            </div >
        `
        container.appendChild(li);
    })
}