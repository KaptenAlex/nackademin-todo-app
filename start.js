require('dotenv').config();
const app = require('./app.js');
const Database = require('./models/databaseConnection.js');
const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

Database.connect().then( () => 
    app.listen( port, () => console.log(`Server is running on port ${port}`))
)