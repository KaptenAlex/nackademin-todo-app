const express = require('express');
const todosRouters = require('./routes/todos.js')
const usersRouters = require('./routes/users.js')
const todoListRouters = require('./routes/todoList.js')

const port = 8080;
const app = express();
app.use(express.json());

app.use(express.static('./views'));
app.use("/todos", todosRouters);
app.use("/users", usersRouters);
app.use("/todoList", todoListRouters);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

