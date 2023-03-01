import { SearchMediaRequest } from "../types";

const buildUrl = (params: SearchMediaRequest) => {
  let BASE_URL = `http://www.omdbapi.com/?`;

  BASE_URL += `s=${params.title}`;
  BASE_URL += `&apikey=${process.env.OMDB_API_KEY}`;

  return BASE_URL;
};

export const searchMedia = async (params: SearchMediaRequest) => {
  const data = await fetch(buildUrl(params)).then((response) =>
    response.json()
  );

  if (data.Response === "False") {
    return {
      results: [],
      totalResults: 0,
    };
  }

  return {
    results: data.Search,
    totalResults: parseInt(data.totalResults),
  };
};

export default {
  searchMedia,
};
