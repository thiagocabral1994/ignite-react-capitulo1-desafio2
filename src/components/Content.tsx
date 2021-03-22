import { MovieCard } from '../components/MovieCard';

import { Genre } from '../models/Genre';
import { Movie } from "../models/Movie";

import "../styles/content.scss";

interface ContentProps {
  movies: Movie[]
  selectedGenre: Genre
}

export function Content(props: ContentProps) {

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {props.selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {props.movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
