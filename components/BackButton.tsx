import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
};

export function BackButton({ style }: Props) {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <TouchableOpacity style={[styles.backArrow, style]} onPress={handleBack}>
      <MaterialIcons name="arrow-back-ios-new" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    zIndex: 10,
  },
});
