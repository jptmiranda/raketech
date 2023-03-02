export default eventHandler(async (event) => {
  return await fetch(
    "http://localhost:8080?title=redemption&type=movie&year=1994"
  )
    .then((response) => response.json())
    .then((data) => data);
});
