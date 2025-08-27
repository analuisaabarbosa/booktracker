import { searchBook } from './api.js';
import { renderLibrary, createBookInSearch, saveEditedBook, closeEditModal, deleteBook, closeDeleteModal, filterLibrary } from './ui.js';

// --- add book modals event ---
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeAddModal = document.getElementById('closeAddModal');

addBookBtn.addEventListener('click', () => {
    addBookModal.showModal();
});

closeAddModal.addEventListener('click', () => {
    addBookModal.close();
})

// --- saves the user's view preference (grid or list) in the browser's local storage ---
function saveViewPreference(view) {
    localStorage.setItem('viewMode', view);
    renderLibrary();
}

// --- main function that initializes all events on the page ---
export function initEvents() {
    // --- book search logic ---
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchBtn || !searchResults) {
        console.error('Elementos de pesquisa não encontrados no DOM');
        return;
    }

    searchBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;

        const results = await searchBook(query);
        searchResults.innerHTML = '';

        results.forEach(item => {
            const book = item.volumeInfo;
            const card = createBookInSearch(book);
            searchResults.appendChild(card);
        });
    });

    // ---  toggling view logic ---
    const viewsButton = document.querySelectorAll('.view-btn');
    viewsButton.forEach(btn => {
        btn.addEventListener('click', () => {
            saveViewPreference(btn.dataset.view);
        });
    });

    // --- delete modal logic ---
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const closeDeleteModalBtn = document.getElementById('closeDeleteModal');

    if (confirmDeleteBtn && cancelDeleteBtn && closeDeleteModalBtn) {
        confirmDeleteBtn.addEventListener('click', deleteBook);
        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
        closeDeleteModalBtn.addEventListener('click', closeDeleteModal);
    }

    // --- edit modal logic ---
    const saveEditBtn = document.getElementById('saveEdit');
    const cancelEditBtn = document.getElementById('cancelEdit');
    const closeEditModalBtn = document.getElementById('closeEditModal');

    if (saveEditBtn && cancelEditBtn && closeEditModalBtn) {
        saveEditBtn.addEventListener('click', saveEditedBook);
        cancelEditBtn.addEventListener('click', closeEditModal);
        closeEditModalBtn.addEventListener('click', closeEditModal);
    }

    // --- library display filter logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterLibrary(btn.dataset.filter);
        });
    });
}