import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movies";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import MovieCard from "../../components/MovieCard";
import CardLoader from "./CardLoader";

import "./styles.css";

const MoviesList = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/movies",
      withCredentials: true,
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <p>Tela listagem de filmes</p>
      </div>

      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((movie) =>
            movie.id === 1 || movie.id === 2 ? (
              <div key={movie.id}>
                <Link to={"/movies/" + movie.id + "/reviews"} key={movie.id}>
                  <MovieCard movies={movie} />
                </Link>
              </div>
            ) : (
              <span key={movie.id} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default MoviesList;
