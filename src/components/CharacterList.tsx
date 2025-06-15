import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchCharacters } from '../lib/api';
import type { Character } from '../types';
import './CharacterList.css';

interface CharacterAPIResponse {
  info: { pages: number };
  results: Character[];
}

export const CharacterList = () => {
  const [page, setPage] = useState(() => Number(localStorage.getItem('page')) || 1);

  useEffect(() => {
    localStorage.setItem('page', page.toString());
  }, [page]);

  const { data, isLoading, error } = useQuery<CharacterAPIResponse>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
  });

  if (isLoading) return <div className="center">Loading...</div>;
  if (error || !data) return <div className="center">Failed to load characters.</div>;

  return (
    <div className="character-list-wrapper">
      <h1 className="character-title">git commit -m "Initial commit"cls</h1>

      <div className="character-grid">
        {data.results.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="pagination-btn"
        >
          ⬅ Previous
        </button>
        <span className="pagination-page">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= data.info.pages}
          className="pagination-btn"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

const CharacterCard = ({ character }: { character: Character }) => {
  const { data: episode } = useQuery({
    queryKey: ['episode', character.episode[0]],
    queryFn: () => fetch(character.episode[0]).then((res) => res.json()),
  });

  const statusColor =
    character.status === 'Alive'
      ? 'limegreen'
      : character.status === 'Dead'
      ? 'red'
      : 'gray';

  return (
    <div className="character-card">
      <img
        src={character.image}
        alt={character.name}
        className="character-image"
      />
      <div className="character-info">
        <h2 className="character-name">{character.name}</h2>
        <div className="character-status">
          <span
            className="character-status-dot"
            style={{ backgroundColor: statusColor }}
          ></span>
          {character.status} - {character.species}
        </div>

        <div className="character-label">Last known location:</div>
        <div className="character-location">{character.location.name}</div>

        <div className="character-label">First seen in:</div>
        <div className="character-episode">{episode?.name || 'Loading...'}</div>
      </div>
    </div>
  );
};
