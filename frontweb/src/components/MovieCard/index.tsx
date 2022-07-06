import { Movie } from "types/movies";

import "./styles.css";

type Props = {
  movies: Movie;
};

const MovieCard = ({ movies }: Props) => {
  return (
    <div className="movie-card">
      <div className="card-link-container">
        <p>Acessar /movies/{movies.id}</p>
      </div>
    </div>
  );
};

export default MovieCard;
