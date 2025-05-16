import { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useFetch } from "@/services/useFetch";
import { fetchMovieVideos } from "@/services/api";
import YoutubePlayer from "react-native-youtube-iframe";
import { MovieVideo } from "@/interfaces/interfaces";

const MovieVideos = ({ id }: { id: string }) => {
  const [video, setVideo] = useState<MovieVideo | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const playerRef = useRef(null);
  const {
    data: videos,
    loading,
    error,
  } = useFetch(() => fetchMovieVideos(id as string));

  useEffect(() => {
    if (videos && videos.length > 0) {
      setVideo(videos[0]);
    }
  }, [videos]);

  useEffect(() => {
    if (videos && videos[activeIndex]) {
      setVideo(videos[activeIndex]);
    }
  }, [activeIndex]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="mt-10 self-center"
      />
    );
  }

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-4">
        Failed to load movie videos.
      </Text>
    );
  }

  return (
    <View className="my-4">
      {video && (
        <>
          <YoutubePlayer
            ref={playerRef}
            height={230}
            play={false}
            videoId={video.key}
          />
          <View className="flex-col mx-5">
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Videos
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {videos.map((video: MovieVideo, index: number) => {
                return index === activeIndex ? (
                  <TouchableOpacity
                    className="items-center justify-center rounded-md p-3 bg-blue-500"
                    key={index}
                  >
                    <Text className="text-white" numberOfLines={1}>
                      {video?.name}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="items-center justify-center rounded-md p-3 bg-dark-100"
                    onPress={() => setActiveIndex(index)}
                    key={index}
                  >
                    <Text className="text-white" numberOfLines={1}>
                      {video?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default MovieVideos;
