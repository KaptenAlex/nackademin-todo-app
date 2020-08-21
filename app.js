const express = require('express');
const routers = require('./routes/todos.js')

const port = 8080;
const app = express();
app.use(express.json());

app.use(express.static('./views'));
app.use(routers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

