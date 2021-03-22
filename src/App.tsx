import { useEffect, useState } from 'react';

import { Genre } from './models/Genre';
import { Movie } from './models/Movie';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

export function App() {
  const [genres, setGenres] = useState<Genre[]>([]);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleChange(selectedGenre: Genre, movies: Movie[]) {
    setMovies(movies);
    setSelectedGenre(selectedGenre);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar genres={ genres } onChange={({selectedGenre, movies}) => handleChange(selectedGenre, movies)}/>

      <Content movies={ movies } selectedGenre={ selectedGenre }/>
    </div>
  )
}