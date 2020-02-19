import React, { useState, useEffect } from "react";
import axios from "axios";
const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = props => {
  const [film, setFilm] = useState(initialState);
  console.log(props.movies);

  useEffect(() => {
    const selectedMovie = props.movies.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });
    if (selectedMovie) {
      setFilm(selectedMovie);
    }
  }, []);

  const changeHandler = e => {
    e.preventDefault();
    setFilm({
      ...film,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${film.id}`, film)
      .then(res => {
        console.log(res);
        props.movies[film.id] = res.data;
        setFilm(initialState);
        props.setMovies(props.movies);
        // props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-content">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={film.title}
          />
        </div>
        <div>
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="Director"
            value={film.director}
          />
        </div>
        <div>
          <label htmlFor="metascore">Metascore:</label>
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={film.metascore}
          />
        </div>
      </div>

      {/* This is clearly not working because I don't have a good way of handling film.stars */}
      {/* {film.stars.map(star => {
        return (
          <input
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder="stars"
            value={film.stars}
          />
        );
      })} */}

      <button className="update-button">Update</button>
    </form>
  );
};

export default UpdateForm;
