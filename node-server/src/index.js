const express = require('express');

const app = express();
app.use(express.json());

const tasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure"
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid payload, expected { "text": "..." }' });
  }
  tasks.push(text);
  res.json({ message: 'Task added successfully' });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Node server listening on port ${PORT}`);
});