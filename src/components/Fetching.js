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
  
  const { data, isLoading, fetchNextPage} = useInfiniteQuery(['characters'], ({ pageParam = 1 }) => fetchCharacters(pageParam), {
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.info.next
      if (nextUrl) {
        return nextUrl.charAt(nextUrl.length - 1)
      }
      console.log("dupa")
      return false
    }
  })

console.log(data)

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
