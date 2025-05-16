import { useState } from "react";
import { icons } from "@/constants/icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { formatDate } from "@/utils/utils";
import { Review } from "@/interfaces/interfaces";

const ReviewCard = ({ review }: { review: Review }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleText = () => {
    setExpanded(!expanded);
  };
  const content = review.content;
  const shortContent = content.slice(0, 200);

  return (
    <View className="flex-row w-full mt-3 gap-5">
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${review?.author_details?.avatar_path}`,
        }}
        className="w-[40px] h-[40px] rounded-full"
        resizeMode="stretch"
      />
      <View className="flex-col flex-1">
        <View className="flex-row gap-1 items-center">
          <Text className="text-base text-white font-bold">
            {review?.author_details?.username}
          </Text>
          <Text className="text-light-200 text-sm">
            writted at:&nbsp;
            {formatDate(review?.created_at)}
          </Text>
        </View>
        <View className="flex-row items-center justify-center bg-dark-100 px-2 py-1 rounded-md mb-2 w-[40px]">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {review?.author_details?.rating
              ? Math.round(review?.author_details.rating / 2)
              : "N/A"}
          </Text>
        </View>
        <View>
          <Text className="text-light-200 text-sm">
            {expanded ? content : shortContent}
            {!expanded && content.length > shortContent.length ? "..." : ""}
          </Text>
          {content.length > shortContent.length && (
            <TouchableOpacity onPress={toggleText}>
              <Text className="text-light-200 text-sm">
                {expanded ? "View Less" : "View More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
