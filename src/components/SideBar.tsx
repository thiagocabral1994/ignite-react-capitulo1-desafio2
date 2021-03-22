import { useEffect, useState } from 'react';

import { Genre } from "../models/Genre";
import { Movie } from "../models/Movie";

import { Button } from '../components/Button';

import "../styles/sidebar.scss";

import { api } from '../services/api';

interface SideBarResponse {
  selectedGenre: Genre,
  movies: Movie[]
}

interface SideBarProps {
  genres: Genre[],
  onChange: ({selectedGenre, movies}: SideBarResponse) => void
}

export function SideBar(props: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function fetchGenreAndMovies() {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(movieRes => {
      api.get<Genre>(`genres/${selectedGenreId}`).then(genreRes => {
        props.onChange({selectedGenre: genreRes.data, movies: movieRes.data});
      })
    });
  }

  useEffect(() => {
    fetchGenreAndMovies();
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {props.genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}
