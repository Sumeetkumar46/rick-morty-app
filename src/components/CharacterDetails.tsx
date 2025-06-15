import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../lib/api';
import { useParams } from '@tanstack/react-router';

export const CharacterDetails = () => {
  const { id } = useParams({ from: '/details/$id' });
  const { data, isLoading } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(Number(id)),
  });

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
    </div>
  );
};
