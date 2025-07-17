import { createTag, fetchTags } from "@/services/api";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export default function TagInput({ tags, setTags }: Props) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (input.trim().length > 0) {
        fetchTags(input).then(({ data }) => {
          const uniqueTags = data.data?.map((t: any) => t.label) || [];
          setSuggestions(uniqueTags.filter((t: string) => !tags.includes(t)));
        });
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  const addTag = async (tag: string) => {
    let shouldCreateNew = true;
    if (tag.trim() === "" || tags.includes(tag)) return;
    setTags([...tags, tag]);
    setInput("");
    if (suggestions.includes(tag)) shouldCreateNew = false;
    setSuggestions([]);
    if (!shouldCreateNew) return;

    try {
      await createTag(tag);
    } catch (err) {
      console.error("Failed to save tag", err);
    }
  };

  const removeTag = (index: number) => {
    const updated = [...tags];
    updated.splice(index, 1);
    setTags(updated);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Tags</Text>

      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(index)}>
              <MaterialIcons name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Add tag..."
        placeholderTextColor="#888"
        onSubmitEditing={() => addTag(input.trim())}
      />

      {suggestions.length > 0 && (
        <ScrollView contentContainerStyle={styles.suggestionList}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => addTag(item)}
              style={styles.suggestion}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#444",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: "#fff",
    marginRight: 4,
  },
  input: {
    backgroundColor: "#2e2e2e",
    color: "#fff",
    padding: 10,
    borderRadius: 6,
  },
  suggestionList: {
    backgroundColor: "#333",
    borderRadius: 6,
    marginTop: 4,
  },
  suggestion: {
    padding: 10,
    borderBottomColor: "#555",
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: "#fff",
  },
});
