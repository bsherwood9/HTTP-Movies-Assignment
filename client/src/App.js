import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from "./Movies/UpdateForm";
import Movie from "./Movies/Movie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const getMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovies(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => {
          return (
            <MovieList
              {...props}
              addToSavedList={addToSavedList}
              setMovies={setMovies}
              movies={movies}
            />
          );
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              setMovies={setMovies}
              movies={movies}
              getMovies={getMovies}
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateForm {...props} movies={movies} setMovies={setMovies} />
          );
        }}
      />
    </>
  );
};

export default App;
