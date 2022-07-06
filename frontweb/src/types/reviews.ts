import { User } from "./users";

export type RecordsReviews = {
  content: Reviews[];
};

export type Reviews = {
  id: number;
  text: string;
  movieId: number;
  user: User;
};
