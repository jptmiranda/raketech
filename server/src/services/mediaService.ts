import { redisClient } from "../index";
import { keyFromParams } from "../utils";
import { SearchMediaRequest } from "../types";

const buildUrl = (params: SearchMediaRequest) => {
  const url = new URL("http://www.omdbapi.com");

  url.searchParams.append("s", params.title);
  if (params.type) {
    url.searchParams.append("type", params.type);
  }
  if (params.year) {
    url.searchParams.append("y", params.year.toString());
  }
  url.searchParams.append("apikey", process.env.OMDB_API_KEY);

  return url.href;
};

const searchMedia = async (params: SearchMediaRequest) => {
  const paramsKey = keyFromParams("search", params);
  const cachedResults = await redisClient.get(paramsKey);

  if (cachedResults) {
    return JSON.parse(cachedResults);
  }

  const data = await fetch(buildUrl(params)).then((response) =>
    response.json()
  );

  if (data.Response === "False") {
    return {
      results: [],
      totalResults: 0,
    };
  }

  const response = {
    results: data.Search,
    totalResults: parseInt(data.totalResults),
  };

  await redisClient.set(paramsKey, JSON.stringify(response));
  await redisClient.expire(paramsKey, 60 * 60 * 24);

  return response;
};

export default {
  searchMedia,
};
