import { Movie, MovieDetails, SavedMovie, TrendingMovie } from "@/interfaces/interfaces";
import { Client, Databases, Query, ID, Account } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const COLLECTION_SAVED_ID =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_SAVED_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);

const database = new Databases(client);

export const updateSearchCount = async (movie: Movie | MovieDetails) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movie_id", movie.id),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const isMovieSaved = async (
  movie: MovieDetails,
  user_id: string
): Promise<boolean> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVED_ID,
      [Query.equal("movie_id", movie.id), Query.equal("user_id", user_id)]
    );
    return result.documents.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const saveMovie = async (
  movie: MovieDetails,
  user_id: string
): Promise<undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVED_ID,
      [Query.equal("movie_id", movie.id), Query.equal("user_id", user_id)]
    );
    if (result.documents.length > 0) {
      return;
    }
    await database.createDocument(
      DATABASE_ID,
      COLLECTION_SAVED_ID,
      ID.unique(),
      {
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        user_id: user_id,
        created_at: new Date().toISOString(),
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unSaveMovie = async (
  movie_id: number,
  user_id: string
): Promise<undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVED_ID,
      [Query.equal("movie_id", movie_id), Query.equal("user_id", user_id)]
    );
    if (result.documents.length > 0) {
      const record = result.documents[0];
      await database.deleteDocument(
        DATABASE_ID,
        COLLECTION_SAVED_ID,
        record.$id
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSavedMovies = async (
  user_id: string
): Promise<SavedMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVED_ID,
      [Query.equal("user_id", user_id), Query.orderDesc("created_at")]
    );
    return result.documents as unknown as SavedMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};