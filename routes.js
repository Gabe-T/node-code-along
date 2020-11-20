"use strict";
const express = require("express");
const routes = express.Router();

const movies = [
  { id: 1, title: "House Shark", year: 201, animated: false },
  { id: 2, title: "Goodfellas", year: 1990, animated: false },
  { id: 3, title: "No Holds Barred", year: 1989, animated: false },
  { id: 4, title: "Over the Top", year: 1987, animated: false },
];
let nextId = 5;

// get /movies - respond with a JSON array of movies
routes.get("/movies", (req, res) => {
  const minYear = parseInt(req.query.minYear);
  if (minYear) {
    const filteredMovies = movies.filter((movie) => movie.year >= minYear);
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }
});

routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`No movie with id ${id} exists.`);
  }
});

routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  res.send();
});

// export routes for use in server.js
module.exports = routes;
