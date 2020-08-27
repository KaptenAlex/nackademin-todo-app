import {loadAllTodoItems} from './read.mjs';

let page = 0;

let previousPage = document.getElementById('previous-page');
let nextPage = document.getElementById('next-page');
let pageNumber = document.getElementById('page-number');

previousPage.addEventListener('click', () => subtractIndexPage());
nextPage.addEventListener('click', () => incrementIndexPage());

function countTodoItemsPages() {
    fetch('http://localhost:8080/todos/countTodoItems')
    .then(response => response.json() )
    .then(data => {
        let x = data;
        console.log(x);
        return x;
    });
}

async function incrementIndexPage() {
    //TODO : Make it not possible to go to a page without todo's.
    let checkNumberOfPages = countTodoItemsPages();
    console.log(checkNumberOfPages);
    if (checkNumberOfPages == page) {
        pageNumber.innerHTML = '<h1>No more pages are available</h1>'
    } else {
        page++;
        loadAllTodoItems(page);
        pageNumber.innerHTML = '<h1>Page ' + (page + 1) +'</h1>'
    }
}

async function subtractIndexPage() {
    if(page != 0 || page > 0) {
        page--;
        loadAllTodoItems(page);
        pageNumber.innerHTML = '<h1>Page ' + (page + 1) +'</h1>'
    }  
}