import React from 'react';
import { useParams } from 'react-router-dom';

export const MoviePage = () => {
  const { id } = useParams();
  return <div>Страница фильма: {id}</div>;
};