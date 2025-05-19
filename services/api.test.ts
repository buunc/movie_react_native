import {
  fetchMovies,
  fetchSimilarMovies,
  fetchRecommendationsMovies,
  fetchMovieDetails,
  fetchMovieVideos,
  fetchGenres,
  fetchReviews,
  fetchCast,
  fetchPerson,
  fetchMovieCredits,
  TMDB_CONFIG,
} from "./api";

global.fetch = jest.fn();

const mockMovies = [
  { id: 1, title: "Movie One" },
  { id: 2, title: "Movie Two" },
];

const mockMovieDetails = {
  id: 1,
  title: "Movie One",
};

const mockMovieVideos = [
  { id: "1", name: "Video 1", site: "YouTube" },
  { id: "2", name: "Video 2", site: "Twitch" },
  { id: "3", name: "Video 3", site: "YouTube" },
];

const mockYoutubeMovieVideos = [
  { id: "1", name: "Video 1", site: "YouTube" },
  { id: "3", name: "Video 3", site: "YouTube" },
];

const mockGenres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Action" },
];

const mockReviews = [
  { id: "1", author: "Author 1" },
  { id: "2", author: "Author 2" },
];

const mockCast = [
  { id: 1, name: "Cast 1" },
  { id: 2, name: "Cast 2" },
];

const mockPerson = {
  id: 1,
  name: "Person 1",
};

const mockHeader = {
  method: "GET",
  headers: TMDB_CONFIG.headers,
};

describe("fetchMovies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches movies by genres", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    const result = await fetchMovies({ query: "", genres: "28" });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/discover/movie?with_genres=28"),
      mockHeader
    );

    expect(result).toEqual(mockMovies);
  });

  it("fetches movies by query", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    const result = await fetchMovies({ query: "Avengers", genres: "" });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/search/movie?query=Avengers"),
      mockHeader
    );

    expect(result).toEqual(mockMovies);
  });

  it("fetches popular movies when no query or genres", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    const result = await fetchMovies({ query: "", genres: "" });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/discover/movie?sort_by=popularity.desc"),
      mockHeader
    );

    expect(result).toEqual(mockMovies);
  });

  it("throws an error when API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(fetchMovies({ query: "", genres: "" })).rejects.toThrow(
      "Failed to fetch movies"
    );
  });
});

describe("fetchSimilarMovies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch similar movies", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });
    const result = await fetchSimilarMovies("123");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/movie/123/similar"),
      mockHeader
    );

    expect(result).toEqual(mockMovies);
  });

  it("throws an error when API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(fetchSimilarMovies("123")).rejects.toThrow(
      "Failed to fetch movies"
    );
  });
});

describe("fetchRecommendationsMovies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch recommendations movies", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    const result = await fetchRecommendationsMovies("123");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/movie/123/recommendations"),
      mockHeader
    );

    expect(result).toEqual(mockMovies);
  });

  it("throws an error when API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(fetchRecommendationsMovies("123")).rejects.toThrow(
      "Failed to fetch movies"
    );
  });
});

describe("fetchMovieDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetch movie details", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovieDetails,
    });

    const results = await fetchMovieDetails("1");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/movie/1"),
      mockHeader
    );
    expect(results).toEqual(mockMovieDetails);
  });

  it("throws an error if API call failed", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorize",
    });
    await expect(fetchMovieDetails("1")).rejects.toThrow(
      "Failed to fetch movie detail"
    );
  });

  describe("fetchMovieVideos", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("fetch youtube movie videos", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: mockMovieVideos }),
      });

      const results = await fetchMovieVideos("123");
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/movie/123/videos"),
        mockHeader
      );
      expect(results).toEqual(mockYoutubeMovieVideos);
    });

    it("throws an error if API call failed", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorize",
      });

      await expect(fetchMovieVideos("123")).rejects.toThrow(
        "Failed to fetch movie videos"
      );
    });
  });

  describe("fetchGenres", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("fetch genres", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ genres: mockGenres }),
      });

      const results = await fetchGenres();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/genre/movie/list"),
        mockHeader
      );
      expect(results).toEqual(mockGenres);
    });

    it("throws an error if API call failed", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorize",
      });

      await expect(fetchGenres()).rejects.toThrow("Failed to fetch genres");
    });
  });

  describe("fetchReviews", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("fetch reviews", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: mockReviews }),
      });

      const results = await fetchReviews("123");
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/movie/123/reviews"),
        mockHeader
      );
      expect(results).toEqual(mockReviews);
    });

    it("throws an error if API call failed", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorize",
      });

      await expect(fetchReviews("123")).rejects.toThrow(
        "Failed to fetch movie reviews"
      );
    });
  });

  describe("fetchCast", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("fetch cast", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ cast: mockCast }),
      });

      const results = await fetchCast("123");
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/movie/123/credits"),
        mockHeader
      );
      expect(results).toEqual(mockCast);
    });

    it("throws an error if API call failed", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorize",
      });

      await expect(fetchCast("123")).rejects.toThrow(
        "Failed to fetch movie credit"
      );
    });
  });

  describe("fetchPerson", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("fetch person", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPerson,
      });

      const results = await fetchPerson("123");
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/person/123"),
        mockHeader
      );
      expect(results).toEqual(mockPerson);
    });

    it("throws an error if API call failed", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorize",
      });

      await expect(fetchPerson("123")).rejects.toThrow(
        "Failed to fetch person"
      );
    });
  });

  describe("fetchMovieCredits", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("fetch movie credits", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ cast: mockCast }),
      });

      const results = await fetchMovieCredits("123");
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/person/123/movie_credits"),
        mockHeader
      );
      expect(results).toEqual(mockCast);
    });

    it("throws an error if API call failed", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorize",
      });

      await expect(fetchMovieCredits("123")).rejects.toThrow(
        "Failed to fetch movie credits"
      );
    });
  });
});
