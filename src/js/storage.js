const STORAGE_KEY = 'myLibrary';

export function saveLibrary(library) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

export function loadLibrary() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function getDefaultSettings() {
    return {
        viewMode: 'grid', // 'grid' or 'list'
        sortBy: 'dateAdded', // 'dateAdded', 'title', 'author'
        sortOrder: 'desc', // 'asc' or 'desc'
        booksPerPage: 20,
        showDescriptions: true,
        autoBackup: false
    };
}