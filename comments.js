// Create a web server
// Load the comments.json file
// Respond to the request with the contents of the comments.json file
// When a POST request is made, append the body of the request to the comments.json file
// Respond with a 200 status code and an empty body
// Use the data directory to store the comments.json file
// Use the express framework

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

//read file
const comments = JSON.parse(fs.readFileSync('data/comments.json'));

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET
app.get('/comments', (req, res) => {
  res.json(comments);
});

//POST
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync('data/comments.json', JSON.stringify(comments));
  res.status(200).send();
});

//PUT
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  comments[id] = comment;
  fs.writeFileSync('data/comments.json', JSON.stringify(comments));
  res.status(200).send();
});

//DELETE
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.splice(id, 1);
  fs.writeFileSync('data/comments.json', JSON.stringify(comments));
  res.status(200).send();
});

//server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});