import { searchBook } from './api.js';
import { renderLibrary, createBookInSearch, saveEditedBook, closeEditModal, deleteBook, closeDeleteModal } from './ui.js';

// --- abrir / fechar modal de adicionar livro --- 
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeAddModal = document.getElementById('closeAddModal');

addBookBtn.addEventListener('click', () => {
    addBookModal.showModal();
});

closeAddModal.addEventListener('click', () => {
    addBookModal.close();
})

export function initEvents() {
    // --- pesquisa ---
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

    // --- toggle view ---
    const viewsButton = document.querySelectorAll('.view-btn');

    viewsButton.forEach(btn => {
        btn.addEventListener('click', () => {
            viewsButton.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            renderLibrary(btn.dataset.view);
        })
    });

    // --- modal de deleção ---
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const closeDeleteModalBtn = document.getElementById('closeDeleteModal');

    if (confirmDeleteBtn && cancelDeleteBtn && closeDeleteModalBtn) {
        confirmDeleteBtn.addEventListener('click', deleteBook);
        cancelDeleteBtn.addEventListener('click', closeDeleteModal);
        closeDeleteModalBtn.addEventListener('click', closeDeleteModal);
    }

    // --- modal de edição ---
    const saveEditBtn = document.getElementById('saveEdit');
    const cancelEditBtn = document.getElementById('cancelEdit');
    const closeEditModalBtn = document.getElementById('closeEditModal');

    if (saveEditBtn && cancelEditBtn && closeEditModalBtn) {
        saveEditBtn.addEventListener('click', saveEditedBook);
        cancelEditBtn.addEventListener('click', closeEditModal);
        closeEditModalBtn.addEventListener('click', closeEditModal);
    }
}