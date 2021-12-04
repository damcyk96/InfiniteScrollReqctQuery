import React, { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const Fetching = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    const res = await axios.get(
      "https://rickandmortyapi.com/api/character/?page=" + page
    );
    return res;
  };
  const {
    data,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery("characters", fetchUsers);

  console.log(data.pages[0].data.results);
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>Próba infinite loadingu </h1>
      <div>
        {characters.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Load more
      </button>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default Fetching;