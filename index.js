const express = require("express");
const jwt = require("jsonwebtoken");
// const cors = require("cors");

const app = express();
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// app.use(cors());
app.use(express.json());

const users = [];

function logger(req, res, next) {
  console.log(req.method + " request came");
  // console.log(`${req.method} request came`);
  next();
}

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "./public/index.html");
// });

const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signup", logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  console.log("BODY:", req.body);
  console.log("CONTENT-TYPE:", req.headers["content-type"]);
  users.push({
    // shorthand if u know key and value has same name
    username,
    password,
    //otherwise use username:username,password:password
  });
  //we should check if a user with this username already exists

  //return back to user
  res.json({ message: "You are signed in!" });
});

app.post("/signin", logger, function (req, res) {
  const username = req.body.username;

  const password = req.body.password;

  // const founduser = users.find(function (u) {if(u.username === username)});
  let founduser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      founduser = users[i];
    }
  }

  if (!founduser) {
    res.json({
      message: "Credentials incorrect!",
    });
    return;
  } else {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET,
    );
    res.json({
      token: token,
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;

  // this is add by me
  if (!token) {
    return res.json({
      message: "You are not logged in",
    });
  }
  // & then we want to verify the token using the secret that i have
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else {
    res.json({
      message: "You are not logged in",
    });
  }
}

app.get("/me", logger, auth, function (req, res) {
  const currentUser = req.username;
  let founduser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === currentUser) {
      founduser = users[i];
    }
  }

  if (!founduser) {
    return res.json({
      message: "User not found!",
    });
  }

  res.json({
    username: founduser.username,
    password: founduser.password,
  });
});

// app.listen(3000);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
