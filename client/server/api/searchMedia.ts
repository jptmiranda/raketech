import { QueryObject } from "ufo";

const buildUrl = (query: QueryObject) => {
  const queryParams = Object.entries(query)
    .filter(([_, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  return `${process.env.API_URL || "http://localhost:8080"}?${queryParams}`;
};

export default eventHandler(async (event) => {
  const query = getQuery(event);

  return await fetch(buildUrl(query))
    .then((response) => response.json())
    .then((data) => data);
});
