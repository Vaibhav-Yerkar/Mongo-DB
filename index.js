const express = require('express');
const dotenv = require('dotenv');

const DbConnection = require('./databaseConnection.js');

const usersRouter = require('./routes/users.js');
const booksRouter = require('./routes/books.js');

dotenv.config();
const app = express();

DbConnection();
const port = 8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "Server's up and running ",
        data : "hey"
    });
});

app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.get('*',(req,res)=>{
    res.status(404).json({
        message : "This route doesn't exist"
    })
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});
