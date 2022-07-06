import { AxiosRequestConfig } from "axios";
import ButtonIcon from "components/ButtonIcon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import StarImg from "assets/images/star.png";
import { Reviews } from "types/reviews";
import { BASE_URL, requestBackend } from "util/requests";
import LoaderMovieReviews from "./LoaderMovieReviews";
import { hasAnyRoles } from "util/auth";

import "./styles.css";

type UrlParams = {
  movieId: string;
};

type FormData = {
  text: string;
  movieId: string;
};

const MovieReviews = () => {
  const { movieId } = useParams<UrlParams>();
  const [addReview, setAddReview] = useState(false);
  const [reviewList, setReviewList] = useState<Reviews[]>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `${BASE_URL}/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    setIsLoading(true);
    requestBackend(params)
      .then((response) => setReviewList(response.data))
      .finally(() => {
        setIsLoading(false);
        setAddReview(false);
      });
  }, [addReview, movieId]);

  const onSubmit = (formData: FormData) => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/reviews",
      withCredentials: true,
      data: formData,
    };
    requestBackend(config).then((response) => {
      if (response.status === 201) {
        setAddReview(true);
      }
      console.log(response.status);
      console.log(response.data);
    });
  };

  return (
    <div className="container my-4 reviews-details-container">
      <div className="title-container">
        <p>Tela detalhes do filme</p>
        <p>id: {movieId}</p>
      </div>

      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <div className="base-card aval-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              {...register("movieId")}
              className={"form-control base-input"}
              name="movieId"
              value={movieId}
            />
            <div className="mb-4 input-box">
              <input
                {...register("text", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control base-input ${
                  errors.text ? "Favor preencher a revisão" : ""
                }`}
                placeholder="Deixe sua avaliação aqui"
                name="text"
              />
              <div className="invalid-feedback d-block">
                {errors.text?.message}
              </div>
            </div>
            <div className="aval-submit">
              <ButtonIcon text="Salvar Avaliação" />
            </div>
          </form>
        </div>
      )}

      <div className="base-card row-reviews">
        {isLoading ? (
          <LoaderMovieReviews />
        ) : (
          reviewList?.map((x) => (
            <div className="row-detail" key={x.id}>
              <div className="row-detail-title">
                <img src={StarImg} alt="Estrela Amarela" />
                <h1>{x.user.name}</h1>
              </div>
              <div className="row-detail-obs">
                <p>{x.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
