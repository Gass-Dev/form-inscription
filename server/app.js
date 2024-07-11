const mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();
console.log({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  })
  .promise();

pool
  .getConnection()
  .then(() => console.log("success db connection"))
  .catch((e) => console.log(e));

/**
 * @description Get All users
 * @route GET /users
 */

const getAllUsers = async function (req, res, next) {
  let sql = "SELECT * FROM user";
  try {
    const [rows] = await pool.query(sql);
    if (!rows.length) return res.status(200).json({ users: [] });

    return res.status(200).json({ users: rows });
  } catch (error) {
    next(error);
  }
};

const router = express.Router();

router.route("/").get(getAllUsers);

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/users", router);

module.exports = app;
