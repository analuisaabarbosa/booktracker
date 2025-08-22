import { searchBook } from './api.js';
import { createBookInSearch } from './ui.js';

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
}