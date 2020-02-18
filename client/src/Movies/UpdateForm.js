import React, { useState, useEffect } from "react";
import axios from "axios";
const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: ""
};

const UpdateForm = props => {
  const [film, setFilm] = useState(initialState);

  useEffect(() => {
    const selectedMovie = props.movies.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });
    if (selectedMovie) {
      setFilm(selectedMovie);
      console.log(film);
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
      .put(`/update-movie/${film.id}`, film)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        onChange={changeHandler}
        placeholder="title"
        value={film.title}
      />

      <input
        type="text"
        name="director"
        onChange={changeHandler}
        placeholder="Director"
        value={film.director}
      />

      <input
        type="number"
        name="metascore"
        onChange={changeHandler}
        placeholder="metascore"
        value={film.metascore}
      />
      {film.stars.map(star => {
        return (
          <input
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder="stars"
            value={star}
          />
        );
      })}

      <button>Update</button>
    </form>
  );
};

export default UpdateForm;
