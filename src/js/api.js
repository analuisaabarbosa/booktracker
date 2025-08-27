// performs an asynchronous search for books in the google books api
export async function searchBook(query) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`);
    const data = await response.json();
    return data.items || [];
}