import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const UnSaveButton = ({ onRemove }: { onRemove?: () => void }) => {
  return (
    <TouchableOpacity testID="unsave-btn" className="absolute top-2 right-2 w-7 h-7 rounded-full border border-white flex items-center justify-center" onPress={onRemove}>
      <Icon name="close" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default UnSaveButton;
