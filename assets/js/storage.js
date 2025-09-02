// --- a constant for the localStorage key ---
const STORAGE_KEY = 'myLibrary';

// --- saves the entire library array to localStorage ---
export function saveLibrary(library) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

// --- loads the library from localStorage ---
export function loadLibrary() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// --- add a new book to the library ---
export function addBookToLibrary(book) {
    const library = loadLibrary();
    const bookId = book.id || book.title + (book.authors?.[0] || '');
    const exits = library.some(b => b.id === bookId);
    if (exits) {
        alert('Livro já adicionado à biblioteca');
        return;
    }
    const bookToAdd = {
        id: bookId,
        title: book.title || 'Sem título',
        authors: book.authors || ['Autor desconhecido'],
        description: book.description || 'Sem descrição disponível',
        categories: book.categories || ['Gênero desconhecido'],
        thumbnail: book.imageLinks?.thumbnail || 'https://via.placeholder.com/100x150?text=No+Cover',
        addedAt: Date.now(),
        isRead: false
    }
    library.push(bookToAdd);
    saveLibrary(library);
    return bookToAdd;
}

// --- toggle the 'isRead' status of a specific book in the library ---
export function toggleReadStatusInStorage(bookId) {
    let library = loadLibrary();
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        library[bookIndex].isRead = !library[bookIndex].isRead;
        saveLibrary(library);
        return library[bookIndex];
    }
    return null;
}

// --- removes a book from the library ---
export function removeBookFromLibrary(bookId) {
    let library = loadLibrary();
    const initialLength = library.length;
    library = library.filter(book => book.id !== bookId);

    if (library.length < initialLength) {
        saveLibrary(library);
        return true;
    }
    return false;
}

// --- updates an existing book's properties in the library ---
export function updateBookInLibrary(updatedBook) {
    let library = loadLibrary();
    const bookIndex = library.findIndex(book => book.id === updatedBook.id);

    if (bookIndex !== -1) {
        library[bookIndex] = { ...library[bookIndex], ...updatedBook };
        saveLibrary(library);
        return true;
    }
    return false
}

// --- returns a default settings object for the application ---
export function getDefaultSettings() {
    return {
        viewMode: 'grid', // 'grid' or 'list'
    };
}