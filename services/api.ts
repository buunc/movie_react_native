import { MovieDetails, MovieVideo } from "@/interfaces/interfaces";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
  genres,
}: {
  query: string;
  genres: string;
}) => {
  const endpoint = genres
    ? `${TMDB_CONFIG.BASE_URL}/discover/movie?with_genres=${genres}&sort_by=popularity.desc`
    : query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();
  return data.results;
};

export const fetchTVSeries = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch tv series", response.statusText);
  }
  const data = await response.json();
  return data.results;
};

export const fetchSimilarMovies = async (movieId: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/similar`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();
  return data.results;
};

export const fetchRecommendationsMovies = async (movieId: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/recommendations`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) throw new Error("Failed to fetch movie detail");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMovieVideos = async (movieId: string) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}/videos`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) throw new Error("Failed to fetch movie videos");
    const data = await response.json();
    return data.results.filter((video: MovieVideo) => video.site === "YouTube");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/genre/movie/list`, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) throw new Error("Failed to fetch genres");
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
