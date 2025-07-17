import { StyleSheet, TextInput, View } from "react-native";

export default function HomeSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search documents..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 50,
  },
  input: {
    height: 40,
    color: "#fff",
  },
});
