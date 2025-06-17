import axios from "axios";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTc0MmExMDA2YTdiMDdkMWEzYmNkOTU0MDQyMTQ4MSIsIm5iZiI6MTc0OTk5NTM3Ny4xNTkwMDAyLCJzdWIiOiI2ODRlY2Y3MTA3NWU2MGU2ZjkzNDQ2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8awS9W2JxtieE_BIUgfrHnnftphZFc6ql3YEK_ijxI0";
const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_TOKEN,
  },
});

export const fetchTrendingMovies = () => instance.get("/trending/movie/day");

export const searchMovies = (query) =>
  instance.get(`/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

export const getMovieDetails = (movieId) => instance.get(`/movie/${movieId}`);

export const getMovieCredits = (movieId) =>
  instance.get(`/movie/${movieId}/credits`);

export const getMovieReviews = (movieId) =>
  instance.get(`/movie/${movieId}/reviews`);
