const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  try {
    const data = await pool.query(`SELECT * FROM lbs LIMIT $1 OFFSET $2`, [
      perPage,
      offset,
    ]);
    res.json(data.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const userExists = await pool.query(checkUserQuery, [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertUserQuery =
      "INSERT INTO users (username , email, password) VALUES ($1, $2 , $3) RETURNING *";
    const newUser = await pool.query(insertUserQuery, [
      username,
      email,
      password,
    ]);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const user = await pool.query(userQuery, [email, password]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: user.rows[0] });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/adminauth", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const sql =
      "SELECT * FROM admin WHERE email = $1 AND password = $2 AND username = $3";
    const response = await pool.query(sql, [email, password, username]);

    if (response.rows.length > 0) {
      res.status(200).json(response.rows);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error in admin authentication:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/addbook", async (req, res) => {
  try {
    const { id , bookname, author, genre, language, publishdate } = req.body;
    const sql =
      "INSERT INTO lbs (id , bookname, author, genre, language , publishdate ) VALUES ($1, $2, $3, $4 , $5 , $6) RETURNING *";
    await pool.query(sql, [id , bookname, author, genre, language, publishdate]);
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    console.error("Error in adding book:", err);
  }
});

app.listen(port, (err) => {
  if (!err) console.log(`Server is running on port ${port}`);
  else console.log(err);
});
