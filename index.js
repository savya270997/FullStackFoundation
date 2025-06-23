const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

let users = [
  { id: 1, name: "Arya Stark" },
  { id: 2, name: "Jon Snow" },
];

app.get("/", (req, res) => {
  res.send("Welcome to your backend path Savya");
});

app.get("/about", (req, res) => {
  res.send("It's Savya, a full stack developer with MERN stack expertise");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
