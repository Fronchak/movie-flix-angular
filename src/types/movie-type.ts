import GenreType from "./genre-type";

type MovieType = {
  id: number;
  title: string;
  synopsis: string;
  launchYear: number;
  rating: number;
  imageUrl: string;
  genres: Array<GenreType>;
}

export default MovieType;
