import { loadLibrary, addBookToLibrary, removeBookFromLibrary, updateBookInLibrary, getDefaultSettings, toggleReadStatusInStorage } from './storage.js';

// --- these variables temporarily store the ID of the book being acted upon by a moda ---
let bookToEditId = null;
let bookToDeleteId = null;

// --- references to frequently used DOM elements ---
const addBookModal = document.getElementById('addBookModal');
const searchResults = document.getElementById('searchResults');
const searchInput = document.getElementById('searchInput');

// --- stores the currently active filter for the library view ('all', 'read', 'unread') --- 
let currentFilter = 'all';

/// --- updates the current filter and triggers a re-render of the library ---
export function filterLibrary(filter) {
    currentFilter = filter;
    renderLibrary();
}

// --- updates the current filter and triggers a re-render of the library ---
export function renderStats() {
    const library = loadLibrary();

    const totalBooks = library.length;
    const booksRead = library.filter(book => book.isRead).length;
    const booksToRead = totalBooks - booksRead;

    const progress = totalBooks > 0 ? ((booksRead / totalBooks) * 100).toFixed(0) : 0;

    document.getElementById('totalBooksNumber').textContent = totalBooks;
    document.getElementById('booksReadNumber').textContent = booksRead;
    document.getElementById('booksToReadNumber').textContent = booksToRead;
    document.getElementById('readingProgressNumber').textContent = `${progress}%`;
}

// --- handles the click event to toggle a book's read status ---
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

// --- creates and returns a DOM element for a single book in the search results ---
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
    plusIcon.src = './assets/icons/plus-solid-full.svg';
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

// --- populates the edit modal with a book's current data and displays it ---
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

// --- saves the changes from the edit modal ---
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

// --- closes the edit modal and resets the state ---
export function closeEditModal() {
    const editModal = document.getElementById('editBookModal');
    editModal.close();
    bookToEditId = null;
}

// --- shows the delete confirmation modal ---
export function confirmDeleteBook(bookId) {
    const deleteModal = document.getElementById('deleteModal');
    bookToDeleteId = bookId;
    deleteModal.showModal();
}

// --- deletes the book after confirmation ---
export function deleteBook() {
    if (bookToDeleteId !== null) {
        removeBookFromLibrary(bookToDeleteId);
        renderLibrary()
        closeDeleteModal();
    }
}

// --- closes the delete modal and resets the state ---
export function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.close();
    bookToDeleteId = null;
}

// --- renders the entire book library to the DOM based on the current filter and view mode ---
export function renderLibrary() {
    const library = loadLibrary();
    const container = document.getElementById('booksContainer');
    const emptyState = document.getElementById('emptyState');

    const savedView = localStorage.getItem('viewMode');
    const view = savedView || getDefaultSettings().viewMode;

    const filteredLibrary = library.filter(book => {
        if (currentFilter === 'read') {
            return book.isRead;
        } else if (currentFilter === 'unread') {
            return !book.isRead;
        } else {
            return true;
        }
    });

    container.querySelectorAll(`li:not(#emptyState)`).forEach(li => li.remove());

    if (filteredLibrary.length === 0) {
        emptyState.classList.remove('hidden');
        container.classList.remove('books-grid');
        container.classList.remove('books-list');
    } else {
        emptyState.classList.add('hidden');
        if (view === 'grid') {
            container.classList.add('books-grid');
            container.classList.remove('books-list');
        } else {
            container.classList.add('books-list');
            container.classList.remove('books-grid');
        }
    }

    filteredLibrary.forEach(book => {
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
                        <img src="./assets/icons/check-solid-full.svg" />
                        ${readBtnText}
                    </button>
                    <button class="btn-edit">
                        <img src="./assets/icons/pen-to-square-solid-full.svg" />
                        Editar
                    </button >
                    <button class="btn-delete">
                        <img src="./assets/icons/trash-solid-full.svg" />
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
    });
    renderStats();

    const viewsButton = document.querySelectorAll('.view-btn');
    viewsButton.forEach(btn => {
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}