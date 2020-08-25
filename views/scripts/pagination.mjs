/*
import {deleteTodoItem} from './delete.mjs';
import {editTodoItem} from './update.mjs';
*/
import {loadAllTodoItems} from './read.mjs';
let page = 0;

let previousPage = document.getElementById('previous-page');
let nextPage = document.getElementById('next-page');
let pageNumber = document.getElementById('page-number');

previousPage.addEventListener('click', () => subtractIndexPage());
nextPage.addEventListener('click', () => incrementIndexPage());


function incrementIndexPage() {
    page++;
    loadAllTodoItems(page);
    pageNumber.innerHTML = '<h1>Page ' + (page + 1) +'</h1>'
}

function subtractIndexPage() {
    if(page != 0 || page > 0) {
        page--;
        loadAllTodoItems(page);
        pageNumber.innerHTML = '<h1>Page ' + (page + 1) +'</h1>'
    }  
}