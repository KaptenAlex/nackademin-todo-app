import {loadAllTodoItems, todoListID} from './read.mjs';

let page = 0;

let previousPage = document.getElementById('previous-page');
let nextPage = document.getElementById('next-page');
let pageNumber = document.getElementById('page-number');

previousPage.addEventListener('click', () => subtractIndexPage());
nextPage.addEventListener('click', () => incrementIndexPage());

async function incrementIndexPage() {
    await fetch('http://localhost:8080/todos/countTodoItems/' + todoListID, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then(response => response.json() )
    .then(numOfPages => {
        console.log(numOfPages);
        console.log(page);
        if (page == numOfPages || page > numOfPages) {
            pageNumber.innerHTML = '<h1>No more pages are available</h1>'
        } else {
            page++;
            loadAllTodoItems(page, todoListID);
            pageNumber.innerHTML = '<h1>Page ' + (page + 1) +'</h1>'
        }
    });
}

async function subtractIndexPage() {
    if(page != 0 || page > 0) {
        page--;
        loadAllTodoItems(page, todoListID);
        pageNumber.innerHTML = '<h1>Page ' + (page + 1) +'</h1>'
    }  
}