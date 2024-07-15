const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3002;

app.use(express.json());

// Read the todos from db.json
const readTodos = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data).todos;
};

// Write the todos to db.json
const writeTodos = (todos) => {
  const data = JSON.stringify({ todos }, null, 2);
  fs.writeFileSync('db.json', data);
};

// Get all todos
app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Update status of todos with even ID from false to true
app.put('/todos/update-even-ids', (req, res) => {
  let todos = readTodos();
  todos = todos.map(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      return { ...todo, status: true };
    }
    return todo;
  });
  writeTodos(todos);
  res.json(todos);
});

// Delete all todos with status true
app.delete('/todos/delete-true-status', (req, res) => {
  let todos = readTodos();
  todos = todos.filter(todo => !todo.status);
  writeTodos(todos);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
