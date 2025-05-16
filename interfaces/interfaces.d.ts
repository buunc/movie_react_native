import type { Models } from "appwrite";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  release_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMovie {
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

interface SavedMovie {
  movie_id: number;
  title: string;
  poster_url: string;
  created_at: Date;
}

interface Genre {
  name: string;
  id: number;
}

interface SavedCardProps {
  movie: SavedMovie;
}

interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface Review {
  author: string;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
  author_details: ReviewAuthor;
}

interface ReviewAuthor {
  name: string;
  username: string;
  avatar_path: string;
  rating: number | null;
}

export type AppwriteSession = Models.Session;

export type AppwriteUser = Models.User<Models.Preferences>;
