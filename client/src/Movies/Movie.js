import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = e => {
    const movieForDeletion = this.props.movies.find(
      movie => `${movie.id}` === this.props.match.params.id
    );
    axios
      .delete(`http://localhost:5000/api/movies/${movieForDeletion.id}`)
      .then(res => {
        console.log(res);
        this.props.getMovies();
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <button className="save-button" onClick={this.saveMovie}>
          Save
        </button>
        <button
          className="update-button"
          onClick={() =>
            this.props.history.push(`/update-movie/${this.state.movie.id}`)
          }
        >
          Update
        </button>
        <button className="delete-button" onClick={this.deleteMovie}>
          Delete
        </button>
      </div>
    );
  }
}
