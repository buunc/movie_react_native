import { View, Text, FlatList } from "react-native";
import { fetchReviews } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import ReviewCard from "./ReviewCard";
import { Review } from "@/interfaces/interfaces";

const Review = ({ id }: { id: string }) => {
  const { data: reviews, loading, error } = useFetch(() => fetchReviews(id));

  if (error || loading || !reviews) {
    return <></>;
  }

  return (
    <View className="flex-1">
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Reviews
      </Text>
      {
        reviews.length === 0 ? (
          <Text className="text-center text-gray-500">
            No Reviews Yet
          </Text>
        ) : reviews.map((review: Review) => <ReviewCard review={review} key={review.id} />)
      }
    </View>
  );
};

export default Review;
