const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const API_KEY = "a2fd83a30a824ad48a811f749ad53476";

let headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "X-CMC_PRO_API_KEY": "93ee3b20-2be8-4353-ab0a-9890b46acf14",
};

app.get("/top", (req, res) => {
  axios
    .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    .then((response) => {
      res.send(response.data.articles);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/getnews/:query", (req, res) => {
  const query = req.params.query;

  axios
    .get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
    .then((response) => {
      console.log("response");
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/catnews/:cat/:country", (req, res) => {
  const { cat, country } = req.params;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${cat}&apiKey=${API_KEY}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/Top/:country", (req, res) => {
  const { country } = req.params;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.send("it is working!");
});

app.get("/crypto", (req, res) => {
  console.log("ddd");
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=15&convert=USD`,
      { headers }
    )
    .then((response) => {
      res.json(response.data.data);
    });
});

app.listen(3001, () => {
  console.log("3001");
});
