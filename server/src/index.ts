import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Test, TypeScript with Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
