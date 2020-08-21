import express from 'express';
import {createTodoItem}     from '../models/create.mjs';
import {loadAllTodoItems}   from '../models/read.mjs';
import {updateTodoItem}     from '../models/update.mjs';
import {deleteTodoItem}     from '../models/delete.mjs';

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.static('../views'));

app.get('/', async(req, res) => {
    res.redirect('index.html');
});


app.get('/loadAllTodoItems', async(req, res) => {
    try {
        let allTodoItems = await loadAllTodoItems();
        res.json(allTodoItems);
    } catch (error) {
        res.json(error);
    }
});

app.post('/createTodoItem', async(req, res) => {
    try {
        let todoItem = {
            title: req.body.title,
            content: req.body.content,
            completed: false,
            created: Date.now(),
            updated: Date.now()
        };
        await createTodoItem(todoItem);
        res.redirect('/');
    } catch (error) {
        res.json(error);
    }
});

app.put('/updateTodoItem/:id', async(req, res) => {
    try {
        let todoItemID = req.params.id;
        let todoItem = {
            title: req.body.title,
            completed: req.body.completed,
            /*,
            content: req.body.content
            updated: Date.now(),
            */
        };
        res.json(await updateTodoItem(todoItem, todoItemID));
    } catch (error) {
        res.json(error);
    }
});

app.delete('/deleteTodoItem/:id', async (req, res) => {
    try {
        let todoItemID = req.params.id;
        res.json(await deleteTodoItem(todoItemID));
    } catch (error) {
        res.json(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});