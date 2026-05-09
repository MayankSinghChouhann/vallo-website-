const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// CREATE CSV IF NOT EXISTS
const filePath = "information.csv";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "Name,Email,Message\n");
}

// FORM SUBMISSION API
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  const data = `${name},${email},${message}\n`;

  fs.appendFileSync(filePath, data);

  console.log("New Submission:");
  console.log(req.body);

  res.send({ status: "success", message: "Data saved!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});