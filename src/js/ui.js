import { loadLibrary, addBookToLibrary, removeBookFromLibrary, updateBookInLibrary, getDefaultSettings, toggleReadStatusInStorage } from './storage.js';

let bookToEditId = null;
let bookToDeleteId = null;

const addBookModal = document.getElementById('addBookModal');
const searchResults = document.getElementById('searchResults');
const searchInput = document.getElementById('searchInput');

export function toggleReadStatus(bookId) {
    const updatedBook = toggleReadStatusInStorage(bookId);

    if (updatedBook) {
        if (updatedBook.isRead) {
            alert(`"${updatedBook.title}" marcado como lido!`)
        } else {
            alert(`"${updatedBook.title}" marcado como a ler!`)
        }
    }

    renderLibrary();
}

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

export function editBook(bookId) {
    const editModal = document.getElementById('editBookModal');
    const book = loadLibrary().find(b => b.id === bookId);

    if (book) {
        bookToEditId = bookId;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.authors.join(', ');
        document.getElementById('editDescription').value = book.description;
        document.getElementById('editGenre').value = book.categories?.[0] || '';
        editModal.showModal();
    }
}

export function saveEditedBook() {
    const title = document.getElementById('editTitle').value;
    const authors = document.getElementById('editAuthor').value.split(',').map(s => s.trim());
    const description = document.getElementById('editDescription').value;
    const genre = document.getElementById('editGenre').value;

    if (bookToEditId && title && authors.length > 0) {
        const updatedBook = {
            id: bookToEditId,
            title,
            authors,
            description,
            categories: [genre],
        };
        updateBookInLibrary(updatedBook);
        renderLibrary();
        closeEditModal();
    }
}

export function closeEditModal() {
    const editModal = document.getElementById('editBookModal');
    editModal.close();
    bookToEditId = null;
}

export function confirmDeleteBook(bookId) {
    const deleteModal = document.getElementById('deleteModal');
    bookToDeleteId = bookId;
    deleteModal.showModal();
}

export function deleteBook() {
    if (bookToDeleteId !== null) {
        removeBookFromLibrary(bookToDeleteId);
        renderLibrary()
        closeDeleteModal();
    }
}

export function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.close();
    bookToDeleteId = null;
}

export function renderLibrary(view = getDefaultSettings().viewMode) {
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

        const readBtnText = book.isRead ? 'Não lido' : 'Marcar como lido';
        const readBtnClass = book.isRead ? 'btn-unread' : 'btn-read';

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
                    <button class="${readBtnClass}">
                        <img src="./src/assets/icons/check-solid-full.svg" />
                        ${readBtnText}
                    </button>
                    <button class="btn-edit">
                        <img src="./src/assets/icons/pen-to-square-solid-full.svg" />
                        Editar
                    </button >
                    <button class="btn-delete">
                        <img src="./src/assets/icons/trash-solid-full.svg" />
                        Deletar
                    </button>
                </div >
            </div >
        `

        const readBtn = li.querySelector('.btn-read, .btn-unread');
        readBtn.addEventListener('click', () => toggleReadStatus(book.id));

        const editBtn = li.querySelector('.btn-edit');
        editBtn.addEventListener('click', () => editBook(book.id));

        const deleteBtn = li.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => confirmDeleteBook(book.id));

        container.appendChild(li);
    })
}