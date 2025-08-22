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
        // addBook(book);
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