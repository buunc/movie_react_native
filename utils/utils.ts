// import { SavedMovie } from "@/interfaces/interfaces";

export const formatDate = (date: Date): string => {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

// export const groupSavedMoviesByDate = (savedMovied: SavedMovie[]) => {
//   try {
//     const groups = [];
//     savedMovied.forEach((movie) => {
//       const isoString = movie.created_at;
//       const date = new Date(isoString);
//       const formatted = formatDate(date);
//       const existGroup = groups.find((group) => {
//         return group.title === formatted;
//       });
//       if (!existGroup) {
//         const group = {
//           title: formatted,
//           data: [movie],
//         };
//         groups.push(group);
//       } else {
//         existGroup.data.push(movie);
//       }
//     });
//     return groups;
//   } catch (error) {
//     console.log(error);
//   }
// };
