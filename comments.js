// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// Get all comments for a given post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a given post
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  // Get the comment content from the request body
  const { content } = req.body;
  // Get the comments for the given post id
  const comments = commentsByPostId[req.params.id] || [];
  // Push the new comment
  comments.push({ id: commentId, content });
  // Add the comments to the commentsByPostId object
  commentsByPostId[req.params.id] = comments;
  // Return the new comment
  res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
  console.log('Listening on 4001');
});