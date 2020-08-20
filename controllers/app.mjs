import express from 'express';
import {createTodoItem} from '../models/create.mjs';

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.static('../views'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/createTodoItem', async(req, res) => {
    let todoItem = {
        title: req.body.title,
        content: req.body.content,
        completed: false,
        created: Date.now(),
        updated: Date.now()
    };
    try {
        let newTodoItem = await createTodoItem(todoItem);
        res.json(newTodoItem);
        //res.render('index.html');
    } catch (error) {
        res.json(error)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});