const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 5000;

// PostgreSQL pool
const pool = new Pool({
  user: "avnadmin",
  host: "spotify-analyser69-lehigh-62e3.f.aivencloud.com",
  database: "defaultdb",
  password: "AVNS_E5f3AMnrS1CdwXogZ9o",  
  port: 25717,
  ssl: {
    rejectUnauthorized: false,
    sslmode: "require"
  }
});


app.use(cors());
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3001", 
}));


// Sign Up Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)",[username, hashedPassword]);
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

// Sign In Route
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT password FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) return res.status(404).send("User not found");

    const isValid = await bcrypt.compare(password, result.rows[0].password);
    if (isValid) {
      res.json({ 
      message: "Sign-In Successful", 
      user: { username } // Include user data here
    });
    } else {
      res.status(401).send("Invalid Password");
    }
  } catch (error) {
    res.status(500).send("Error signing in");
  }
});

//HigherorLower Route
app.get("/HigherOrLower", async (req, res) => {
  try {
    // Query to get a random subreddit from the table
    const result = await pool.query(
      "SELECT name FROM subreddits ORDER BY RANDOM() LIMIT 1"
    );

    if (result.rows.length === 0) return res.status(404).send("No subreddits found");

    // Send the random subreddit name as the response
    res.status(200).send({ subreddit: result.rows[0].name });
  } catch (error) {
    res.status(500).send("Error retrieving subreddit");
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
