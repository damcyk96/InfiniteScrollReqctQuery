import React, { useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const Fetching = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);


  const fetchCharacters = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageParam}`);
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return response.json();
  };
  
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error
  } = useInfiniteQuery('characters', fetchCharacters, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return false;
    }
  });

  console.log(hasNextPage)


  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>Próba infinite loadingu </h1>
      {/* <div>
        {characters?.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div> */}
      <button
        onClick={fetchNextPage}
      >
        Load more
      </button>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default Fetching;
