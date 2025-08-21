const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeAddModal = document.getElementById('closeAddModal');

addBookBtn.addEventListener('click', () => {
    addBookModal.showModal();
});

closeAddModal.addEventListener('click', () => {
    addBookModal.close();
})